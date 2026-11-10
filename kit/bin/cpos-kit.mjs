#!/usr/bin/env node
// cpos-kit の CLI。依存ゼロ。
//
//   npx github:loogo-inc/cpos-kit create <dir> [--name <表示名>] [--app-id <appId>] [--sample none|node|fastify] [--kit-dep <spec>] [--yes]
//   npx github:loogo-inc/cpos-kit fake [--port 4300] [--seed <path>]
//   npx github:loogo-inc/cpos-kit validate [cpos.manifest.json]
//   npx github:loogo-inc/cpos-kit token [cpos.manifest.json]     # 本物の CPOS につなぐための App Token の取り方を案内
//   npx github:loogo-inc/cpos-kit doctor                         # kit が持つ CPOS API の版と接続先の版を比べる
//   npx github:loogo-inc/cpos-kit tickets [--check] | tickets init [--apply] | tickets new <タイトル>   # 後から入れるチケット台帳 (opt-in)
//   npx github:loogo-inc/cpos-kit help

import { existsSync, mkdirSync, readdirSync, readFileSync, realpathSync, statSync, writeFileSync, rmSync } from 'node:fs';
import { basename, dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline/promises';
import { execFileSync, spawnSync } from 'node:child_process';
import { select } from './select.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const kitRoot = resolve(here, '..', '..'); // リポジトリ (= パッケージ) のルート
const pkg = JSON.parse(readFileSync(resolve(kitRoot, 'package.json'), 'utf8'));

const args = process.argv.slice(2);
// --guide / --help はどこに置いても効く (npx github:loogo-inc/cpos-kit --guide、npx github:loogo-inc/cpos-kit create x --guide)。
// 「手順は --guide で見られる」と案内している以上、フラグでも動かなければ不具合。
const cmd = args.includes('--guide') ? 'guide' : args.includes('--help') ? 'help' : args[0];
function opt(name, fallback) {
  const i = args.indexOf(name);
  if (i === -1) return fallback;
  const v = args[i + 1];
  return v !== undefined && !v.startsWith('--') ? v : true;
}
const yes = args.includes('--yes') || args.includes('-y');

function out(s = '') { process.stdout.write(s + '\n'); }
function die(msg, hint) {
  process.stderr.write(`\n${msg}\n${hint ? `→ ${hint}\n` : ''}`);
  process.exit(1);
}

// ---- help --------------------------------------------------------------
function help() {
  out(`cpos-kit ${pkg.version} — CPOS の上でアプリを作るための道具

  create <dir>     新しいアプリを作る (名前・appId・見本の有無を聞く)
  adopt            既存プロジェクトに後から入れる (足すだけ。既にあるファイルは触らない)
                   adopt = 何を足すかの一覧 / --apply = 足す / --print = 標準ブロックの本文 / --show <パス> = kit が書く中身 (自前の同名ファイルと見比べる)
                   --apply --replace <パス> = 見比べた上でそのファイルだけ kit のもので置き換える (同名の自前スキルが kit のを隠すとき・kit のスキルを上げるとき)
  fake             KIT 模擬サーバを起動する (http://127.0.0.1:4300)
  validate [path]  cpos.manifest.json を検証する
  guide [--commands]  次に何をすればいいかを 1 画面で出す。--commands は打つコマンドの一覧だけ
  token [path]     本物の CPOS につなぐための App Token の取り方 (manifest から必要なスコープを読む)
  connect          ステージングの URL とトークンを聞いて .env に書く (書く前に疎通とスコープを確かめる)。--url <URL> --token-file <パス> は端末でないとき用
  scopes [語]      CPOS が知る全スコープと、それを要求する API。--used でこのアプリのソースから必要なスコープを出し manifest と照合
  update [--check] kit が置いたファイル (AGENTS.md の標準ブロック、skills、Stop hook、ci.yml) と @cpos/kit の依存を今の版にし、npm install → npm test → 1 コミット。
                   版が上がったら docs/cpos/UPGRADE.md (CHANGELOG の差分) を書き、「最新の CPOS に合わせて実装を直しますか？」と聞いて AI (claude / codex) に頼む。
                   画面のガイドラインが変わったときは、それとは別に「この画面を基礎 UI に合わせますか？」と聞く (断ってよい。入れていない人には聞かない)。
                   始める前に git がきれいなこと (--allow-dirty で省く)。--check は差分を見るだけ、--no-install / --no-test / --no-ai
  remove [--apply] kit が置いたもの (標準ブロック、作業規律、画面のガイドライン、skills、Stop hook、ci.yml) を取り除く。既定は一覧だけ。コードと @cpos/kit には触らない
  ui [--open]      画面の作り方 (見本の場所・スタイル・ロゴ・色・よく落とす所)。--open で見本をブラウザに
  docs [--port N]  CPOS の API を見やすい画面 (Redoc) でブラウザに出す。kit が持つ OpenAPI の写し (ログイン不要)
  doctor           kit が持つ CPOS API の版と、接続先 CPOS の版を比べる (増えた / 消えた / 変わった operation)
  tickets          チケット台帳 (後から入れる。init を打つまで何も動かない)
                   tickets init [--apply] = docs/tickets/ と docs/TICKETS.md と CI の 1 行を足す
                   tickets new <タイトル> [--weight A|B|C] [--parent TK-###] = 起票 / tickets = 索引を作り直す / tickets --check = 検査 (CI 用)
  help             これ

  create の選択肢:
    --name <表示名>  --app-id <appId>  --sample none|node|fastify  --discipline yes|no  --kit-dep <package.json に書く依存>  --yes
    --sample fastify = Fastify + CPOS ログイン付き (公開できる形)。node = 依存ゼロの最小サーバ (ログイン無し、模擬サーバ専用)
    --discipline yes = AI の作業規律「止まる前に証拠」を AGENTS.md に 10 行 + Claude Code の Stop hook を入れる (既定)
    --design yes = 画面のガイドライン (kit/agents/design.md。推奨であって強制ではない) を AGENTS.md に入れ、見本の画面を共通 CSS (/cpos-ui.css) で組む (既定)
    --facility-in-header yes|no = 事業所の選択をヘッダで行う (既定 yes。no ならヘッダに事業所を出さない)
    --facility-pinned yes|no    = そのヘッダを上に貼り付ける (既定 no)。規約では決めない = アプリの判断

  connect の注意: トークンは引数で渡さない (シェルの履歴に残る)。--token-file で 1 行のファイルを指す`);
}

// ---- 作業規律「止まる前に証拠」 --------------------------------------------
// 正本は kit/agents/discipline.md (文、全ツール向け) と kit/agents/stop-judge.prompt.md (Claude Code の Stop hook 用審査文)。
// create / adopt が同じものを書く。押し付けない: --discipline no で入れない。
function disciplineText() { return readFileSync(resolve(kitRoot, 'kit', 'agents', 'discipline.md'), 'utf8'); }
// 画面の規約 (kit/agents/design.md)。標準ブロック・作業規律と同じく別マーカーで注入する。押し付けない: --design no で入れない
function designText() { return readFileSync(resolve(kitRoot, 'kit', 'agents', 'design.md'), 'utf8'); }
// ガイドラインの見出しから「揃えたい N の形」を読む (数字を人が書き写さない。ずれの元)
function designHeading() { return designText().match(/### (揃えたい [^\n(]*形)/)?.[1]?.trim() ?? '画面のガイドライン'; }
function disciplineSettings(extra = {}) {
  const prompt = readFileSync(resolve(kitRoot, 'kit', 'agents', 'stop-judge.prompt.md'), 'utf8').replace(/^<!--[\s\S]*?-->\n/, '');
  return JSON.stringify({
    $comment: 'cpos-kit が所有。Stop hook は「止まる前に証拠」の審査 (kit/agents/stop-judge.prompt.md)。外すなら hooks を消す',
    ...extra,
    hooks: { Stop: [{ hooks: [{ type: 'prompt', prompt, timeout: 45 }] }] }
  }, null, 2) + '\n';
}
async function askDesign() {
  return (await choose(`画面のガイドライン (${designHeading()} + 共通 CSS) を入れますか`, [
    { value: 'yes', label: 'AGENTS.md に規約、画面は /cpos-ui.css で規約どおりに' },
    { value: 'no', label: '入れない' }
  ], 'yes', '--design')) === 'yes';
}

// 画面まわりの質問。規約で全アプリに強制せず、アプリごとに選ぶもの。
// 「何を聞いていて、答えると何が変わるか」を先に言う (2026-09-28 所有者の指摘)
function designIntro() {
  out('\n― 画面の作りを 2 つだけ決めます ―');
  out('  規約 (AGENTS.md の「画面の規約」) で全アプリに決めてしまうと困るものだけを、ここで聞きます。');
  out('  答えは雛形の画面に反映され、あとから server.mjs で書き換えられます。');
}

async function askFacilityInHeader() {
  return (await choose('1/2 事業所の選択をヘッダ (画面の上) で行いますか', [
    { value: 'yes', label: 'ヘッダにいまの事業所名を出し、押すと一覧から切り替え (複数の事業所を行き来するアプリ向け)' },
    { value: 'no', label: 'ヘッダに事業所を出さない。最初の 1 つの事業所で動く (1 事業所だけ・事業所に関係ないアプリ向け)' }
  ], 'yes', '--facility-in-header')) === 'yes';
}

async function askFacilityPinned() {
  return (await choose('2/2 そのヘッダを画面の上に貼り付けますか (スクロールしても残る)', [
    { value: 'no', label: 'ふつうに流れる' },
    { value: 'yes', label: '長い一覧でも「どの事業所か」が常に見える。狭い画面では縦を 60px ほど使う' }
  ], 'no', '--facility-pinned')) === 'yes';
}

async function askDiscipline() {
  return (await choose('AI の作業規律「止まる前に証拠」を入れますか', [
    { value: 'yes', label: 'AGENTS.md に 10 行 + Claude Code の Stop hook' },
    { value: 'no', label: '入れない' }
  ], 'yes', '--discipline')) === 'yes';
}

// ---- create ------------------------------------------------------------
const APP_ID_RE = /^[a-z0-9][a-z0-9_-]{0,63}$/;

// 選択式の質問。端末なら ↑↓ + Enter で選ぶ (select.mjs)。引数 (flag) で答えを先に渡せる。
// --yes と端末でないとき (CI・AI が打つとき) は既定。raw mode が使えない端末と CPOS_KIT_PLAIN=1 は文字で答える
async function choose(question, choices, fallback, flag) {
  const values = choices.map((c) => c.value);
  const v = flag ? opt(flag) : undefined;
  if (v !== undefined) {
    if (!values.includes(v)) die(`${flag} は ${values.join(' か ')} です (いま ${v})`);
    return v;
  }
  if (yes || !process.stdin.isTTY) return fallback;
  if (typeof process.stdin.setRawMode !== 'function' || process.env.CPOS_KIT_PLAIN) {
    const text = `${question}\n${choices.map((c) => `    ${c.value} = ${c.label}`).join('\n')}\n  (${values.join(' / ')})`;
    return ask(text, fallback, (x) => (values.includes(x) ? null : values.join(' か ')));
  }
  out('');
  return select(question, choices, fallback);
}

async function ask(question, fallback, validate) {
  if (yes) return fallback;
  if (!process.stdin.isTTY) return fallback;
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  try {
    for (;;) {
      const a = (await rl.question(`${question}${fallback !== undefined ? ` [${fallback}]` : ''}: `)).trim() || fallback;
      const err = validate ? validate(a) : null;
      if (!err) return a;
      out(`  ${err}`);
    }
  } finally {
    rl.close();
  }
}

function render(text, vars) {
  return text.replace(/\{\{(\w+)\}\}/g, (m, k) => (k in vars ? vars[k] : m));
}

function walk(dir) {
  const files = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) files.push(...walk(p));
    else files.push(p);
  }
  return files;
}

function writeTree(srcDir, destDir, vars, written) {
  for (const src of walk(srcDir)) {
    // npm はパッケージの中の .gitignore を配布時に取り除く (.npmignore に改名される仕様)。
    // そのため雛形では `gitignore` という名前で持ち、書き出すときに `.gitignore` に戻す。
    // これが無いと、生成したプロジェクトに .gitignore が無く、トークンを書いた .env が
    // コミットされる (2026-09-13 に connect が警告して発覚)。
    const rel = relative(srcDir, src).replace(/(^|[/\\])gitignore$/, '$1.gitignore');
    const dest = join(destDir, rel);
    mkdirSync(dirname(dest), { recursive: true });
    writeFileSync(dest, render(readFileSync(src, 'utf8'), vars));
    written.push(rel);
  }
}

async function create() {
  const dirArg = args[1] && !args[1].startsWith('--') ? args[1] : null;
  if (!dirArg) die('作る場所を指定してください', '例: npx github:loogo-inc/cpos-kit create my-app');
  const dest = resolve(process.cwd(), dirArg);
  if (existsSync(dest) && readdirSync(dest).length > 0) die(`${dest} は空ではありません`, `別の名前にするか、前回の途中のものなら消してから: rm -rf ${dirArg}  (PowerShell: Remove-Item -Recurse ${dirArg})`);

  const defaultId = basename(dest).toLowerCase().replace(/[^a-z0-9_-]+/g, '-').replace(/^[^a-z0-9]+/, '').slice(0, 64) || 'my-app';
  const name = opt('--name') ?? (await ask('アプリの表示名 (例: 送迎メモ)', basename(dest)));
  const appId = opt('--app-id') ?? (await ask('appId = CPOS 上でこのアプリを指す ID (AppData の置き場と権限の名前になる。CPOS 登録時も同じ値。英小文字・数字・-・_。迷ったらこのまま)', defaultId, (v) => (APP_ID_RE.test(v) ? null : '英小文字で始め、英小文字・数字・-・_ で 64 字まで')));
  if (!APP_ID_RE.test(appId)) die(`appId "${appId}" の形式が違います`, '英小文字で始め、英小文字・数字・-・_ で 64 字まで');
  const sample = await choose('見本のコードを入れますか', [
    { value: 'fastify', label: 'Fastify + CPOS ログイン付き' },
    { value: 'node', label: '依存ゼロの最小サーバ' },
    { value: 'none', label: '入れない' }
  ], 'fastify', '--sample');
  const discipline = await askDiscipline();
  const design = await askDesign();
  let facilityInHeader = false, facilityPinned = false;
  if (design && sample !== 'none') {
    if (!yes && !opt('--facility-in-header') && !opt('--facility-pinned')) designIntro();
    facilityInHeader = await askFacilityInHeader();
    facilityPinned = facilityInHeader ? await askFacilityPinned() : false;
  }
  // 接続先。原則は模擬サーバ (架空データ)。ステージングは --connect staging か --url / --token-file を渡したとき、
  // または対話で選んだときだけで、そのとき注意を出す。ステージングが架空データに置き換わるまでの措置 (置き換わったら戻す)。
  // ここまでが質問。ファイルはこの後で書くので、途中で止めても何も残らない
  const APP = appId.toUpperCase().replace(/[^A-Z0-9]+/g, '_');
  let mode = opt('--connect') ?? ((opt('--url') || opt('--token-file')) ? 'staging' : null);
  if (mode && !['staging', 'mock'].includes(mode)) die('--connect は staging か mock');
  if (!mode) mode = yes ? 'mock' : await choose('接続先', [
    { value: 'mock', label: '模擬サーバで作る (原則。架空データ)' },
    { value: 'staging', label: 'ステージングにつなぐ (いまは本番の写し。担当者に頼まれた確認のときだけ)' }
  ], 'mock');
  let base = opt('--url') ?? null, token = null;
  if (mode === 'staging') {
    stagingWarning();
    const tf = opt('--token-file');
    if (tf) { try { token = readFileSync(tf.replace(/^~/, process.env.HOME ?? ''), 'utf8').trim(); } catch { die(`トークンのファイルが読めません: ${tf}`); } }
    if (!base) base = await ask('CPOS の URL (担当者から受け取ったステージングの URL。まだ無ければ空のまま Enter → 模擬サーバにする)', '', (v) => (!v || /^https?:\/\/[^\s]+$/.test(v) ? null : 'https:// で始まる URL を入れてください (無ければ空のまま Enter)'));
    if (base && !token) token = await ask('App Token (cpos_app_… / cpos_pat_…。画面には出ない。無ければ空のまま Enter → 模擬サーバにする)', '', (v) => (!v || /^cpos_(app|pat)_[A-Za-z0-9_-]+$/.test(v) ? null : 'cpos_app_ か cpos_pat_ で始まる値を入れてください (無ければ空のまま Enter)'));
    if (!base || !token) { mode = 'mock'; out('  URL かトークンが無いので、模擬サーバで作ります。受け取ったら: npx github:loogo-inc/cpos-kit connect'); }
  }
  // 依存は **git 参照だけ** (所有者方針 2026-09-13)。file: はコピーになり、中身がリポジトリと
  // 一致しているかを誰も確かめられない。git 参照ならコミットで固定できる。
  //
  // 既定は「この kit 自身がどこから来たか」から決める。決め打ちの GitHub URL にすると、
  // まだ push していない間は npm install が「repository does not exist」で落ちる (2026-09-13 に発生)。
  const kitDep = opt('--kit-dep') ?? defaultKitDep();
  if (/^file:/.test(kitDep)) die('--kit-dep に file: は使えません', `git 参照にしてください (github:loogo-inc/cpos-kit#semver:${kitRange()} か、手元なら git+file:///<kit の絶対パス>)`);

  const vars = {
    name,
    appId,
    appbarClass: facilityPinned ? ' cpos-pinned' : '',
    facilityInHeader: String(facilityInHeader),
    APP: appId.toUpperCase().replace(/[^A-Z0-9]+/g, '_'),
    kitDep,
    authNote: sample === 'fastify'
      ? '**この見本には CPOS のログイン (`fastifyLoginGate`) が付いている。** 見ている人が誰かを CPOS に聞き、その人が見てよい事業所しか出さない。外さないこと。'
      : '**先に読む:** 見本のサーバには利用者の認証がない。ステージングや本番の CPOS に向けたまま公開すると、URL を知る誰でも App Token 経由で利用者データを読める。公開する前にログイン (スキル `cpos` の §7、`--sample fastify` の見本と同じ `fastifyLoginGate` / `expressLoginGate`) を入れる。',
    kitVersion: pkg.version,
    firstSteps: sample === 'fastify'
      ? '1. `npm install` (依存は `fastify` と `@cpos/kit`)\n2. `npm run dev` → .env の接続先で起動する (原則は模擬サーバ = 架空データ。`npm run dev:mock` は常に模擬)。http://127.0.0.1:3000 を開く\n3. `npm test` が緑であることを確かめる (テストは模擬サーバ。本物に向けるなら `npm run test:staging`)\n4. 接続先を切り替える (ステージングは、いまは本番の写し。架空データに置き換わるまでは担当者に頼まれた確認のときだけ): `npx github:loogo-inc/cpos-kit connect` → `npm start` → ブラウザで本物の Google ログイン (OAuth) が一巡する'
      : sample === 'node'
      ? '1. `npm install` (依存は `@cpos/kit` だけ)\n2. `npm run dev` → .env の接続先で起動する (原則は模擬サーバ = 架空データ。`npm run dev:mock` は常に模擬)。http://127.0.0.1:3000 を開く\n3. `npm test` が緑であることを確かめる (テストは模擬サーバ。本物に向けるなら `npm run test:staging`)\n4. 接続先を切り替える (ステージングは、いまは本番の写し。架空データに置き換わるまでは担当者に頼まれた確認のときだけ): `npx github:loogo-inc/cpos-kit connect` (ステージング) / `.env` を模擬に戻すなら `npx github:loogo-inc/cpos-kit create` の mock と同じ 2 行'
      : '1. 見本コードは入っていない。好きな言語・構成で作る\n2. `npx github:loogo-inc/cpos-kit fake` でKIT 模擬サーバを起動し、http://127.0.0.1:4300 を呼ぶ (Bearer は cpos_app_ で始まれば通る)\n3. `cpos.manifest.json` を公開 URL の直下で配信する'
  };
  const written = [];
  mkdirSync(dest, { recursive: true });
  writeTree(resolve(kitRoot, 'kit', 'templates', 'base'), dest, vars, written);
  if (sample === 'node' || sample === 'fastify') writeTree(resolve(kitRoot, 'kit', 'templates', 'node'), dest, vars, written);
  if (sample === 'fastify') writeTree(resolve(kitRoot, 'kit', 'templates', 'fastify'), dest, vars, written);   // node の上に重ねる (scripts/ は共通)
  if (sample === 'none') {
    // 見本コードを入れなくても package.json は要る。
    // 無いと npm が親フォルダをたどって別のプロジェクト (ホームの package.json など) を掴み、
    // `npm install` が npm 自身のエラーで落ちる (2026-09-13 に所有者の環境で発生)。
    const pkg = {
      name: appId, version: '0.1.0', private: true, description: `${name} (CPOS アプリ)`,
      type: 'module', engines: { node: '>=22.9' },
      scripts: { test: 'node --test "test/**/*.test.mjs"', validate: 'cpos-kit validate' },
      dependencies: { '@cpos/kit': kitDep }
    };
    writeFileSync(join(dest, 'package.json'), JSON.stringify(pkg, null, 2) + '\n');
    written.push('package.json');
  }

  // AI ツールごとの「必ず読まれるファイル」を、1 つの標準ブロックから書き出す
  const block = render(readFileSync(resolve(kitRoot, 'kit', 'agents', 'standard-block.md'), 'utf8'), vars);
  const disc = discipline ? `\n${disciplineText()}` : '';
  const dsg = design ? `\n${designText()}` : '';
  const agentsMd = `# AGENTS.md — ${name}\n\n作業を始める前に \`docs/handoff/RESUME.md\` を読む。終わるときに書き直す。\n\n${block}${disc}${dsg}\n## このプロジェクトのルール\n\n\`docs/RULES.md\` を読む。ここには書かない (置き場を 1 つにする)。\n`;
  const files = {
    'AGENTS.md': agentsMd,
    'CLAUDE.md': '@AGENTS.md\n',
    '.cursor/rules/cpos.mdc': `---\ndescription: CPOS 連携の約束 (cpos-kit 標準ブロック)\nalwaysApply: true\n---\n\n${block}${disc}${dsg}`,
    '.github/copilot-instructions.md': `${block}${disc}${dsg}\n\n(このファイルは cpos-kit が AGENTS.md と同じ内容から生成する。手で直さない。)\n`
  };
  const skill = readFileSync(resolve(kitRoot, 'skills', 'cpos', 'SKILL.md'), 'utf8').replaceAll('<appId>', appId).replaceAll('<APP>', vars.APP);
  for (const dir of ['.claude/skills/cpos', '.agents/skills/cpos', '.github/skills/cpos']) files[`${dir}/SKILL.md`] = skill;
  files['.claude/settings.json'] = discipline ? disciplineSettings() : JSON.stringify({ $comment: 'cpos-kit が所有。作業規律を後から入れるなら: npx github:loogo-inc/cpos-kit adopt --apply' }, null, 2) + '\n';
  for (const [rel, text] of Object.entries(files)) {
    const p = join(dest, rel);
    mkdirSync(dirname(p), { recursive: true });
    writeFileSync(p, text);
    written.push(rel);
  }

  // 接続先の設定 (質問は上で済んでいる)。ステージングなら疎通を確かめて .env に書く。失敗してもアプリは残し、次の手を案内する
  const envPath = join(dest, '.env');
  if (mode === 'staging') {
    const m = JSON.parse(readFileSync(join(dest, 'cpos.manifest.json'), 'utf8'));
    try { await connectTo(dest, base, token, m, APP); }
    catch (e) {
      mode = 'unset';
      out(`\n接続できませんでした: ${e.message}`);
      out(`  アプリは作ってあります。URL とトークンを確かめて:  cd ${dirArg} && npx github:loogo-inc/cpos-kit connect   (模擬サーバで進めるなら npm run dev:mock)`);
    }
  } else {
    writeFileSync(envPath, `# 接続先: 模擬サーバ (手元だけ。架空データ)。ステージングに切り替えるには: npx github:loogo-inc/cpos-kit connect\n${APP}_CPOS_BASE_URL=http://127.0.0.1:4300\n${APP}_CPOS_APP_TOKEN=cpos_app_dev\nPORT=3000\n`, { mode: 0o600 });
    written.push('.env');
  }

  out(`\nできました: ${dest}  (${written.length} ファイル)`);
  out(`  表示名: ${name}   appId: ${appId}   見本: ${sample}   作業規律: ${discipline ? 'あり (AGENTS.md + Claude の Stop hook)' : 'なし'}   画面の規約: ${design ? `あり (AGENTS.md + /cpos-ui.css)` : 'なし'}   事業所: ${!design || sample === 'none' ? '—' : facilityInHeader ? (facilityPinned ? 'ヘッダで選ぶ (貼り付け)' : 'ヘッダで選ぶ') : 'ヘッダに出さない'}   @cpos/kit: ${kitDep}`);
  if (design && sample !== 'none') out(`  画面の 2 問は後から変えられます: server.mjs の const FACILITY_IN_HEADER (いま ${facilityInHeader}) と <header class="cpos-appbar${facilityPinned ? ' cpos-pinned' : ''}">。まとめて見るなら npx github:loogo-inc/cpos-kit ui`);
  out(`  接続先: ${mode === 'staging' ? 'ステージング (.env に書いた。本物の応答で作る)' : mode === 'mock' ? '模擬サーバ (手元だけ。架空データ。ステージングは後で connect)' : '未設定 (接続に失敗。connect で入れるか、npm run dev:mock)'}`);
  out('\n次:');
  out(`  cd ${dirArg}`);
  if (sample === 'node' || sample === 'fastify') {
    out('  npm install');
    if (mode === 'staging') {
      out('  npm run dev      # ステージングにつないで起動 → http://127.0.0.1:3000 (模擬サーバで動かすなら npm run dev:mock)');
      out('  npm test         # テストは模擬サーバ (オフラインで通る)。本物に向けるなら npm run test:staging');
    } else {
      out('  npm run dev      # 模擬サーバと一緒に起動 → http://127.0.0.1:3000 (localhost ではなく 127.0.0.1。cookie が合う方)');
      out('  npm test');
      out('  ステージングが架空データに置き換わり、URL とトークンを受け取ったら: npx github:loogo-inc/cpos-kit connect → npm run dev');
    }
  } else {
    out('  docs/PRODUCT.md に何を作るかを書く');
    out('  npx github:loogo-inc/cpos-kit fake   # KIT 模擬サーバを起動して、好きな言語で http://127.0.0.1:4300 を呼ぶ');
  }
  out('  AI ツールで開く。CPOS のことを頼むときは /cpos (Codex は $cpos)');
  out('  作業が複数セッションにまたがりそうなら: npx github:loogo-inc/cpos-kit tickets init   # 後から入れられるチケット台帳 (AI の物忘れと優先度の見失い対策)');
  guide(appId, name, { afterCreate: true });
}

// ---- ステージングの注意 ---------------------------------------------------
// ステージングが架空データに置き換わるまでの措置。ステージングにつなぐ入口 (create の staging・connect・token) で必ず出す。
// 置き換わったら、この関数と呼び出しを消し、create の既定をステージングに戻す (kit/test/connection-mode.test.mjs も同時に)。
function stagingWarning() {
  out('★ 注意: いまのステージングは本番の写しです (架空データに置き換わるまで、本番と同じ扱い)。');
  out('  作るのは模擬サーバで (npm run dev:mock)。ステージングにつなぐのは、CPOS の担当者に頼まれた確認のときだけ。');
  out('  そこで見えた利用者・職員の情報を、コード・テスト・ログ・AI への依頼文に写さない。');
}

// ---- token guide -------------------------------------------------------
// 本物の CPOS につなぐ手順。発行は CPOS の管理者が管理画面で行う (API 化は CPOS 側に要望中)。
async function tokenGuide(manifestPath, APP) {
  const { readManifest } = await import('../manifest.js');
  const r = readManifest(manifestPath);
  const m = r.manifest ?? {};
  const appId = m.appId ?? '<appId>';
  const app = APP ?? String(appId).toUpperCase().replace(/[^A-Z0-9]+/g, '_');
  const scopes = Array.isArray(m.apiTokenScopes) && m.apiTokenScopes.length ? m.apiTokenScopes : [`app-data:${appId}:read`, `app-data:${appId}:write`, `app-data:${appId}:delete`, 'facilities:read', 'master-users:read'];
  stagingWarning();
  out('');
  out('本物の CPOS につなぐとき (まずステージングで):');
  out('  1. アプリを https で公開し、<公開URL>/cpos.manifest.json が開けることを確かめる (トークン無しで配信できること)');
  out('  2. CPOS の admin か app-publisher の人に、次を頼む:');
  out('       a. 管理画面「アプリ」で、上の公開 URL を登録 (register-from-url)');
  out('       b. 管理画面「設定 → API トークン」(/app-tokens) で、appId "' + appId + '" の App Token を発行。スコープは:');
  for (const s of scopes) out('            - ' + s);
  out('       ステージングにつなぐなら、登録も発行もステージングの CPOS で頼む (本番で発行しても、ステージングの台帳には届かない)');
  out('       c. 事業所を限定するなら allowedFacilityIds も指定してもらう (manager が発行する場合は必須。manager はワイルドカード (* や resource:*) のトークンを発行できない。組織全体のトークンは admin だけ)');
  out('  3. 受け取ったトークン (cpos_app_…) を、ローカルは .env の ' + app + '_CPOS_APP_TOKEN に、本番は Secret Manager に入れる。');
  out('     コード・リポジトリ・ブラウザ・ログには置かない。');
  out('  4. ' + app + '_CPOS_BASE_URL をステージングの URL にして npm start。起動時に platform.me() で疎通と権限を確かめる。');
  out('  5. スコープ不足は 403 で「この API トークンにスコープ「x」がありません」と返る。manifest の apiTokenScopes に足し、');
  out('     2b で発行し直してもらい、3 のとおり .env / Secret Manager に入れ直す (発行しただけではアプリに届かない)。');
  out('     npm run verify:staging が通ってから、古いトークンを /app-tokens で失効してもらう (順番を逆にするとアプリが止まる)。');
  out('  6. 個人の権限で試すだけなら PAT (cpos_pat_…) でもよい。admin が「個人アクセストークン」で発行する。');
  out('');
  out('  あとで見るには: npx github:loogo-inc/cpos-kit token');
}

// ---- fake --------------------------------------------------------------
async function fake() {
  const { startFakeCpos } = await import('../fake/server.js');
  const port = Number(opt('--port', 4300));
  const seed = opt('--seed');
  const f = await startFakeCpos({ port, seed: typeof seed === 'string' ? resolve(process.cwd(), seed) : undefined, log: (l) => out(`  ${l}`) });
  out(`KIT 模擬サーバ: ${f.baseUrl}`);
  out(`  ログイン画面: ${f.baseUrl}/api/auth/login?next=/`);
  out(`  事業所 ${f.seed.facilities.length} / 利用者 ${f.seed.users.length} / アカウント ${f.seed.accounts.map((a) => a.name).join('、')}`);
  out('  App Token は cpos_app_ で始まれば何でも通る。止めるときは Ctrl+C');
  process.on('SIGINT', async () => { await f.close(); process.exit(0); });
}

// ---- validate ----------------------------------------------------------
async function validate() {
  const { readManifest } = await import('../manifest.js');
  const p = resolve(process.cwd(), args[1] && !args[1].startsWith('--') ? args[1] : 'cpos.manifest.json');
  const r = readManifest(p);
  if (!r.ok) {
    out(`✗ ${relative(process.cwd(), p)}`);
    for (const e of r.errors) out(`  - ${e}`);
    process.exit(1);
  }
  out(`✓ ${relative(process.cwd(), p)}  appId=${r.manifest.appId}  name=${r.manifest.name}`);
  for (const w of r.warnings) out(`  注意: ${w}`);
  for (const res of r.manifest.resources ?? []) if (res.name === 'notes' && /見本/.test(res.description ?? '')) out('  注意: 見本の resource "notes" が残っています。使わないなら manifest と server.mjs から消してください (不要な app-data スコープを持たないため)');
  // 写しの検知: AppData の resource 名が、CPOS にアプリから呼べる機能 (生成 client の group) と同じなら警告
  try {
    const { loadApi } = await import('../client.js');
    const groups = new Map(); for (const op of loadApi().operations) if (op.ns === 'app') groups.set(op.group.toLowerCase(), (groups.get(op.group.toLowerCase()) ?? 0) + 1);
    for (const res of r.manifest.resources ?? []) {
      const k = String(res.name).toLowerCase().replace(/-/g, ''); const k1 = k.replace(/s$/, '');
      const hit = [...groups.keys()].find((g) => g === k || g === k1);
      if (hit) out(`  注意: resource "${res.name}" は CPOS にアプリから呼べる機能 (cpos.app.${hit}: ${groups.get(hit)} 本) と同じ名前です。CPOS のデータの写しを AppData に作っていませんか`);
    }
  } catch {}
}


// この kit 自身の出どころから、生成するアプリが書く依存を決める。
//   1. kit に git の remote (origin) があれば それ  → github:owner/repo#semver:^<この kit の版> (0.x の間は ^0.<minor>。minor が上がると別系統)
//   2. 無ければ 手元のリポジトリを git 参照で        → git+file:///<kitRoot>
// どちらも「コミット済みの状態しか入らない」ので、配ったものと手元がずれない。
// この kit の版に合う範囲。^0.1 と固定すると 0.2.0 を出しても新しいアプリに 0.1 系が入る
function kitRange() {
  const [maj, min] = String(pkg.version).split('.');
  return maj === '0' ? `^0.${min}` : `^${maj}`;
}

function defaultKitDep() {
  // package.json の repository から決める。npx 経由だと kitRoot は npm のキャッシュ
  // (~/.npm/_npx/…) になり git リポジトリではないので、git remote では取れない。
  // package.json はインストールについて回るので、こちらが確実。
  try {
    const url = String(JSON.parse(readFileSync(resolve(kitRoot, 'package.json'), 'utf8')).repository?.url ?? '');
    const m = url.match(/github\.com[:/]([^/]+)\/(.+?)(?:\.git)?$/);
    if (m) return `github:${m[1]}/${m[2]}#semver:${kitRange()}`;
  } catch { /* 無ければ下へ */ }
  // それも無ければ手元のリポジトリ。ただし npm のキャッシュを指してはいけない (すぐ消える)
  if (/[/\\](_npx|\.npm)[/\\]/.test(kitRoot)) {
    die('@cpos/kit の出どころが分かりません', 'npx から実行したときは --kit-dep を渡してください (例: --kit-dep "git+file:///<cpos-kit の絶対パス>")');
  }
  return `git+file://${kitRoot}`;
}

// ---- connect -------------------------------------------------------------
// ステージング (や本番) の URL とトークンを受け取り、.env に書く。
//   npx github:loogo-inc/cpos-kit connect
// 値は端末に出さない。.env は 600 で作り、.gitignore に入っていることを確かめる。
async function connect() {
  const cwd = process.cwd();
  const mfPath = resolve(cwd, 'cpos.manifest.json');
  if (!existsSync(mfPath)) die('cpos.manifest.json がありません', 'cpos-kit create か adopt で作ったフォルダの中で実行してください');
  const m = JSON.parse(readFileSync(mfPath, 'utf8'));
  const APP = String(m.appId).toUpperCase().replace(/[^A-Z0-9]+/g, '_');
  stagingWarning();
  out('');

  // 端末なら聞く。端末でなければ --url と --token-file で受ける。
  // トークンをコマンドラインの引数では受けない (シェルの履歴と ps に残るため)。
  const tokenFile = opt('--token-file');
  let base, token;
  if (tokenFile) {
    base = opt('--url') ?? die('--token-file を使うときは --url も渡してください');
    try { token = readFileSync(tokenFile.replace(/^~/, process.env.HOME ?? ''), 'utf8').trim(); }
    catch { die(`トークンのファイルが読めません: ${tokenFile}`); }
  } else if (!process.stdin.isTTY) {
    out('端末から実行するか、--url と --token-file を渡してください。');
    out('  npx github:loogo-inc/cpos-kit connect --url https://<CPOS の URL> --token-file ~/cpos-token.txt');
    out('手で書くなら .env に:');
    out(`  ${APP}_CPOS_BASE_URL=https://<ステージングの URL>`);
    out(`  ${APP}_CPOS_APP_TOKEN=cpos_app_…   (または cpos_pat_…)`);
    return;
  } else {
    out('ステージング (または本番) の CPOS につなぎます。値は画面に出しません。');
    out('トークンの取り方が分からなければ、別の端末で: npx github:loogo-inc/cpos-kit token');
    out('');
    // 既定値は置かない。環境ごとに違うし、配布物に特定の環境の URL を焼き付けない
    base = await ask('CPOS の URL (担当者から受け取ったもの)', undefined,
      (v) => (/^https:\/\/[^\s]+$/.test(v ?? '') ? null : 'https:// で始まる URL を入れてください'));
    token = await ask('App Token (cpos_app_… / cpos_pat_…)', undefined,
      (v) => (/^cpos_(app|pat)_[A-Za-z0-9_-]+$/.test(v ?? '') ? null : 'cpos_app_ か cpos_pat_ で始まる値を入れてください'));
  }
  if (!/^cpos_(app|pat)_[A-Za-z0-9_-]+$/.test(token ?? '')) die('トークンの形が違います (cpos_app_… か cpos_pat_…)');
  try { await connectTo(cwd, base, token, m, APP); } catch (e) { die(e.message, e.hint); }
}

// URL とトークンを確かめて .env に書く (connect と create が共用)。値は端末に出さない
async function connectTo(cwd, base, token, m, APP) {
  const fail = (msg, hint) => { throw Object.assign(new Error(msg), { hint }); };
  // 書く前に確かめる。間違った値を .env に残さない
  out('\n確かめています…');
  let me;
  try {
    const r = await fetch(`${base.replace(/\/+$/, '')}/api/platform/me`, { headers: { Authorization: `Bearer ${token}` } });
    if (r.status === 401) fail('トークンが受け付けられませんでした (401)', '値を確かめるか、CPOS の管理者に再発行を頼んでください');
    if (!r.ok) fail(`CPOS が ${r.status} を返しました`, 'URL が正しいか確かめてください');
    me = await r.json();
  } catch (e) {
    fail(`CPOS に届きませんでした: ${e.message}`, 'URL とネットワークを確かめてください');
  }
  const scopes = me?.token?.scopes ?? [];
  out(`  つながりました。スコープ ${scopes.length} 個`);

  // manifest が要求しているのに、トークンに無いものを教える
  const want = Array.isArray(m.apiTokenScopes) ? m.apiTokenScopes : [];
  const has = (sc) => scopes.includes(sc) || scopes.includes('*') || scopes.some((x) => x.endsWith(':*') && sc.startsWith(x.slice(0, -1)));
  const missing = want.filter((sc) => !has(sc));
  if (missing.length) {
    out(`  ★ manifest が要求しているのにトークンに無いスコープ ${missing.length} 個:`);
    for (const sc of missing) out(`      ${sc}`);
    out('    → CPOS 管理画面「設定 → API トークン」で付与してもらってください (403 になります)');
  } else if (want.length) {
    out('  manifest の要求スコープはすべて揃っています');
  }
  // AppData のスコープが別の appId のものしか無い (登録前にステージングで試すときの典型) → 読み書き先だけ切り替える
  const appDataMissing = missing.filter((sc) => sc.startsWith(`app-data:${m.appId}:`));
  const otherAppIds = [...new Set(scopes.map((sc) => sc.match(/^app-data:([^:*]+):/)?.[1]).filter((x) => x && x !== m.appId))];
  let appDataAppId = null;
  if (appDataMissing.length && otherAppIds.length === 1) {
    appDataAppId = otherAppIds[0];
    out(`  ★ AppData のスコープは appId "${appDataAppId}" のものだけです → ${APP}_APPDATA_APP_ID=${appDataAppId} を .env に書きます`);
    out('    (本登録して自分の appId のトークンを受け取ったら、この行を消してください)');
  } else if (appDataMissing.length && otherAppIds.length > 1) {
    out(`  AppData のスコープは別の appId (${otherAppIds.join(', ')}) のものです。使うなら .env に ${APP}_APPDATA_APP_ID=<どれか> を書いてください`);
  }

  const envPath = resolve(cwd, '.env');
  const lines = existsSync(envPath) ? readFileSync(envPath, 'utf8').split('\n') : [];
  const put = (k, v) => {
    const i = lines.findIndex((l) => l.startsWith(`${k}=`));
    if (i >= 0) lines[i] = `${k}=${v}`; else lines.push(`${k}=${v}`);
  };
  put(`${APP}_CPOS_BASE_URL`, base);
  put(`${APP}_CPOS_APP_TOKEN`, token);
  if (appDataAppId) put(`${APP}_APPDATA_APP_ID`, appDataAppId);
  if (!lines.some((l) => l.startsWith(`${APP}_SESSION_SECRET=`))) {
    // ログイン付きの見本は本物に向けるとき秘密が要る。ここで作っておく (16 バイト以上)
    const { randomBytes } = await import('node:crypto');
    put(`${APP}_SESSION_SECRET`, randomBytes(32).toString('base64url'));
    out(`  ${APP}_SESSION_SECRET も作りました (ログイン後のセッション cookie を封じる秘密)`);
  }
  writeFileSync(envPath, lines.filter((l, i) => l !== '' || i < lines.length - 1).join('\n').replace(/\n*$/, '\n'), { mode: 0o600 });
  out(`\n.env に書きました (${APP}_CPOS_BASE_URL と ${APP}_CPOS_APP_TOKEN)`);

  const gi = resolve(cwd, '.gitignore');
  const ignored = existsSync(gi) && /^\.env$/m.test(readFileSync(gi, 'utf8'));
  out(ignored ? '.gitignore に .env が入っています (git に入りません)'
              : '★ .gitignore に .env がありません。足してください (トークンがコミットされます)');
  out('\n次: npm run verify:staging   (読み取りの件数と、AppData の 作る→取る→消す。書いたものは消す)');
  out('    npm start              (起動時に platform.me() で疎通を確かめる。ログイン付きの見本なら、ブラウザで本物のログインが一巡する)');
}

// ---- guide ---------------------------------------------------------------
// 「次に何をすればいいか」を 1 画面で出す。create の最後にも同じものを出す。
function guide(appId, name, { afterCreate = false } = {}) {
  const APP = appId.toUpperCase().replace(/[^A-Z0-9]+/g, '_');
  const L = [];
  if (afterCreate) L.push('');
  L.push(`— ${name} (appId ${appId}) ——————————————————`);
  L.push('');
  L.push('打つコマンドはこれだけ (上から順に使う)');
  L.push('');
  L.push('  npm run dev            動かす (接続先は .env)          npm run dev:mock  模擬サーバで動かす');
  L.push('  npm test               テスト (緑にしてから「できた」)  npm start         本番と同じ起動');
  L.push('  npx github:loogo-inc/cpos-kit ui              画面の作り方 (見本・スタイル・ロゴ・色)。--open で見本をブラウザに');
  L.push('  npx github:loogo-inc/cpos-kit scopes --used    使う API から必要なスコープを出す');
  L.push('  npx github:loogo-inc/cpos-kit validate         cpos.manifest.json を確かめる');
  L.push('  npx github:loogo-inc/cpos-kit connect          ステージング (本物) につなぐ (いまは担当者に頼まれた確認のときだけ。【4】)');
  L.push('  npm run verify:staging                         本物で読み書きを確かめる');
  L.push('  npx github:loogo-inc/cpos-kit update           kit を新しい版に上げる');
  L.push('  npx github:loogo-inc/cpos-kit guide            この画面をもう一度');
  L.push('');
  L.push('  (npx が使えない環境では npm run guide / npm run validate / npm run connect)');
  if (args.includes('--commands')) { out(L.join('\n')); return; }
  L.push('');
  L.push('—— それぞれの詳しい話 ——————————————————');
  L.push('');
  L.push('【1】動かす (接続先は .env。原則は模擬サーバ = 架空データで作る。npm run dev:mock は常に模擬。ステージングは【4】)');
  L.push('    npm install && npm run dev        KIT 模擬サーバと一緒に起動');
  L.push('    npm test                          緑にしてから「できた」と言う');
  L.push('');
  L.push('【2】欲しい API を探す (推測でパスを叩かない)');
  L.push('    CPOS の API は全部 client のメソッド: cpos.app.<機能>.<操作>()  例) cpos.app.transport.getPlans({ facilityId })');
  L.push('    一覧と引数は node_modules/@cpos/kit/kit/api.d.ts (エディタの補完、または grep)。戻り値は生の JSON。項目名を推測しない');
  L.push('');
  L.push('【3】使う API が決まったら manifest に書く  ★忘れると本物で 403 になる');
  L.push('    npx github:loogo-inc/cpos-kit scopes --used        ソースが使うメソッドから必要なスコープを出し、manifest に足りないものを示す');
  L.push('    npx github:loogo-inc/cpos-kit scopes 送迎          語からスコープと API を引く (スコープの全一覧は引数なし)');
  L.push('    resources には保存する入れ物の名前 (英小文字・数字・ハイフンのみ)');
  L.push('    npx github:loogo-inc/cpos-kit validate             形を確かめる');
  L.push('    → KIT 模擬サーバは manifest のスコープで検査する。宣言漏れはここで 403 になる');
  L.push('');
  L.push('【4】本物 (ステージング) につなぐ  ★登録とトークン発行は人の作業');
  L.push('    ★ いまのステージングは本番の写し。架空データに置き換わるまでは、CPOS の担当者に頼まれた確認のときだけつなぐ');
  L.push('      (そこで見えた利用者・職員の情報を、コード・テスト・ログ・AI への依頼文に写さない)');
  L.push('    a. アプリを https で公開し、<公開URL>/cpos.manifest.json が開けるようにする');
  L.push('    b. CPOS 管理画面「アプリ管理」→ 上段「URL から登録」にその URL を入れる');
  L.push('       (公開前なら下段「新規アプリ登録 (下書き)」で手入力)');
  L.push('    c. 「設定 → API トークン」で App Token を発行');
  L.push('       スコープは manifest の apiTokenScopes が既定で選択される');
  L.push('    d. npx github:loogo-inc/cpos-kit connect        受け取った URL とトークンを .env に書き、疎通とスコープを確かめる');
  L.push('       (手で書くなら .env に ' + APP + '_CPOS_BASE_URL と ' + APP + '_CPOS_APP_TOKEN。リポジトリ・ブラウザ・ログには置かない)');
  L.push('       トークンの AppData スコープが別の appId (app-data:vns:* 等) しか無いなら、connect が');
  L.push('       ' + APP + '_APPDATA_APP_ID を案内する (本登録までの暫定。読み書き先の appId だけ切り替わる)');
  L.push('    e. npm run verify:staging      読み取りの件数と、AppData の 作る→取る→消す を確かめる (書いたものは消す)');
  L.push('    f. npm start → 起動時に platform.me() が通れば疎通 OK');
  L.push('');
  L.push('    ※ 登録しないと API が動かない、ではない。通るかはトークンのスコープが決める。');
  L.push('      登録はそのスコープを持つトークンを発行してもらうための入口 (＋ランチャー掲載)。');
  L.push('');
  L.push('【4.5】見た目を自分のものにする (任意)');
  L.push('    ロゴ: フォルダ直下に logo.svg を置くとヘッダのアプリ名の隣に出る (置かなければ名前だけ。左のメニューには重ねて出さない)');
  L.push('    色: public/theme.css を作り <link> を cpos-ui.css の後ろに足して、--cpos-color-primary などの変数だけ上書きする');
  L.push('    事業所: server.mjs の const FACILITY_IN_HEADER (true = ヘッダで選ぶ / false = 出さない。create の質問の答え)');
  L.push('    上に固定: <header class="cpos-appbar cpos-pinned"> にする (既定は固定しない。長い一覧で範囲を見失うときだけ)');
  L.push('    画面の決まりは AGENTS.md の「画面の規約」。見本は node_modules/@cpos/kit/kit/ui/examples/ (ブラウザでそのまま開ける)');
  L.push('    まとめて見る: npx github:loogo-inc/cpos-kit ui   (--open で見本をブラウザに)');
  L.push('');
  L.push('【5】画面に利用者のログインを付ける (公開するなら必須)');
  L.push('    --sample fastify の見本には最初から付いている (fastifyLoginGate)。node の見本には無い。');
  L.push('    方式は 3 つ。auto は置き場所で自動で選ぶ (cookie か oauth):');
  L.push('      cookie = ゲートウェイ方式 (cpos_session を転送)。アプリが CPOS と同じドメイン (<app>.<CPOS のドメイン>) にあるとき');
  L.push('      oauth  = OAuth 2.1 (CPOS が Google ログイン → 同意 → 戻る)。手元の 127.0.0.1 や別ドメインでも一巡する');
  L.push('      token  = CPOS が発行したトークン (PAT / App Token) を /login に貼る。Google を通らないので AI や CI が一巡を検証できる');
  L.push('    import { fastifyLoginGate, expressLoginGate, createLoginGate } from \'@cpos/kit/app-kit\';  → スキル §7');
  L.push('    .env に ' + APP + '_SESSION_SECRET (16 バイト以上)。公開したら ' + APP + '_APP_URL に公開 URL。');
  L.push('    手元でステージングにつないだままブラウザで開けば、本物の Google ログインが一巡する (oauth)。');
  L.push('    Google を通さず検証するなら ' + APP + '_LOGIN_MODE=token で起動し、/login にトークンを貼る (ステージングの Google ログインは');
  L.push('    その CPOS に登録された Google アカウントしか通らない。実験 14 で所有者が「アクセス権がありません」に当たった)。');
  L.push('');
  L.push('【6】npx が使えない環境 (AI のサンドボックス等) では npm run に畳んである:');
  L.push('    npx github:loogo-inc/cpos-kit guide   npx github:loogo-inc/cpos-kit validate   npx github:loogo-inc/cpos-kit connect');
  L.push('');
  L.push('【7】kit を上げる: npm update @cpos/kit && npx github:loogo-inc/cpos-kit update   (AGENTS.md の標準ブロック・skills・Stop hook・ci.yml を今の版に。--check で差分だけ)');
  L.push('');
  L.push('  もう一度見る: npx github:loogo-inc/cpos-kit guide      トークンの取り方だけ: npx github:loogo-inc/cpos-kit token');
  L.push('  詰まったら docs/cpos/asks.md に書いて先に進む');
  out(L.join('\n'));
}

// ---- adopt ---------------------------------------------------------------
// 既存プロジェクトに後から入れる。**足すだけ。上書きしない。**
//   npx github:loogo-inc/cpos-kit adopt            何を足すかを一覧で出す (何も書かない)
//   npx github:loogo-inc/cpos-kit adopt --print    AI 向けの標準ブロックだけを出す (自分の AGENTS.md に貼る)
//   npx github:loogo-inc/cpos-kit adopt --apply    一覧どおりに足す (既にあるファイルは触らない)
//   npx github:loogo-inc/cpos-kit adopt --show <パス>  kit がそのパスに書く中身を出す (自前の同名ファイルと見比べる)
//   npx github:loogo-inc/cpos-kit adopt --apply --replace <パス> [--replace <パス>]  見比べた上で、そのファイルだけ kit のもので置き換える
//     (自前の .claude/skills/cpos/SKILL.md が kit のスキルを隠しているとき。kit のスキルを新しい版に上げるときも同じ)
async function adopt() {
  const cwd = process.cwd();
  const mf = resolve(cwd, 'cpos.manifest.json');
  let appId = opt('--app-id'), name = opt('--name');
  if ((!appId || !name) && existsSync(mf)) {
    try { const m = JSON.parse(readFileSync(mf, 'utf8')); appId ??= m.appId; name ??= m.name; } catch {}
  }
  appId ??= basename(cwd).toLowerCase().replace(/[^a-z0-9_-]+/g, '-');
  name ??= basename(cwd);
  const vars = { appId, name, APP: appId.toUpperCase().replace(/[^A-Z0-9]+/g, '_'), kitDep: '', firstSteps: '' };
  const block = render(readFileSync(resolve(kitRoot, 'kit', 'agents', 'standard-block.md'), 'utf8'), vars);

  if (args.includes('--print')) { out(block); return; }
  // --show <パス>: kit がそのパスに書く中身をそのまま出す (自前のファイルと見比べるため)

  // 足す候補。既にあるものは触らない
  // create / update と同じく <appId> <APP> を埋める。埋めないと adopt 直後の update --check が赤になる (2026-09-14)
  const skill = readFileSync(resolve(kitRoot, 'skills', 'cpos', 'SKILL.md'), 'utf8').replaceAll('<appId>', appId).replaceAll('<APP>', vars.APP);
  const adds = [
    ['cpos.manifest.json', render(readFileSync(resolve(kitRoot, 'kit', 'templates', 'base', 'cpos.manifest.json'), 'utf8'), vars)],
    ['docs/cpos/README.md', readFileSync(resolve(kitRoot, 'kit', 'templates', 'base', 'docs', 'cpos', 'README.md'), 'utf8')],
    ['docs/cpos/asks.md', readFileSync(resolve(kitRoot, 'kit', 'templates', 'base', 'docs', 'cpos', 'asks.md'), 'utf8')],
    ['.claude/skills/cpos/SKILL.md', skill],
    ['.agents/skills/cpos/SKILL.md', skill],
    ['.github/skills/cpos/SKILL.md', skill]
  ];
  const discipline = opt('--discipline', 'yes') !== 'no';
  // Cursor を使っているプロジェクト (.cursor/ がある) には create と同じ rules も足す (中身も create と同じ = 標準ブロック + 作業規律)
  if (existsSync(resolve(cwd, '.cursor'))) adds.push(['.cursor/rules/cpos.mdc', `---\ndescription: CPOS 連携の約束 (cpos-kit 標準ブロック)\nalwaysApply: true\n---\n\n${block}${discipline ? `\n${disciplineText()}` : ''}`]);
  if (discipline) adds.push(['.claude/settings.json', disciplineSettings()]);
  // 書き先が symlink 経由でプロジェクトの外 (共有スキル置き場など) に抜けるなら書かない。
  // adopt はこのプロジェクトに足す道具であって、共有物を書き換える道具ではない (2026-09-14 の想定 C で発覚)
  const root = realpathSync(cwd);
  const outside = (f) => {
    let p = resolve(cwd, f);
    while (!existsSync(p)) p = dirname(p);
    const real = realpathSync(p);
    return !(real === root || real.startsWith(root + sep)) ? real : null;
  };
  const show = opt('--show');
  if (show) { const hit = adds.find(([f]) => f === show); if (!hit) die(`--show に渡せるのは: ${adds.map(([f]) => f).join(', ')}`); out(hit[1].replace(/\n$/, '')); return; }
  const marker = { begin: '<!-- cpos-kit:begin', end: 'cpos-kit:end -->' };
  const dmark = '<!-- cpos-kit:discipline:begin';
  const appendTo = [
    ['AGENTS.md', block, `# AGENTS.md — ${name}\n\n`],
    ['.github/copilot-instructions.md', block, '']
  ];
  // 作業規律は標準ブロックとは別のマーカーで足す (標準ブロックが既にあるファイルにも足せる)
  const disciplineTo = discipline ? [['AGENTS.md', disciplineText()], ['.github/copilot-instructions.md', disciplineText()]] : [];
  // 画面の規約も別マーカー (既に標準ブロック・作業規律があるファイルにも足せる)
  const design = opt('--design', 'yes') !== 'no';
  const gmark = '<!-- cpos-kit:design:begin';
  const designTo = design ? [['AGENTS.md', designText()], ['.github/copilot-instructions.md', designText()]] : [];

  // --replace <パス>: 既にあるファイルを kit のもので置き換える (人が --show で見比べて決めたときだけ。複数可)
  const replace = args.flatMap((a, i) => (a === '--replace' && args[i + 1] && !args[i + 1].startsWith('--') ? [args[i + 1].replace(/\\/g, '/')] : []));
  for (const f of replace) {
    if (!adds.some(([g]) => g === f)) die(`--replace に渡せるのは: ${adds.map(([g]) => g).join(', ')}`);
    if (!existsSync(resolve(cwd, f))) die(`${f} はまだ無いので --replace は要らない (--apply で足される)`);
  }
  const escapes = adds.filter(([f]) => (!existsSync(resolve(cwd, f)) || replace.includes(f)) && outside(f)).map(([f]) => [f, outside(f)]);
  const willAdd = adds.filter(([f]) => (!existsSync(resolve(cwd, f)) || replace.includes(f)) && !outside(f));
  // 既にあるものは触らない。ただし中身が kit のものと違うなら言う (自前の .claude/skills/cpos/SKILL.md や docs/cpos/README.md が
  // 偶然同じ名前で置いてあると、AI はそれを kit のスキルだと思って読む。2026-09-14 の適用検証で発生)
  const differs = (f, body) => f !== '.claude/settings.json' && readFileSync(resolve(cwd, f), 'utf8') !== body;
  const exists = adds.filter(([f]) => existsSync(resolve(cwd, f)) && !replace.includes(f)).map(([f, body]) => (differs(f, body) ? `${f}  (! kit のものと中身が違う。見比べる: npx github:loogo-inc/cpos-kit adopt --show ${f} / kit のに替える: --apply --replace ${f})` : f));
  const claudeMd = resolve(cwd, 'CLAUDE.md');
  // CLAUDE.md と AGENTS.md が symlink で同じファイルなら @AGENTS.md は足さない (自分自身を指す 1 行になる。想定 A で発覚)
  const sameFile = (a, b) => { try { return realpathSync(a) === realpathSync(b); } catch { return false; } };
  const claudeIsAgents = existsSync(claudeMd) && sameFile(claudeMd, resolve(cwd, 'AGENTS.md'));
  const claudeNeedsLine = existsSync(claudeMd) && !claudeIsAgents && !/^@AGENTS\.md\s*$/m.test(readFileSync(claudeMd, 'utf8'));
  // 旧式のスラッシュコマンド .claude/commands/cpos.md があると /cpos の名前が被る
  const cmdClash = existsSync(resolve(cwd, '.claude/commands/cpos.md'));
  // ルートに SKILLS.md (スキルの索引を手で持つ運用) があって cpos の行が無いなら知らせる。形は人それぞれなので書かない
  const skillsIndex = existsSync(resolve(cwd, 'SKILLS.md')) && !/\bcpos\b/.test(readFileSync(resolve(cwd, 'SKILLS.md'), 'utf8'));
  const willAppend = appendTo.filter(([f]) => !(existsSync(resolve(cwd, f)) && readFileSync(resolve(cwd, f), 'utf8').includes(marker.begin)));
  const already = appendTo.filter(([f]) => existsSync(resolve(cwd, f)) && readFileSync(resolve(cwd, f), 'utf8').includes(marker.begin)).map(([f]) => f);
  const willDisc = disciplineTo.filter(([f]) => !(existsSync(resolve(cwd, f)) && readFileSync(resolve(cwd, f), 'utf8').includes(dmark)));
  const willDesign = designTo.filter(([f]) => !(existsSync(resolve(cwd, f)) && readFileSync(resolve(cwd, f), 'utf8').includes(gmark)));
  const settingsHas = existsSync(resolve(cwd, '.claude/settings.json')) && !readFileSync(resolve(cwd, '.claude/settings.json'), 'utf8').includes('stop-judge');

  out('足すファイル (既にあるものは触りません):');
  for (const [f] of willAdd) out(`  + ${f}${replace.includes(f) ? '  (--replace: 既にあるものを kit のもので置き換える)' : ''}`);
  if (!willAdd.length) out('  (無し)');
  for (const [f, real] of escapes) out(`  ! ${f} は symlink でプロジェクトの外 (${real}) を指すので書きません。共有物を kit のに替えるなら手で`);
  if (cmdClash) out('  ! .claude/commands/cpos.md (旧式のスラッシュコマンド) があり、スキル cpos と /cpos の名前が被る。片方を消すか改名する');
  if (skillsIndex) out('  ! SKILLS.md (スキルの索引) に cpos の行が無い。索引は kit が書かないので、足したスキル cpos の行を手で足す');
  out('\nマーカーの間に追記するもの:');
  for (const [f] of willAppend) out(`  + ${f}  ${existsSync(resolve(cwd, f)) ? '(末尾に足す。既存の内容は残す)' : '(新規)'}`);
  if (!willAppend.length) out('  (無し)');
  if (discipline) {
    out('\n作業規律「止まる前に証拠」(--discipline no で入れない):');
    for (const [f] of willDisc) out(`  + ${f}  (節を末尾に足す)`);
    if (settingsHas) out('  ! .claude/settings.json は既にあるので触りません。Stop hook を入れるには kit/agents/stop-judge.prompt.md を hooks.Stop に type: prompt で足す');
  }
  if (design) {
    out(`\n画面のガイドライン「${designHeading()}」(推奨。--design no で入れない):`);
    for (const [f] of willDesign) out(`  + ${f}  (節を末尾に足す)`);
    if (!willDesign.length) out('  (無し)');
    out('  スタイルは配らない (このプロジェクトの作りに合わせて `@cpos/kit/ui/cpos-ui.css` を配信するか、規約どおりに自分で書く)');
  }
  if (exists.length || already.length) {
    out('\n既にあるので触らないもの:');
    for (const f of [...exists, ...already]) out(`  - ${f}`);
  }
  out('\nCLAUDE.md: ' + (!existsSync(claudeMd) ? '@AGENTS.md の 1 行で作ります' : claudeIsAgents ? 'AGENTS.md と同じファイル (symlink) なので触りません' : claudeNeedsLine ? '既にあるので末尾に「@AGENTS.md」の 1 行だけ足します (既存の内容は残す)' : '既にあり、@AGENTS.md も入っているので触りません'));

  if (!args.includes('--apply')) {
    out('\n実際に足すには: npx github:loogo-inc/cpos-kit adopt --apply');
    out('標準ブロックの本文だけ欲しいときは: npx github:loogo-inc/cpos-kit adopt --print');
    return;
  }

  for (const [f, body] of willAdd) { const p = resolve(cwd, f); mkdirSync(dirname(p), { recursive: true }); writeFileSync(p, body); out(`  ${replace.includes(f) ? '置き換えました' : '書きました'}: ${f}`); }
  for (const [f, body, head] of willAppend) {
    const p = resolve(cwd, f); mkdirSync(dirname(p), { recursive: true });
    const cur = existsSync(p) ? readFileSync(p, 'utf8').replace(/\n*$/, '\n\n') : head;
    writeFileSync(p, cur + body); out(`  追記しました: ${f}`);
  }
  for (const [f, body] of willDisc) {
    const p = resolve(cwd, f); mkdirSync(dirname(p), { recursive: true });
    const cur = existsSync(p) ? readFileSync(p, 'utf8').replace(/\n*$/, '\n\n') : '';
    writeFileSync(p, cur + body); out(`  追記しました: ${f} (作業規律)`);
  }
  for (const [f, body] of willDesign) {
    const p = resolve(cwd, f); mkdirSync(dirname(p), { recursive: true });
    const cur = existsSync(p) ? readFileSync(p, 'utf8').replace(/\n*$/, '\n\n') : '';
    writeFileSync(p, cur + body); out(`  追記しました: ${f} (画面の規約)`);
  }
  const cl = resolve(cwd, 'CLAUDE.md');
  if (!existsSync(cl)) { writeFileSync(cl, '@AGENTS.md\n'); out('  書きました: CLAUDE.md'); }
  else if (claudeNeedsLine) { writeFileSync(cl, readFileSync(cl, 'utf8').replace(/\n*$/, '\n\n') + '@AGENTS.md\n'); out('  追記しました: CLAUDE.md (@AGENTS.md の 1 行)'); }
  out('\n元に戻すには: git checkout . && git clean -fd (コミット前なら)');
  out('次: npm install <kit の場所> して、npx github:loogo-inc/cpos-kit validate を通す');
}

// ---- ui ----------------------------------------------------------------
// 画面まわりの「どこに何があるか」を 1 画面で出す (読み取り専用)。--open で見本をブラウザで開く
function uiCmd() {
  const cwd = process.cwd();
  const local = resolve(cwd, 'node_modules', '@cpos', 'kit', 'kit', 'ui');
  const base = existsSync(local) ? local : resolve(kitRoot, 'kit', 'ui');
  const ex = resolve(base, 'examples');
  out(`— 画面 (UI) ——————————————————

決まり   AGENTS.md の「画面のガイドライン」(推奨。外れてよいが理由を 1 行)。AI はここを読む
見本     ${ex}
         today.html 今日やること / user.html 1 件の詳細 / settings.html 設定と自分 / users.html 一覧 + 入力 / record.html 1 件の入力
         ブラウザでそのまま開ける。画面を作るときはこれを真似る
スタイル ${resolve(base, 'cpos-ui.css')}   (アプリは /cpos-ui.css で配信済み)
文字拡縮 ${resolve(base, 'cpos-ui.js')}    (<script src="/cpos-ui.js" defer> と <div data-cpos-text-size></div>)

自分のものにする
  ロゴ     このフォルダに logo.svg を置く (ヘッダのアプリ名の隣に出る)
  色       theme.css を作り cpos-ui.css の後ろで読み、--cpos-color-primary などの変数だけ上書きする
  事業所   server.mjs の const FACILITY_IN_HEADER (true = ヘッダで選ぶ / false = 出さない)
  上に固定 <header class="cpos-appbar cpos-pinned"> にする (既定は固定しない)

よく落とす所 (ガイドラインより)
  意思決定のボタンは右・取消は左 / 1 画面に primary は 1 つ / 検索は打つたびに即絞り込み (ボタンを置かない)
  必須は赤い「必須」の文字 / 誤りは欄の直下 / 保存は保存バー / 確認は取り消せない操作だけ (window.confirm を使わない)
  値が無い項目は「未設定」/ 本文 16px・押せる領域 44px・幅 360px で横スクロールしない

  見本をブラウザで開く: npx github:loogo-inc/cpos-kit ui --open`);
  if (args.includes('--open')) {
    const opener = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
    const r = spawnSync(opener, [resolve(ex, 'today.html')], { stdio: 'ignore', shell: process.platform === 'win32' });
    out(r.status === 0 ? '\n開きました (today.html)' : `\n開けませんでした。手で開く: ${resolve(ex, 'today.html')}`);
  }
}

// ---- scopes --------------------------------------------------------------
// CPOS のスコープは「一覧 (server の KNOWN_TOKEN_SCOPES = OpenAPI の oauth2 scopes)」と「アプリ固有の雛形 (app-data:{appId}:read など)」の 2 種類。
// kit は両方を kit/scopes.json に持ち、各 operation が要求するスコープを kit/api.json に持つ。
//   npx github:loogo-inc/cpos-kit scopes            全スコープと要求する operation の数。manifest / トークンとの照合
//   npx github:loogo-inc/cpos-kit scopes <語>       語に当たるスコープと、それを要求する API
//   npx github:loogo-inc/cpos-kit scopes --used     このアプリのソースが呼ぶメソッドから必要なスコープを出し、manifest に足りないものを示す
async function scopesCmd() {
  const { loadApi, lookupOperation } = await import('../client.js');
  const api = loadApi();
  const table = JSON.parse(readFileSync(resolve(kitRoot, 'kit', 'scopes.json'), 'utf8')).scopes;
  const cwd = process.cwd();
  const mp = resolve(cwd, 'cpos.manifest.json');
  const manifest = existsSync(mp) ? JSON.parse(readFileSync(mp, 'utf8')) : null;
  const appId = manifest?.appId ?? null;
  const declared = new Set(manifest?.apiTokenScopes ?? []);
  const fill = (s) => (appId ? s.replace('{appId}', appId) : s);
  const covers = (set, s) => set.has(s) || set.has('*') || [...set].some((x) => x.endsWith(':*') && s.startsWith(x.slice(0, -1)));
  // トークン (あれば照合する。無くても動く)
  let tokenScopes = null;
  {
    let url = process.env.CPOS_URL ?? null, token = process.env.CPOS_TOKEN ?? null;
    try { const env = readFileSync(resolve(cwd, '.env'), 'utf8'); url ??= env.match(/^[A-Z0-9_]+_CPOS_BASE_URL=(.+)$/m)?.[1]?.trim() ?? null; token ??= env.match(/^[A-Z0-9_]+_CPOS_APP_TOKEN=(.+)$/m)?.[1]?.trim() ?? null; } catch {}
    if (url && token && !/127\.0\.0\.1|localhost/.test(url)) {
      try { const r = await fetch(`${url.replace(/\/+$/, '')}/api/platform/me`, { headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' } }); if (r.status === 200) tokenScopes = new Set((await r.json())?.token?.scopes ?? []); } catch {}
    }
  }
  const mark = (s) => `${declared.size ? (covers(declared, s) ? 'manifest ✓' : 'manifest ✗') : ''}${tokenScopes ? (covers(tokenScopes, s) ? '  トークン ✓' : '  トークン ✗') : ''}`;
  const words = args.slice(1).filter((a) => !a.startsWith('--'));

  if (args.includes('--used')) {
    const exts = /\.(m?js|cjs|m?ts|tsx)$/;
    const skip = new Set(['node_modules', '.git', 'dist', 'build', 'coverage']);
    const walk = (d) => readdirSync(d).flatMap((n) => { if (skip.has(n)) return []; const p = join(d, n); return statSync(p).isDirectory() ? walk(p) : (exts.test(n) ? [p] : []); });
    const byName = new Map(api.operations.map((o) => [`${o.ns}.${o.group}.${o.name}`, o]));
    const need = new Map(); const unknown = [];
    const add = (scope, where) => { if (!scope) return; const s = fill(scope); if (!need.has(s)) need.set(s, []); need.get(s).push(where); };
    const lineOf = (text, idx) => text.slice(0, idx).split('\n').length;
    for (const file of walk(cwd)) {
      const text = readFileSync(file, 'utf8'); const rel = relative(cwd, file);
      for (const m of text.matchAll(/\.(app|session)\.([A-Za-z0-9_]+)\.([A-Za-z0-9_]+)\s*\(/g)) { const key = `${m[1]}.${m[2]}.${m[3]}`; const o = byName.get(key); if (o) add(o.scope, `${rel}:${lineOf(text, m.index)} cpos.${key}`); else unknown.push(`${rel}:${lineOf(text, m.index)} cpos.${key} (api.d.ts に無い)`); }
      for (const m of text.matchAll(/\.(masterUsers|facilities|staffAccounts)\.list\s*\(/g)) add({ masterUsers: 'master-users:read', facilities: 'facilities:read', staffAccounts: 'users:read' }[m[1]], `${rel}:${lineOf(text, m.index)} cpos.${m[1]}.list`);
      for (const m of text.matchAll(/\.appData\([^)]*\)\s*\.\s*(list|get|create|update|remove|upsertBy)\b/g)) { const w = `${rel}:${lineOf(text, m.index)} appData.${m[1]}`; if (/^(list|get|upsertBy)$/.test(m[1])) add('app-data:{appId}:read', w); if (/^(create|update|upsertBy)$/.test(m[1])) add('app-data:{appId}:write', w); if (m[1] === 'remove') add('app-data:{appId}:delete', w); }
      // appData を変数に受けて使う形 (const store = cpos.appData(id); store.list(...)) は操作を追えないので read + write とみなす
      if (/\.appData\(/.test(text) && !/\.appData\([^)]*\)\s*\.\s*(list|get|create|update|remove|upsertBy)\b/.test(text)) { add('app-data:{appId}:read', `${rel} appData (操作の内訳は追えない)`); add('app-data:{appId}:write', `${rel} appData (操作の内訳は追えない)`); }
      for (const m of text.matchAll(/\.raw\(\s*['"`](GET|POST|PUT|PATCH|DELETE)['"`]\s*,\s*['"`]([^'"`]+)['"`]/g)) { const o = lookupOperation(m[1], m[2]); if (o) add(o.scope, `${rel}:${lineOf(text, m.index)} raw ${m[1]} ${m[2]}`); else unknown.push(`${rel}:${lineOf(text, m.index)} raw ${m[1]} ${m[2]} (OpenAPI に無い)`); }
    }
    const needed = [...need.keys()].sort();
    out(`ソースが要求するスコープ ${needed.length}${manifest ? `  (cpos.manifest.json の apiTokenScopes は ${declared.size})` : '  (cpos.manifest.json が無い)'}`);
    for (const s of needed) { out(`  ${s}   ${mark(s)}`); for (const w of need.get(s).slice(0, 3)) out(`      ${w}`); if (need.get(s).length > 3) out(`      … 他 ${need.get(s).length - 3} か所`); }
    for (const u of unknown) out(`  注意: ${u}`);
    const adminOnly = new Set(table.filter((s) => s.adminOnly).map((s) => s.name));
    for (const s of needed.filter((s) => adminOnly.has(s))) out(`  注意: ${s} は管理者の PAT 専用で App Token には付けられません (manifest に書かない)。この API はアプリからは呼べません`);
    const missing = needed.filter((s) => !covers(declared, s) && !adminOnly.has(s));
    if (manifest && missing.length) { out(''); out('cpos.manifest.json の apiTokenScopes に足す:'); out('  ' + JSON.stringify([...new Set([...declared, ...missing])], null, 0).replace(/,/g, ', ')); out('  足したら CPOS 管理画面で再登録し、App Token を発行し直す (トークンのスコープは発行時に決まる)'); }
    else if (manifest) out('manifest は足りている');
    const unused = [...declared].filter((s) => s !== '*' && !needed.some((n) => covers(new Set([s]), n)));
    if (unused.length) out(`manifest にあるがソースは使っていない: ${unused.join(', ')}`);
    if (tokenScopes) { const lack = needed.filter((s) => !covers(tokenScopes, s)); out(lack.length ? `トークンに無いスコープ: ${lack.join(', ')} → 発行し直す` : 'トークンは足りている'); }
    return;
  }
  if (words.length) {
    const q = words.map((w) => w.toLowerCase());
    const hitScopes = table.filter((s) => q.some((w) => s.name.toLowerCase().includes(w)));
    const hitOps = api.operations.filter((o) => q.some((w) => o.path.toLowerCase().includes(w) || String(o.summary ?? '').toLowerCase().includes(w) || (o.tags ?? []).some((tg) => tg.toLowerCase().includes(w))));
    const names = new Set([...hitScopes.map((s) => s.name), ...hitOps.map((o) => o.scope).filter(Boolean)]);
    if (!names.size) { out(`「${words.join(' ')}」に当たるスコープも API も無い。npx github:loogo-inc/cpos-kit scopes で全一覧`); return; }
    for (const name of [...names].sort()) {
      const s = table.find((x) => x.name === name);
      out(`${fill(name)}   ${s ? `(${s.operations} API${s.template ? '、雛形: appId を入れて使う' : ''})` : ''}   ${mark(fill(name))}`);
      for (const o of api.operations.filter((o) => o.scope === name).slice(0, 12)) out(`    ${o.method.padEnd(6)} ${o.path}  ${o.summary ?? ''}  → cpos.${o.ns}.${o.group}.${o.name}`);
      if (api.operations.filter((o) => o.scope === name).length > 12) out('    …');
    }
    return;
  }
  out(`CPOS が知るスコープ ${table.length} (OpenAPI ${api.generatedFrom.version} / ${api.generatedFrom.revision})。雛形 ${table.filter((s) => s.template).length} は {appId} を自分の appId に置き換えて使う。`);
  out(`一覧に無い「アプリ固有のスコープ」は、この雛形 4 種だけ。それ以外の文字列は CPOS のルートが要求しないので発行しても意味が無い。`);
  out('');
  for (const s of table) out(`  ${fill(s.name).padEnd(44)} ${String(s.operations).padStart(3)} API ${s.adminOnly ? '管理者 PAT 専用 (manifest に書かない)' : s.template ? '雛形' : s.operations ? '' : '(要求する API 無し)'}  ${mark(fill(s.name))}`);
  out('');
  out('  語で引く: npx github:loogo-inc/cpos-kit scopes 送迎     ソースから: npx github:loogo-inc/cpos-kit scopes --used');
}

// ---- update --------------------------------------------------------------
// kit が「所有する」と宣言して置いたものを、いま入っている kit の版に合わせる。パッケージ自体は npm update @cpos/kit で上がる
// (git の semver タグ参照)。その後にこれを回す。人が書いた部分 (マーカーの外、自前のファイル) は触らない。
//   npx github:loogo-inc/cpos-kit update            更新する (何を変えたか出す)
//   npx github:loogo-inc/cpos-kit update --check    差分があるファイルを出すだけ (あれば非 0)。CI で drift を見張るのに使う
async function update() {
  const cwd = process.cwd();
  const check = args.includes('--check');
  // git がきれいなことを前提にする。kit の更新を 1 コミットにまとめ、そのあと AI に実装を直してもらうので、
  // 直す前の状態 (= 人の変更が混ざっていない状態) に戻れるようにする
  const git = (...a) => spawnSync('git', a, { cwd, encoding: 'utf8' });
  const inGit = git('rev-parse', '--is-inside-work-tree').stdout?.trim() === 'true';
  if (!check && inGit && !args.includes('--allow-dirty') && git('status', '--porcelain').stdout.trim()) {
    die('コミットしていない変更があります。先にコミットしてから update してください',
      'update は kit の更新を 1 コミットにまとめ、そのあと AI に実装を直してもらいます。直す前の状態に戻れるよう、始める前に git をきれいにします (このまま続けるなら --allow-dirty)');
  }
  const installedKit = () => { try { return JSON.parse(readFileSync(resolve(cwd, 'node_modules', '@cpos', 'kit', 'package.json'), 'utf8')).version; } catch { return null; } };
  const oldVersion = installedKit();
  const mf = resolve(cwd, 'cpos.manifest.json');
  let appId = opt('--app-id'), name = opt('--name');
  if ((!appId || !name) && existsSync(mf)) { try { const m = JSON.parse(readFileSync(mf, 'utf8')); appId ??= m.appId; name ??= m.name; } catch {} }
  appId ??= basename(cwd).toLowerCase().replace(/[^a-z0-9_-]+/g, '-'); name ??= basename(cwd);
  const vars = { appId, name, APP: appId.toUpperCase().replace(/[^A-Z0-9]+/g, '_'), kitDep: '', firstSteps: '' };
  const block = render(readFileSync(resolve(kitRoot, 'kit', 'agents', 'standard-block.md'), 'utf8'), vars);
  const disc = disciplineText();
  const dsg = designText();
  let designHad = false, designChanged = false;   // 画面の規約が入っているか / 今回の更新で変わったか
  const skill = readFileSync(resolve(kitRoot, 'skills', 'cpos', 'SKILL.md'), 'utf8').replaceAll('<appId>', appId).replaceAll('<APP>', vars.APP);
  const ciTemplate = readFileSync(resolve(kitRoot, 'kit', 'templates', 'base', '.github', 'workflows', 'ci.yml'), 'utf8');
  const changed = [], same = [], skipped = [];
  // 書き先が symlink 経由でプロジェクトの外 (共有スキル置き場など) なら書かない (adopt と同じ。2026-09-14 の想定 C)
  const root = realpathSync(cwd);
  const outside = (p) => { let q = p; while (!existsSync(q)) q = dirname(q); const r = realpathSync(q); return r === root || r.startsWith(root + sep) ? null : r; };
  const put = (rel, next, why, own) => {
    const p = resolve(cwd, rel);
    const cur = existsSync(p) ? readFileSync(p, 'utf8') : null;
    if (cur === null) { skipped.push(`${rel}  (無い。足すなら npx github:loogo-inc/cpos-kit adopt --apply)`); return; }
    if (cur === next) { same.push(rel); return; }
    if (own && !own(cur)) { skipped.push(`${rel}  (kit 所有の印が無い = 自前。触らない${/SKILL\.md$/.test(rel) ? `。kit のに替えるなら npx github:loogo-inc/cpos-kit adopt --apply --replace ${rel}` : ''})`); return; }
    const real = outside(p); if (real) { skipped.push(`${rel}  (symlink でプロジェクトの外 ${real} を指す。触らない)`); return; }
    changed.push(`${rel}  (${why})`);
    if (!check) { mkdirSync(dirname(p), { recursive: true }); writeFileSync(p, next); }
  };
  // 1. マーカーの間だけ置き換える (AGENTS.md / copilot-instructions / .cursor rules)
  const swap = (text, begin, end, body) => {
    const i = text.indexOf(begin); if (i < 0) return null;
    const j = text.indexOf(end, i); if (j < 0) return null;
    return text.slice(0, i) + body.trim() + text.slice(j + end.length);
  };
  for (const rel of ['AGENTS.md', '.github/copilot-instructions.md', '.cursor/rules/cpos.mdc']) {
    const p = resolve(cwd, rel); if (!existsSync(p)) continue;
    let text = readFileSync(p, 'utf8'); const before = text;
    const a = swap(text, '<!-- cpos-kit:begin', 'cpos-kit:end -->', block); if (a !== null) text = a;
    const b = swap(text, '<!-- cpos-kit:discipline:begin', 'cpos-kit:discipline:end -->', disc); if (b !== null) text = b;
    const c = swap(text, '<!-- cpos-kit:design:begin', 'cpos-kit:design:end -->', dsg);
    if (c !== null) { if (rel === 'AGENTS.md') { designHad = true; designChanged = c !== text; } text = c; }
    if (a === null && b === null && c === null) { skipped.push(`${rel}  (kit のマーカーが無い = 手で書いたもの。触らない)`); continue; }
    const real = outside(p); if (real) { skipped.push(`${rel}  (symlink でプロジェクトの外 ${real} を指す。触らない)`); continue; }
    if (text === before) same.push(rel); else { changed.push(`${rel}  (マーカーの間を今の版に)`); if (!check) writeFileSync(p, text); }
  }
  // 2. kit が丸ごと所有するファイル (あるものだけ)
  // 自前の同名スキル (中に @cpos/kit が無い) は上書きしない。2026-09-14 の適用検証で、自前の .claude/skills/cpos を update が潰した
  for (const dir of ['.claude/skills/cpos', '.agents/skills/cpos', '.github/skills/cpos']) put(`${dir}/SKILL.md`, skill, 'スキルを今の版に', (cur) => cur.includes('@cpos/kit'));
  {
    const rel = '.github/workflows/ci.yml'; const p = resolve(cwd, rel);
    if (existsSync(p)) put(rel, ciTemplate, 'CI を今の版に', (cur) => /cpos-kit が所有/.test(cur));
  }
  // 3. .claude/settings.json の Stop hook (prompt の本文だけ差し替える。他の hooks は残す)
  {
    const rel = '.claude/settings.json'; const p = resolve(cwd, rel);
    if (existsSync(p)) {
      try {
        const cur = JSON.parse(readFileSync(p, 'utf8')); const fresh = JSON.parse(disciplineSettings());
        const freshPrompt = fresh.hooks.Stop[0].hooks[0].prompt;
        let hit = false;
        for (const g of cur.hooks?.Stop ?? []) for (const h of g.hooks ?? []) if (h.type === 'prompt' && /stop_hook_active/.test(String(h.prompt))) { hit = true; if (h.prompt !== freshPrompt) { h.prompt = freshPrompt; changed.push(`${rel}  (Stop hook の審査文を今の版に)`); if (!check) writeFileSync(p, JSON.stringify(cur, null, 2) + '\n'); } else same.push(rel); }
        if (!hit) skipped.push(`${rel}  (kit の Stop hook が無い。入れるなら npx github:loogo-inc/cpos-kit adopt --apply)`);
      } catch { skipped.push(`${rel}  (JSON として読めない)`); }
    }
  }
  // 4. package.json の @cpos/kit の依存を、この kit の版の系統に (0.x の間は minor が変わると ^ が届かない。
  //    ^0.1 のままだと、update で AI 向けファイルだけ新しくなり、コードの kit は古いまま食い違う)
  let installNeeded = false;
  {
    const rel = 'package.json'; const p = resolve(cwd, rel);
    if (existsSync(p)) {
      try {
        const text = readFileSync(p, 'utf8'); const j = JSON.parse(text);
        for (const sec of ['dependencies', 'devDependencies']) {
          const cur = j[sec]?.['@cpos/kit']; if (typeof cur !== 'string') continue;
          const m = cur.match(/^(.*#semver:)(\S+)$/);
          if (!m) { skipped.push(`${rel}  (@cpos/kit が ${cur}。semver の範囲ではないので触らない)`); continue; }
          if (m[2] === kitRange()) { same.push(`${rel} (@cpos/kit ${m[2]})`); continue; }
          j[sec]['@cpos/kit'] = m[1] + kitRange();
          changed.push(`${rel}  (@cpos/kit を ${m[2]} → ${kitRange()}。npm install で kit ${pkg.version} が入る)`);
          if (!check) { writeFileSync(p, JSON.stringify(j, null, /^\{\n\t/.test(text) ? '\t' : 2) + '\n'); installNeeded = true; }
        }
      } catch { skipped.push(`${rel}  (JSON として読めない)`); }
    }
  }
  out(`kit ${pkg.version} に合わせる${check ? ' (--check: 書き換えない)' : ''}`);
  out(`${check ? '差分があるもの' : '更新したもの'} (${changed.length}):`); for (const c of changed) out(`  ${check ? '!' : '~'} ${c}`);
  if (same.length) out(`変更なし (${same.length}): ${same.join(', ')}`);
  for (const s of skipped) out(`  - ${s}`);
  const npm = (a) => spawnSync('npm', a, { cwd, encoding: 'utf8', shell: process.platform === 'win32' });
  const tail = (r) => String((r.stdout ?? '') + (r.stderr ?? '')).trim().split('\n').slice(-8).join('\n');
  let installed = false;
  if (installNeeded && !args.includes('--no-install')) {
    out('npm install (@cpos/kit を新しい版に) …');
    const r = npm(['install', '--no-audit', '--no-fund']);
    if (r.status !== 0) { out(`  npm install が失敗しました。手で npm install を打ってください:\n${tail(r)}`); process.exitCode = 1; return; }
    installed = true; out('  入りました');
  }
  if (check) { if (changed.length) process.exitCode = 1; return; }
  if (!changed.length) return;
  const newVersion = installed ? (installedKit() ?? pkg.version) : pkg.version;
  // 新しい kit でアプリのテストが通るか (通らなければコミットしない。直すのは人か AI)
  if (installed && !args.includes('--no-test')) {
    let hasTest = false; try { hasTest = !!JSON.parse(readFileSync(resolve(cwd, 'package.json'), 'utf8')).scripts?.test; } catch {}
    if (hasTest) {
      out('npm test (新しい kit で) …');
      const r = npm(['test']);
      if (r.status !== 0) {
        out(`  テストが落ちました。コミットしていません:\n${tail(r)}`);
        out(`  直すには AI に「docs/cpos/UPGRADE.md を読んで、cpos-kit ${newVersion} に合わせてテストが通るように直して」と頼む。戻すなら git checkout . && npm install`);
        writeUpgradeNotes(cwd, oldVersion, newVersion);
        process.exitCode = 1; return;
      }
      out('  通りました');
    }
  }
  const notes = oldVersion && oldVersion !== newVersion ? writeUpgradeNotes(cwd, oldVersion, newVersion) : null;
  if (notes) out(`  ~ ${notes}  (${oldVersion} → ${newVersion} の CHANGELOG。このあと実装を直すときに読む)`);
  if (inGit) {
    git('add', '-A');
    const msg = oldVersion && oldVersion !== newVersion ? `cpos-kit ${oldVersion} → ${newVersion} に更新 (kit が置いたファイルと依存)` : `cpos-kit ${newVersion} に合わせる (kit が置いたファイル)`;
    const c = git('commit', '-q', '-m', msg);
    out(c.status === 0 ? `コミットしました: ${msg}` : `コミットできませんでした (git commit):\n${tail(c)}`);
  } else out('git のリポジトリではないのでコミットしていません (戻せるように git init を勧めます)');
  if (notes) await offerUpgradeByAi(cwd, newVersion);
  // 画面のガイドライン (基礎 UI) は CPOS 追随とは別に聞く。見た目と操作が変わるので、断れるようにする。
  // 規約を入れていない人 (create/adopt で --design no、または remove した人) には聞かない = 押し付けない
  warnEditedUi(cwd);
  if (designHad && designChanged) await offerDesignByAi(cwd, newVersion);
  else if (!designHad && notes) out(`\n画面のガイドライン (${designHeading()}) は入っていません。入れるなら: npx github:loogo-inc/cpos-kit adopt --apply --design yes`);
}

// 旧版より後、新版までの CHANGELOG の節を docs/cpos/UPGRADE.md に書く。書いたパス (相対) を返す
function writeUpgradeNotes(cwd, from, to) {
  const src = [resolve(kitRoot, 'CHANGELOG.md'), resolve(kitRoot, 'sync', 'public', 'CHANGELOG.md')].find((p) => existsSync(p));
  if (!from) return null;
  const num = (v) => String(v).split('.').map((x) => Number(x) || 0);
  const cmp = (a, b) => { const x = num(a), y = num(b); for (let i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] - y[i]; return 0; };
  // CHANGELOG が kit に入っていなければ (0.2.1 は package.json の files に無かった)、公開リポの CHANGELOG を指す
  const text = src ? readFileSync(src, 'utf8') : '';
  const found = text.split(/^(?=## \[)/m).filter((p) => { const v = p.match(/^## \[(\d+\.\d+\.\d+)\]/)?.[1]; return v && cmp(v, from) > 0 && cmp(v, to) <= 0; });
  const parts = found.length ? found : [`CHANGELOG を kit の中に見つけられませんでした。https://github.com/loogo-inc/cpos-kit/blob/main/CHANGELOG.md の ${from} より後の節を読む。\n`];
  const rel = 'docs/cpos/UPGRADE.md';
  mkdirSync(resolve(cwd, 'docs', 'cpos'), { recursive: true });
  writeFileSync(resolve(cwd, rel), `# cpos-kit の更新: ${from} → ${to} (${new Date().toISOString().slice(0, 10)})

\`npx github:loogo-inc/cpos-kit update\` が書いた。kit が置いたファイル (AGENTS.md の標準ブロック・スキル) と依存はもう新しい。
残りは**アプリのコード**。下の CHANGELOG の「既存アプリへの影響」と、このアプリが使う機能 (AppData・利用者・health・ログイン等) に関わる項目を 1 つずつ見て直す。

## AI への依頼 (そのまま貼ってよい)

${upgradePrompt(to)}

## CHANGELOG (${from} より後)

${parts.join('').trim()}
`);
  return rel;
}

function upgradePrompt(to) {
  return `docs/cpos/UPGRADE.md を読んで、このアプリを cpos-kit ${to} と今の CPOS に合わせて直してください。CHANGELOG の「既存アプリへの影響」と、このアプリが使っている機能に関わる項目を 1 つずつ見て、直す必要があるものは直し、要らないものは理由を UPGRADE.md の末尾に 1 行ずつ書いてください。npm test を通してから「cpos-kit ${to} に合わせて実装を直す」でコミットしてください。`;
}

// アプリの中に cpos-ui.css / .js の写しがあり、kit のものと違うなら知らせる (手で直すと次の update で消える)
function warnEditedUi(cwd) {
  const hits = [];
  for (const name of ['cpos-ui.css', 'cpos-ui.js']) {
    const mine = resolve(kitRoot, 'kit', 'ui', name);
    for (const rel of [name, join('public', name), join('static', name), join('assets', name)]) {
      const p = resolve(cwd, rel);
      if (!existsSync(p) || !existsSync(mine)) continue;
      if (readFileSync(p, 'utf8') !== readFileSync(mine, 'utf8')) hits.push(rel);
    }
  }
  if (!hits.length) return;
  out(`\n! ${hits.join(' / ')} が kit のものと違います (手で直したか、古い版の写し)。`);
  out('  このままだと、次に kit を上げたときに上書きされて消えます。');
  out('  変えたいのが色やフォントなら theme.css で --cpos-* を上書きしてください (上書きされません)。');
  out('  ガイドラインに従わないと決めたなら、AGENTS.md の「画面のガイドライン」の節を <!-- cpos-kit:design:begin --> から');
  out('  <!-- cpos-kit:design:end --> まで消してください。以後 update は画面について何も言いません。');
}

function designPrompt(to) {
  return `AGENTS.md の「画面のガイドライン (cpos-kit)」が cpos-kit ${to} で変わりました (推奨であって強制ではありません)。できる範囲で、このアプリの画面をこれに寄せてください。見本は node_modules/@cpos/kit/kit/ui/examples/ にあります (そのままブラウザで開けます)。全部を一度に直さなくてよいので、(1) 見やすさの下限 (viewport・本文 16px・押せる領域 44px・コントラスト) (2) 意思決定ボタンの位置・検索の起動・必須の表し方・確認の出し方 の順に直し、直せない所と理由を docs/cpos/UPGRADE.md の末尾に 1 行ずつ書いてください。npm test を通してから「画面を cpos-kit ${to} のガイドラインに寄せる」でコミットしてください。**cpos-ui.css / cpos-ui.js は書き換えないでください** (次の update で上書きされます。色やフォントは theme.css で --cpos-* を上書きする)。`;
}

// 「基礎 UI (画面の規約) に合わせますか？」。CPOS 追随とは別の質問にする (見た目と操作が変わるため)
async function offerDesignByAi(cwd, to) {
  const prompt = designPrompt(to);
  const which = (cmd) => spawnSync(process.platform === 'win32' ? 'where' : 'which', [cmd], { encoding: 'utf8' }).status === 0;
  out('\n画面のガイドライン (基礎 UI) が変わりました。AGENTS.md の本文はもう新しくなっています。');
  if (args.includes('--no-ai') || yes || !process.stdin.isTTY) { out(`画面を合わせるときは、AI ツールで次のように頼む:\n  ${prompt}`); return; }
  const a = String(await ask('この画面を基礎 UI に合わせますか？ AI に頼みます (y/N)', 'n').catch(() => 'n')).toLowerCase();
  if (a !== 'y' && a !== 'yes') { out(`あとで合わせるときは、AI ツールで次のように頼む:\n  ${prompt}\n規約そのものが要らないなら: npx github:loogo-inc/cpos-kit remove --apply (画面の規約も外れます)`); return; }
  const tool = ['claude', 'codex'].find(which);
  if (!tool) { out(`Claude Code (claude) も Codex (codex) も見つかりません。使っている AI ツールで次のように頼んでください:\n  ${prompt}`); return; }
  out(`${tool} を起動します (直し終わったら、AI がテストを通してコミットします。戻すなら git reset --hard HEAD)`);
  spawnSync(tool, [prompt], { cwd, stdio: 'inherit', shell: process.platform === 'win32' });
}

// 「最新の CPOS に合わせて実装を直しますか？」。y なら Claude Code か Codex を依頼文で起動する。端末でなければ依頼文を出すだけ
async function offerUpgradeByAi(cwd, to) {
  const prompt = upgradePrompt(to);
  const which = (cmd) => spawnSync(process.platform === 'win32' ? 'where' : 'which', [cmd], { encoding: 'utf8' }).status === 0;
  if (args.includes('--no-ai') || yes || !process.stdin.isTTY) { out(`\n次: AI ツールでこのフォルダを開き、次のように頼む:\n  ${prompt}`); return; }
  // Ctrl+D (入力の終わり) で readline は例外を投げる。落とさずに「いいえ」と同じに扱う
  const a = String(await ask('\n最新の CPOS に合わせて実装を直しますか？ AI に頼みます (y/N)', 'n').catch(() => 'n')).toLowerCase();
  if (a !== 'y' && a !== 'yes') { out(`あとで直すときは、AI ツールで次のように頼む:\n  ${prompt}`); return; }
  const tool = ['claude', 'codex'].find(which);
  if (!tool) { out(`Claude Code (claude) も Codex (codex) も見つかりません。使っている AI ツールで次のように頼んでください:\n  ${prompt}`); return; }
  out(`${tool} を起動します (直し終わったら、AI がテストを通してコミットします。戻すなら git reset --hard HEAD)`);
  spawnSync(tool, [prompt], { cwd, stdio: 'inherit', shell: process.platform === 'win32' });
}

// ---- remove --------------------------------------------------------------
// adopt / create が置いた「kit 所有のもの」を取り除く (adopt の裏返し)。人が書いた部分と、アプリのコード・cpos.manifest.json・docs/cpos・
// @cpos/kit の依存には触らない (コードが client を import している限りパッケージは要る)。
//   npx github:loogo-inc/cpos-kit remove            何を取り除くかを出す (書き換えない)
//   npx github:loogo-inc/cpos-kit remove --apply    取り除く。git checkout . で戻せる
async function removeKit() {
  const cwd = process.cwd();
  const apply = args.includes('--apply');
  const plan = [];   // { rel, what, do: () => void }
  const strip = (text, begin, end) => { const i = text.indexOf(begin); if (i < 0) return text; const j = text.indexOf(end, i); if (j < 0) return text; return (text.slice(0, i) + text.slice(j + end.length)).replace(/\n{3,}/g, '\n\n'); };
  // 1. マーカーの間を取り除く。取り除いた結果 kit の生成物だけだったファイル (中身が空同然) は消す
  for (const rel of ['AGENTS.md', '.github/copilot-instructions.md', '.cursor/rules/cpos.mdc']) {
    const p = resolve(cwd, rel); if (!existsSync(p)) continue;
    const cur = readFileSync(p, 'utf8');
    if (!cur.includes('<!-- cpos-kit:begin') && !cur.includes('<!-- cpos-kit:discipline:begin') && !cur.includes('<!-- cpos-kit:design:begin')) continue;
    let next = strip(strip(strip(cur, '<!-- cpos-kit:begin', 'cpos-kit:end -->'), '<!-- cpos-kit:discipline:begin', 'cpos-kit:discipline:end -->'), '<!-- cpos-kit:design:begin', 'cpos-kit:design:end -->');
    next = next.replace(/\n\n\(このファイルは cpos-kit が AGENTS\.md と同じ内容から生成する。手で直さない。\)\n?/, '\n');
    const rest = next.replace(/^---\n[\s\S]*?\n---\n/, '').replace(/^# AGENTS\.md — [^\n]*\n/, '').replace(/作業を始める前に `docs\/handoff\/RESUME\.md` を読む。終わるときに書き直す。/, '').replace(/## このプロジェクトのルール\n+`docs\/RULES\.md` を読む。ここには書かない \(置き場を 1 つにする\)。/, '').trim();
    if (!rest) plan.push({ rel, what: '消す (kit の生成物だけだった)', do: () => rmSync(p) });
    else plan.push({ rel, what: 'マーカーの間を取り除く (人が書いた部分は残す)', do: () => writeFileSync(p, next.replace(/\n{3,}/g, '\n\n')) });
  }
  // 2. kit 所有のファイル
  for (const rel of ['.claude/skills/cpos/SKILL.md', '.agents/skills/cpos/SKILL.md', '.github/skills/cpos/SKILL.md']) {
    const p = resolve(cwd, rel); if (!existsSync(p)) continue;
    if (/^---\nname: cpos\b/.test(readFileSync(p, 'utf8'))) plan.push({ rel, what: '消す (kit のスキル)', do: () => { rmSync(p); try { rmSync(dirname(p), { recursive: false }); } catch {} } });
    else plan.push({ rel, what: '触らない (kit のスキルではない)', do: null });
  }
  { const rel = '.github/workflows/ci.yml'; const p = resolve(cwd, rel); if (existsSync(p)) { if (/cpos-kit が所有/.test(readFileSync(p, 'utf8'))) plan.push({ rel, what: '消す (kit 所有の CI)', do: () => rmSync(p) }); else plan.push({ rel, what: '触らない (自前の CI)', do: null }); } }
  // 3. Stop hook (settings.json は他の設定が残るなら残す)
  { const rel = '.claude/settings.json'; const p = resolve(cwd, rel);
    if (existsSync(p)) { try { const s = JSON.parse(readFileSync(p, 'utf8')); const stop = s.hooks?.Stop ?? []; const keep = stop.map((g) => ({ ...g, hooks: (g.hooks ?? []).filter((h) => !(h.type === 'prompt' && /stop_hook_active/.test(String(h.prompt)))) })).filter((g) => g.hooks.length);
      if (keep.length !== stop.length || keep.some((g, i) => g.hooks.length !== (stop[i].hooks ?? []).length)) {
        const next = { ...s }; if (keep.length) next.hooks = { ...s.hooks, Stop: keep }; else { next.hooks = { ...s.hooks }; delete next.hooks.Stop; if (!Object.keys(next.hooks).length) delete next.hooks; }
        if (typeof next.$comment === 'string' && /cpos-kit が所有/.test(next.$comment)) delete next.$comment;
        const empty = !Object.keys(next).length;
        plan.push({ rel, what: empty ? '消す (Stop hook だけだった)' : 'Stop hook の審査を取り除く (他の設定は残す)', do: () => (empty ? rmSync(p) : writeFileSync(p, JSON.stringify(next, null, 2) + '\n')) });
      } } catch { plan.push({ rel, what: '触らない (JSON として読めない)', do: null }); } } }
  // 4. CLAUDE.md が @AGENTS.md の 1 行だけで、AGENTS.md を消す予定なら一緒に消す
  { const p = resolve(cwd, 'CLAUDE.md'); if (existsSync(p) && /^@AGENTS\.md\s*$/.test(readFileSync(p, 'utf8')) && plan.some((x) => x.rel === 'AGENTS.md' && x.what.startsWith('消す'))) plan.push({ rel: 'CLAUDE.md', what: '消す (@AGENTS.md の 1 行だけ)', do: () => rmSync(p) }); }
  const usesKit = (() => { try { return JSON.stringify(JSON.parse(readFileSync(resolve(cwd, 'package.json'), 'utf8')).dependencies ?? {}).includes('@cpos/kit'); } catch { return false; } })();
  out(apply ? 'kit が置いたものを取り除く:' : 'kit が置いたもの (取り除くなら --apply。git checkout . で戻せる):');
  for (const x of plan) out(`  ${x.do ? (apply ? '×' : '-') : '='} ${x.rel}  ${x.what}`);
  if (!plan.length) out('  (kit が置いたものは見つからない)');
  out('触らないもの: アプリのコード、cpos.manifest.json、docs/cpos/、package.json' + (usesKit ? '。@cpos/kit はコードが import している限り要る (要らなくなったら npm uninstall @cpos/kit)' : ''));
  if (apply) for (const x of plan) if (x.do) x.do();
}

// ---- docs ----------------------------------------------------------------
// kit が持つ OpenAPI の写し (spec/cpos-openapi.json) を Redoc で表示する。ログイン不要。画面の JS は CDN から読む (ネットは要る)。
//   npx github:loogo-inc/cpos-kit docs [--port 4310] [--no-open]
async function docs() {
  const { createServer } = await import('node:http');
  const { spawn } = await import('node:child_process');
  const specPath = resolve(kitRoot, 'spec', 'cpos-openapi.json');
  if (!existsSync(specPath)) die('spec/cpos-openapi.json が無い');
  const spec = readFileSync(specPath);
  const meta = JSON.parse(spec.toString('utf8'))['x-cpos-kit'] ?? {};
  const port = Number(opt('--port', 4310));
  const html = `<!doctype html><html lang="ja"><head><meta charset="utf-8"><title>CPOS API (${meta.version ?? ''} / ${meta.revision ?? ''})</title>
<style>body{margin:0}</style></head><body>
<redoc spec-url="/openapi.json" expand-responses="200" hide-download-button></redoc>
<script src="https://cdn.jsdelivr.net/npm/redoc@2/bundles/redoc.standalone.js"></script>
</body></html>`;
  const srv = createServer((req, res) => {
    if (req.url === '/openapi.json') { res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' }); return res.end(spec); }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); res.end(html);
  });
  await new Promise((r, j) => srv.once('error', j).listen(port, '127.0.0.1', r)).catch((e) => die(`${port} で起動できません (${e.message})`, '--port 4311 のように別の番号を'));
  const url = `http://127.0.0.1:${port}/`;
  out(`CPOS API の画面: ${url}   (OpenAPI ${meta.version ?? '?'} / revision ${meta.revision ?? '?'} / ${meta.operations ?? '?'} operations。左の検索で絞れる)`);
  out('止めるときは Ctrl+C');
  if (!args.includes('--no-open')) { const cmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'cmd' : 'xdg-open'; const a = process.platform === 'win32' ? ['/c', 'start', '', url] : [url]; try { spawn(cmd, a, { stdio: 'ignore', detached: true }).unref(); } catch {} }
  await new Promise(() => {});
}

// ---- doctor --------------------------------------------------------------
// kit が持つ CPOS API の版 (kit/api.json の generatedFrom) と、接続先 CPOS の /api/openapi.json を比べる。
//   npx github:loogo-inc/cpos-kit doctor                      .env の <APP>_CPOS_BASE_URL / _CPOS_APP_TOKEN か、env CPOS_URL / CPOS_TOKEN
//   npx github:loogo-inc/cpos-kit doctor --url <URL> --token-file <パス>
async function doctor() {
  const { loadApi } = await import('../client.js');
  const { signaturesFromOpenApi, revisionLabel } = await import('../api-sig.js');
  const api = loadApi();
  out(`kit ${pkg.version}: CPOS OpenAPI ${api.generatedFrom.version} / revision ${api.generatedFrom.revision} / ${api.generatedFrom.fetchedAt} / ${api.generatedFrom.operations} operations`);
  let url = opt('--url') ?? process.env.CPOS_URL ?? null; let token = process.env.CPOS_TOKEN ?? null;
  const tf = opt('--token-file'); if (tf) token = readFileSync(resolve(process.cwd(), tf), 'utf8').trim();
  if (!url || !token) {
    try { const env = readFileSync(resolve(process.cwd(), '.env'), 'utf8'); url ??= env.match(/^[A-Z0-9_]+_CPOS_BASE_URL=(.+)$/m)?.[1]?.trim() ?? null; token ??= env.match(/^[A-Z0-9_]+_CPOS_APP_TOKEN=(.+)$/m)?.[1]?.trim() ?? null; } catch {}
  }
  if (!url || !token) { out('接続先が無いので比較はしない (--url と --token-file、または .env の <APP>_CPOS_BASE_URL / _CPOS_APP_TOKEN)'); return; }
  const res = await fetch(`${url.replace(/\/+$/, '')}/api/openapi.json`, { headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' } });
  if (res.status !== 200) die(`接続先の OpenAPI が取れません (${res.status})`, 'URL とトークンを確かめてください。KIT 模擬サーバには OpenAPI がありません');
  const live = await res.json();
  const rev = revisionLabel(live['x-cpos-revision'] ?? live.info?.['x-cpos-revision']) ?? '?';
  out(`接続先: CPOS OpenAPI ${live.info?.version ?? '?'} / revision ${rev}`);
  const theirs = signaturesFromOpenApi(live); const mine = new Map(api.operations.map((o) => [o.id, o]));
  const added = [...theirs.values()].filter((o) => !mine.has(o.id)); const removed = api.operations.filter((o) => !theirs.has(o.id));
  const changed = api.operations.filter((o) => theirs.has(o.id) && theirs.get(o.id).sig !== o.sig);
  out(`増えた ${added.length} / 消えた ${removed.length} / 署名が変わった ${changed.length}${rev === api.generatedFrom.revision ? '  (revision は同じ)' : ''}`);
  for (const o of added) out(`  + ${o.method} ${o.path}`);
  for (const o of removed) out(`  - ${o.method} ${o.path}  (cpos.${o.ns}.${o.group}.${o.name})`);
  for (const o of changed) out(`  ~ ${o.method} ${o.path}  (cpos.${o.ns}.${o.group}.${o.name}: パラメータ・スコープ・body が変わった)`);
  if (added.length + removed.length + changed.length) out('kit の保守者に再生成を頼んでください。消えた・変わったものを使っているなら先に直す');
  else out('kit と接続先の API は一致しています');
}

// ---- tickets (後から入れるチケット台帳) ------------------------------------
// 正本は docs/tickets/TK-###.md、索引 docs/TICKETS.md は生成物 (kit/tickets.js)。
// 進め方は現場のものなので create では入れない。`tickets init --apply` を打つまで何も動かない。
async function tickets() {
  const T = await import('../tickets.js');
  const cwd = process.cwd();
  const sub = args[1] && !args[1].startsWith('--') ? args[1] : null;

  if (sub === 'init') {
    const ciPath = resolve(cwd, '.github/workflows/ci.yml');
    const pkgPath = resolve(cwd, 'package.json');
    const readme = readFileSync(resolve(kitRoot, 'kit', 'templates', 'tickets', 'README.md'), 'utf8');
    // 自前の docs/TICKETS.md (kit が作った索引ではない) があるなら入れない。入れると `tickets` がそれを上書きする
    const foreign = T.foreignFiles(cwd);
    if (foreign.index) die(`${T.INDEX_FILE} は既にあり、kit の索引ではありません (先頭が「${T.INDEX_HEAD}」でない)`, `別の名前に移してから: git mv ${T.INDEX_FILE} docs/TICKETS-old.md`);
    const adds = [[`${T.TICKETS_DIR}/README.md`, readme], [T.INDEX_FILE, T.renderIndex([])]].filter(([f]) => !existsSync(resolve(cwd, f)));
    const ci = existsSync(ciPath) ? readFileSync(ciPath, 'utf8') : null;
    const ciRe = /^([ \t]*)- run: npx cpos-kit validate[ \t]*$/m;
    const ciLine = !!ci && !ci.includes('tickets --check') && ciRe.test(ci);
    let pkgJson = null;
    try { pkgJson = existsSync(pkgPath) ? JSON.parse(readFileSync(pkgPath, 'utf8')) : null; } catch {}
    const pkgScript = !!pkgJson && !pkgJson.scripts?.tickets;
    out('チケット台帳を入れます (既にあるものは触りません):');
    for (const [f] of adds) out(`  + ${f}`);
    if (foreign.others.length) out(`  ! ${T.TICKETS_DIR}/ に TK-###.md でないファイルがある (${foreign.others.join(', ')})。台帳はこれらを無視する。混ぜないなら別のフォルダへ`);
    if (ciLine) out('  + .github/workflows/ci.yml に「- run: npx cpos-kit tickets --check」を 1 行 (validate の次。CI では npm install 済みの kit を呼ぶ)');
    if (pkgScript) out('  + package.json の scripts に "tickets" (npx が使えない環境用: npm run tickets)');
    if (!adds.length && !ciLine && !pkgScript) { out('  (足すものは無い。もう入っています)'); return; }
    if (!args.includes('--apply')) { out('\n実際に入れるには: npx github:loogo-inc/cpos-kit tickets init --apply'); return; }
    for (const [f, body] of adds) { const p = resolve(cwd, f); mkdirSync(dirname(p), { recursive: true }); writeFileSync(p, body); out(`  書きました: ${f}`); }
    if (ciLine) { writeFileSync(ciPath, ci.replace(ciRe, (m, ind) => `${m}\n${ind}- run: npx cpos-kit tickets --check`)); out('  足しました: .github/workflows/ci.yml (tickets --check)'); }
    if (pkgScript) { pkgJson.scripts = { ...(pkgJson.scripts || {}), tickets: 'cpos-kit tickets' }; writeFileSync(pkgPath, JSON.stringify(pkgJson, null, 2) + '\n'); out('  足しました: package.json scripts.tickets'); }
    out(`\n次: npx github:loogo-inc/cpos-kit tickets new <タイトル> で 1 枚起票する。作法は ${T.TICKETS_DIR}/README.md`);
    return;
  }

  if (sub === 'new') {
    if (!T.isInstalled(cwd)) die('チケット台帳が入っていません', 'npx github:loogo-inc/cpos-kit tickets init --apply');
    const words = [];
    for (let i = 2; i < args.length; i++) {
      if (args[i].startsWith('--')) { if (['--weight', '--parent'].includes(args[i])) i++; continue; }
      words.push(args[i]);
    }
    const title = words.join(' ');
    if (!title) die('タイトルを指定してください', '例: npx github:loogo-inc/cpos-kit tickets new 送迎メモの一覧画面 --weight B');
    const weight = opt('--weight', 'B');
    if (!T.WEIGHTS.includes(weight)) die(`--weight は A (止まる) / B (困る) / C (あとで) のどれか (いま ${weight})`);
    const parent = opt('--parent', '');
    const { tickets: all } = T.loadTickets(cwd);
    if (parent) {
      const p = all.find((t) => t.id === parent);
      if (!p) die(`親 ${parent} が ${T.TICKETS_DIR}/ に無い`);
      if (p.parent) die(`${parent} は ${p.parent} の子。親子は 1 段まで`, 'チェックリスト行にするか、--parent ' + p.parent);
    }
    const id = T.nextId(all);
    writeFileSync(resolve(cwd, T.TICKETS_DIR, `${id}.md`), T.newTicketText({ id, title, weight, parent }));
    writeFileSync(resolve(cwd, T.INDEX_FILE), T.renderIndex(T.loadTickets(cwd).tickets));
    out(`起票しました: ${T.TICKETS_DIR}/${id}.md (重さ ${weight}${parent ? `、親 ${parent}` : ''})。受入条件とチェックリストを埋める。索引 ${T.INDEX_FILE} も作り直した`);
    return;
  }

  if (sub) die(`知らないサブコマンド: tickets ${sub}`, 'tickets / tickets --check / tickets init [--apply] / tickets new <タイトル>');

  if (args.includes('--check')) {
    const r = T.checkTickets(cwd);
    if (!r.installed) { out('チケット台帳は入っていない (npx github:loogo-inc/cpos-kit tickets init で入る)。検査するものは無い'); return; }
    if (r.ok) { out(`tickets --check: OK (${r.tickets} 枚)`); return; }
    for (const p of r.problems) out(`  ✗ ${p}`);
    die(`tickets --check: ${r.problems.length} 件`, `番号の意味は ${T.TICKETS_DIR}/README.md の「決まり」`);
  }

  if (!T.isInstalled(cwd)) die('チケット台帳が入っていません', 'npx github:loogo-inc/cpos-kit tickets init --apply');
  const { tickets: all, errors } = T.loadTickets(cwd);
  writeFileSync(resolve(cwd, T.INDEX_FILE), T.renderIndex(all));
  out(`作り直しました: ${T.INDEX_FILE} (${all.length} 枚)`);
  for (const e of errors) out(`  ! ${e}`);
  if (errors.length) process.exitCode = 1;
}

// ---- main --------------------------------------------------------------
try {
  if (!cmd || cmd === 'help' || cmd === '--help' || cmd === '-h') help();
  else if (cmd === 'create') await create();
  else if (cmd === 'fake') await fake();
  else if (cmd === 'validate') await validate();
  else if (cmd === 'guide') { const p = resolve(process.cwd(), 'cpos.manifest.json'); const m = existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : {}; guide(m.appId ?? basename(process.cwd()), m.name ?? basename(process.cwd())); }
  else if (cmd === 'connect') await connect();
  else if (cmd === 'adopt') await adopt();
  else if (cmd === 'doctor') await doctor();
  else if (cmd === 'ui') uiCmd();
  else if (cmd === 'docs') await docs();
  else if (cmd === 'update') await update();
  else if (cmd === 'remove') await removeKit();
  else if (cmd === 'scopes') await scopesCmd();
  else if (cmd === 'tickets') await tickets();
  else if (cmd === 'token') await tokenGuide(resolve(process.cwd(), args[1] && !args[1].startsWith('--') ? args[1] : 'cpos.manifest.json'));
  else die(`知らないコマンド: ${cmd}`, 'npx github:loogo-inc/cpos-kit help');
} catch (e) {
  die(e.message);
}
