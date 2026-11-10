// 接続先: 原則は模擬サーバ (架空データ)。ステージングは明示したときだけで、そのとき「本番の写し」と注意を出す。
// ステージングが架空データに置き換わるまでの措置。置き換わったら、この試験ごと「原則はステージング」に戻す。
// create が .env を書き、dev.mjs がモードを出す。
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, writeFileSync, symlinkSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn, spawnSync } from 'node:child_process';
import { createServer } from 'node:net';
import { connectionMode } from '../client.js';


const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const cli = resolve(root, 'kit', 'bin', 'cpos-kit.mjs');
const run = (cwd, ...a) => spawnSync(process.execPath, [cli, ...a], { cwd, encoding: 'utf8' });
const linkKit = (dir) => { mkdirSync(join(dir, 'node_modules', '@cpos'), { recursive: true }); symlinkSync(root, join(dir, 'node_modules', '@cpos', 'kit')); };
// 空いているポート。番号を固定すると、テストを同時に 2 本流したとき (別セッション・CI) にぶつかる
const freePort = () => new Promise((res, rej) => { const s = createServer(); s.once('error', rej); s.listen(0, '127.0.0.1', () => { const { port } = s.address(); s.close(() => res(port)); }); });
const devLog = async (dir, ...extra) => { const fakePort = await freePort(); return new Promise((res) => {
  const p = spawn(process.execPath, ['--env-file-if-exists=.env', 'dev.mjs', ...extra], { cwd: dir, env: { ...process.env, PORT: '0', FAKE_PORT: String(fakePort) }, stdio: ['ignore', 'pipe', 'pipe'] });
  let out = '', settled = false; const timer = setTimeout(() => done('timeout'), 8000);
  const done = (code) => { if (settled) return; settled = true; clearTimeout(timer); try { p.kill('SIGKILL'); } catch {} res({ out, code }); };
  p.stdout.on('data', (d) => { out += d; if (/接続先:/.test(out) && /http:\/\/127\.0\.0\.1:\d+/.test(out.split('接続先:')[1] ?? '')) setTimeout(() => done(null), 200); });
  p.stderr.on('data', (d) => { out += d; });
  p.on('exit', (code) => done(code));
}); };

test('connectionMode: https はステージング、127.0.0.1 / localhost は模擬、--mock は常に模擬、空は unset', () => {
  assert.equal(connectionMode({ baseUrl: 'https://cpos.example', argv: [] }), 'staging');
  assert.equal(connectionMode({ baseUrl: 'http://127.0.0.1:4300', argv: [] }), 'mock');
  assert.equal(connectionMode({ baseUrl: 'http://localhost:4311/', argv: [] }), 'mock');
  assert.equal(connectionMode({ baseUrl: 'https://cpos.example', argv: ['node', 'dev.mjs', '--mock'] }), 'mock');
  assert.equal(connectionMode({ baseUrl: '', argv: [] }), 'unset');
});

test('create --yes (URL 無し) は模擬を選び、.env に模擬の接続先と「後で connect」の案内を書く', () => {
  const dir = join(mkdtempSync(join(tmpdir(), 'cpos-kit-mode-')), 'app');
  const r = run(tmpdir(), 'create', dir, '--name', 'm', '--app-id', 'm', '--sample', 'node', '--yes', '--kit-dep', 'github:example/cpos-kit');
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /接続先: 模擬サーバ/); assert.match(r.stdout, /connect → npm run dev/);
  const env = readFileSync(join(dir, '.env'), 'utf8');
  assert.match(env, /^M_CPOS_BASE_URL=http:\/\/127\.0\.0\.1:4300$/m); assert.match(env, /connect/);
  assert.match(readFileSync(join(dir, 'package.json'), 'utf8'), /"dev:mock"/);
});

// 「原則はステージング」の言い方 (原則ステージング / 原則はステージング / ステージング … (原則 / ステージング [原則])
const STAGING_PRINCIPLE = /原則は?ステージング|ステージング[^\n。]{0,30}[(（[]原則/;
const walkFiles = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? (e.name === 'node_modules' ? [] : walkFiles(join(d, e.name))) : [join(d, e.name)]));
// ステージングにつなぐ入口で出す注意 (create の staging・connect・token)
const STAGING_WARNING = /★ 注意: いまのステージングは本番の写し/;

