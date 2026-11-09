import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createFakeCpos, fetchFromHandler } from '../fake/server.js';
import { loginUrl, pickCookie, facilityScopeOf, canSeeFacility, identityFromRequest,
         sealSession, unsealSession, sessionCookie, clearCookie, resolveLogin } from '../app-kit.js';

const SECRET = 'テスト用の秘密-16文字以上あります';

test('app-kit: ログイン URL は CPOS のゲートウェイに next を付ける', () => {
  const u = new URL(loginUrl({ cposBaseUrl: 'https://cpos.example/', next: 'https://app.example/画面?a=1' }));
  assert.equal(u.origin + u.pathname, 'https://cpos.example/api/auth/login');
  assert.equal(u.searchParams.get('next'), 'https://app.example/画面?a=1');
  assert.throws(() => loginUrl({ cposBaseUrl: '', next: 'x' }));
  assert.throws(() => loginUrl({ cposBaseUrl: 'https://x', next: '' }));
});

test('app-kit: 転送してよい cookie は cpos_session だけ (自分のセッションを CPOS に送らない)', () => {
  const header = 'app_session=ひみつ; cpos_session=abc123; other=x';
  assert.equal(pickCookie(header, 'cpos_session'), 'cpos_session=abc123');
  assert.equal(pickCookie(header, 'app_session'), 'app_session=ひみつ');
  assert.equal(pickCookie(header, 'none'), null);
  assert.equal(pickCookie('', 'cpos_session'), null);
});

test('app-kit: 事業所の範囲が読めなければ unknown = 見せない (fail-close)', () => {
  assert.deepEqual(facilityScopeOf({ facilityScope: { mode: 'all' } }), { mode: 'all' });
  assert.deepEqual(facilityScopeOf({ facilityScope: { mode: 'list', allowedFacilityIds: ['f1'] } }), { mode: 'list', ids: ['f1'] });
  // mode の名前は実装で違う (模擬サーバ 'limited' / 既存アプリ 'list')。名前ではなく中身で判断する
  assert.deepEqual(facilityScopeOf({ facilityScope: { mode: 'limited', allowedFacilityIds: ['f1'] } }), { mode: 'list', ids: ['f1'] });
  assert.deepEqual(facilityScopeOf({ facilityScope: { mode: 'しらない名前' } }), { mode: 'unknown' }, '配列が無ければ unknown');
  assert.deepEqual(facilityScopeOf({ allFacilities: true }), { mode: 'all' });
  assert.deepEqual(facilityScopeOf({ allowedFacilityIds: ['f2'] }), { mode: 'list', ids: ['f2'] });
  // 実害: 「返ってこない = 制限なし」にすると他の事業所が見える
  assert.deepEqual(facilityScopeOf({}), { mode: 'unknown' });
  assert.deepEqual(facilityScopeOf({ facilityScope: 'こわれている' }), { mode: 'unknown' });
  assert.equal(canSeeFacility({ mode: 'unknown' }, 'f1'), false, 'unknown なら見せない');
  assert.equal(canSeeFacility({ mode: 'list', ids: ['f1'] }, 'f2'), false);
  assert.equal(canSeeFacility({ mode: 'list', ids: ['f1'] }, 'f1'), true);
  assert.equal(canSeeFacility({ mode: 'all' }, 'なんでも'), true);
  assert.equal(canSeeFacility(null, 'f1'), false);
});

