// @cpos/kit/robot — 機体 (ロボット・アダプタ) 専用のクライアント。
//
// CPOS の機体専用の資格情報 (profile `cpos-robot-device/2026-10-28`) を使う:
//   - 登録: OAuth 2.0 Device Authorization Grant (RFC 8628)。機体は鍵の証明
//     (DPoP, RFC 9449) を付けて登録を始め、QR (確認画面の URL と短いコード) を
//     画面に出す。職員がスマートフォンで承認したら、同じ鍵の証明で資格情報を受け取る。
//   - 通常の呼び出し: `Authorization: DPoP <token>` + 要求ごとに新しい証明。
//     トークンだけが漏れても、鍵が無ければ使えない。
//   - 機体は職員にならない。職員の Cookie / PAT / App Token は扱わない。
//
// アプリ向けの client (Bearer) とは別の入口。機体に全 API を見せない。
// 依存ゼロ (Node 組込みの crypto と fetch だけ)。署名は差し替えられる
// (ソフトウェア鍵・クラウドの鍵管理・機体内の安全な格納)。
//
// 再送の規則 (業務の冪等性と、証明の再利用防止は別):
//   - 同じ操作の再送は opId を変えず、証明は毎回作り直す。
//   - 401 は種類ごと: 期限切れ → 更新して 1 回だけ再送 / 時計のずれ → 補正して
//     1 回だけ / 失効・家系停止 → 再登録が要る (RobotRegistrationRequiredError)。
//   - 400 / 403 / 404 / 409 / 422 は再送しない。
//   - 429 / 5xx / 通信断は、GET か opId 付きのときだけ待って再送する。

import crypto from 'node:crypto';

export const ROBOT_DEVICE_PROFILE = 'cpos-robot-device/2026-10-28';
export const DEVICE_CODE_GRANT = 'urn:ietf:params:oauth:grant-type:device_code';
export const DPOP_ALGORITHMS = ['ES256', 'EdDSA'];

// ---- 小道具 ---------------------------------------------------------------------

const b64u = (buf) => Buffer.from(buf).toString('base64url');
const b64uJson = (obj) => b64u(Buffer.from(JSON.stringify(obj), 'utf8'));
const sha256B64u = (s) => crypto.createHash('sha256').update(s).digest('base64url');

/** 秘密 (トークン・device_code・鍵) を伏せる。ログ・エラーに出す前に通す。 */
export function redactSecrets(text) {
  return String(text ?? '')
    .replace(/cpos_rd(at|rt)_[A-Za-z0-9_-]+/g, 'cpos_rd$1_***')
    .replace(/rdc_[A-Za-z0-9_-]{10,}/g, 'rdc_***')
    .replace(/"d"\s*:\s*"[^"]+"/g, '"d":"***"')
    .replace(/(DPoP|Bearer)\s+[A-Za-z0-9._~+/-]+=*/g, '$1 ***');
}

/** RFC 7638 の JWK thumbprint (SHA-256, base64url)。EC P-256 と OKP Ed25519。 */
export function jwkThumbprint(jwk) {
  if (jwk?.kty === 'EC') {
    return sha256B64u(JSON.stringify({ crv: jwk.crv, kty: jwk.kty, x: jwk.x, y: jwk.y }));
  }
  if (jwk?.kty === 'OKP') {
    return sha256B64u(JSON.stringify({ crv: jwk.crv, kty: jwk.kty, x: jwk.x }));
  }
  throw new TypeError('EC P-256 か OKP Ed25519 の公開鍵だけ扱えます');
}

function publicPart(jwk) {
  return jwk.kty === 'EC'
    ? { kty: 'EC', crv: jwk.crv, x: jwk.x, y: jwk.y }
    : { kty: 'OKP', crv: jwk.crv, x: jwk.x };
}

// ---- 鍵と署名 ---------------------------------------------------------------------

/**
 * 機体の鍵を作る。秘密鍵 (JWK) は呼び出し側が安全に保管する
 * (平文のまま一般の DB・ブラウザに置かない)。
 * @param {{ alg?: 'ES256' | 'EdDSA' }} [opts]
 */
