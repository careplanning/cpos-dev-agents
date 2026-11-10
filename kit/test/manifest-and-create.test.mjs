import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, existsSync, rmSync, writeFileSync, symlinkSync, lstatSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateManifest, readManifest } from '../manifest.js';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..', '..');

test('manifest: 最小の正しい形', () => {
  const r = validateManifest({ appId: 'transport', name: '送迎メモ', apiTokenScopes: ['app-data:transport:read'] });
  assert.deepEqual(r.errors, []);
  assert.deepEqual(r.warnings, []);
});

test('manifest: appId の形式と必須の欠けを日本語で言う', () => {
  const r = validateManifest({ appId: 'Bad ID', type: 'mobile' });
  assert.ok(r.errors.some((e) => e.startsWith('name:')));
  assert.ok(r.errors.some((e) => e.startsWith('appId:')));
  assert.ok(r.errors.some((e) => e.startsWith('type:')));
});

test('manifest: 他アプリの AppData スコープや http の url は注意になる', () => {
  const r = validateManifest({ appId: 'a', name: 'A', url: 'http://x', apiTokenScopes: ['app-data:b:read'] });
  assert.equal(r.ok, true);
  assert.equal(r.warnings.length, 2);
});

test('manifest: ワイルドカードのスコープは注意になる', () => {
  const r = validateManifest({ appId: 'a', name: 'A', apiTokenScopes: ['*', 'app-data:*', 'facilities:read'] });
  assert.equal(r.ok, true);
  assert.equal(r.warnings.filter((w) => /ワイルドカード/.test(w)).length, 2);
});

test('manifest: 既存アプリの実物が通る (CPOS_KIT_REAL_MANIFEST で場所を渡したときだけ)', () => {
  const p = process.env.CPOS_KIT_REAL_MANIFEST;
  if (!p || !existsSync(p)) return;
  const r = readManifest(p);
  assert.deepEqual(r.errors, [], r.errors.join('\n'));
});