test('app-kit: セッションは封じられ、書き換えも期限切れも弾く', () => {
  // 暗号文は base64url のランダムな文字列で、短い値 ('u1' 等) は偶然含まれうる (約 2%)。偶然には現れない長さの値で見る
  const id = 'user-plain-id-0123456789';
  const s = sealSession({ user: { id }, exp: Math.floor(Date.now() / 1000) + 60 }, SECRET);
  assert.ok(!s.includes(id) && !s.includes(Buffer.from(id).toString('base64url').slice(0, 12)), '中身がそのまま見えない');
  assert.equal(unsealSession(s, SECRET).user.id, id);
  assert.equal(unsealSession(s, 'ちがう秘密-16文字以上あるもの'), null, '別の秘密では読めない');
  assert.equal(unsealSession(s.slice(0, -4) + 'AAAA', SECRET), null, '書き換えは弾く');
  assert.equal(unsealSession('こわれた値', SECRET), null, '壊れた cookie で落ちない');
  const old = sealSession({ user: { id: 'u1' }, exp: Math.floor(Date.now() / 1000) - 1 }, SECRET);
  assert.equal(unsealSession(old, SECRET), null, '期限切れは無効');
  assert.throws(() => sealSession({}, 'みじ'), /短すぎ/, '6 バイトは弾く');
  // 実害 (2026-09-13): 文字数で測っていたため、日本語 14 文字 (38 バイト) の秘密が弾かれた
  assert.equal(unsealSession(sealSession({ a: 1 }, 'テスト用の秘密-16文字以上'), 'テスト用の秘密-16文字以上').a, 1, '日本語 14 文字 (38 バイト) は通る');
});

test('app-kit: Set-Cookie は HttpOnly と SameSite を付ける', () => {
  const c = sessionCookie('app_session', 'x');
  assert.match(c, /HttpOnly/);
  assert.match(c, /SameSite=Lax/);
  assert.match(c, /Secure/);
  assert.doesNotMatch(sessionCookie('app_session', 'x', { secure: false }), /Secure/, 'ローカルの http では付けない');
  assert.match(clearCookie('app_session'), /Max-Age=0/);
});

test('app-kit: KIT 模擬サーバでログインを一巡できる (ブラウザの cookie → 誰か → 自分のセッション)', async () => {
  const fake = createFakeCpos();
  const fx = fetchFromHandler(fake.handle);

  // 1. 未ログイン: cookie が無ければ null (ここで CPOS へ 302 する)
  assert.equal(await identityFromRequest({ headers: {} }, { cposBaseUrl: 'http://fake', fetch: fx }), null);

  // 2. CPOS のログイン画面で「誰として入るか」を選ぶ → cpos_session が発行される
  const res = await fx('http://fake/api/auth/login/as/acc_staff?next=/', { redirect: 'manual' });
  const setCookie = res.headers.get('set-cookie') ?? '';
  const m = setCookie.match(/cpos_session=([^;]+)/);
  assert.ok(m, 'CPOS が cpos_session を発行する');

  // 3. その cookie を転送して「誰か」を聞く
  const id = await identityFromRequest({ headers: { cookie: `app_session=よそのもの; cpos_session=${m[1]}` } },
    { cposBaseUrl: 'http://fake', fetch: fx });
  assert.ok(id, '身元が取れる');
  assert.ok(id.user.id, 'user.id がある');
  assert.ok(id.organizationId, 'organizationId がある');
  assert.notEqual(id.facilityScope.mode, 'unknown', '事業所の範囲が読める');

  // 4. アプリ自身のセッションにする (CPOS のトークンは入れない)
  const sealed = sealSession({ ...id, exp: Math.floor(Date.now() / 1000) + 3600 }, SECRET);
  const back = unsealSession(sealed, SECRET);
  assert.equal(back.user.id, id.user.id);
  assert.ok(!JSON.stringify(back).includes('cpos_app_'), 'App Token を入れない');
});