test('create (接続先の指定なし・--yes なし・端末でない) は模擬サーバを既定に選ぶ。ステージングを経由せず、注意も出さない', () => {
  const base = mkdtempSync(join(tmpdir(), 'cpos-kit-mode-'));
  const r = run(base, 'create', join(base, 'd1'), '--name', 'd', '--app-id', 'd1', '--sample', 'node', '--kit-dep', 'github:example/cpos-kit');
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.match(r.stdout, /接続先: 模擬サーバ/);
  assert.doesNotMatch(r.stdout, /URL かトークンが無いので/, '既定がステージングだと、URL を聞いてから模擬に倒れる (回り道)');
  assert.doesNotMatch(r.stdout + r.stderr, STAGING_WARNING, '模擬サーバのときは注意を出さない');
  assert.match(readFileSync(join(base, 'd1', '.env'), 'utf8'), /^D1_CPOS_BASE_URL=http:\/\/127\.0\.0\.1:4300$/m);
});

test('create が配る文 (標準ブロック・スキル・案内) は「原則は模擬サーバ」。「原則ステージング」が残っていたら落ちる', () => {
  const base = mkdtempSync(join(tmpdir(), 'cpos-kit-mode-'));
  for (const sample of ['node', 'fastify', 'none']) {
    const dir = join(base, `p-${sample}`);
    const r = run(base, 'create', dir, '--name', 'p', '--app-id', 'p', '--sample', sample, '--yes', '--kit-dep', 'github:example/cpos-kit');
    assert.equal(r.status, 0, r.stdout + r.stderr);
    assert.doesNotMatch(r.stdout, STAGING_PRINCIPLE, `${sample}: create の案内`);
    for (const f of ['AGENTS.md', '.cursor/rules/cpos.mdc', '.github/copilot-instructions.md', '.claude/skills/cpos/SKILL.md', '.agents/skills/cpos/SKILL.md']) {
      assert.doesNotMatch(readFileSync(join(dir, f), 'utf8'), STAGING_PRINCIPLE, `${sample}: ${f}`);
    }
    // 雛形 (README・.env.example・dev.mjs など) を含め、作ったフォルダのどのファイルにも残さない
    for (const f of walkFiles(dir)) assert.doesNotMatch(readFileSync(f, 'utf8'), STAGING_PRINCIPLE, `${sample}: ${f.slice(dir.length + 1)}`);
    assert.match(readFileSync(join(dir, 'AGENTS.md'), 'utf8'), /原則は模擬サーバ/, `${sample}: 標準ブロックに新しい原則`);
    assert.match(readFileSync(join(dir, '.claude/skills/cpos/SKILL.md'), 'utf8'), /原則は模擬サーバ/, `${sample}: スキル §5`);
    // 雛形の README の「本物の CPOS につなぐとき」にも、いまは本番の写しと書く
    const readme = readFileSync(join(dir, 'README.md'), 'utf8');
    assert.match(readme.slice(readme.indexOf('## 本物の CPOS につなぐとき')), /^\*\*いまのステージングは本番の写し。\*\*/m, `${sample}: README`);
    // 模擬サーバに無い API (501) を「自分でステージングで確かめる」と教えない (確認は担当者に頼む)
    for (const f of ['AGENTS.md', '.claude/skills/cpos/SKILL.md', 'docs/cpos/README.md']) {
      const text = readFileSync(join(dir, f), 'utf8');
      assert.doesNotMatch(text, /(ステージング\)?) ?で確かめる/, `${sample}: ${f} の 501 の案内`);
      // 501 の行で、ステージングにつないで自分で確かめるよう案内しない (担当者に頼む)
      for (const l of text.split('\n').filter((x) => /501/.test(x))) assert.doesNotMatch(l, /ステージング[^。\n]{0,20}確かめる|verify:staging/, `${sample}: ${f} の 501 の行`);
    }
  }
  const g = run(join(base, 'p-node'), 'guide');
  assert.equal(g.status, 0, g.stdout + g.stderr);
  assert.doesNotMatch(g.stdout, STAGING_PRINCIPLE, 'guide'); assert.match(g.stdout, /原則は模擬サーバ/); assert.match(g.stdout, /ステージングは本番の写し/, 'guide の【4】に注意');
  // kit の正本 (配る文と利用者向けの案内) にも残さない。公開版の README は正本では保守の道具のフォルダにある (公開ツリーには無い)
  const sources = ['kit/agents/standard-block.md', 'skills/cpos/SKILL.md', 'kit/bin/cpos-kit.mjs', 'kit/client.js', 'ADOPT.md', 'README.md', join('sync', 'public', 'README.md')];
  for (const f of sources.filter((x) => existsSync(join(root, x)))) {
    assert.doesNotMatch(readFileSync(join(root, f), 'utf8'), STAGING_PRINCIPLE, f);
  }
});