test('create --yes で雛形ができて、manifest が通る', () => {
  const dir = mkdtempSync(join(tmpdir(), 'cpos-kit-'));
  try {
    const dest = join(dir, 'sample');
    execFileSync('node', [resolve(root, 'kit', 'bin', 'cpos-kit.mjs'), 'create', dest, '--name', '見本', '--app-id', 'sample', '--sample', 'node', '--yes'], { encoding: 'utf8' });
    for (const f of ['cpos.manifest.json', 'AGENTS.md', 'CLAUDE.md', 'docs/handoff/RESUME.md', '.claude/skills/cpos/SKILL.md', '.agents/skills/cpos/SKILL.md', '.cursor/rules/cpos.mdc', 'server.mjs', 'test/app.test.mjs', 'package.json']) {
      assert.ok(existsSync(join(dest, f)), `${f} が無い`);
    }
    const r = readManifest(join(dest, 'cpos.manifest.json'));
    assert.deepEqual(r.errors, []);
    const agents = readFileSync(join(dest, 'AGENTS.md'), 'utf8');
    assert.match(agents, /cpos-kit:begin/);
    assert.match(agents, /SAMPLE_CPOS_BASE_URL/);
    assert.ok(!agents.includes('{{'), 'テンプレートの置換漏れ');
    assert.ok(Buffer.byteLength(agents.slice(agents.indexOf('cpos-kit:begin'), agents.indexOf('cpos-kit:end'))) < 8 * 1024, '標準ブロックが 8KB を超えている');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('標準ブロックは、普通の長さの appId (30 字) と表示名 (10 字) で作っても 8KB 未満 (名前と ID は 7 か所に展開される)', () => {
  const dir = mkdtempSync(join(tmpdir(), 'cpos-kit-'));
  try {
    const appId = 'care-plan-assistant-for-office';   // 30 字
    assert.equal(appId.length, 30);
    const dest = join(dir, 'long');
    execFileSync('node', [resolve(root, 'kit', 'bin', 'cpos-kit.mjs'), 'create', dest, '--name', '送迎計画の見本アプリ', '--app-id', appId, '--sample', 'node', '--yes'], { encoding: 'utf8' });
    const agents = readFileSync(join(dest, 'AGENTS.md'), 'utf8');
    assert.ok(agents.includes(appId) && agents.includes('CARE_PLAN_ASSISTANT_FOR_OFFICE'), '名前と ID が展開されている');
    const size = Buffer.byteLength(agents.slice(agents.indexOf('cpos-kit:begin'), agents.indexOf('cpos-kit:end')));
    assert.ok(size < 8 * 1024, `標準ブロックが 8KB を超えている (${size} バイト)`);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('create は --sample none でも package.json を書く (無いと npm install が落ちる)', () => {
  // 実害 (2026-09-13、所有者の環境): package.json が無いフォルダで npm install すると、
  // npm が親をたどってホームの package.json / pnpm の node_modules を掴み、
  // npm 自身が "Cannot read properties of null (reading 'isDescendantOf')" で落ちた。
  const dir = mkdtempSync(join(tmpdir(), 'cpos-kit-none-'));
  execFileSync('node', [resolve(root, 'kit', 'bin', 'cpos-kit.mjs'), 'create', join(dir, 'app'), '--name', '見本なし', '--app-id', 'nosample', '--sample', 'none', '--kit-dep', 'git+file:///tmp/kit', '--yes'], { encoding: 'utf8' });
  const pkgPath = join(dir, 'app', 'package.json');
  assert.ok(existsSync(pkgPath), '--sample none でも package.json がある');
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  assert.equal(pkg.name, 'nosample');
  assert.equal(pkg.type, 'module');
  assert.ok(pkg.dependencies['@cpos/kit'], '@cpos/kit が依存に入っている');
  assert.ok(pkg.scripts.test, 'test スクリプトがある');
  rmSync(dir, { recursive: true, force: true });
});

test('create は既定で作業規律「止まる前に証拠」を入れる (AGENTS.md の節 + Claude の Stop hook)。--discipline no で入れない', () => {
  const dir = mkdtempSync(join(tmpdir(), 'cpos-kit-'));
  try {
    const yes = join(dir, 'yes');
    execFileSync('node', [resolve(root, 'kit', 'bin', 'cpos-kit.mjs'), 'create', yes, '--name', '規律あり', '--app-id', 'disc', '--sample', 'none', '--kit-dep', 'git+file:///tmp/kit', '--yes'], { encoding: 'utf8' });
    for (const f of ['AGENTS.md', '.cursor/rules/cpos.mdc', '.github/copilot-instructions.md']) {
      const t = readFileSync(join(yes, f), 'utf8');
      assert.match(t, /cpos-kit:discipline:begin/, `${f} に規律の節が無い`);
      assert.match(t, /止まる前に証拠/, `${f} に規律の本文が無い`);
    }
    const settings = JSON.parse(readFileSync(join(yes, '.claude/settings.json'), 'utf8'));
    const hook = settings.hooks?.Stop?.[0]?.hooks?.[0];
    assert.equal(hook?.type, 'prompt', 'Stop hook が prompt 型でない');
    assert.match(hook.prompt, /last_assistant_message/);
    assert.match(hook.prompt, /\$ARGUMENTS/);
    assert.ok(!hook.prompt.startsWith('<!--'), '審査文にコメント行が混ざっている');

    const no = join(dir, 'no');
    execFileSync('node', [resolve(root, 'kit', 'bin', 'cpos-kit.mjs'), 'create', no, '--name', '規律なし', '--app-id', 'nodisc', '--sample', 'none', '--discipline', 'no', '--kit-dep', 'git+file:///tmp/kit', '--yes'], { encoding: 'utf8' });
    assert.ok(!readFileSync(join(no, 'AGENTS.md'), 'utf8').includes('止まる前に証拠'));
    assert.equal(JSON.parse(readFileSync(join(no, '.claude/settings.json'), 'utf8')).hooks, undefined);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('adopt --apply は既存の AGENTS.md を残したまま、標準ブロックと作業規律を別マーカーで足す', () => {
  const dir = mkdtempSync(join(tmpdir(), 'cpos-kit-'));
  try {
    writeFileSync(join(dir, 'AGENTS.md'), '# AGENTS.md — 既存\n\n自分のルール\n');
    execFileSync('node', [resolve(root, 'kit', 'bin', 'cpos-kit.mjs'), 'adopt', '--app-id', 'old', '--name', '既存', '--apply'], { cwd: dir, encoding: 'utf8' });
    const t = readFileSync(join(dir, 'AGENTS.md'), 'utf8');
    assert.match(t, /自分のルール/);
    assert.match(t, /cpos-kit:begin/);
    assert.match(t, /cpos-kit:discipline:begin/);
    assert.equal(JSON.parse(readFileSync(join(dir, '.claude/settings.json'), 'utf8')).hooks.Stop[0].hooks[0].type, 'prompt');
    // 2 回目は何も足さない
    execFileSync('node', [resolve(root, 'kit', 'bin', 'cpos-kit.mjs'), 'adopt', '--app-id', 'old', '--name', '既存', '--apply'], { cwd: dir, encoding: 'utf8' });
    assert.equal((readFileSync(join(dir, 'AGENTS.md'), 'utf8').match(/cpos-kit:discipline:begin/g) || []).length, 1);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('create した中に .gitignore があり、.env を無視する (トークンのコミットを防ぐ)', () => {
  // 実害 (2026-09-13): npm はパッケージ内の .gitignore を配布時に取り除く (.npmignore に改名)。
  // そのため kit をインストールして使うと、生成物に .gitignore が無く、
  // cpos-kit connect が書いた .env (トークン入り) がコミットされる状態だった。
  const dir = mkdtempSync(join(tmpdir(), 'cpos-kit-gi-'));
  const dest = join(dir, 'app');
  execFileSync('node', [resolve(root, 'kit', 'bin', 'cpos-kit.mjs'), 'create', dest, '--name', 'gi', '--app-id', 'gi', '--sample', 'node', '--kit-dep', 'git+file:///tmp/kit', '--yes'], { encoding: 'utf8' });
  const gi = join(dest, '.gitignore');
  assert.ok(existsSync(gi), '.gitignore がある');
  const body = readFileSync(gi, 'utf8');
  assert.match(body, /^\.env$/m, '.env を無視する');
  assert.match(body, /^node_modules\/$/m);
  assert.match(body, /^!\.env\.example$/m, '.env.example は残す');
  assert.ok(!existsSync(join(dest, 'gitignore')), 'gitignore (ドット無し) は残さない');
  rmSync(dir, { recursive: true, force: true });
});

test('create --sample fastify は Fastify + ログイン付きの見本を作り、--guide はフラグでも動く', () => {
  // 実験 12 (2026-09-13): Fastify 指定の依頼で両者が雛形を捨てて自作し、ログイン部品も自作した。所有者「手順は --guide で見られるはず」→ 動かなかった
  const dir = mkdtempSync(join(tmpdir(), 'cpos-kit-'));
  try {
    const dest = join(dir, 'fx');
    execFileSync('node', [resolve(root, 'kit', 'bin', 'cpos-kit.mjs'), 'create', dest, '--name', '見本F', '--app-id', 'sample-f', '--sample', 'fastify', '--kit-dep', 'git+file:///tmp/kit', '--yes'], { encoding: 'utf8' });
    for (const f of ['server.mjs', 'dev.mjs', 'test/app.test.mjs', 'scripts/verify-staging.mjs', 'package.json', 'cpos.manifest.json']) assert.ok(existsSync(join(dest, f)), `${f} が無い`);
    const pkg = JSON.parse(readFileSync(join(dest, 'package.json'), 'utf8'));
    assert.ok(pkg.dependencies.fastify, 'fastify が依存にある');
    assert.equal(pkg.scripts['verify:staging'], 'node --env-file-if-exists=.env scripts/verify-staging.mjs');
    assert.equal(pkg.scripts.guide, 'cpos-kit guide', 'npx が使えない環境向けに npm run に畳んである');
    const server = readFileSync(join(dest, 'server.mjs'), 'utf8');
    assert.match(server, /fastifyLoginGate/);
    assert.match(server, /SAMPLE_F_APPDATA_APP_ID/);
    for (const f of ['server.mjs', 'dev.mjs', 'test/app.test.mjs', 'scripts/verify-staging.mjs']) assert.ok(!readFileSync(join(dest, f), 'utf8').includes('{{'), `${f}: テンプレートの置換漏れ`);
    const guide = execFileSync('node', [resolve(root, 'kit', 'bin', 'cpos-kit.mjs'), '--guide'], { cwd: dest, encoding: 'utf8' });
    assert.match(guide, /sample-f/);
    assert.match(guide, /fastifyLoginGate/);
    assert.match(guide, /SAMPLE_F_APPDATA_APP_ID/);
    assert.match(guide, /verify:staging/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('adopt: 偶然同名の自前ファイル (skills/cpos, docs/cpos/README.md, settings.json, CLAUDE.md) を持つ既存プロジェクトに、上書きせずに入る', () => {
  const dir = mkdtempSync(join(tmpdir(), 'cpos-kit-'));
  const cli = resolve(root, 'kit', 'bin', 'cpos-kit.mjs');
  const run = (...a) => execFileSync('node', [cli, 'adopt', ...a], { cwd: dir, encoding: 'utf8' });
  try {
    mkdirSync(join(dir, '.claude/skills/cpos'), { recursive: true });
    mkdirSync(join(dir, '.claude/skills/deploy'), { recursive: true });
    mkdirSync(join(dir, 'docs/cpos'), { recursive: true });
    const own = {
      '.claude/skills/cpos/SKILL.md': '---\nname: cpos\n---\n自前の古いメモ\n',
      '.claude/skills/deploy/SKILL.md': '---\nname: deploy\n---\ngcloud\n',
      '.claude/settings.json': '{ "hooks": { "PostToolUse": [] } }\n',
      'docs/cpos/README.md': '# 社内メモ\n',
      'CLAUDE.md': '# 自前\n- テストは npm test\n',
      'cpos.manifest.json': '{ "appId": "legacy_old", "name": "レガシー" }\n'
    };
    for (const [f, t] of Object.entries(own)) writeFileSync(join(dir, f), t);
    const preview = run();
    // 中身が kit のものと違う同名ファイルは名指しで知らせる (settings.json は中身が違って当然なので言わない)
    assert.match(preview, /\.claude\/skills\/cpos\/SKILL\.md  \(! kit のものと中身が違う/);
    assert.match(preview, /docs\/cpos\/README\.md  \(! kit のものと中身が違う/);
    assert.doesNotMatch(preview, /settings\.json  \(!/);
    assert.match(preview, /CLAUDE\.md: 既にあるので末尾に「@AGENTS\.md」/);
    for (const [f, t] of Object.entries(own)) assert.equal(readFileSync(join(dir, f), 'utf8'), t, `${f} が一覧だけで変わった`);
    run('--apply');
    // 自前のものは 1 バイトも変わらない。CLAUDE.md だけ @AGENTS.md の 1 行が末尾に足される
    for (const [f, t] of Object.entries(own)) if (f !== 'CLAUDE.md') assert.equal(readFileSync(join(dir, f), 'utf8'), t, `${f} が変わった`);
    assert.equal(readFileSync(join(dir, 'CLAUDE.md'), 'utf8'), '# 自前\n- テストは npm test\n\n@AGENTS.md\n');
    // manifest の appId で標準ブロックが書かれる。skill は空いていた場所にだけ入る
    assert.match(readFileSync(join(dir, 'AGENTS.md'), 'utf8'), /appId `legacy_old`/);
    assert.ok(existsSync(join(dir, '.agents/skills/cpos/SKILL.md')));
    assert.match(readFileSync(join(dir, '.agents/skills/cpos/SKILL.md'), 'utf8'), /^---\nname: cpos\n/);
    // --show は kit が書く中身。2 回目の --apply は何も足さない
    assert.match(run('--show', '.claude/skills/cpos/SKILL.md'), /^---\nname: cpos\n/);
    assert.doesNotMatch(run('--apply'), /書きました|追記しました/);
    // --replace: 見比べた上で、そのファイルだけ kit のもので置き換える。他の自前ファイルは変わらない
    const rep = run('--apply', '--replace', '.claude/skills/cpos/SKILL.md');
    assert.match(rep, /置き換えました: \.claude\/skills\/cpos\/SKILL\.md/);
    assert.equal(readFileSync(join(dir, '.claude/skills/cpos/SKILL.md'), 'utf8'), readFileSync(join(dir, '.agents/skills/cpos/SKILL.md'), 'utf8'));
    assert.equal(readFileSync(join(dir, '.claude/skills/deploy/SKILL.md'), 'utf8'), own['.claude/skills/deploy/SKILL.md']);
    assert.equal(readFileSync(join(dir, 'docs/cpos/README.md'), 'utf8'), own['docs/cpos/README.md']);
    assert.doesNotMatch(run('--apply'), /書きました|追記しました|置き換えました/);
    // 知らないパス・まだ無いパスは止まる
    assert.throws(() => run('--apply', '--replace', 'nope.md'), /--replace に渡せるのは/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('adopt: symlink と同名の罠 — CLAUDE.md→AGENTS.md の symlink、プロジェクト外へのスキル symlink、旧式 commands/cpos.md、.cursor/ の有無', () => {
  const dir = mkdtempSync(join(tmpdir(), 'cpos-kit-'));
  const shared = mkdtempSync(join(tmpdir(), 'cpos-kit-shared-'));
  const cli = resolve(root, 'kit', 'bin', 'cpos-kit.mjs');
  const run = (...a) => execFileSync('node', [cli, 'adopt', '--app-id', 'x', '--name', 'X', ...a], { cwd: dir, encoding: 'utf8' });
  try {
    // A: CLAUDE.md -> AGENTS.md (よくある共有)。@AGENTS.md を足すと自分自身を指す 1 行になるので足さない
    writeFileSync(join(dir, 'AGENTS.md'), '# 自前\n');
    symlinkSync('AGENTS.md', join(dir, 'CLAUDE.md'));
    // C: .claude/skills/cpos -> プロジェクト外の共有置き場。書き換えてはいけない
    mkdirSync(join(shared, 'cpos'), { recursive: true });
    writeFileSync(join(shared, 'cpos/SKILL.md'), '---\nname: cpos\n---\n共有\n');
    mkdirSync(join(dir, '.claude/skills'), { recursive: true });
    symlinkSync(join(shared, 'cpos'), join(dir, '.claude/skills/cpos'));
    // D: 旧式コマンドと同名
    mkdirSync(join(dir, '.claude/commands'), { recursive: true });
    writeFileSync(join(dir, '.claude/commands/cpos.md'), '古い\n');
    // G: Cursor を使っている
    mkdirSync(join(dir, '.cursor/rules'), { recursive: true });
    // F: ルートに手書きの SKILLS.md 索引。kit は書かないが、cpos の行が無いことは知らせる
    writeFileSync(join(dir, 'SKILLS.md'), '# SKILLS\n- deploy\n');

    const preview = run();
    assert.match(preview, /SKILLS\.md .*cpos の行が無い/);
    assert.match(preview, /CLAUDE\.md: AGENTS\.md と同じファイル \(symlink\)/);
    assert.match(preview, /commands\/cpos\.md .*名前が被る/);
    assert.match(preview, /\+ \.cursor\/rules\/cpos\.mdc/);
    const applied = run('--apply');
    assert.doesNotMatch(readFileSync(join(dir, 'AGENTS.md'), 'utf8'), /^@AGENTS\.md/m);
    assert.ok(lstatSync(join(dir, 'CLAUDE.md')).isSymbolicLink());
    assert.match(readFileSync(join(dir, '.cursor/rules/cpos.mdc'), 'utf8'), /alwaysApply: true[\s\S]*cpos-kit:begin[\s\S]*止まる前に証拠/);
    // 共有物は --replace でも書かない
    const rep = run('--apply', '--replace', '.claude/skills/cpos/SKILL.md');
    assert.match(rep, /symlink でプロジェクトの外/);
    assert.doesNotMatch(rep, /置き換えました/);
    assert.equal(readFileSync(join(shared, 'cpos/SKILL.md'), 'utf8'), '---\nname: cpos\n---\n共有\n');
    assert.doesNotMatch(applied, /置き換えました/);
    assert.equal(readFileSync(join(dir, 'SKILLS.md'), 'utf8'), '# SKILLS\n- deploy\n');
    writeFileSync(join(dir, 'SKILLS.md'), '# SKILLS\n- deploy\n- cpos\n');
    assert.doesNotMatch(run(), /SKILLS\.md/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
    rmSync(shared, { recursive: true, force: true });
  }
});
