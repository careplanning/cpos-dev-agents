#!/usr/bin/env node
// 秘密と個人情報の検査 (CPOS のアプリの標準 CI の 1 段。正本は cpos-kit の kit/ci/secret-pii-scan.mjs)。
// cpos-kit が所有する。kit を入れたアプリは node_modules/@cpos/kit の中のものを、ほかのアプリは CPOS が置く .ci/ の写しを回す。
// 写しは 1 バイトも変えない。直すときは正本を直して写し直す。
//
//   node secret-pii-scan.mjs [--root <フォルダ>] [--allow <許可の一覧>]
//
// - 形だけで見る。実在の氏名・番号の一覧は持たない (この部品も配るものなので)。
// - 出すのは「ファイル:行番号」と「種類」だけ。見つけた値は出さない (CI のログに残さないため)。
//   ファイルの名前に秘密・個人情報の形があれば、名前も伏せて番号で示す。
// - 数は出現の数。同じ行でも位置が違えば別に数え、同じ種類・同じ位置は 1 つ (CSV の本文と列の両方で当たっても 1)。
// - 今ある違反は .ci/secret-pii-allow.json に { path, kind, count, reason } で載せて始め、数が増えたら落とす (ラチェット)。
//   値は書かない。kind は下の KINDS だけ。数が減ったら一覧も減らすよう知らせる。
// - 終了コード: 0 = 無い (許可の数の内)、1 = ある、2 = 許可の一覧が壊れている・読めない・知らない kind、
//   または一覧にあるファイルを読めなかった (I/O の失敗。意図して見ないもの = バイナリ・大きすぎ・リンク とは分けて数える)。
// - 見ないもの (形で見分けられない・誤りが多い): 人の名前、区切りの無い 10 桁の固定電話 (ID と見分けられない)、
//   名前の付いた汎用の鍵 (api_key=… のような値。架空の値と見分けられない)、引用符の中に区切りを含む CSV の列のずれ、画像の中の文字。
//   読めないファイル (バイナリ・BOM の無い UTF-16・奇数の長さの UTF-16) と 2MiB を超えるファイルは中を見ないが、
//   黙って外さず場所と数を出す。NUL が少し混じっただけのテキストは読む。
import { existsSync, lstatSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

export const KINDS = Object.freeze([
  'private-key', 'github-token', 'aws-access-key', 'google-api-key', 'slack-token', 'webhook-url', 'cpos-token', 'ai-api-key', 'jwt',
  'insured-number', 'my-number', 'phone-number', 'email',
]);

// ── 形 ──
const SECRET = [
  ['private-key', /-----BEGIN (?:[A-Z]+ )?PRIVATE KEY(?: BLOCK)?-----/g],
  ['github-token', /\b(?:gh[pousr]_[A-Za-z0-9]{36,}|github_pat_[A-Za-z0-9_]{60,})/g],
  ['aws-access-key', /\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/g],
  ['google-api-key', /\bAIza[0-9A-Za-z_-]{35}/g],
  ['slack-token', /\bxox[abposr]-[0-9A-Za-z-]{10,}/g],
  ['webhook-url', /https:\/\/hooks\.slack\.com\/services\/[A-Za-z0-9]+\/[A-Za-z0-9]+\/[A-Za-z0-9]{16,}|https:\/\/chat\.googleapis\.com\/v1\/spaces\/[^\s"'?]+\/messages\?[^\s"']*token=[A-Za-z0-9_-]{16,}/g],
  // CPOS が発行するトークンは 接頭辞 + base64url の 32 バイト (43 字)。cpos_app_ は発行されない (試験の架空の値に多い)
  ['cpos-token', /\bcpos_(?:pat|rdat|rdrt)_[A-Za-z0-9_-]{43}(?![A-Za-z0-9_-])/g],
  ['ai-api-key', /\bsk-(?:ant-|proj-)?[A-Za-z0-9_-]{32,}/g],
];
// JWT は base64url の 3 区画 (見出し.中身.署名) を候補に取り、見出し (alg を持つ JSON) と中身 (JSON) に解けるものだけを数える。
// 短い中身 ({"iat":1})・空の中身 ({} = e30)・{ の前に空白や改行がある JSON も。区画の前後に別の区画が続くもの (a.b.c.d) は取らない
const JWT_CANDIDATE = /(?<![A-Za-z0-9_-]|[A-Za-z0-9_-]\.)[A-Za-z0-9_-]{2,}\.[A-Za-z0-9_-]{2,}\.[A-Za-z0-9_-]*(?![A-Za-z0-9_-]|\.[A-Za-z0-9_-])/g;
const jsonOf = (part) => {
  const t = Buffer.from(part, 'base64url').toString('utf8').trim();
  if (!t.startsWith('{')) return null;   // 先に安く外す (ふつうの a.b.c はここで落ちる)
  try { const v = JSON.parse(t); return v && typeof v === 'object' && !Array.isArray(v) ? v : null; } catch { return null; }
};
const isJwt = (s) => { const [h, p] = s.split('.'); const head = jsonOf(h); return Boolean(head && typeof head.alg === 'string' && jsonOf(p)); };
// 被保険者番号は 10 桁、マイナンバーは 12 桁。数だけでは時刻などと区別できないので、同じ行 (CSV は見出しの列) にその語があるときだけ見る
const INSURED_WORD = /被保険者|insured|hihokensha/i;
const MY_NUMBER_WORD = /マイナンバー|個人番号|my_?number/i;
const digitsRun = (n) => new RegExp(`(?<![\\d.])\\d{${n}}(?![\\d.])`, 'g');
// 電話: 国内は 0 で始まる 10・11 桁 (区切りは - か空白か括弧。区切りなしは 050・070・080・090 の 11 桁だけ)、国番号は +81 の後に 9・10 桁。
// 前後に数字の続き (空白をはさんだものも) があれば長すぎる番号として見ない
const PHONE_START = String.raw`(?<![\w+.-])(?<!\d )`;   // 前が ( でもよい (番号全体を括弧で囲んだもの)
const PHONE_END = String.raw`(?![\w-]| \d)`;
const PHONE = new RegExp([
  String.raw`0\d{1,4}[- ]\d{1,4}[- ]\d{3,4}`,
  String.raw`0\d{1,4} ?\(\d{1,4}\) ?\d{3,4}`,
  String.raw`\(0\d{1,4}\)[- ]?\d{1,4}[- ]?\d{3,4}`,
  String.raw`0[5789]0\d{8}`,
  String.raw`\+81[- ]?(?:\(\d{1,4}\)|\d{1,4})[- ]?\d{1,4}[- ]?\d{3,4}`,
].map((p) => PHONE_START + p + PHONE_END).join('|'), 'g');
const phoneDigitsOk = (m) => { const d = m.replace(/\D/g, ''); return m.startsWith('+') ? d.length >= 11 && d.length <= 12 : d.length === 10 || d.length === 11; };
const EMAIL = /[A-Za-z0-9._%+-]+@((?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,})/g;
// 例や伏せた宛先として使ってよいドメイン (RFC 2606・6761 の例、国内の例のドメイン、GitHub の noreply)
const SAFE_DOMAIN = /(?:^|\.)(?:example\.(?:com|org|net|jp|co\.jp|ne\.jp|or\.jp|ac\.jp|go\.jp|ed\.jp|lg\.jp)|example|invalid|test|localhost|local|users\.noreply\.github\.com|noreply\.github\.com)$/i;

/** 1 つの文書の中の「種類・行・行の中の位置」の一覧 (出現ごとに 1 件)。値は返さない。 */
export function scanText(text) {
  const found = [];
  String(text).split(/\r?\n/).forEach((l, i) => {
    const line = i + 1;
    const add = (kind, col) => found.push({ kind, line, col });
    for (const [kind, re] of SECRET) for (const m of l.matchAll(re)) add(kind, m.index);
    for (const m of l.matchAll(JWT_CANDIDATE)) if (isJwt(m[0])) add('jwt', m.index);
    if (INSURED_WORD.test(l)) for (const m of l.matchAll(digitsRun(10))) add('insured-number', m.index);
    if (MY_NUMBER_WORD.test(l)) for (const m of l.matchAll(digitsRun(12))) add('my-number', m.index);
    for (const m of l.matchAll(PHONE)) if (phoneDigitsOk(m[0])) add('phone-number', m.index);
    for (const m of l.matchAll(EMAIL)) if (!SAFE_DOMAIN.test(m[1])) add('email', m.index);
  });
  return found;
}

/** CSV・TSV は見出しの列で見る (行に語が無いため)。位置は値の始まり (本文の検索と同じ位置になり、重ねて数えない)。 */
function scanTable(text, delimiter) {
  const lines = String(text).split(/\r?\n/);
  const cells = (l) => {
    const out = [];
    let start = 0;
    for (const raw of l.split(delimiter)) {
      const value = raw.trim().replace(/^"(.*)"$/, '$1').trim();
      out.push({ value, col: value ? l.indexOf(value, start) : start });
      start += raw.length + delimiter.length;
    }
    return out;
  };
  const head = lines.findIndex((l) => l.trim() !== '');
  if (head < 0) return [];
  const cols = cells(lines[head]).map((h, i) => (INSURED_WORD.test(h.value) ? ['insured-number', /^\d{10}$/, i] : MY_NUMBER_WORD.test(h.value) ? ['my-number', /^\d{12}$/, i] : null)).filter(Boolean);
  const found = [];
  for (let n = head + 1; n < lines.length && cols.length; n++) {
    const row = cells(lines[n]);
    for (const [kind, re, i] of cols) if (row[i] && re.test(row[i].value)) found.push({ kind, line: n + 1, col: row[i].col });
  }
  return found;
}

/** ファイルの中身を文字にする。読めなければ null。 */
const REPLACEMENT = String.fromCharCode(0xfffd);
function decode(buf) {
  if (buf[0] === 0xff && buf[1] === 0xfe) return buf.length % 2 === 0 ? buf.subarray(2).toString('utf16le') : null;
  if (buf[0] === 0xfe && buf[1] === 0xff) return buf.length % 2 === 0 ? Buffer.from(buf.subarray(2)).swap16().toString('utf16le') : null;
  const t = buf.toString('utf8');
  let nul = 0;
  for (const b of buf) if (b === 0) nul++;
  // NUL があり、UTF-8 として壊れているか NUL が 1% を超えればバイナリ (NUL が少し混じっただけのテキストは読む)
  if (nul > 0 && (t.includes(REPLACEMENT) || nul * 100 > buf.length)) return null;
  return t.charCodeAt(0) === 0xfeff ? t.slice(1) : t;
}

// ── 見るファイル ──
const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', 'build', 'coverage', '.next', 'out', '.turbo', '.cache']);
const SKIP_FILES = /(^|\/)(package-lock\.json|npm-shrinkwrap\.json|yarn\.lock|pnpm-lock\.yaml|secret-pii-scan\.mjs|secret-pii-allow\.json)$/;
const MAX_BYTES = 2 * 1024 * 1024;

function listFiles(root) {
  if (existsSync(join(root, '.git'))) {
    const r = spawnSync('git', ['-C', root, 'ls-files', '-z'], { encoding: 'utf8' });
    if (r.status === 0) return r.stdout.split('\0').filter(Boolean);
  }
  const out = [];
  const walk = (d) => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name)) walk(join(d, e.name)); }
      else if (e.isFile()) out.push(relative(root, join(d, e.name)).split(sep).join('/'));
    }
  };
  walk(root);
  return out;
}