// 模擬サーバは別プロセスで (テストプロセス内で起動すると、spawnSync の間に応答できず固まる)
async function fakeProcess(port) {
  const p = spawn(process.execPath, [cli, 'fake', '--port', String(port)], { stdio: ['ignore', 'pipe', 'pipe'] });
  const baseUrl = `http://127.0.0.1:${port}`;
  for (let i = 0; i < 50; i++) { try { const r = await fetch(`${baseUrl}/api/platform/me`, { headers: { Authorization: 'Bearer cpos_app_x' } }); if (r.ok) return { baseUrl, close: () => { try { p.kill('SIGKILL'); } catch {} } }; } catch {} await new Promise((r) => setTimeout(r, 100)); }
  try { p.kill('SIGKILL'); } catch {}
  throw new Error('模擬サーバが起動しない');
}

test('失敗経路: ステージングは明示したときだけ。そのときは必ず「いまのステージングは本番の写し」と注意を出す (出なければ落ちる)', async () => {
  const fake = await fakeProcess(await freePort());
  try {
    const base = mkdtempSync(join(tmpdir(), 'cpos-kit-mode-'));
    const tf = join(base, 'tk.txt'); writeFileSync(tf, 'cpos_app_stagingtest\n');
    // --connect staging + URL + トークン → ステージング。注意が出る
    let r = run(base, 'create', join(base, 'w1'), '--name', 'w', '--app-id', 'w1', '--sample', 'node', '--yes', '--connect', 'staging', '--url', fake.baseUrl, '--token-file', tf, '--kit-dep', 'github:example/cpos-kit');
    assert.equal(r.status, 0, r.stdout + r.stderr);
    assert.match(r.stdout, /接続先: ステージング/); assert.match(r.stdout, STAGING_WARNING);
    assert.match(readFileSync(join(base, 'w1', '.env'), 'utf8'), new RegExp(`^W1_CPOS_BASE_URL=${fake.baseUrl.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')}$`, 'm'));
    // --connect staging だけ (URL が無い) → 注意を出してから模擬に倒す
    r = run(base, 'create', join(base, 'w2'), '--name', 'w', '--app-id', 'w2', '--sample', 'node', '--yes', '--connect', 'staging', '--kit-dep', 'github:example/cpos-kit');
    assert.equal(r.status, 0, r.stdout + r.stderr);
    assert.match(r.stdout, STAGING_WARNING); assert.match(r.stdout, /接続先: 模擬サーバ/);
    // --connect mock は、URL を渡しても模擬。注意は出さない
    r = run(base, 'create', join(base, 'w3'), '--name', 'w', '--app-id', 'w3', '--sample', 'node', '--yes', '--connect', 'mock', '--kit-dep', 'github:example/cpos-kit');
    assert.equal(r.status, 0, r.stdout + r.stderr);
    assert.doesNotMatch(r.stdout + r.stderr, STAGING_WARNING); assert.match(r.stdout, /接続先: 模擬サーバ/);
    // 後から connect でつなぐときも、token で取り方を見るときも注意が出る
    r = run(join(base, 'w3'), 'connect', '--url', fake.baseUrl, '--token-file', tf);
    assert.equal(r.status, 0, r.stdout + r.stderr); assert.match(r.stdout, STAGING_WARNING); assert.match(r.stdout, /\.env に書きました/);
    r = run(join(base, 'w3'), 'token');
    assert.equal(r.status, 0, r.stdout + r.stderr); assert.match(r.stdout, STAGING_WARNING);
  } finally { fake.close(); }
});

