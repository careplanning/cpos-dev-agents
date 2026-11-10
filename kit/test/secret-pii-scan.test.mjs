// 秘密と個人情報の検査 (kit/ci/secret-pii-scan.mjs)。標準 CI の 1 段 (kit/ci/standard.json)。
// 試験で使う秘密・番号の形は、このファイルに字面で残らないよう実行時に組み立てる (このファイルも配布物で、検査の対象になるため)。
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { KINDS, scanText } from '../ci/secret-pii-scan.mjs';

const script = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'ci', 'secret-pii-scan.mjs');
const rep = (c, n) => c.repeat(n);
const digits = (n, start = 1) => Array.from({ length: n }, (_, i) => String((start + i) % 10)).join('');
const S = {
  privateKey: `-----BEGIN ${'PRIVATE'} KEY-----`,
  github: 'gh' + 'p_' + rep('A', 36),
  aws: 'AK' + 'IA' + rep('Q', 16),
  google: 'AI' + 'za' + rep('b', 35),
  slack: 'xo' + 'xb-' + digits(12),
  webhook: 'https://hooks.' + 'slack.com/services/' + rep('T', 9) + '/' + rep('B', 9) + '/' + rep('c', 24),
  cpos: 'cpos_' + 'pat_' + rep('k', 43),   // CPOS のトークンは接頭辞 + base64url の 32 バイト (43 字)
  ai: 's' + 'k-' + rep('z', 40),
  insured: '被保険者番号: ' + digits(10),
  insuredEn: 'insuredNumber = "' + digits(10, 3) + '"',
  myNumber: 'マイナンバー ' + digits(12),
  phone: '連絡先 0' + '90-' + digits(4) + '-' + digits(4, 5),
  landline: 'tel: 0' + '3-' + digits(4) + '-' + digits(4, 2),
  email: 'taro' + '@' + 'mail.example-corp.jp',
};
const kindsOf = (text) => scanText(text).map((f) => f.kind);
const run = (cwd, ...args) => spawnSync(process.execPath, [script, ...args], { cwd, encoding: 'utf8' });

test('秘密の形を見つける (鍵・GitHub・AWS・Google・Slack・Webhook・CPOS・AI の鍵)', () => {
  assert.deepEqual(kindsOf(S.privateKey), ['private-key']);
  assert.deepEqual(kindsOf(`token=${S.github}`), ['github-token']);
  assert.deepEqual(kindsOf(S.aws), ['aws-access-key']);
  assert.deepEqual(kindsOf(S.google), ['google-api-key']);
  assert.deepEqual(kindsOf(S.slack), ['slack-token']);
  assert.deepEqual(kindsOf(S.webhook), ['webhook-url']);
  assert.deepEqual(kindsOf(`X_CPOS_APP_TOKEN=${S.cpos}`), ['cpos-token']);
  assert.deepEqual(kindsOf(S.ai), ['ai-api-key']);
});

test('個人情報の形を見つける (被保険者番号の全桁・マイナンバー・電話・メール)。行の番号は 1 から', () => {
  assert.deepEqual(kindsOf(S.insured), ['insured-number']);
  assert.deepEqual(kindsOf(S.insuredEn), ['insured-number']);
  assert.deepEqual(kindsOf(S.myNumber), ['my-number']);
  assert.deepEqual(kindsOf(S.phone), ['phone-number']);
  assert.deepEqual(kindsOf(S.landline), ['phone-number']);
  assert.deepEqual(kindsOf(S.email), ['email']);
  assert.deepEqual(scanText(`a\nb\n${S.insured}\n`), [{ kind: 'insured-number', line: 3, col: S.insured.indexOf(digits(10)) }]);   // 行の中の位置 (重ねて数えないため) も返す
});

test('伏せた形・例の形・ふつうの数は通す (下 4 桁・example ドメイン・noreply・時刻の数・日付・版)', () => {
  for (const ok of [
    '被保険者番号: ******' + digits(4),
    '被保険者番号の下4桁 ' + digits(4),
    'contact: someone@example.com / dev@example.org / x@test.invalid',
    '12345+someone@users.noreply.github.com',
    'createdAt: ' + digits(10) + '  (時刻の秒。保険の語が無い行の 10 桁は見ない)',
    'date 2026-11-10, version 0.13.0, id 123-4567-8901-2',
    'const re = /0\\d{1,4}-\\d{1,4}-\\d{4}/;',
    'name: 架空 花子 (人の名前は形で見ない。一覧も持たない)',
  ]) assert.deepEqual(scanText(ok), [], ok);
});

