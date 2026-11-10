// 秘密と個人情報の検査 (kit/ci/secret-pii-scan.mjs) の端の場合: 出力に値を出さない・括弧で囲んだ電話・JWT の見出しと中身の書き方。
// 試験で使う秘密・番号の形は、このファイルに字面で残らないよう実行時に組み立てる (このファイルも配布物で、検査の対象になるため)。
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { nameNeedsMask, scanText } from '../ci/secret-pii-scan.mjs';

const script = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'ci', 'secret-pii-scan.mjs');
const run = (cwd, ...args) => spawnSync(process.execPath, [script, ...args], { cwd, encoding: 'utf8' });
const rep = (c, n) => c.repeat(n);
const digits = (n, start = 1) => Array.from({ length: n }, (_, i) => String((start + i) % 10)).join('');
const kindsOf = (text) => scanText(text).map((f) => f.kind);
const token = 'cpos_' + 'pat_' + rep('Q', 43);

test('失敗経路: 許可の一覧の名前・--root のフォルダに値の形があっても、どの出力にも出さない。読めないフォルダは例外の文や場所を出さずに 2', () => {
  const dir = mkdtempSync(join(tmpdir(), 'cpos-kit-scan-'));
  mkdirSync(join(dir, '.ci'));
  writeFileSync(join(dir, 'a.txt'), 'x' + '@mail.example-corp.jp\n');
  // 許可の一覧の名前に値の形: 読めた・壊れている・無い の 3 通り
  const allow = `.ci/allow-${token}.json`;
  writeFileSync(join(dir, allow), JSON.stringify({ allow: [{ path: 'a.txt', kind: 'phone-number', count: 1 }] }));
  let r = run(dir, '--allow', allow);
  assert.equal(r.status, 1, r.stdout + r.stderr);
  assert.ok(!(r.stdout + r.stderr).includes(token), '許可の一覧の名前が出ている (落ちたとき)');
  writeFileSync(join(dir, allow), '{ broken');
  r = run(dir, '--allow', allow);
  assert.equal(r.status, 2);
  assert.ok(!(r.stdout + r.stderr).includes(token), '許可の一覧の名前が出ている (壊れているとき)');
  // 無いフォルダ: ENOENT の例外の文・スタック・場所を出さない
  const missing = join(dir, `no-${token}`);
  r = run(dir, '--root', missing);
  assert.equal(r.status, 2, r.stdout + r.stderr);
  assert.ok(!(r.stdout + r.stderr).includes(token), '場所が出ている');
  assert.doesNotMatch(r.stdout + r.stderr, /ENOENT: |at .*\.mjs:\d+|readdirSync/, '例外の文かスタックが出ている');
  assert.match(r.stdout + r.stderr, /読めなかった/);
});

test('電話: 番号全体を括弧で囲んだものも見る。市外局番だけの括弧で長すぎるもの・囲みの中が長すぎるものは見ない', () => {
  for (const ok of ['(0' + '90-' + digits(4) + '-' + digits(4, 5) + ')', '（' + '0' + '3-' + digits(4) + '-' + digits(4, 6) + '）', '(0' + '3)' + digits(4) + '-' + digits(4, 6), '(0' + '3) ' + digits(4) + ' ' + digits(4, 6)]) {
    assert.deepEqual(kindsOf(`tel ${ok}`), ['phone-number'], ok);
  }
  for (const ng of ['(0' + '3) ' + digits(4) + ' ' + digits(5), '(0' + '90-' + digits(4) + '-' + digits(4) + '-' + digits(1) + ')', '(2026-11-10)', '(v0.13.0)']) {
    assert.deepEqual(kindsOf(ng), [], ng);
  }
});

test('JWT: 中身が空のオブジェクト ({} = e30)、見出し・中身に空白や改行を含む JSON も見る。解けないもの・alg の無い見出しは見ない', () => {
  const enc = (s) => Buffer.from(s).toString('base64url');
  const sig = rep('x', 43);
  for (const [h, p] of [
    ['{"alg":"HS256","typ":"JWT"}', '{}'],
    ['{ "alg": "HS256" }', '{ "iat": 1 }'],
    [JSON.stringify({ alg: 'RS256' }, null, 1), JSON.stringify({ sub: 'syn_a' }, null, 2)],
  ]) assert.deepEqual(kindsOf(`t=${enc(h)}.${enc(p)}.${sig}`), ['jwt'], `${h} / ${p}`);
  assert.deepEqual(kindsOf(`${enc('{}')}.${enc('{}')}.${sig}`), [], 'alg の無い見出し');
  assert.deepEqual(kindsOf('kit.api.json と process.env.CPOS と www.example.com と e30.e30.x'), []);
});

// ── 作り直し 4 回目 (島﨑の許可): 読み取りの失敗・JSON の前の空白・語の境の無い名前 ──
const NL = String.fromCharCode(10);