/**
 * フォルダを調べる。{ findings: [{ path, line, col, kind }], files: 見たファイル, skipped: [{ path, why }] = 意図して見ないもの,
 * failed: [{ path }] = 一覧にあるのに読めなかったもの (I/O の失敗。検査が済んでいないので終了 2) }
 */
export function scanTree(root) {
  const findings = [], files = [], skipped = [], failed = [];
  for (const rel of listFiles(root)) {
    if (SKIP_FILES.test(rel) || rel.split('/').some((p) => SKIP_DIRS.has(p))) continue;
    const p = join(root, rel);
    let st; try { st = lstatSync(p); } catch { failed.push({ path: rel }); continue; }
    if (st.isSymbolicLink()) { skipped.push({ path: rel, why: 'リンク (先は見ない)' }); continue; }
    if (!st.isFile()) continue;
    if (st.size > MAX_BYTES) { skipped.push({ path: rel, why: '2MiB を超える' }); continue; }
    let buf; try { buf = readFileSync(p); } catch { failed.push({ path: rel }); continue; }
    const text = decode(buf);
    if (text === null) { skipped.push({ path: rel, why: 'テキストとして読めない' }); continue; }
    files.push(rel);
    const table = /\.csv$/i.test(rel) ? ',' : /\.tsv$/i.test(rel) ? '\t' : null;
    const seen = new Set();
    for (const f of [...scanText(text), ...(table ? scanTable(text, table) : [])]) {
      const k = `${f.kind}:${f.line}:${f.col}`;
      if (seen.has(k)) continue;   // 同じ種類・同じ位置は 1 つ
      seen.add(k);
      findings.push({ path: rel, ...f });
    }
  }
  return { findings, files, skipped, failed };
}