export function generateDeviceKey(opts = {}) {
  const alg = opts.alg ?? 'ES256';
  const { privateKey } =
    alg === 'ES256'
      ? crypto.generateKeyPairSync('ec', { namedCurve: 'P-256' })
      : crypto.generateKeyPairSync('ed25519');
  const privateJwk = privateKey.export({ format: 'jwk' });
  const publicJwk = publicPart(privateJwk);
  return { alg, privateJwk, publicJwk, jkt: jwkThumbprint(publicJwk) };
}

/**
 * ソフトウェア鍵の署名器。署名器は `{ alg, publicJwk, jkt, sign(bytes) }` の形なら
 * 何でもよい (クラウドの鍵管理・機体内の安全な格納で置き換えられる)。
 * @param {{ alg?: 'ES256' | 'EdDSA', privateJwk: object }} key
 */
export function createSoftwareSigner(key) {
  const alg = key.alg ?? (key.privateJwk?.kty === 'OKP' ? 'EdDSA' : 'ES256');
  const privateKey = crypto.createPrivateKey({ key: key.privateJwk, format: 'jwk' });
  const publicJwk = publicPart(key.privateJwk);
  return {
    alg,
    publicJwk,
    jkt: jwkThumbprint(publicJwk),
    async sign(bytes) {
      return alg === 'ES256'
        ? crypto.sign('sha256', bytes, { key: privateKey, dsaEncoding: 'ieee-p1363' })
        : crypto.sign(null, bytes, privateKey);
    }
  };
}

// ---- DPoP の証明 -----------------------------------------------------------------

/** URL から証明の htu (クエリ・フラグメントなし) を作る。 */
export function htuOf(url) {
  const u = new URL(url);
  return `${u.protocol}//${u.host}${u.pathname}`;
}

/**
 * DPoP の証明 (JWS compact) を作る。要求ごとに新しく作る (jti が毎回変わる)。
 * @param {{ signer: object, htm: string, htu: string, accessToken?: string,
 *           nowSeconds?: number, jti?: string, claims?: object }} input
 */
export async function createDpopProof(input) {
  const header = { typ: 'dpop+jwt', alg: input.signer.alg, jwk: input.signer.publicJwk };
  const payload = {
    htm: input.htm.toUpperCase(),
    htu: input.htu,
    iat: input.nowSeconds ?? Math.floor(Date.now() / 1000),
    jti: input.jti ?? crypto.randomUUID(),
    ...(input.accessToken ? { ath: sha256B64u(input.accessToken) } : {}),
    ...(input.claims ?? {})
  };
  const signingInput = `${b64uJson(header)}.${b64uJson(payload)}`;
  const sig = await input.signer.sign(Buffer.from(signingInput, 'utf8'));
  return `${signingInput}.${b64u(sig)}`;
}

function normalizeHtu(value) {
  let u;
  try {
    u = new URL(value);
  } catch {
    return null;
  }
  if (u.protocol !== 'https:' && u.protocol !== 'http:') return null;
  if (u.username || u.password) return null;
  const port = (u.protocol === 'https:' && u.port === '443') || (u.protocol === 'http:' && u.port === '80') ? '' : u.port;
  let path = u.pathname || '/';
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
  return `${u.protocol}//${u.hostname.toLowerCase()}${port ? `:${port}` : ''}${path}`;
}

const B64U_RE = /^[A-Za-z0-9_-]+$/;
const PRIVATE_MEMBERS = ['d', 'p', 'q', 'dp', 'dq', 'qi', 'k', 'oth'];

/**
 * 証明の検証 (RFC 9449 §4.3)。CPOS 本体と同じ規則。模擬環境・エミュレータ・
 * テスト用 (本物の CPOS は自分で検証する)。
 * `replay.markOnce(key, expiresAt)` は、同じ (鍵, jti) の 2 回目に false を返すこと
 * (複数のインスタンスで共有する保存先にする)。
 * @returns {Promise<{ ok: true, jkt: string, payload: object } | { ok: false, code: string }>}
 */