test('app-kit: resolveLogin はフレームワークに依らない (返り値で次が決まる)', async () => {
  // 実害 (実験 12): requireLogin は res.writeHead を呼ぶので node:http 専用。
  // Claude も Codex も Fastify 用に 60 行を自作した。両者が同じものを要求した。
  const fake = createFakeCpos();
  const fx = fetchFromHandler(fake.handle);
  const opts = { cposBaseUrl: 'http://fake', fetch: fx, secret: SECRET, appUrl: 'http://localhost:3000/' };

  // 1. 未ログイン → どこへ送るかだけ返す (res を触らない)
  const no = await resolveLogin({ cookie: undefined, url: 'http://localhost:3000/' }, opts);
  assert.equal(no.ok, false);
  assert.match(no.redirectTo, /\/api\/auth\/login\?next=/);

  // 2. cpos_session があれば、セッションと Set-Cookie を返す
  const res = await fx('http://fake/api/auth/login/as/acc_staff?next=/', { redirect: 'manual' });
  const cs = (res.headers.get('set-cookie') ?? '').match(/cpos_session=([^;]+)/)[1];
  const yes = await resolveLogin({ cookie: `cpos_session=${cs}`, url: 'http://localhost:3000/' }, opts);
  assert.equal(yes.ok, true);
  assert.ok(yes.session.user.id);
  assert.ok(yes.setCookie, 'Set-Cookie の中身を返す (誰がどう送るかは呼び出し側)');
  assert.doesNotMatch(yes.setCookie, /Secure/, 'localhost の http では Secure を付けない');

  // 3. 2 回目は自分の cookie だけで通る (CPOS に聞きに行かない)
  const mine = yes.setCookie.split(';')[0];
  const again = await resolveLogin({ cookie: mine, url: 'http://localhost:3000/' },
    { ...opts, fetch: () => { throw new Error('CPOS に聞いてはいけない'); } });
  assert.equal(again.ok, true);
  assert.equal(again.session.user.id, yes.session.user.id);
  assert.equal(again.setCookie, undefined, '発行済みなら Set-Cookie を返さない');

  // 4. https なら Secure が付く
  const sec = await resolveLogin({ cookie: `cpos_session=${cs}`, url: 'https://app.example/' },
    { ...opts, appUrl: 'https://app.example/' });
  assert.match(sec.setCookie, /Secure/);
});

// ---- OAuth 2.1 (Google ログインをどこからでも一巡させる道) ----
import { createLoginGate, expressLoginGate, sameCookieDomain, pkcePair, identityFromAccessToken, registerOAuthClient } from '../app-kit.js';
import { createHash } from 'node:crypto';

test('app-kit: 同じ cookie ドメインかの判定 (ゲートウェイ方式が使えるか)', () => {
  assert.equal(sameCookieDomain('https://app.example.co.jp', 'https://cpos.example.co.jp'), true);
  assert.equal(sameCookieDomain('https://app.example.com', 'https://cpos.example.co.jp'), false, '別ドメイン');
  assert.equal(sameCookieDomain('http://127.0.0.1:3000', 'https://cpos.example.co.jp'), false, '手元からステージング');
  assert.equal(sameCookieDomain('http://127.0.0.1:3000', 'http://127.0.0.1:4300'), true, '手元の模擬サーバ (ポート違いでも cookie は同じ host)');
  assert.equal(sameCookieDomain('http://localhost:3000', 'http://127.0.0.1:4300'), false, 'localhost と 127.0.0.1 は別 (実験 12 で詰まった)');
  assert.equal(sameCookieDomain('https://a.co.jp', 'https://b.co.jp'), false, 'co.jp だけの一致では同じにしない');
});

test('app-kit: PKCE は S256', () => {
  const { verifier, challenge } = pkcePair();
  assert.equal(createHash('sha256').update(verifier).digest('base64url'), challenge);
  assert.notEqual(pkcePair().verifier, verifier);
});