/** 許可の一覧を読む。無ければ空。壊れている・知らない kind は投げる (黙って全部を許さない。書かれた値は出さない)。 */
export function readAllow(file) {
  if (!existsSync(file)) return [];
  let j;
  try { j = JSON.parse(readFileSync(file, 'utf8')); } catch { throw new Error('許可の一覧が JSON として読めない'); }
  const list = Array.isArray(j?.allow) ? j.allow : null;
  if (!list) throw new Error('許可の一覧に allow の配列が無い');
  for (const [i, a] of list.entries()) {
    if (typeof a?.path !== 'string' || a.path === '' || !Number.isInteger(a?.count) || a.count < 1) throw new Error(`許可の一覧の ${i + 1} 番目に path・count (1 以上の整数) が無い`);
    if (!KINDS.includes(a?.kind)) throw new Error(`許可の一覧の ${i + 1} 番目の kind が決まった種類 (${KINDS.join('・')}) ではない`);
  }
  return list;
}

// 表示する名前に秘密・個人情報の形があれば伏せる (ファイルの名前・許可の一覧の名前のどれも、ここを通す)。
// 名前は _ や - でつながる (allow_<トークン>.json) ので、本文と同じ検査を語の境に頼らずにかける:
// 最後の拡張子を外し (<JWT>.md を 4 区画にしない)、(1) - _ / \ を空白にした名前、(2) 外した名前そのもの、
// (3) 区切り (- _ / \ . 空白) の後から区切りの前までの部分 (8 字以上) のどれかに 1 つでも当たれば伏せる。
// 汎用の「長い英数字」では見ない (ApplicationConfigurationV2.md やハッシュの名前を伏せないため)
export function nameNeedsMask(name) {
  const base = String(name).replace(/\.[A-Za-z0-9]{1,10}$/, '');
  if (scanText(base.replace(/[-_/\\]/g, ' ')).length || scanText(base).length) return true;
  const starts = [0], ends = [base.length];
  for (let i = 0; i < base.length; i++) if (/[-_/\\. ]/.test(base[i])) { starts.push(i + 1); ends.push(i); }
  for (const x of starts) for (const y of ends) if (y - x >= 8 && scanText(base.slice(x, y)).length) return true;
  return false;
}
const masked = (name, label) => (nameNeedsMask(name) ? `<伏せた${label}>` : name);