export async function verifyDpopProof(input) {
  const raw = input.header;
  if (raw === undefined || raw === null || raw === '') return { ok: false, code: 'dpop-proof-missing' };
  if (Array.isArray(raw) && raw.length !== 1) return { ok: false, code: 'dpop-proof-multiple' };
  const proof = String(Array.isArray(raw) ? raw[0] : raw).trim();
  if (proof.includes(',')) return { ok: false, code: 'dpop-proof-multiple' };
  const parts = proof.split('.');
  if (parts.length !== 3 || proof.length > 4096 || !parts.every((p) => B64U_RE.test(p))) {
    return { ok: false, code: 'dpop-proof-invalid' };
  }
  let header;
  let payload;
  try {
    header = JSON.parse(Buffer.from(parts[0], 'base64url').toString('utf8'));
    payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'));
  } catch {
    return { ok: false, code: 'dpop-proof-invalid' };
  }
  if (!header || typeof header !== 'object' || String(header.typ).toLowerCase() !== 'dpop+jwt') {
    return { ok: false, code: 'dpop-proof-invalid' };
  }
  if (!DPOP_ALGORITHMS.includes(header.alg)) return { ok: false, code: 'dpop-proof-invalid' };
  const jwk = header.jwk;
  if (!jwk || typeof jwk !== 'object') return { ok: false, code: 'dpop-proof-invalid' };
  if (PRIVATE_MEMBERS.some((m) => m in jwk)) return { ok: false, code: 'dpop-proof-private-key' };
  const okKey =
    (header.alg === 'ES256' && jwk.kty === 'EC' && jwk.crv === 'P-256' && B64U_RE.test(jwk.x ?? '') && B64U_RE.test(jwk.y ?? '')) ||
    (header.alg === 'EdDSA' && jwk.kty === 'OKP' && jwk.crv === 'Ed25519' && B64U_RE.test(jwk.x ?? ''));
  if (!okKey) return { ok: false, code: 'dpop-proof-invalid' };
  let valid = false;
  try {
    const key = crypto.createPublicKey({ key: publicPart(jwk), format: 'jwk' });
    const sig = Buffer.from(parts[2], 'base64url');
    const data = Buffer.from(`${parts[0]}.${parts[1]}`, 'utf8');
    valid =
      sig.length === 64 &&
      (header.alg === 'ES256'
        ? crypto.verify('sha256', data, { key, dsaEncoding: 'ieee-p1363' }, sig)
        : crypto.verify(null, data, key, sig));
  } catch {
    valid = false;
  }
  if (!valid) return { ok: false, code: 'dpop-proof-invalid' };
  if (payload.htm !== String(input.method).toUpperCase()) return { ok: false, code: 'dpop-htm-mismatch' };
  const got = typeof payload.htu === 'string' ? normalizeHtu(payload.htu) : null;
  const want = normalizeHtu(input.expectedHtu);
  if (!got || !want || got !== want) return { ok: false, code: 'dpop-htu-mismatch' };
  const skew = input.maxSkewSeconds ?? 120;
  const nowSec = Math.floor((input.now ?? new Date()).getTime() / 1000);
  if (typeof payload.iat !== 'number' || Math.abs(nowSec - payload.iat) > skew) {
    return { ok: false, code: 'dpop-iat-out-of-range' };
  }
  if (typeof payload.jti !== 'string' || payload.jti.length < 8 || payload.jti.length > 200) {
    return { ok: false, code: 'dpop-jti-missing' };
  }
  const jkt = jwkThumbprint(jwk);
  if (input.expectedJkt !== undefined && jkt !== input.expectedJkt) return { ok: false, code: 'dpop-key-mismatch' };
  if (input.accessToken !== undefined && payload.ath !== sha256B64u(input.accessToken)) {
    return { ok: false, code: 'dpop-ath-mismatch' };
  }
  if (input.replay) {
    const key = crypto.createHash('sha256').update(`${jkt}|${payload.jti}`).digest('hex');
    const fresh = await input.replay.markOnce(key, new Date((payload.iat + skew * 2) * 1000));
    if (!fresh) return { ok: false, code: 'dpop-replay' };
  }
  return { ok: true, jkt, payload };
}

/** 同じプロセスの中だけの再利用検知 (テスト・単独の模擬環境用)。 */
export function memoryReplayStore() {
  const seen = new Map();
  return {
    async markOnce(key, expiresAt) {
      const now = Date.now();
      for (const [k, exp] of seen) if (exp < now) seen.delete(k);
      if (seen.has(key)) return false;
      seen.set(key, expiresAt.getTime());
      return true;
    }
  };
}

// ---- エラー ----------------------------------------------------------------------