test('検査の部品は、実在の氏名・番号の一覧を持たない (形だけで見る)', () => {
  const src = readFileSync(script, 'utf8');
  assert.doesNotMatch(src, /\d{8,}/, '長い数の字面');
  assert.doesNotMatch(src, /[\p{Script=Han}]{1,4}[ 　][\p{Script=Han}]{1,4}[^\p{Script=Han}]/u, '「姓 名」の形の字面');
  assert.doesNotMatch(src, /@[a-z0-9-]+\.(?:co\.jp|ne\.jp|or\.jp|com)\b(?<!example\.com)/, 'メールの宛先の字面');
});

test('失敗経路: 秘密か個人情報の形があれば非 0 で、場所と種類だけを出す (値は出さない)', () => {
  const dir = mkdtempSync(join(tmpdir(), 'cpos-kit-scan-'));
  mkdirSync(join(dir, 'src'));
  writeFileSync(join(dir, 'src', 'a.js'), `// ok\nconst t = '${S.github}';\n`);
  writeFileSync(join(dir, 'src', 'b.md'), `# 名簿\n${S.insured}\n`);
  const r = run(dir);
  assert.equal(r.status, 1, r.stdout + r.stderr);
  assert.match(r.stdout, /src\/a\.js:2 github-token/);
  assert.match(r.stdout, /src\/b\.md:2 insured-number/);
  for (const v of [S.github, digits(10)]) assert.ok(!(r.stdout + r.stderr).includes(v), '値が出ている');
});

test('node_modules・.git・lockfile は見ない。何も無ければ 0', () => {
  const dir = mkdtempSync(join(tmpdir(), 'cpos-kit-scan-'));
  for (const d of ['node_modules/x', '.git', 'dist']) mkdirSync(join(dir, d), { recursive: true });
  writeFileSync(join(dir, 'node_modules/x/i.js'), S.aws);
  writeFileSync(join(dir, '.git/config'), S.github);
  writeFileSync(join(dir, 'dist/app.js'), S.google);
  writeFileSync(join(dir, 'package-lock.json'), JSON.stringify({ x: S.aws }));
  writeFileSync(join(dir, 'ok.js'), 'export const a = 1;\n');
  const r = run(dir);
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.match(r.stdout, /見つからない/);
});

test('今ある違反は .ci/secret-pii-allow.json に数で載せて始め、増えたら落とす (ラチェット)。減ったら一覧を減らすよう知らせる', () => {
  const dir = mkdtempSync(join(tmpdir(), 'cpos-kit-scan-'));
  mkdirSync(join(dir, '.ci'));
  writeFileSync(join(dir, 'docs.md'), `${S.email}\n`);
  const allow = (count) => writeFileSync(join(dir, '.ci', 'secret-pii-allow.json'), JSON.stringify({ version: 1, allow: [{ path: 'docs.md', kind: 'email', count, reason: '窓口の宛先 (確かめ済み)' }] }));
  allow(1);
  let r = run(dir);
  assert.equal(r.status, 0, r.stdout + r.stderr);
  writeFileSync(join(dir, 'docs.md'), `${S.email}\n${S.email}\n`);
  r = run(dir);
  assert.equal(r.status, 1, '一覧の数より増えたら落ちる');
  assert.match(r.stdout, /docs\.md email 2 > 1/);
  allow(3);
  r = run(dir);
  assert.equal(r.status, 0);
  assert.match(r.stdout, /減らせる/);
});

test('許可の一覧が壊れている・数が無いときは止まる (黙って全部を許さない)', () => {
  const dir = mkdtempSync(join(tmpdir(), 'cpos-kit-scan-'));
  mkdirSync(join(dir, '.ci'));
  writeFileSync(join(dir, 'a.txt'), 'nothing\n');
  writeFileSync(join(dir, '.ci', 'secret-pii-allow.json'), '{ "allow": [ { "path": "a.txt", "kind": "email" } ] }');
  assert.equal(run(dir).status, 2);
  writeFileSync(join(dir, '.ci', 'secret-pii-allow.json'), '{ broken');
  assert.equal(run(dir).status, 2);
});

// ── 作り直し 1 回目 (読むだけのレビューの指摘: 同じ行の数・許可の一覧の種類・電話の書き方・見ないもの) ──