test('create --url --token-file はステージングを .env に書く (疎通とスコープを確かめてから)。dev.mjs はモードを出す', async () => {
  const fake = await fakeProcess(await freePort());
  try {
    const base = join(mkdtempSync(join(tmpdir(), 'cpos-kit-mode-')));
    const tf = join(base, 'tk.txt'); writeFileSync(tf, 'cpos_app_stagingtest\n');
    const dir = join(base, 'app');
    const r = run(base, 'create', dir, '--name', 's', '--app-id', 's', '--sample', 'node', '--yes', '--kit-dep', 'github:example/cpos-kit', '--url', fake.baseUrl, '--token-file', tf);
    assert.equal(r.status, 0, r.stdout + r.stderr);
    assert.match(r.stdout, /つながりました/); assert.match(r.stdout, /接続先: ステージング/);
    const env = readFileSync(join(dir, '.env'), 'utf8');
    assert.match(env, new RegExp(`^S_CPOS_BASE_URL=${fake.baseUrl.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')}$`, 'm'));
    assert.ok(!/cpos_app_stagingtest/.test(r.stdout), 'トークンの値は画面に出さない');
    // dev.mjs: 127.0.0.1 の URL なので (テストでは) 模擬扱いになる。--mock は常に模擬。
    linkKit(dir);
    const a = await devLog(dir, '--mock'); assert.match(a.out, /接続先: 模擬サーバ/, a.out);
    // ステージングの URL に見せかけると (実在しない host)、模擬サーバを起動せずステージング表示で起動する
    writeFileSync(join(dir, '.env'), `S_CPOS_BASE_URL=https://cpos.invalid\nS_CPOS_APP_TOKEN=cpos_app_x\nS_ALLOW_UNAUTHENTICATED=1\n`);
    const b = await devLog(dir); assert.match(b.out, /接続先: ステージング https:\/\/cpos\.invalid/, b.out); assert.ok(!/接続先: 模擬サーバ/.test(b.out), '模擬サーバは起動していない');
    // .env が無い → 案内して止まる
    writeFileSync(join(dir, '.env'), 'PORT=0\n');
    const c = await devLog(dir); assert.match(c.out, /接続先が未設定/); assert.equal(c.code, 2);
    assert.ok(existsSync(dir));
  } finally { fake.close(); }
});

test('create: staging を選んでも URL が無ければ模擬に倒す。URL が間違っていてもアプリは残り、.env は書かず、次の手を案内する', () => {
  const base = mkdtempSync(join(tmpdir(), 'cpos-kit-mode-'));
  // 非対話 (ask は既定値 = 空) で staging → 模擬に倒す
  let r = run(base, 'create', join(base, 'a1'), '--name', 'a', '--app-id', 'a1', '--sample', 'node', '--yes', '--connect', 'staging', '--kit-dep', 'github:example/cpos-kit');
  assert.equal(r.status, 0, r.stdout + r.stderr); assert.match(r.stdout, /模擬サーバで作ります/); assert.match(readFileSync(join(base, 'a1', '.env'), 'utf8'), /127\.0\.0\.1:4300/);
  // つながらない URL → アプリは残る、.env は無い、終了コード 0、connect の案内
  const tf = join(base, 'tk.txt'); writeFileSync(tf, 'cpos_app_x\n');
  r = run(base, 'create', join(base, 'a2'), '--name', 'a', '--app-id', 'a2', '--sample', 'node', '--yes', '--url', 'http://127.0.0.1:1', '--token-file', tf, '--kit-dep', 'github:example/cpos-kit');
  assert.equal(r.status, 0, r.stdout + r.stderr); assert.match(r.stdout, /接続できませんでした/); assert.match(r.stdout, /connect/); assert.match(r.stdout, /接続先: 未設定/);
  assert.ok(existsSync(join(base, 'a2', 'cpos.manifest.json'))); assert.ok(!existsSync(join(base, 'a2', '.env')));
  // 中身のあるフォルダには作らず、消し方を案内
  r = run(base, 'create', join(base, 'a2'), '--name', 'a', '--app-id', 'a2', '--yes', '--kit-dep', 'github:example/cpos-kit');
  assert.notEqual(r.status, 0); assert.match(r.stdout + r.stderr, /空ではありません/); assert.match(r.stdout + r.stderr, /rm -rf/);
});