test('app-kit: OAuth で KIT 模擬サーバのログインを一巡できる (登録 → 同意 → code → 身元。トークンは持たない)', async () => {
  const fake = createFakeCpos();
  const gate = createLoginGate({ cposBaseUrl: fake.baseUrl, secret: SECRET, mode: 'oauth', fetch: fake.fetch, oauth: { clientName: 'テスト' } });
  // 1. 未ログイン → 同意画面へ。途中状態は封じた短命 cookie に
  const r1 = await gate.resolve({ url: 'http://127.0.0.1:3000/画面?x=1', cookie: '' });
  assert.equal(r1.ok, false);
  const auth = new URL(r1.redirectTo);
  assert.equal(auth.origin + auth.pathname, `${fake.baseUrl}/oauth/authorize`);
  assert.equal(auth.searchParams.get('code_challenge_method'), 'S256');
  assert.equal(auth.searchParams.get('redirect_uri'), 'http://127.0.0.1:3000/oauth/callback');
  assert.match(r1.setCookie, /^app_session_login=.*HttpOnly/);
  assert.ok(!/Secure/.test(r1.setCookie), '手元の http では Secure を付けない');
  assert.ok(gate.clientId?.startsWith('cpos_oc_'), '動的登録で client_id を得ている');
  // 2. CPOS 側: 同意画面 (模擬サーバは誰として入るかを選ぶ) → code 付きで戻る
  const page = await fake.fetch(r1.redirectTo);
  assert.equal(page.status, 200);
  const as = (await page.text()).match(/href="([^"]*\/oauth\/authorize\/as\/acc_staff[^"]*)"/)[1].replace(/&amp;/g, '&');
  const back = await fake.fetch(`${fake.baseUrl}${as}`, { redirect: 'manual' });
  assert.equal(back.status, 302);
  const cb = back.headers.get('location');
  assert.ok(cb.startsWith('http://127.0.0.1:3000/oauth/callback?code='));
  // 3. 戻り: code → トークン → /api/platform/me → 自分のセッション。トークンは失効させる
  const loginCookie = r1.setCookie.split(';')[0];
  const r2 = await gate.callback({ url: cb, cookie: loginCookie });
  assert.equal(r2.ok, true, r2.error);
  assert.equal(r2.redirectTo, 'http://127.0.0.1:3000/画面?x=1', '元の画面に戻る');
  assert.equal(r2.session.user.id, 'acc_staff');
  assert.equal(r2.session.via, 'oauth');
  assert.deepEqual(r2.session.facilityScope, { mode: 'list', ids: fake.seed.accounts.find((a) => a.id === 'acc_staff').allowedFacilityIds });
  assert.ok(!JSON.stringify(r2.session).includes('cpos_pat_'), 'セッションにトークンを入れない');
  assert.equal(r2.setCookie.length, 2, 'セッションを発行し、途中状態を消す');
  // 4. 以後は自分の cookie だけで入れる
  const r3 = await gate.resolve({ url: 'http://127.0.0.1:3000/', cookie: r2.setCookie[0].split(';')[0] });
  assert.equal(r3.ok, true);
  assert.equal(r3.session.user.id, 'acc_staff');
  // 5. state が違えば拒む。code の使い回しも拒む
  const bad = await gate.callback({ url: cb.replace(/state=[^&]+/, 'state=違う'), cookie: loginCookie });
  assert.equal(bad.ok, false);
  const reuse = await gate.callback({ url: cb, cookie: loginCookie });
  assert.equal(reuse.ok, false, 'code は 1 回限り');
});

test('app-kit: auto は「同じ cookie ドメインなら cookie、違えば oauth」', async () => {
  const fake = createFakeCpos();
  const gate = createLoginGate({ cposBaseUrl: 'https://cpos.example.co.jp', secret: SECRET, fetch: fake.fetch });
  assert.equal(gate.modeFor('https://app.example.co.jp/'), 'cookie');
  assert.equal(gate.modeFor('http://127.0.0.1:3000/'), 'oauth');
  const same = createLoginGate({ cposBaseUrl: fake.baseUrl, secret: SECRET, fetch: fake.fetch });
  const r = await same.resolve({ url: 'http://fake-cpos/', cookie: '' });
  assert.equal(r.ok, false);
  assert.ok(r.redirectTo.includes('/api/auth/login?next='), '同じ host ならゲートウェイ方式');
});

test('app-kit: 管理者発行の PAT / App Token (user 無し) ではログインできない', async () => {
  const fake = createFakeCpos();
  await assert.rejects(identityFromAccessToken('cpos_app_x', { cposBaseUrl: fake.baseUrl, fetch: fake.fetch }), /本人/);
  await assert.rejects(registerOAuthClient({ cposBaseUrl: fake.baseUrl, redirectUri: 'http://evil.example/cb', fetch: fake.fetch }), /登録できません/);
});