test('同じ行に 2 つあれば 2 件と数える。ラチェットは行ではなく出現の数で見る', () => {
  const email2 = 'hanako' + '@' + 'mail.example-corp.jp';
  assert.deepEqual(kindsOf(`to: ${S.email}, ${email2}`), ['email', 'email']);
  assert.deepEqual(kindsOf('被保険者番号 ' + digits(10) + ' / ' + digits(10, 4)), ['insured-number', 'insured-number']);
  assert.deepEqual(kindsOf(`[${JSON.stringify(S.github)}, ${JSON.stringify('gh' + 'p_' + rep('B', 36))}]`), ['github-token', 'github-token']);
  const dir = mkdtempSync(join(tmpdir(), 'cpos-kit-scan-'));
  mkdirSync(join(dir, '.ci'));
  writeFileSync(join(dir, '.ci', 'secret-pii-allow.json'), JSON.stringify({ allow: [{ path: 'a.json', kind: 'email', count: 1 }] }));
  writeFileSync(join(dir, 'a.json'), `["${S.email}"]\n`);
  assert.equal(run(dir).status, 0);
  writeFileSync(join(dir, 'a.json'), `["${S.email}", "${email2}"]\n`);
  const r = run(dir);
  assert.equal(r.status, 1, '同じ行で増えても落ちる');
  assert.match(r.stdout, /a\.json email 2 > 1/);
});

test('失敗経路: 許可の一覧の kind は決まった種類だけ。ほかは値を出さずに 2。一覧の path は、見たファイルでなければ出さない', () => {
  assert.equal(KINDS.length, 13);
  const dir = mkdtempSync(join(tmpdir(), 'cpos-kit-scan-'));
  mkdirSync(join(dir, '.ci'));
  writeFileSync(join(dir, 'a.txt'), 'nothing\n');
  writeFileSync(join(dir, '.ci', 'secret-pii-allow.json'), JSON.stringify({ allow: [{ path: 'a.txt', kind: S.github, count: 1 }] }));
  let r = run(dir);
  assert.equal(r.status, 2);
  assert.ok(!(r.stdout + r.stderr).includes(S.github), 'kind に書かれた値が出ている');
  const odd = 'notes-' + S.cpos + '.md';
  writeFileSync(join(dir, '.ci', 'secret-pii-allow.json'), JSON.stringify({ allow: [{ path: odd, kind: 'email', count: 1 }] }));
  r = run(dir);
  assert.equal(r.status, 0);
  assert.match(r.stdout, /一覧の 1 番目/);
  assert.ok(!(r.stdout + r.stderr).includes(S.cpos), '一覧の path に書かれた値が出ている');
});

test('電話: 区切り (-・空白・括弧) と区切りなしの携帯・050、国番号 +81 を見る。数字の数が合わないものは見ない', () => {
  for (const ok of [
    '0' + '90-' + digits(4) + '-' + digits(4, 5), '0' + '90' + digits(8), '0' + '90 ' + digits(4) + ' ' + digits(4, 5),
    '0' + '50-' + digits(4) + '-' + digits(4, 3), '0' + '3(' + digits(4) + ')' + digits(4, 6), '(0' + '3)' + digits(4) + '-' + digits(4, 6),
    '0' + '3-' + digits(4) + '-' + digits(4, 2), '0' + '120-' + digits(3) + '-' + digits(3, 4), '+' + '81-90-' + digits(4) + '-' + digits(4, 5),
    '+' + '81 3 ' + digits(4) + ' ' + digits(4, 2), '+' + '81' + '90' + digits(8),
  ]) assert.deepEqual(kindsOf(`tel ${ok}`), ['phone-number'], ok);
  for (const ng of [
    '123-4567-8901-2', '0' + '12-' + digits(4) + '-' + digits(4) + '-' + digits(2), '0-12-3456', '2026-11-10', 'v0.13.0',
    '000' + digits(8), '0' + digits(9) + ' (区切りの無い 10 桁は固定電話と ID を見分けられないので見ない)', 'port 0' + '3000', 'id: 0' + '90' + digits(9),
  ]) assert.deepEqual(kindsOf(ng), [], ng);
});

test('JWT の形も秘密として見る', () => {
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString('base64url');
  const jwt = b64({ alg: 'HS256', typ: 'JWT' }) + '.' + b64({ sub: 'syn_x', iat: 1 }) + '.' + rep('s', 43);
  assert.deepEqual(kindsOf(`Authorization: Bearer ${jwt}`), ['jwt']);
  assert.deepEqual(kindsOf('eyJ だけ・ey' + 'J' + 'abc.def'), []);
});

