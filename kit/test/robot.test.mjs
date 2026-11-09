// @cpos/kit/robot: proofs, device registration, DPoP-bound calls, refresh,
// retry rules and secret redaction, against a small CPOS stand-in that lives
// in this test only (the distributed fake is not changed before the real
// CPOS has been verified).

import { test } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { once } from 'node:events';
import crypto from 'node:crypto';
import {
  RobotApiError,
  RobotRegistrationRequiredError,
  createDpopProof,
  createRobotDeviceClient,
  createSoftwareSigner,
  generateDeviceKey,
  jwkThumbprint,
  memoryCredentialStore,
  memoryReplayStore,
  redactSecrets,
  verifyDpopProof
} from '../robot.js';

/** Minimal stand-in for the CPOS device profile (authorize, token, one resource). */
async function startStandIn() {
  const replay = memoryReplayStore();
  const state = { grants: new Map(), tokens: new Map(), approved: false, denied: false, failNext: 0, calls: [], expireNext: false, base: '' };
  const server = http.createServer(async (req, res) => {
    const chunks = [];
    for await (const c of req) chunks.push(c);
    const raw = Buffer.concat(chunks).toString('utf8');
    const body = (req.headers['content-type'] ?? '').includes('urlencoded')
      ? Object.fromEntries(new URLSearchParams(raw))
      : raw
        ? JSON.parse(raw)
        : {};
    const url = new URL(req.url, state.base);
    const send = (status, json) => {
      res.writeHead(status, { 'content-type': 'application/json' });
      res.end(JSON.stringify(json));
    };
    const htu = `${state.base}${url.pathname}`;
    state.calls.push({ method: req.method, path: url.pathname, body });
    if (url.pathname === '/api/robotics/device/authorize') {
      const p = await verifyDpopProof({ header: req.headers.dpop, method: req.method, expectedHtu: htu, replay });
      if (!p.ok) return send(400, { error: 'invalid_dpop_proof', reasonCode: p.code });
      const deviceCode = `rdc_${crypto.randomBytes(16).toString('base64url')}`;
      state.grants.set(deviceCode, { jkt: p.jkt, clientId: body.client_id, scope: body.scope });
      return send(200, {
        device_code: deviceCode,
        user_code: 'BCDF-GHJK',
        verification_uri: `${state.base}/robotics/device`,
        verification_uri_complete: `${state.base}/robotics/device?user_code=BCDF-GHJK`,
        expires_in: 600,
        interval: 5,
        cpos_environment: 'development',
        cpos_profile: 'cpos-robot-device/2026-10-28'
      });
    }
    if (url.pathname === '/api/robotics/device/token') {
      const issue = (jkt, scope) => {
        const at = `cpos_rdat_${crypto.randomBytes(16).toString('base64url')}`;
        const rt = `cpos_rdrt_${crypto.randomBytes(16).toString('base64url')}`;
        state.tokens.set(at, { kind: 'access', jkt, expired: false });
        state.tokens.set(rt, { kind: 'refresh', jkt, scope, used: false });
        return send(200, {
          access_token: at, token_type: 'DPoP', expires_in: 600, refresh_token: rt, refresh_token_expires_in: 2592000,
          scope, cpos_registration_id: 'rdr_1', cpos_robot_id: 'rbt_1', cpos_facility_id: 'f1', cpos_environment: 'development'
        });
      };
      if (body.grant_type === 'urn:ietf:params:oauth:grant-type:device_code') {
        const g = state.grants.get(body.device_code);
        if (!g) return send(400, { error: 'invalid_grant' });
        const p = await verifyDpopProof({ header: req.headers.dpop, method: 'POST', expectedHtu: htu, replay, expectedJkt: g.jkt });
        if (!p.ok) return send(400, { error: 'invalid_dpop_proof', reasonCode: p.code });
        if (state.denied) return send(400, { error: 'access_denied' });
        if (!state.approved) return send(400, { error: 'authorization_pending', interval: 5 });
        return issue(g.jkt, g.scope);
      }
      if (body.grant_type === 'refresh_token') {
        const t = state.tokens.get(body.refresh_token);
        if (!t || t.kind !== 'refresh') return send(400, { error: 'invalid_grant', reasonCode: 'unknown-refresh-token' });
        const p = await verifyDpopProof({ header: req.headers.dpop, method: 'POST', expectedHtu: htu, replay, expectedJkt: t.jkt });
        if (!p.ok) return send(400, { error: 'invalid_dpop_proof', reasonCode: p.code });
        if (t.used) return send(400, { error: 'invalid_grant', reasonCode: 'refresh-reuse-detected' });
        t.used = true;
        return issue(t.jkt, t.scope);
      }
      return send(400, { error: 'unsupported_grant_type' });
    }
    // Resource: Authorization: DPoP + proof.
    const m = /^DPoP (\S+)$/.exec(req.headers.authorization ?? '');
    const tok = m ? state.tokens.get(m[1]) : null;
    if (!tok || tok.kind !== 'access') return send(401, { error: 'invalid', reasonCode: 'token-invalid' });
    if (state.expireNext) {
      state.expireNext = false;
      return send(401, { error: 'expired', reasonCode: 'token-expired' });
    }
    const p = await verifyDpopProof({ header: req.headers.dpop, method: req.method, expectedHtu: htu, replay, accessToken: m[1], expectedJkt: tok.jkt });
    if (!p.ok) return send(401, { error: 'proof', reasonCode: p.code });
    if (state.failNext > 0) {
      state.failNext -= 1;
      return send(503, { error: '一時的に使えません' });
    }
    if (url.pathname === '/api/robotics/tasks/x/claim') return send(409, { error: '他の操作で更新されています', reasonCode: 'version_conflict' });
    return send(200, { ok: true, path: url.pathname, opId: body?.opId ?? null, jti: p.payload.jti });
  });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  state.base = `http://127.0.0.1:${server.address().port}`;
  return { state, base: state.base, close: () => new Promise((r) => server.close(r)) };
}

