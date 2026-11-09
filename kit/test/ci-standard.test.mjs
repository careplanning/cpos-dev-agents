// 標準 CI の正本 (kit/ci/standard.json) と、kit が配る雛形 ci.yml が同じ手順であること。
// CPOS 側は同じ正本の写しで、自分が配る CI (node-app.yml と .ci/profile.json) を検査する。
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
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
    expected.push({ name: s.name, run: s.run });
    for (const k of standard.kitSteps.filter((k) => k.after === s.name)) expected.push({ name: null, run: k.run });
  }
  assert.deepEqual(stepsOf(ci), expected);
  assert.match(ci, new RegExp(`node-version: '${standard.node}'`));
});

test('CPOS の Cloud Build の CI に移ったリポジトリでは雛形 ci.yml が動かない (同じ手順を二重に走らせない)', () => {
  assert.match(ci, /^    if: vars\.EXTERNAL_CI_ACTIVE != 'true'$/m);
  assert.match(ci, /cpos-kit が所有する/, 'update と remove が kit の CI と見分ける印');
});