test('CSV・TSV は見出しの列で見る (被保険者番号・マイナンバーの列の全桁)。伏せた値は通す', () => {
  const dir = mkdtempSync(join(tmpdir(), 'cpos-kit-scan-'));
  writeFileSync(join(dir, 'users.csv'), ['no,氏名,被保険者番号,メモ', `1,架空 一郎,${digits(10)},x`, '2,架空 二郎,******' + digits(4) + ',y', `3,"架空 三郎","${digits(10, 2)}",z`].join('\n') + '\n');
  writeFileSync(join(dir, 'ids.tsv'), ['id\tmy_number', `a\t${digits(12)}`].join('\n') + '\n');
  const r = run(dir);
  assert.equal(r.status, 1, r.stdout + r.stderr);
  assert.match(r.stdout, /users\.csv:2 insured-number/); assert.match(r.stdout, /users\.csv:4 insured-number/);
  assert.doesNotMatch(r.stdout, /users\.csv:3 /);
  assert.match(r.stdout, /ids\.tsv:2 my-number/);
});

test('UTF-16 (BOM あり) も読む。読めないもの (バイナリ・BOM の無い UTF-16)・2MiB を超えるものは黙って外さず、数と場所を出す', () => {
  const dir = mkdtempSync(join(tmpdir(), 'cpos-kit-scan-'));
  writeFileSync(join(dir, 'u16.txt'), Buffer.concat([Buffer.from([0xff, 0xfe]), Buffer.from(`key=${S.aws}\n`, 'utf16le')]));
  let r = run(dir);
  assert.equal(r.status, 1, r.stdout + r.stderr);
  assert.match(r.stdout, /u16\.txt:1 aws-access-key/);
  const dir2 = mkdtempSync(join(tmpdir(), 'cpos-kit-scan-'));
  writeFileSync(join(dir2, 'big.log'), Buffer.alloc(2 * 1024 * 1024 + 1, 0x61));
  writeFileSync(join(dir2, 'pic.bin'), Buffer.from([0x89, 0x50, 0x00, 0x01]));
  writeFileSync(join(dir2, 'ok.txt'), 'fine\n');
  r = run(dir2);
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.match(r.stdout, /見なかった 2 ファイル/);
  assert.match(r.stdout, /big\.log \(2MiB を超える\)/); assert.match(r.stdout, /pic\.bin \(テキストとして読めない\)/);
});

// ── 作り直し 2 回目 (読むだけの再レビューの指摘と、統括の確かめで分かった改善) ──
const b64 = (o) => Buffer.from(JSON.stringify(o)).toString('base64url');

test('CSV・TSV: 本文と列の両方で見つけても、同じ種類・同じ位置は 1 件 (重ねて数えない)。位置が違えば同じ行でも数える', () => {
  const dir = mkdtempSync(join(tmpdir(), 'cpos-kit-scan-'));
  mkdirSync(join(dir, '.ci'));
  writeFileSync(join(dir, '.ci', 'secret-pii-allow.json'), JSON.stringify({ allow: [{ path: 'a.csv', kind: 'insured-number', count: 1 }] }));
  writeFileSync(join(dir, 'a.csv'), ['insured_number,note', `${digits(10)},insured`].join('\n') + '\n');
  let r = run(dir);
  assert.equal(r.status, 0, '本文 (行に insured の語) と列の両方で当たっても 1 件');
  writeFileSync(join(dir, 'a.csv'), ['insured_number,note', `${digits(10)},memo`, `${digits(10, 3)},memo`].join('\n') + '\n');
  r = run(dir);
  assert.equal(r.status, 1, 'メモを変えて番号を 1 行増やすと 2 件で落ちる');
  assert.match(r.stdout, /a\.csv insured-number 2 > 1/);
  writeFileSync(join(dir, 'a.csv'), ['insured_number,note', `${digits(10)},insured ${digits(10, 5)}`].join('\n') + '\n');
  r = run(dir);
  assert.match(r.stdout, /a\.csv insured-number 2 > 1/, '同じ行でも位置が違えば 2 件');
});