test('app-kit: Express の middleware は 画面 302 / api 401 / 戻り 302 / ログアウト', async () => {
  const fake = createFakeCpos();
  const mw = expressLoginGate({ cposBaseUrl: fake.baseUrl, secret: SECRET, mode: 'oauth', fetch: fake.fetch });
  const run = (url, cookie = '') => new Promise((resolve) => {
    const u = new URL(url);
    const headers = {};
    const res = { status(s) { res.s = s; return res; }, type() { return res; }, send(b) { resolve({ status: res.s ?? 200, body: b, headers }); }, json(b) { resolve({ status: res.s ?? 200, body: b, headers }); }, redirect(s, to) { resolve({ status: s, to, headers }); }, setHeader(k, v) { headers[k] = v; } };
    const req = { originalUrl: u.pathname + u.search, url: u.pathname + u.search, headers: { host: u.host, cookie } };
    mw(req, res, (e) => resolve({ next: true, error: e, session: req.session }));
  });
  const page = await run('http://127.0.0.1:3000/');
  assert.equal(page.status, 302);
  assert.ok(page.to.includes('/oauth/authorize'));
  const api = await run('http://127.0.0.1:3000/api/x');
  assert.equal(api.status, 401);
  assert.equal(api.body.error, 'login_required');
  const health = await run('http://127.0.0.1:3000/api/health');
  assert.equal(health.next, true, '公開パスは通す');
  const out = await run('http://127.0.0.1:3000/logout');
  assert.equal(out.status, 302);
});

test('app-kit: token モード = CPOS が発行したトークンで入る (Google を通らない)。PAT は本人、App Token は「そのトークン」。トークンは保存しない', async () => {
  const fake = createFakeCpos();
  const gate = createLoginGate({ cposBaseUrl: fake.baseUrl, secret: SECRET, mode: 'token', fetch: fake.fetch, appName: 'テスト' });
  const first = await gate.resolve({ url: 'http://127.0.0.1:3000/staff?x=1', cookie: '' });
  assert.equal(first.ok, false);
  assert.equal(first.redirectTo, 'http://127.0.0.1:3000/login?next=%2Fstaff%3Fx%3D1', '未ログインは自分のログイン画面へ (CPOS へは行かない)');
  const html = gate.loginPage({ url: 'http://127.0.0.1:3000/login', next: 'http://evil.example/steal' });
  assert.match(html, /name="token"/); assert.match(html, /type="password"/);
  assert.match(html, /name="next" value="\/"/, '別 origin の next は捨てる');
  assert.equal((await gate.tokenLogin({ token: 'not-a-token', url: 'http://127.0.0.1:3000/login' })).status, 400);
  assert.equal((await gate.tokenLogin({ token: 'cpos_app_x'.replace('cpos_app_', 'cpos_pat_'), url: 'http://127.0.0.1:3000/login' })).ok, true, 'KIT 模擬サーバは cpos_pat_ も通す');
  const seedToken = 'cpos_app_limited';   // seed のトークン: 事業所 fac_sakura だけ
  const r = await gate.tokenLogin({ token: seedToken, next: '/staff', url: 'http://127.0.0.1:3000/login' });
  assert.equal(r.ok, true);
  assert.equal(r.session.via, 'token');
  assert.equal(r.session.user.role, 'app-token', 'App Token は人ではない');
  assert.deepEqual(r.session.facilityScope, { mode: 'list', ids: ['fac_sakura'] }, '事業所の範囲はトークンの allowedFacilityIds');
  assert.equal(r.redirectTo, 'http://127.0.0.1:3000/staff');
  const cookie = r.setCookie[0].split(';')[0];
  assert.ok(!cookie.includes(seedToken) && !JSON.stringify(r.session).includes(seedToken), 'トークンを cookie にもセッションにも入れない');
  const again = await gate.resolve({ url: 'http://127.0.0.1:3000/staff', cookie });
  assert.equal(again.ok, true); assert.equal(typeof again.session.user.name, 'string', '身元はトークンの name (模擬サーバは fake token)');
  // 本人のトークン (OAuth で得た cpos_pat_) なら user が入る
  const { verifier, challenge } = pkcePair();
  const clientId = await registerOAuthClient({ cposBaseUrl: fake.baseUrl, redirectUri: 'http://127.0.0.1:3000/oauth/callback', clientName: 't', fetch: fake.fetch });
  const page = await fake.fetch(`${fake.baseUrl}/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent('http://127.0.0.1:3000/oauth/callback')}&state=s&code_challenge=${challenge}&code_challenge_method=S256&scope=facilities:read`);
  const as = (await page.text()).match(/href="([^"]*\/oauth\/authorize\/as\/acc_admin[^"]*)"/)[1].replace(/&amp;/g, '&');
  const back = await fake.fetch(`${fake.baseUrl}${as}`, { redirect: 'manual' });
  const code = new URL(back.headers.get('location')).searchParams.get('code');
  const tok = await (await fake.fetch(`${fake.baseUrl}/oauth/token`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ grant_type: 'authorization_code', client_id: clientId, code, code_verifier: verifier, redirect_uri: 'http://127.0.0.1:3000/oauth/callback' }) })).json();
  const p = await gate.tokenLogin({ token: tok.access_token, url: 'http://127.0.0.1:3000/login' });
  assert.equal(p.ok, true); assert.equal(p.session.user.id, 'acc_admin'); assert.notEqual(p.session.user.role, 'app-token');
});