function newClient(base, extra = {}) {
  const key = generateDeviceKey();
  const signer = createSoftwareSigner(key);
  const store = memoryCredentialStore();
  const client = createRobotDeviceClient({ baseUrl: base, clientId: 'test-robot', environment: 'development', signer, store, retryBaseMs: 5, ...extra });
  return { key, signer, store, client };
}

const ROBOT = { name: '疑似ロボ', vendor: 'Test', model: 'T-1', kind: 'delivery', simulation: true };

test('generateDeviceKey + proof verify round trip (ES256 and EdDSA)', async () => {
  for (const alg of ['ES256', 'EdDSA']) {
    const key = generateDeviceKey({ alg });
    assert.equal(key.jkt, jwkThumbprint(key.publicJwk));
    assert.equal('d' in key.publicJwk, false);
    const signer = createSoftwareSigner(key);
    const proof = await createDpopProof({ signer, htm: 'GET', htu: 'https://cpos.example/api/robotics/catalog', accessToken: 'cpos_rdat_x' });
    const ok = await verifyDpopProof({ header: proof, method: 'GET', expectedHtu: 'https://cpos.example/api/robotics/catalog', accessToken: 'cpos_rdat_x', expectedJkt: key.jkt });
    assert.equal(ok.ok, true, alg);
    const wrongHtu = await verifyDpopProof({ header: proof, method: 'GET', expectedHtu: 'https://evil.example/api/robotics/catalog' });
    assert.deepEqual(wrongHtu, { ok: false, code: 'dpop-htu-mismatch' });
  }
});

test('the EC thumbprint matches the RFC 7638 member order (crv, kty, x, y)', () => {
  const jwk = { kty: 'EC', crv: 'P-256', x: 'f83OJ3D2xF1Bg8vub9tLe1gHMzV76e8Tus9uPHvRVEU', y: 'x_FEzRu9m36HLN_tue659LNpXW6pCyStikYjKIWI5a0' };
  const expected = crypto.createHash('sha256').update(`{"crv":"P-256","kty":"EC","x":"${jwk.x}","y":"${jwk.y}"}`).digest('base64url');
  assert.equal(jwkThumbprint(jwk), expected);
});

test('registration: pending, then registered; tokens are stored and calls carry DPoP', async () => {
  const s = await startStandIn();
  try {
    const { client, store } = newClient(s.base);
    const grant = await client.startRegistration({ robot: ROBOT, capabilities: ['delivery'] });
    assert.match(grant.userCode, /^[A-Z]{4}-[A-Z]{4}$/);
    assert.ok(!grant.verificationUriComplete.includes(grant.deviceCode), 'the QR never carries the device code');
    assert.equal((await client.pollRegistration(grant)).status, 'pending');
    s.state.approved = true;
    const done = await client.pollRegistration(grant);
    assert.equal(done.status, 'registered');
    assert.equal(done.credentials.robotId, 'rbt_1');
    assert.equal('accessToken' in done.credentials, false);
    const stored = await store.load();
    assert.ok(stored.accessToken.startsWith('cpos_rdat_'));
    const a = await client.get('/api/robotics/tasks/queue');
    const b = await client.get('/api/robotics/tasks/queue');
    assert.equal(a.ok, true);
    assert.notEqual(a.jti, b.jti, 'a fresh proof per request');
  } finally {
    await s.close();
  }
});