function main(argv) {
  // 走査・読み取りの例外は捕まえ、生の文・スタック・場所を出さない (種類の記号だけ)
  try { return run(argv); } catch (e) { console.error(`秘密と個人情報の検査: フォルダかファイルを読めなかった (${typeof e?.code === 'string' && /^[A-Z]+$/.test(e.code) ? e.code : '理由は出さない'})`); return 2; }
}

function run(argv) {
  const opt = (k) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : undefined; };
  const root = resolve(opt('--root') ?? process.cwd());
  const allowFile = resolve(root, opt('--allow') ?? '.ci/secret-pii-allow.json');
  const allowName = masked(relative(root, allowFile).split(sep).join('/'), '許可の一覧の名前');
  let allow;
  try { allow = readAllow(allowFile); } catch (e) { console.error(`秘密と個人情報の検査: ${e.message} (${allowName})`); return 2; }
  const { findings, files, skipped, failed } = scanTree(root);
  // ファイルの名前の表示は、すべての出力でここを通す。名前に秘密・個人情報の形があれば伏せて番号で示す
  const known = [...files, ...skipped.map((s) => s.path), ...failed.map((f) => f.path)];
  const show = (rel) => masked(rel, `パス ${known.indexOf(rel) + 1}`);
  const key = (p, k) => `${p}\0${k}`;
  const found = new Map();
  for (const f of findings) found.set(key(f.path, f.kind), (found.get(key(f.path, f.kind)) ?? 0) + 1);
  const allowed = new Map(allow.map((a) => [key(a.path, a.kind), a.count]));
  const over = [...found].filter(([k, n]) => n > (allowed.get(k) ?? 0));
  if (over.length) {
    console.log(`秘密か個人情報の形が ${findings.length} か所 (許可の数を超えたもの ${over.length} 組)。値は出さない。直すか、確かめて ${allowName} に数を載せる:`);
    const overKeys = new Set(over.map(([k]) => k));
    for (const f of findings) if (overKeys.has(key(f.path, f.kind))) console.log(`  ${show(f.path)}:${f.line} ${f.kind}`);
    for (const [k, n] of over) { const [p, kind] = k.split('\0'); console.log(`  = ${show(p)} ${kind} ${n} > ${allowed.get(k) ?? 0}`); }
  } else {
    console.log(`秘密と個人情報の検査: ${files.length} ファイル。${findings.length ? `見つかった ${findings.length} か所は許可の数の内` : '見つからない'}`);
  }
  if (skipped.length) {
    console.log(`  見なかった ${skipped.length} ファイル (中は見ていない。場所だけ):`);
    for (const s of skipped) console.log(`    ${show(s.path)} (${s.why})`);
  }
  if (failed.length) {
    console.log(`  読めなかった ${failed.length} ファイル (一覧にあるのに読み取りに失敗した。検査は済んでいない):`);
    for (const f of failed) console.log(`    ${show(f.path)}`);
  }
  // 減らせる許可。一覧の path は、見たファイルのときだけ (それも show を通して) 出す
  const seen = new Set(files);
  allow.forEach((a, i) => {
    const n = found.get(key(a.path, a.kind)) ?? 0;
    if (n < a.count) console.log(`  (許可の数を減らせる: ${seen.has(a.path) ? show(a.path) : `一覧の ${i + 1} 番目`} ${a.kind} ${n} < ${a.count})`);
  });
  return failed.length ? 2 : over.length ? 1 : 0;   // 読めなかったファイルがあれば、検査が済んでいないので 2
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) process.exitCode = main(process.argv.slice(2));