/** CPOS が返したエラー (トークン・鍵は含めない)。 */
export class RobotApiError extends Error {
  constructor({ status, reasonCode, message, body, method, path }) {
    super(redactSecrets(message ?? `CPOS が ${status} を返しました`));
    this.name = 'RobotApiError';
    this.status = status;
    this.reasonCode = reasonCode ?? null;
    this.body = body ?? null;
    this.method = method;
    this.path = path;
    this.kind = classifyStatus(status, reasonCode);
    this.retryable = this.kind === 'transient';
  }
}

/** 資格情報が使えなくなった。職員に QR で登録し直してもらう必要がある。 */
export class RobotRegistrationRequiredError extends RobotApiError {
  constructor(args) {
    super(args);
    this.name = 'RobotRegistrationRequiredError';
    this.kind = 'registration-required';
    this.retryable = false;
  }
}

/** CPOS に届かなかった (通信断・時間切れ)。結果は分からない。 */
export class RobotNetworkError extends Error {
  constructor(message, { method, path, cause } = {}) {
    super(redactSecrets(message));
    this.name = 'RobotNetworkError';
    this.method = method;
    this.path = path;
    this.kind = 'transient';
    this.retryable = true;
    // 保存された後で応答だけ消えたかもしれない。やり直す前に状態を照会する。
    this.outcomeUnknown = true;
    if (cause) this.cause = cause;
  }
}

const REGISTRATION_REQUIRED = new Set([
  'registration-revoked',
  'token-family-revoked',
  'token-invalid',
  'wrong-environment',
  're-registration-required',
  'refresh-reuse-detected',
  'refresh-expired',
  'key-rotated',
  'unknown-refresh-token'
]);

/** 応答の種類: 再送してよいかの判断に使う。 */
export function classifyStatus(status, reasonCode) {
  if (status === 401) {
    if (reasonCode === 'token-expired') return 'token-expired';
    if (reasonCode === 'dpop-iat-out-of-range') return 'clock-skew';
    if (reasonCode && REGISTRATION_REQUIRED.has(reasonCode)) return 'registration-required';
    return 'auth';
  }
  if (status === 403) return 'permission';
  if (status === 404) return 'not-found';
  if (status === 409) return 'conflict';
  if (status === 400 || status === 422) return 'invalid';
  if (status === 429 || status >= 500) return 'transient';
  return 'other';
}

// ---- 資格情報の保存 -------------------------------------------------------------

/**
 * メモリだけの保存先 (テスト用)。本番の機体は、再起動・入れ替えで消えない保存先
 * (暗号化したファイル・Secret Manager・機体内の格納) を使う。複数のプロセスが
 * 同じ機体として動くなら `withLock` で更新を 1 つに絞る。
 */