test('denied registration is reported as such', async () => {
  const s = await startStandIn();
  try {
    const { client } = newClient(s.base);
    const grant = await client.startRegistration({ robot: ROBOT, capabilities: ['delivery'] });
    s.state.denied = true;
    assert.equal((await client.pollRegistration(grant)).status, 'denied');
  } finally {
    await s.close();
  }
});

async function registered(s, extra) {
  const c = newClient(s.base, extra);
  const grant = await c.client.startRegistration({ robot: ROBOT, capabilities: ['delivery'] });
  s.state.approved = true;
  await c.client.pollRegistration(grant);
  return c;
}

test('expired token: refreshed once and the request re-sent; concurrent refreshes share one call', async () => {
  const s = await startStandIn();
  try {
    const { client } = await registered(s);
    s.state.expireNext = true;
    const r = await client.get('/api/robotics/device/me');
    assert.equal(r.ok, true);
    const before = s.state.calls.filter((c) => c.body?.grant_type === 'refresh_token').length;
    await Promise.all([client.refresh(), client.refresh(), client.refresh()]);
    const after = s.state.calls.filter((c) => c.body?.grant_type === 'refresh_token').length;
    assert.equal(after - before, 1, 'single-flight refresh');
  } finally {
    await s.close();
  }
});

test('5xx: retried only for GET or with an opId (same opId, new proof); 409 never retried', async () => {
  const s = await startStandIn();
  try {
    const { client } = await registered(s);
    s.state.failNext = 2;
    const r = await client.post('/api/robotics/tasks/t1/complete', { outcome: 'completed' }, { opId: 'op-complete-1' });
    assert.equal(r.opId, 'op-complete-1');
    const sent = s.state.calls.filter((c) => c.path === '/api/robotics/tasks/t1/complete');
    assert.equal(sent.length, 3);
    assert.ok(sent.every((c) => c.body.opId === 'op-complete-1'));

    s.state.failNext = 1;
    await assert.rejects(client.post('/api/robotics/tasks/t2/start', {}), (e) => e instanceof RobotApiError && e.status === 503);
    assert.equal(s.state.calls.filter((c) => c.path === '/api/robotics/tasks/t2/start').length, 1, 'no opId -> not re-sent');

    await assert.rejects(client.post('/api/robotics/tasks/x/claim', {}, { opId: 'op-claim-1' }), (e) => e.status === 409 && e.kind === 'conflict');
    assert.equal(s.state.calls.filter((c) => c.path === '/api/robotics/tasks/x/claim').length, 1);
  } finally {
    await s.close();
  }
});

test('a revoked / unknown credential asks for registration again; nothing outside /api/robotics', async () => {
  const s = await startStandIn();
  try {
    const { client, store } = await registered(s);
    const c = await store.load();
    s.state.tokens.delete(c.accessToken);
    await assert.rejects(client.get('/api/robotics/device/me'), (e) => e instanceof RobotRegistrationRequiredError);
    await assert.rejects(client.get('/api/platform/me'), TypeError);
  } finally {
    await s.close();
  }
});

test('refresh reuse ends in re-registration', async () => {
  const s = await startStandIn();
  try {
    const { client, store } = await registered(s);
    const first = await store.load();
    await client.refresh();
    await store.save(first); // a stale copy comes back (e.g. restored backup)
    await assert.rejects(client.refresh(), (e) => e instanceof RobotRegistrationRequiredError && e.reasonCode === 'refresh-reuse-detected');
  } finally {
    await s.close();
  }
});

test('secrets are redacted from text', () => {
  const t = redactSecrets('DPoP cpos_rdat_abcdefgh Authorization: Bearer xyz rdc_0123456789abcdef {"d":"secret"}');
  assert.equal(t.includes('abcdefgh'), false);
  assert.equal(t.includes('0123456789abcdef'), false);
  assert.equal(t.includes('secret'), false);
});