test('失敗経路: 一覧にあるのに読めないファイル (I/O の失敗) は、意図して見ないもの (バイナリ) と分けて数え、値を含まない説明で終了 2', () => {
  const dir = mkdtempSync(join(tmpdir(), 'cpos-kit-scan-'));
  const git = (...a) => spawnSync('git', ['-C', dir, ...a], { encoding: 'utf8' });
  assert.equal(git('init', '-q').status, 0);
  writeFileSync(join(dir, 'ok.txt'), 'fine' + NL);
  writeFileSync(join(dir, 'pic.bin'), Buffer.from([0x89, 0x00, 0x01, 0x00]));
  const gone = `gone_${token}.txt`;
  writeFileSync(join(dir, gone), 'x' + NL);
  assert.equal(git('add', '.').status, 0);
  rmSync(join(dir, gone));   // git の一覧にはあるが、作業ツリーで読めない
  const r = run(dir);
  assert.equal(r.status, 2, r.stdout + r.stderr);
  assert.match(r.stdout + r.stderr, /読めなかった 1 ファイル/);
  assert.match(r.stdout, /見なかった 1 ファイル/);
  assert.match(r.stdout, /pic\.bin \(テキストとして読めない\)/);
  assert.ok(!(r.stdout + r.stderr).includes(token), '名前の中の値が出ている');
  assert.doesNotMatch(r.stdout + r.stderr, /ENOENT: |at .*\.mjs:\d+/);
});

test('JWT: 見出しの { の前に空白、中身の { の前に改行があっても見る (base64url の 3 区画を解いて JSON と alg で絞る)', () => {
  const enc = (s) => Buffer.from(s).toString('base64url');
  const sig = rep('x', 43);
  const jwt = enc(' {"alg":"HS256"}') + '.' + enc(NL + '{"iat":1}') + '.' + sig;
  assert.deepEqual(kindsOf(`t=${jwt}`), ['jwt']);
  assert.deepEqual(kindsOf(`end ${jwt}.`), ['jwt'], '文の終わりの句点の前');
  assert.deepEqual(kindsOf('a.b.c と index.test.mjs と 1.2.3'), []);
});

test('ファイルや許可の一覧の名前は、語の境が無くても (_ の直後のトークンなど) 伏せる。ふつうの名前は伏せない', () => {
  const dir = mkdtempSync(join(tmpdir(), 'cpos-kit-scan-'));
  mkdirSync(join(dir, '.ci'));
  const notes = `notes_${token}.md`;
  writeFileSync(join(dir, notes), 'y' + '@mail.example-corp.jp' + NL);
  writeFileSync(join(dir, 'plain_name.md'), 'z' + '@mail.example-corp.jp' + NL);
  const allow = `.ci/allow_${token}.json`;
  writeFileSync(join(dir, allow), JSON.stringify({ allow: [{ path: 'plain_name.md', kind: 'phone-number', count: 1 }] }));
  const r = run(dir, '--allow', allow);
  assert.equal(r.status, 1, r.stdout + r.stderr);
  assert.ok(!(r.stdout + r.stderr).includes(token), '名前の中の値が出ている');
  assert.match(r.stdout, /<伏せたパス \d+>:1 email/);
  assert.match(r.stdout, /<伏せた許可の一覧の名前>/);
  assert.match(r.stdout, /plain_name\.md:1 email/, 'ふつうの名前は出す');
});

// ── 作り直し 4 回目の続き: 名前の伏せは「拡張子を外し、区切りで区切った名前に本文と同じ検査」 ──
test('名前の伏せ: JWT・括弧つきの電話・+81 (市外局番) を含む名前は伏せる。ふつうの英語の長い名前・ハッシュ・日付と語の名前は伏せない', async () => {
  const { createHash } = await import('node:crypto');
  const enc = (s) => Buffer.from(s).toString('base64url');
  const jwt = enc('{"alg":"HS256","typ":"JWT"}') + '.' + enc('{"sub":"syn_a","iat":1}') + '.' + rep('x', 43);
  for (const n of [`notes-${jwt}.md`, `.ci/allow-${jwt}.json`, 'notes_0' + '3(' + digits(4) + ')' + digits(4, 6) + '.md', 'allow_+' + '81 (3) ' + digits(4) + ' ' + digits(4, 6) + '.json', `notes_${token}.md`]) {
    assert.equal(nameNeedsMask(n), true, n.slice(0, 20));
  }
  const sha = createHash('sha256').update('syn_fixture').digest('hex');
  for (const n of ['ApplicationConfigurationV2.md', `${sha}.txt`, 'notes/2026-10-28-sync-deploy-guidance-api.md', 'plain_name.md', 'kit/test/secret-pii-scan-edges.test.mjs', 'docs/tickets/TK-017.md']) {
    assert.equal(nameNeedsMask(n), false, n);
  }
});

test('失敗経路: JWT を名前に含む壊れた許可の一覧・ファイルの名前は、どの出力にも出さない', () => {
  const enc = (s) => Buffer.from(s).toString('base64url');
  const jwt = enc('{"alg":"HS256"}') + '.' + enc('{"iat":1}') + '.' + rep('y', 43);
  const dir = mkdtempSync(join(tmpdir(), 'cpos-kit-scan-'));
  mkdirSync(join(dir, '.ci'));
  writeFileSync(join(dir, `notes-${jwt}.md`), 'w' + '@mail.example-corp.jp' + NL);
  let r = run(dir);
  assert.equal(r.status, 1, r.stdout + r.stderr);
  assert.ok(!(r.stdout + r.stderr).includes(jwt.slice(0, 20)), '名前の中の JWT が出ている');
  writeFileSync(join(dir, `.ci/allow-${jwt}.json`), '{ broken');
  r = run(dir, '--allow', `.ci/allow-${jwt}.json`);
  assert.equal(r.status, 2);
  assert.ok(!(r.stdout + r.stderr).includes(jwt.slice(0, 20)), '許可の一覧の名前の中の JWT が出ている');
});
