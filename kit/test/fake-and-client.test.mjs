import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { startFakeCpos } from '../fake/server.js';
import { createCposClient, CposApiError, CposClientError } from '../client.js';

process.env.CPOS_KIT_MAINTAINER = '1'; // kit 自身のテストだけ raw を許す (npm test の環境変数書式は bash 専用なので、ここで立てる)

let fake;
before(async () => { fake = await startFakeCpos({ port: 0 }); });
after(async () => { await fake.close(); });

const app = () => createCposClient({ baseUrl: fake.baseUrl, token: 'cpos_app_test', rawPolicy: 'allow' }); // kit 自身のテストだけ raw を許す

test('App Token で platform.me が通る', async () => {
  const me = await app().platform.me();
  assert.equal(me.ok, true);
  assert.equal(me.authMethod, 'api_token');
});

test('トークン無しは 401 で hint が付く', async () => {
  const c = createCposClient({ baseUrl: fake.baseUrl });
  await assert.rejects(c.facilities.list(), (e) => e instanceof CposApiError && e.status === 401 && e.error === 'ログインしていません' && typeof e.hint === 'string');
});

test('facilityId を省くと CPOS に行く前に止まる', async () => {
  await assert.rejects(app().masterUsers.list({}), (e) => e instanceof CposClientError && /facilityId/.test(e.message));
});

test('事業所の利用者一覧。存在しない事業所は 403 (fail-close)', async () => {
  const users = await app().masterUsers.list({ facilityId: 'fac_sakura' });
  assert.equal(users.length, 14);
  assert.equal((await app().masterUsers.list({ facilityId: 'fac_sakura', q: '佐藤' })).length, 1);
  await assert.rejects(app().masterUsers.list({ facilityId: 'fac_nowhere' }), (e) => e instanceof CposApiError && e.status === 404 && /見つかりません/.test(e.error));
  assert.equal(users[0].masterUserId, 'mu_0001');
  const staff = await app().staffAccounts.list();
  assert.equal(staff.length, 3);
  const all = await app().raw('GET', '/api/platform/master-users');
  assert.equal(all.length, 22, 'facilityId 省略は許可された全事業所 (本物の挙動)');
});

test('Cookie ログインは allowedFacilityIds で絞られる', async () => {
  const staff = createCposClient({ baseUrl: fake.baseUrl, cookie: 'cpos_session=acc_staff', rawPolicy: 'allow' });
  const me = await staff.auth.me();
  assert.deepEqual(me.facilityScope.allowedFacilityIds, ['fac_sakura']);
  assert.equal((await staff.facilities.list()).length, 1);
  await assert.rejects(staff.masterUsers.list({ facilityId: 'fac_momiji' }), (e) => e.status === 403 && e.code === 'facility_forbidden');
  assert.equal((await staff.raw('GET', '/api/platform/master-users')).length, 14, '省略時は許可された事業所だけ');
  const none = createCposClient({ baseUrl: fake.baseUrl, cookie: 'cpos_session=acc_none' });
  assert.equal((await none.facilities.list()).length, 0);
});

test('AppData の作成・一覧・更新・削除。事業所で絞れる', async () => {
  const d = app().appData('demo');
  const r = await d.create('notes', { text: 'a' }, { facilityId: 'fac_sakura' });
  await d.create('notes', { text: 'b' }, { facilityId: 'fac_momiji' });
  assert.equal((await d.list('notes', { facilityId: 'fac_sakura' })).length, 1);
  assert.equal((await d.list('notes', { scope: 'organization' })).length, 2);
  await assert.rejects(d.list('notes'), (e) => e instanceof CposClientError && /scope: 'organization'/.test(e.hint));
  const u = await d.update('notes', r.id, { text: 'a2' }, { facilityId: 'fac_sakura' });
  assert.equal(u.data.text, 'a2');
  const page = await d.list('notes', { scope: 'organization', paginated: true, limit: 1 });
  assert.equal(page.items.length, 1);
  assert.ok(page.nextCursor);
  await d.remove('notes', r.id, { facilityId: 'fac_sakura' });
  await assert.rejects(d.get('notes', r.id, { facilityId: 'fac_sakura' }), (e) => e.status === 404);
});

test('seed の appTokens でスコープと事業所を制限できる (本物と同じ 403 の形)', async () => {
  const c = createCposClient({ baseUrl: fake.baseUrl, token: 'cpos_app_limited' });
  assert.equal((await c.facilities.list()).length, 1);
  await assert.rejects(c.masterUsers.list({ facilityId: 'fac_momiji' }), (e) => e.status === 403);
  await assert.rejects(c.staffAccounts.list(), (e) => e.status === 403 && e.requiredScope === 'users:read' && /スコープ「users:read」/.test(e.error) && /apiTokenScopes/.test(e.hint));
  await assert.rejects(c.appData('transport').create('notes', { a: 1 }, { facilityId: 'fac_sakura' }), (e) => e.requiredScope === 'app-data:transport:write');
  assert.deepEqual(await c.appData('transport').list('notes', { facilityId: 'fac_sakura' }), []);
});

test('data 無しの POST は 400 で hint が付く', async () => {
  const res = await fetch(`${fake.baseUrl}/api/app-data/demo/notes`, { method: 'POST', headers: { Authorization: 'Bearer cpos_app_x', 'Content-Type': 'application/json' }, body: '{}' });
  assert.equal(res.status, 400);
  const j = await res.json();
  assert.equal(j.code, 'data_required');
  assert.match(j.hint, /appData/);
});

test('未実装は 501 で何が無いか言う', async () => {
  await assert.rejects(app().raw('GET', '/api/platform/organizations'), (e) => e.status === 501 && /organizations/.test(e.error) && e.code === 'not_implemented');
});

test('偽ログイン画面が出て、選ぶと Cookie が付く', async () => {
  const page = await fetch(`${fake.baseUrl}/api/auth/login?next=/x`);
  assert.equal(page.status, 200);
  assert.match(await page.text(), /誰としてログイン/);
  const as = await fetch(`${fake.baseUrl}/api/auth/login/as/acc_admin?next=/x`, { redirect: 'manual' });
  assert.equal(as.status, 302);
  assert.match(as.headers.get('set-cookie'), /cpos_session=acc_admin/);
});

test('client: PAT が本人のロールで断られた 403 (pat_subject_forbidden) にはスコープ不足と違う hint を付ける', async () => {
  const body = { error: 'この操作は発行した本人の権限では行えません', code: 'pat_subject_forbidden', resource: 'apps', action: 'admin' };
  const c = createCposClient({ baseUrl: 'http://cpos.invalid', token: 'cpos_pat_test', fetch: async () => new Response(JSON.stringify(body), { status: 403, headers: { 'content-type': 'application/json' } }) });
  await assert.rejects(c.facilities.list(), (e) => e instanceof CposApiError && e.status === 403 && /本人のロール/.test(e.hint) && !/apiTokenScopes/.test(e.hint));
});