test('電話: 空白・括弧の組み合わせと 0120・+81 (括弧つき) も見る。総桁数と境界は保つ (長すぎる番号・日付・版は見ない)', () => {
  for (const ok of [
    '0' + '120 ' + digits(3) + ' ' + digits(3, 4), '(0' + '3) ' + digits(4) + ' ' + digits(4, 6), '0' + '3 (' + digits(4) + ') ' + digits(4, 6),
    '+' + '81 (3) ' + digits(4) + ' ' + digits(4, 6), '+' + '81-120-' + digits(3) + '-' + digits(3, 4),
  ]) assert.deepEqual(kindsOf(`tel ${ok}`), ['phone-number'], ok);
  for (const ng of [
    '0' + '90-' + digits(4) + '-' + digits(5), '0' + '90 ' + digits(4) + ' ' + digits(4) + ' ' + digits(2), '+' + '81 90 ' + digits(4) + ' ' + digits(5),
    '2026 11 10', '2026-11-10 10:00', 'v1.2.3 (4) 5678', '0' + '3 ' + digits(2) + ' ' + digits(3),
  ]) assert.deepEqual(kindsOf(ng), [], ng);
});

test('短い JWT (ペイロード {"iat":1}) も見る。見出しと中身を解いて JSON の形のものだけ (値は出さない)', () => {
  const short = b64({ alg: 'HS256', typ: 'JWT' }) + '.' + b64({ iat: 1 }) + '.' + rep('x', 43);
  assert.deepEqual(kindsOf(`token: ${short}`), ['jwt']);
  assert.deepEqual(kindsOf('ey' + 'Jxx.ey' + 'Jyy.zz'), [], '解けないものは見ない');
  assert.deepEqual(kindsOf(b64({ a: 1 }) + '.' + b64({ iat: 1 }) + '.' + rep('x', 43)), [], '見出しに alg の無いものは見ない');
});

test('CPOS のトークンは本物の形 (cpos_pat_・cpos_rdat_・cpos_rdrt_ + 43 字) だけ。発行されない cpos_app_ と、長さの違うものは見ない', () => {
  for (const p of ['pat', 'rdat', 'rdrt']) assert.deepEqual(kindsOf('cpos_' + p + '_' + rep('A', 43)), ['cpos-token'], p);
  assert.deepEqual(kindsOf('cpos_' + 'app_' + rep('A', 43)), []);
  assert.deepEqual(kindsOf('cpos_' + 'pat_' + rep('A', 20)), []);
  assert.deepEqual(kindsOf('cpos_' + 'pat_' + rep('A', 44)), []);
});

test('国内の例のドメイン (example.co.jp など) は通す', () => {
  assert.deepEqual(kindsOf('a' + '@example.co.jp b' + '@example.ne.jp c' + '@example.jp d' + '@sub.example.or.jp'), []);
});

test('失敗経路: ファイルの名前に秘密・個人情報の形があれば、どの出力でも名前を伏せて番号で示す', () => {
  const dir = mkdtempSync(join(tmpdir(), 'cpos-kit-scan-'));
  mkdirSync(join(dir, '.ci'));
  const odd = 'notes-' + S.cpos;
  writeFileSync(join(dir, odd + '.md'), `${S.email}\n`);
  writeFileSync(join(dir, odd + '.bin'), Buffer.from([0x89, 0x00, 0x01, 0x00]));
  writeFileSync(join(dir, '.ci', 'secret-pii-allow.json'), JSON.stringify({ allow: [{ path: odd + '.md', kind: 'email', count: 1 }, { path: odd + '.md', kind: 'phone-number', count: 1 }] }));
  let r = run(dir);
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.match(r.stdout, /伏せたパス/); assert.match(r.stdout, /見なかった 1 ファイル/); assert.match(r.stdout, /減らせる/);
  assert.ok(!(r.stdout + r.stderr).includes(S.cpos), '名前の中の値が出ている');
  writeFileSync(join(dir, odd + '.md'), `${S.email}\n${S.email}\n`);
  r = run(dir);
  assert.equal(r.status, 1);
  assert.ok(!(r.stdout + r.stderr).includes(S.cpos), '落ちたときの場所の行にも出ない');
});

test('NUL が 1 バイト混じったテキストは読む。奇数の長さの UTF-16 は例外で止まらず「読めない」に回す', () => {
  const dir = mkdtempSync(join(tmpdir(), 'cpos-kit-scan-'));
  writeFileSync(join(dir, 'nul.txt'), Buffer.concat([Buffer.from(`key=${S.aws}\n`), Buffer.from([0]), Buffer.from(rep('t', 200))]));
  writeFileSync(join(dir, 'odd16.txt'), Buffer.from([0xfe, 0xff, 0x00, 0x41, 0x00]));
  const r = run(dir);
  assert.equal(r.status, 1, r.stdout + r.stderr);
  assert.match(r.stdout, /nul\.txt:1 aws-access-key/);
  assert.match(r.stdout, /odd16\.txt \(テキストとして読めない\)/);
});