test('app-kit: Express でも token モードのログイン画面と受け口が動く', async () => {
  const fake = createFakeCpos();
  const mw = expressLoginGate({ cposBaseUrl: fake.baseUrl, secret: SECRET, mode: 'token', fetch: fake.fetch });
  const run = (url, { cookie = '', method = 'GET', body } = {}) => new Promise((resolve) => {
    const u = new URL(url);
    const headers = {};
    const res = { status(s) { res.s = s; return res; }, type() { return res; }, send(b) { resolve({ status: res.s ?? 200, body: b, headers }); }, json(b) { resolve({ status: res.s ?? 200, body: b, headers }); }, redirect(s, to) { resolve({ status: s, to, headers }); }, setHeader(k, v) { headers[k] = v; } };
    const req = { method, body, originalUrl: u.pathname + u.search, url: u.pathname + u.search, headers: { host: u.host, cookie } };
    mw(req, res, (e) => resolve({ next: true, error: e, session: req.session }));
  });
  const page = await run('http://127.0.0.1:3000/');
  assert.equal(page.status, 302); assert.match(page.to, /\/login\?next=/);
  const form = await run('http://127.0.0.1:3000/login?next=/');
  assert.equal(form.status, 200); assert.match(form.body, /name="token"/);
  const bad = await run('http://127.0.0.1:3000/login', { method: 'POST', body: { token: 'cpos_app_x', next: '/' } });
  assert.equal(bad.status, 302, 'KIT 模擬サーバは seed に無い cpos_app_* も通す (開発の既定)');
  const cookie = String(headersOf(bad)['Set-Cookie']?.[0] ?? '').split(';')[0];
  const inside = await run('http://127.0.0.1:3000/', { cookie });
  assert.equal(inside.next, true); assert.equal(inside.session.via, 'token');
  function headersOf(r) { return r.headers; }
});

test('KIT 模擬サーバ: OAuth で管理操作のスコープを要求すると本物と同じく invalid_scope で戻す', async () => {
  const fake = createFakeCpos();
  const redirectUri = 'http://127.0.0.1:3000/oauth/callback';
  const { challenge } = pkcePair();
  const clientId = await registerOAuthClient({ cposBaseUrl: fake.baseUrl, redirectUri, clientName: 't', fetch: fake.fetch });
  const ask = (scope) => fake.fetch(`${fake.baseUrl}/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=s&code_challenge=${challenge}&code_challenge_method=S256&scope=${encodeURIComponent(scope)}`, { redirect: 'manual' });
  for (const s of ['apps:admin', 'users:admin', 'organizations:provision']) {
    const r = await ask(`facilities:read ${s}`);
    assert.equal(r.status, 302, s);
    const to = new URL(r.headers.get('location'));
    assert.equal(to.origin + to.pathname, redirectUri);
    assert.equal(to.searchParams.get('error'), 'invalid_scope');
    assert.equal(to.searchParams.get('state'), 's');
    assert.equal(to.searchParams.get('code'), null);
  }
  assert.equal((await ask('facilities:read')).status, 200, 'ふつうのスコープは同意 (誰として入るか) の画面に進む');
});