export function memoryCredentialStore(initial = null) {
  let value = initial ? structuredClone(initial) : null;
  let chain = Promise.resolve();
  return {
    async load() {
      return value ? structuredClone(value) : null;
    },
    async save(next) {
      value = next ? structuredClone(next) : null;
    },
    async withLock(fn) {
      const run = chain.then(fn, fn);
      chain = run.catch(() => {});
      return run;
    }
  };
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---- クライアント ---------------------------------------------------------------

/**
 * @param {{
 *   baseUrl: string,            // 接続先 CPOS (運用者が許可した URL だけ)
 *   clientId: string,           // 機体ソフトウェアの識別 (自己申告)
 *   environment: 'production' | 'staging' | 'development',
 *   signer: object,             // createSoftwareSigner など
 *   store: object,              // 資格情報の保存先 { load, save, withLock? }
 *   fetch?: typeof fetch,
 *   now?: () => number,         // ミリ秒
 *   refreshSkewSeconds?: number,
 *   maxRetries?: number,
 *   retryBaseMs?: number,
 *   timeoutMs?: number,
 *   userAgent?: string
 * }} options
 */
export function createRobotDeviceClient(options) {
  if (!options?.baseUrl) throw new TypeError('baseUrl が必要です');
  if (!options.signer) throw new TypeError('signer が必要です');
  if (!options.store) throw new TypeError('store が必要です');
  const baseUrl = options.baseUrl.replace(/\/+$/, '');
  const fetchImpl = options.fetch ?? globalThis.fetch;
  const nowMs = options.now ?? (() => Date.now());
  const refreshSkew = (options.refreshSkewSeconds ?? 60) * 1000;
  const maxRetries = options.maxRetries ?? 3;
  const retryBase = options.retryBaseMs ?? 500;
  const timeoutMs = options.timeoutMs ?? 30_000;
  let signer = options.signer;
  /** 機体の時計と CPOS の時計の差 (ミリ秒)。時計のずれの 401 で補正する。 */
  let clockOffsetMs = 0;
  let refreshing = null;

  const nowSeconds = () => Math.floor((nowMs() + clockOffsetMs) / 1000);

  async function rawFetch(method, path, { headers = {}, body, form } = {}) {
    const url = `${baseUrl}${path}`;
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeoutMs);
    try {
      const res = await fetchImpl(url, {
        method,
        headers: {
          Accept: 'application/json',
          ...(options.userAgent ? { 'User-Agent': options.userAgent } : {}),
          ...(form ? { 'Content-Type': 'application/x-www-form-urlencoded' } : body !== undefined ? { 'Content-Type': 'application/json' } : {}),
          ...headers
        },
        body: form ? new URLSearchParams(form).toString() : body !== undefined ? JSON.stringify(body) : undefined,
        signal: ctrl.signal
      });
      const text = await res.text();
      let json = null;
      try {
        json = text ? JSON.parse(text) : null;
      } catch {
        json = null;
      }
      return { status: res.status, json, headers: res.headers };
    } catch (e) {
      throw new RobotNetworkError(`CPOS に届きませんでした (${e?.name ?? 'error'})`, { method, path, cause: e });
    } finally {
      clearTimeout(timer);
    }
  }

  function adoptServerTime(r) {
    const t = r.json?.serverTime ?? r.headers?.get?.('x-cpos-server-time');
    const ms = t ? Date.parse(t) : NaN;
    if (Number.isFinite(ms)) clockOffsetMs = ms - nowMs();
  }

  async function proof(method, path, accessToken, claims) {
    return createDpopProof({ signer, htm: method, htu: htuOf(`${baseUrl}${path}`), accessToken, nowSeconds: nowSeconds(), claims });
  }

  function errorFrom(r, method, path) {
    const reasonCode = r.json?.reasonCode ?? null;
    const message = r.json?.error_description ?? (typeof r.json?.error === 'string' ? r.json.error : undefined);
    const args = { status: r.status, reasonCode, message, body: r.json, method, path };
    const kind = classifyStatus(r.status, reasonCode);
    if (kind === 'registration-required' || (r.status === 400 && reasonCode && REGISTRATION_REQUIRED.has(reasonCode))) {
      return new RobotRegistrationRequiredError(args);
    }
    return new RobotApiError(args);
  }

  async function tokenRequest(form) {
    for (let attempt = 0; attempt < 2; attempt += 1) {
      const r = await rawFetch('POST', '/api/robotics/device/token', {
        form,
        headers: { DPoP: await proof('POST', '/api/robotics/device/token') }
      });
      if (r.status === 400 && r.json?.reasonCode === 'dpop-iat-out-of-range' && attempt === 0) {
        adoptServerTime(r);
        continue;
      }
      return r;
    }
    throw new Error('unreachable');
  }

  function credentialsFrom(json) {
    const now = nowMs();
    return {
      accessToken: json.access_token,
      refreshToken: json.refresh_token,
      accessExpiresAt: new Date(now + (json.expires_in ?? 0) * 1000).toISOString(),
      refreshExpiresAt: json.refresh_token_expires_in ? new Date(now + json.refresh_token_expires_in * 1000).toISOString() : null,
      registrationId: json.cpos_registration_id,
      robotId: json.cpos_robot_id,
      facilityId: json.cpos_facility_id,
      environment: json.cpos_environment,
      permissionVersion: json.cpos_permission_version ?? null,
      scope: json.scope ?? '',
      jkt: signer.jkt,
      baseUrl
    };
  }

  async function withLock(fn) {
    return typeof options.store.withLock === 'function' ? options.store.withLock(fn) : fn();
  }

  /** 更新は同時に 1 回だけ (プロセス内 + 保存先のロック)。 */
  async function refresh(force = false) {
    if (refreshing) return refreshing;
    refreshing = (async () => {
      try {
        return await withLock(async () => {
          // 別のプロセスが先に更新していたら、それを使う。
          const current = await options.store.load();
          if (!current?.refreshToken) {
            throw new RobotRegistrationRequiredError({ status: 401, reasonCode: 'not-registered', message: '機体が登録されていません' });
          }
          if (current.jkt && current.jkt !== signer.jkt) {
            throw new RobotRegistrationRequiredError({ status: 401, reasonCode: 'key-rotated', message: '鍵が保存された資格情報と一致しません' });
          }
          if (!force && Date.parse(current.accessExpiresAt) - refreshSkew > nowMs()) return current;
          const r = await tokenRequest({ grant_type: 'refresh_token', refresh_token: current.refreshToken });
          if (r.status !== 200) {
            // 同時更新に負けた: 勝った側が保存した資格情報を読み直す。
            if (r.json?.reasonCode === 'concurrent-token-request') {
              const latest = await options.store.load();
              if (latest && latest.accessToken !== current.accessToken) return latest;
            }
            throw errorFrom(r, 'POST', '/api/robotics/device/token');
          }
          const next = credentialsFrom(r.json);
          await options.store.save(next);
          return next;
        });
      } finally {
        refreshing = null;
      }
    })();
    return refreshing;
  }

  async function currentCredentials() {
    const c = await options.store.load();
    if (!c?.accessToken) {
      throw new RobotRegistrationRequiredError({ status: 401, reasonCode: 'not-registered', message: '機体が登録されていません' });
    }
    if (Date.parse(c.accessExpiresAt) - refreshSkew <= nowMs()) return refresh();
    return c;
  }

  /**
   * /api/robotics の呼び出し。`opId` を付けた操作は、応答が消えても同じ opId で
   * 再送できる (CPOS は 2 回目を保存済みの結果で答える)。
   * @param {string} method
   * @param {string} path  `/api/robotics/...`
   * @param {{ body?: unknown, opId?: string, retry?: boolean }} [opts]
   */
  async function request(method, path, opts = {}) {
    if (!path.startsWith('/api/robotics/')) throw new TypeError('機体の資格情報で呼べるのは /api/robotics だけです');
    const idempotent = method === 'GET' || !!opts.opId;
    const body = opts.opId && opts.body && typeof opts.body === 'object' ? { ...opts.body, opId: opts.opId } : opts.body;
    let creds = await currentCredentials();
    let authRetried = false;
    let attempt = 0;
    for (;;) {
      let r;
      try {
        r = await rawFetch(method, path, {
          body,
          headers: {
            Authorization: `DPoP ${creds.accessToken}`,
            // 再送でも証明は毎回作り直す (jti を変える)。
            DPoP: await proof(method, path, creds.accessToken)
          }
        });
      } catch (e) {
        if (e instanceof RobotNetworkError && idempotent && opts.retry !== false && attempt < maxRetries) {
          attempt += 1;
          await sleep(backoff(attempt));
          continue;
        }
        throw e;
      }
      if (r.status >= 200 && r.status < 300) return r.json;
      const err = errorFrom(r, method, path);
      if (err.kind === 'token-expired' && !authRetried) {
        authRetried = true;
        creds = await refresh(true);
        continue;
      }
      if (err.kind === 'clock-skew' && !authRetried) {
        authRetried = true;
        adoptServerTime(r);
        continue;
      }
      if (err.kind === 'transient' && idempotent && opts.retry !== false && attempt < maxRetries) {
        attempt += 1;
        const ra = Number(r.headers?.get?.('retry-after'));
        await sleep(Number.isFinite(ra) && ra > 0 ? Math.min(ra * 1000, 30_000) : backoff(attempt));
        continue;
      }
      throw err;
    }
  }

  function backoff(attempt) {
    const base = retryBase * 2 ** (attempt - 1);
    return Math.min(base + Math.floor(Math.random() * base), 15_000);
  }

  return {
    get jkt() {
      return signer.jkt;
    },
    get clockOffsetMs() {
      return clockOffsetMs;
    },

    /**
     * 登録を始める。返す userCode / verificationUriComplete を画面 (QR) に出す。
     * deviceCode は機体だけが持つ (QR・画面・ログに出さない)。
     * @param {{ robot: { name: string, vendor: string, model: string, serialNumber?: string,
     *                    kind: string, softwareVersion?: string, simulation: boolean },
     *           capabilities: string[] }} input
     */
    async startRegistration(input) {
      for (let attempt = 0; attempt < 2; attempt += 1) {
        const r = await rawFetch('POST', '/api/robotics/device/authorize', {
          body: {
            client_id: options.clientId,
            scope: input.capabilities.map((c) => `robotics:${c}`).join(' '),
            cpos_environment: options.environment,
            cpos_robot: input.robot
          },
          headers: { DPoP: await proof('POST', '/api/robotics/device/authorize') }
        });
        if (r.status === 400 && r.json?.reasonCode === 'dpop-iat-out-of-range' && attempt === 0) {
          adoptServerTime(r);
          continue;
        }
        if (r.status !== 200) throw errorFrom(r, 'POST', '/api/robotics/device/authorize');
        const j = r.json;
        return {
          deviceCode: j.device_code,
          userCode: j.user_code,
          verificationUri: j.verification_uri,
          verificationUriComplete: j.verification_uri_complete,
          expiresAt: new Date(nowMs() + j.expires_in * 1000).toISOString(),
          intervalSeconds: j.interval,
          environment: j.cpos_environment,
          profile: j.cpos_profile
        };
      }
      throw new Error('unreachable');
    },

    /**
     * 承認を 1 回だけ確かめる (呼び出し側が intervalSeconds ごとに呼ぶ)。
     * 承認されたら資格情報を保存して { status: 'registered' } を返す。
     * @returns {Promise<{ status: 'pending' | 'slow_down' | 'registered' | 'denied' | 'expired' | 're-registration-required', intervalSeconds?: number, credentials?: object }>}
     */
    async pollRegistration(grant) {
      const r = await tokenRequest({ grant_type: DEVICE_CODE_GRANT, device_code: grant.deviceCode, client_id: options.clientId });
      if (r.status === 200) {
        const creds = credentialsFrom(r.json);
        await options.store.save(creds);
        return { status: 'registered', credentials: publicCredentials(creds) };
      }
      const e = r.json?.error;
      if (e === 'authorization_pending') return { status: 'pending', intervalSeconds: r.json.interval ?? grant.intervalSeconds };
      if (e === 'slow_down') return { status: 'slow_down', intervalSeconds: r.json.interval ?? grant.intervalSeconds + 5 };
      if (e === 'access_denied') return { status: 'denied' };
      if (e === 'expired_token') return { status: 'expired' };
      if (e === 'invalid_grant') return { status: 're-registration-required' };
      throw errorFrom(r, 'POST', '/api/robotics/device/token');
    },

    request,
    get: (path) => request('GET', path),
    post: (path, body, opts = {}) => request('POST', path, { ...opts, body }),

    /** 資格情報を今すぐ更新する (通常は request が必要なときに自動で行う)。 */
    refresh: () => refresh(true),

    /** 保存されている資格情報 (トークンを除いた表示用)。 */
    async status() {
      const c = await options.store.load();
      return c ? publicCredentials(c) : null;
    },

    /**
     * 鍵を交換する。今の鍵で呼び、新しい鍵の証明を本文に入れる。古い資格情報は
     * その場で使えなくなる。鍵を失くしたときは使えない (職員に登録し直してもらう)。
     */
    async rotateKey(newSigner) {
      const path = '/api/robotics/device/rotate-key';
      const newKeyProof = await createDpopProof({
        signer: newSigner,
        htm: 'POST',
        htu: htuOf(`${baseUrl}${path}`),
        nowSeconds: nowSeconds(),
        claims: { cpos_rotate_from: signer.jkt }
      });
      const json = await request('POST', path, { body: { newKeyProof }, retry: false });
      signer = newSigner;
      const next = credentialsFrom(json);
      await options.store.save(next);
      return publicCredentials(next);
    },

    /** 機体自身の登録を解除する (廃棄・引き渡し)。 */
    async deregister() {
      const json = await request('POST', '/api/robotics/device/deregister', { body: {}, retry: false });
      await options.store.save(null);
      return json;
    }
  };
}

function publicCredentials(c) {
  return {
    registrationId: c.registrationId,
    robotId: c.robotId,
    facilityId: c.facilityId,
    environment: c.environment,
    scope: c.scope,
    permissionVersion: c.permissionVersion,
    accessExpiresAt: c.accessExpiresAt,
    refreshExpiresAt: c.refreshExpiresAt,
    baseUrl: c.baseUrl
  };
}
