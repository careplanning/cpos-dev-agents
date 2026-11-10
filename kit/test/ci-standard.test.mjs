// 標準 CI の正本 (kit/ci/standard.json) と、kit が配る雛形 ci.yml が同じ手順であること。
// CPOS 側は同じ正本の写しで、自分が配る CI (node-app.yml と .ci/profile.json) を検査する。
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const standard = JSON.parse(readFileSync(resolve(root, 'kit/ci/standard.json'), 'utf8'));
const ci = readFileSync(resolve(root, 'kit/templates/base/.github/workflows/ci.yml'), 'utf8');

// ci.yml の steps を { name, run } の並びにする (uses の行は数えない)
function stepsOf(yaml) {
  const out = [];
  for (const block of yaml.split(/\n      - /).slice(1)) {
    const name = block.match(/^name: (.*)$/m)?.[1] ?? null;
    const run = block.match(/(?:^|\n\s*)run: (.*)$/m)?.[1];
    if (run !== undefined) out.push({ name, run });
  }
  return out;
}

test('雛形 ci.yml は標準 CI の手順そのもの (kit の validate は Install の直後)', () => {
  const expected = [];
  for (const s of standard.steps) {
    expected.push({ name: s.name, run: s.kitRun ?? s.run });   // kitRun = kit を入れたアプリでの書き方 (同じ検査を kit の中の写しで回す)
    for (const k of standard.kitSteps.filter((k) => k.after === s.name)) expected.push({ name: null, run: k.run });
  }
  assert.deepEqual(stepsOf(ci), expected);
  assert.match(ci, new RegExp(`node-version: '${standard.node}'`));
});

test('CPOS の Cloud Build の CI に移ったリポジトリでは雛形 ci.yml が動かない (同じ手順を二重に走らせない)', () => {
  assert.match(ci, /^    if: vars\.EXTERNAL_CI_ACTIVE != 'true'$/m);
  assert.match(ci, /cpos-kit が所有する/, 'update と remove が kit の CI と見分ける印');
});

// ── 2 つの時刻帯と、秘密・個人情報の検査 ──

// ci.yml の steps の env を { 手順の名前: { KEY: value } } にする
function envOf(yaml) {
  const out = {};
  for (const block of yaml.split(/\n      - /).slice(1)) {
    const name = block.match(/^name: (.*)$/m)?.[1];
    const env = block.match(/\n        env:\n((?: {10}[A-Z_]+: .*(?:\n|$))+)/)?.[1];
    if (name && env) out[name] = Object.fromEntries(env.trim().split('\n').map((l) => { const m = l.trim().match(/^([A-Z_]+): (.*)$/); return [m[1], m[2]]; }));
  }
  return out;
}
// Test の手順の時刻帯を調べ、足りない・時刻帯の無い・コマンドが違うものを問題として返す
function timezoneProblems(steps) {
  const tests = steps.filter((s) => /^Test\b/.test(s.name));
  const problems = [];
  const tz = tests.map((s) => s.env?.TZ ?? null);
  for (const want of ['Asia/Tokyo', 'UTC']) if (!tz.includes(want)) problems.push(`TZ=${want} の Test が無い`);
  if (tz.includes(null)) problems.push('時刻帯の無い Test がある');
  if (new Set(tests.map((s) => s.run)).size > 1) problems.push('Test の run が時刻帯で違う');
  return problems;
}

test('標準 CI は Test を 2 つの時刻帯 (Asia/Tokyo・UTC) で、同じコマンドで回す。雛形 ci.yml も同じ env', () => {
  assert.deepEqual(timezoneProblems(standard.steps), []);
  const env = envOf(ci);
  for (const s of standard.steps.filter((s) => s.env)) assert.deepEqual(env[s.name], s.env, `${s.name} の env`);
  assert.deepEqual(Object.keys(env).sort(), standard.steps.filter((s) => s.env).map((s) => s.name).sort(), '雛形にだけある env が無い');
  assert.deepEqual(standard.steps.filter((s) => /^Test\b/.test(s.name)).map((s) => s.run), ['npm run test --if-present', 'npm run test --if-present']);
});

test('失敗経路: 片方の時刻帯だけ・時刻帯の無い Test・違うコマンドは、上の検査で落ちる', () => {
  const run = 'npm run test --if-present';
  assert.deepEqual(timezoneProblems([{ name: 'Test', run, env: { TZ: 'Asia/Tokyo' } }]), ['TZ=UTC の Test が無い']);
  assert.deepEqual(timezoneProblems([{ name: 'Test', run }]), ['TZ=Asia/Tokyo の Test が無い', 'TZ=UTC の Test が無い', '時刻帯の無い Test がある']);
  assert.deepEqual(timezoneProblems([{ name: 'Test (Asia/Tokyo)', run, env: { TZ: 'Asia/Tokyo' } }, { name: 'Test (UTC)', run: 'npm test', env: { TZ: 'UTC' } }]), ['Test の run が時刻帯で違う']);
});

test('標準 CI に秘密と個人情報の検査がある。部品の正本は kit/ci にあり、kit を入れたアプリは kit の中の写しを、ほかは .ci/ の写しを回す', () => {
  const scan = standard.steps.find((s) => s.name === 'Secret and PII scan');
  assert.ok(scan, '秘密と個人情報の検査の段が無い');
  assert.equal(scan.source, 'kit/ci/secret-pii-scan.mjs');
  assert.ok(existsSync(resolve(root, scan.source)), '部品の正本が無い');
  assert.equal(scan.run, 'node .ci/secret-pii-scan.mjs');
  assert.equal(scan.kitRun, 'node node_modules/@cpos/kit/kit/ci/secret-pii-scan.mjs');
  // 依存を入れた直後 (kit の写しを読めるのは npm ci の後)、ほかの検査より前
  const names = standard.steps.map((s) => s.name);
  assert.equal(names.indexOf('Secret and PII scan'), names.indexOf('Install') + 1);
  assert.match(ci, /- name: Secret and PII scan\n        run: node node_modules\/@cpos\/kit\/kit\/ci\/secret-pii-scan\.mjs\n/);
});

test('手順を変えたので版が上がっている (CPOS の写しとのずれを版で見分ける)', () => {
  assert.match(standard.version, /^\d{4}-\d{2}-\d{2}\.\d+$/);
  assert.ok(standard.version > '2026-10-28.1', standard.version);
});
