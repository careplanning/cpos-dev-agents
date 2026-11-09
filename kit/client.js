// CPOS を呼ぶための薄いクライアント。依存ゼロ (fetch は Node 18+ 組込)。
//
//   import { createCposClient } from '@cpos/kit/client';
//   const cpos = createCposClient({
//     baseUrl: process.env.MYAPP_CPOS_BASE_URL,
//     token: () => resolveTokenSomehow(),   // 文字列でも、毎回解決する関数でもよい
//   });
//   const users = await cpos.masterUsers.list({ facilityId: 'fac_sakura' });          // 手書きの 5 系統 (型と日本語 hint あり)
//   const plans = await cpos.app.transport.getPlans({ facilityId: 'fac_sakura' });   // 生成された全 operation (kit/api.json)
//
// 設計:
//   - CPOS の公式 OpenAPI に載る operation は全部メソッドになっている (1 operation = 1 メソッド。kit の保守者が生成器で作る)。
//       cpos.app.<group>.<verb><Path>()      Bearer (App Token / PAT / OAuth) で呼べるもの + 認証なし
//       cpos.session.<group>.<verb><Path>()  管理画面のセッション Cookie でしか呼べないもの (cookie を渡したときだけ)
//     戻り値は生の JSON (応答の形は OpenAPI にほとんど無い)。項目名を推測して整形しない。
//   - 事業所 (facilityId) が必須の operation は、渡さないと CPOS に届く前に日本語のエラーになる。
//   - CPOS の { ok: false, error } はすべて CposApiError として投げる。err.hint に「次にやること」が入る。
//   - トークンをログに出さない。

import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
let apiTable;
/** 生成された operation の表 (kit/api.json)。 */
export function loadApi() {
  if (!apiTable) apiTable = JSON.parse(readFileSync(resolve(here, 'api.json'), 'utf8'));
  return apiTable;
}
/** OpenAPI のパス (/api/x/{id} または /api/x/:id) に実際のパスが当たるか。 */
export function pathMatches(pattern, path) {
  const escaped = pattern.replace(/[.*+?^$()|[\]\\]/g, (ch) => '\\' + ch);
  const re = new RegExp('^' + escaped.replace(/\{[^}]+\}|:[A-Za-z_][\w]*/g, '[^/]+') + '$');
  return re.test(String(path).split('?')[0]);
}
/** method + path に当たる operation (無ければ null)。 */
export function lookupOperation(method, path) {
  const m = String(method).toUpperCase();
  return loadApi().operations.find((op) => op.method === m && pathMatches(op.path, path)) ?? null;
}

/**
 * App Token の解決。ファイル (Secret Manager を volume で mount したもの) があればそれを ttlMs ごとに読み直し、無ければ env を返す。
 * CPOS 側のトークン入替 (apps:fleet rotate) は Secret Manager に新しい版を書き、旧トークンは 15 分で失効するので、起動時の定数を持ち続けると 401 になる。
 * @param {{ file?: string, fallback?: () => string | null | undefined, env?: string, ttlMs?: number }} o  file はパス、fallback は自前の解決 (起動時に読んだ env など)、env は process.env のキー名
 */
export function tokenResolver(o = {}) {
  let cached = null, readAt = 0;
  const ttl = o.ttlMs ?? 60_000;
  return () => {
    if (o.file) {
      const now = Date.now();
      if (!cached || now - readAt > ttl) { try { cached = readFileSync(o.file, 'utf8').trim(); readAt = now; } catch { cached = cached ?? null; readAt = now; } }
      if (cached) return cached;
    }
    if (typeof o.fallback === 'function') { const v = o.fallback(); if (v) return v; }
    return o.env ? (process.env[o.env] ?? null) : null;
  };
}

/**
 * いまの接続先がどちらか。原則はステージング (本物)。模擬サーバは自分で選んだとき (--mock か 127.0.0.1 / localhost の URL) だけ。
 * @param {{ baseUrl?: string | null, argv?: string[] }} o
 * @returns {'staging' | 'mock' | 'unset'}
 */
export function connectionMode(o = {}) {
  if ((o.argv ?? process.argv).includes('--mock')) return 'mock';
  const u = String(o.baseUrl ?? '').trim();
  if (!u) return 'unset';
  return /^https?:\/\/(127\.0\.0\.1|localhost)(:|\/|$)/.test(u) ? 'mock' : 'staging';
}

/**
 * 帳票・画面に出してよい被保険者番号。無ければ null。
 * CPOS の insuredNumber は「保存キー」で、番号の無い人・未確定の人は仮番号 (tmp-*) か masterUserId そのもの (mu_*) が入る。
 * それを本物の番号として出さない。CPOS が displayInsuredNumber を返す API (platform/facilities/{facilityId}/users など) ではそれを使い、
 * 返さない API (platform/master-users) では CPOS と同じ規則 (tmp- 始まりか mu_ + 6 文字以上は出さない) で insuredNumber から出す。
 * @param {{ insuredNumber?: string | null, displayInsuredNumber?: string | null }} user
 * @returns {string | null}
 */
export function displayInsuredNumber(user) {
  if (user && user.displayInsuredNumber !== undefined) return user.displayInsuredNumber || null;
  const v = typeof user?.insuredNumber === 'string' ? user.insuredNumber.trim() : '';
  return v && !/^tmp-/.test(v) && !/^mu_[A-Za-z0-9_-]{6,}$/.test(v) ? v : null;
}

export class CposApiError extends Error {
  /**
   * @param {{ status: number, error: string, message?: string, hint?: string, method: string, path: string }} info
   */
  constructor(info) {
    super(`${info.method} ${info.path} → ${info.status} ${info.error}${info.message ? `: ${info.message}` : ''}`);
    this.name = 'CposApiError';
    this.status = info.status;
    this.error = info.error;
    this.detail = info.message ?? null;
    this.code = info.code ?? null;          // KIT 模擬サーバだけが返す機械可読の補助
    this.requiredScope = info.requiredScope ?? null;
    this.body = info.body ?? null;          // CPOS が返した JSON そのもの (reasonCode / allowedFacilityIds / issues など)
    this.hint = info.hint ?? hintFor(info.status, info.error, info.body);
    this.method = info.method;
    this.path = info.path;
  }
}

export class CposClientError extends Error {
  constructor(message, hint) {
    super(message);
    this.name = 'CposClientError';
    this.hint = hint ?? null;
  }
}

// 本物の CPOS の error は機械可読なスラッグではなく日本語の文 (例 "認証が必要です"、
// "この API トークンにスコープ「x」がありません。…"、"facility x が見つかりません")。
// status と文面から「次にやること」を組み立てる。
function hintFor(status, error, body) {
  const t = String(error ?? '');
  if (status === 401) return 'トークンが無いか無効です。App Token (cpos_app_*) を Secret Manager か env から解決して Bearer で送ってください。ブラウザからは送れません。管理画面のセッション Cookie でしか呼べない API (cpos.session.*) なら、ログインを引き継ぐアプリから cookie を渡します。';
  if (status === 403 && body?.code === 'pat_subject_forbidden') return 'PAT (cpos_pat_*) は発行した本人のロールの範囲でしか効きません。スコープを足しても通りません。サーバ間の呼び出しは App Token にするか、その操作をできる人の PAT を使ってください。';
  if (status === 403 && (body?.requiredScope || /スコープ/.test(t))) return `スコープ不足です (${body?.requiredScope ?? '?'})。cpos.manifest.json の apiTokenScopes に足して再登録し、App Token を再発行してください。`;
  if (status === 403) return 'この事業所か操作はトークン (またはログインユーザー) に許可されていません。facilities.list() にある事業所か確かめ、CPOS 管理者に相談してください。';
  if (status === 404 && /facility|事業所/.test(t)) return '存在しない事業所 ID です (本物は 404、許可されていない事業所は 403)。facilities.list() の id を使ってください。';
  if (status === 404) return 'パスか ID が違います (本物は無いパスに HTML の 404 を返します)。kit/api.d.ts で正しいメソッドと引数を確かめてください。';
  if (status === 501) return 'KIT 模擬サーバに応答が無いエンドポイントです。本物 (ステージング) につないで確かめ、それまで画面は「CPOS 接続待ち」にします。応答の形は実物を見てから決めてください。';
  return null;
}

/**
 * @param {{ baseUrl: string, token?: string | (() => string | Promise<string>), fetch?: typeof fetch, clientName?: string, cookie?: string, timeoutMs?: number }} opts
 */
export function createCposClient(opts) {
  if (!opts || typeof opts.baseUrl !== 'string' || !opts.baseUrl) {
    throw new CposClientError('baseUrl がありません', '例: createCposClient({ baseUrl: process.env.MYAPP_CPOS_BASE_URL, token })');
  }
  const baseUrl = opts.baseUrl.replace(/\/+$/, '');
  const fetchImpl = opts.fetch ?? globalThis.fetch;
  const timeoutMs = opts.timeoutMs ?? 30_000;
  const clientName = opts.clientName ?? 'cpos-kit-client';

  async function resolveToken() {
    if (typeof opts.token === 'function') return await opts.token();
    return opts.token ?? null;
  }

  /**
   * 生の呼び出し (検査なし)。生成されたメソッドと手書きの系統が使う。
   * @param {string} method
   * @param {string} path  /api/... で始まる
   * @param {{ body?: unknown, facilityId?: string, query?: Record<string, string | undefined>, headers?: Record<string, string> }} [o]
   */
  async function raw(method, path, o = {}) {
    if (!path.startsWith('/')) throw new CposClientError(`path は / で始めてください (いま ${path})`);
    const url = new URL(baseUrl + path);
    for (const [k, v] of Object.entries(o.query ?? {})) if (v !== undefined && v !== '') url.searchParams.set(k, v);
    const headers = { Accept: 'application/json', 'X-Client': clientName, ...(o.headers ?? {}) };
    const token = await resolveToken();
    if (token) headers.Authorization = `Bearer ${token}`;
    if (opts.cookie) headers.Cookie = opts.cookie;
    if (o.facilityId) { headers['X-Cpos-Facility-Id'] = o.facilityId; if (!url.searchParams.has('facilityId')) url.searchParams.set('facilityId', o.facilityId); } // ヘッダを読む API と query を読む API の両方に効かせる
    let body;
    if (o.body !== undefined) {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(o.body);
    }
    const ac = new AbortController();
    const timer = setTimeout(() => ac.abort(), timeoutMs);
    let res;
    try {
      res = await fetchImpl(url, { method, headers, body, signal: ac.signal });
    } catch (e) {
      throw new CposClientError(`${method} ${path}: CPOS に届きませんでした (${e.name === 'AbortError' ? `${timeoutMs}ms でタイムアウト` : e.message})`,
        `baseUrl (${baseUrl}) が正しいか、KIT 模擬サーバなら起動しているか (npx cpos-kit fake) を確かめてください`);
    } finally {
      clearTimeout(timer);
    }
    const text = await res.text();
    let json = null;
    if (text) {
      try { json = JSON.parse(text); } catch { json = null; }
    }
    if (!res.ok || (json && json.ok === false)) {
      throw new CposApiError({
        status: res.status,
        error: (json && json.error) || `http_${res.status}`,
        message: json && json.message ? json.message : (json ? undefined : text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 120)),
        hint: json && json.hint ? json.hint : undefined,
        code: json && json.code ? json.code : undefined,
        requiredScope: json && json.requiredScope ? json.requiredScope : undefined,
        body: json,
        method,
        path
      });
    }
    return json;
  }

  function needFacility(facilityId, what) {
    if (!facilityId) {
      throw new CposClientError(`${what} には facilityId (事業所 ID) が必要です`,
        'CPOS のデータは事業所単位です。cpos.facilities.list() で ID を取り、{ facilityId } を渡してください。全事業所をまとめて取る API はありません');
    }
  }

  // ---- 生成された operation (kit/api.json) ------------------------------------
  // 1 operation = 1 メソッド。引数はパラメータ名そのまま ({ facilityId, serviceDate, body })。
  // 止めるのは CPOS に届く前に分かる 3 つだけ: 必須パラメータの欠け、facilityId の付け忘れ、Cookie 専用を cookie 無しで呼ぶ。
  async function callOperation(op, args = {}) {
    const label = `${op.ns}.${op.group}.${op.name}`;
    if (op.ns === 'session' && !opts.cookie) {
      throw new CposClientError(`${label}: 管理画面のセッション Cookie でしか呼べない API です (${op.method} ${op.path})`,
        'App Token では 401 になります。ログインを引き継ぐアプリ (@cpos/kit/app-kit) で受け取った cookie を createCposClient({ cookie }) に渡してください');
    }
    let path = op.path;
    const query = {}; const headers = {};
    for (const p of op.params) {
      const v = args[p.name];
      const missing = v === undefined || v === null || v === '';
      if (p.in === 'path') {
        if (missing) throw new CposClientError(`${label}: ${p.name} がありません`, `${op.method} ${op.path} の {${p.name}} に入る値を渡してください`);
        path = path.replace(`{${p.name}}`, encodeURIComponent(String(v)));
      } else if (p.in === 'query') {
        if (p.required && missing && p.name !== 'facilityId') throw new CposClientError(`${label}: ${p.name} は必須です`, `${op.method} ${op.path}${p.description ? ` (${p.name}: ${p.description})` : ''}`);
        if (!missing) query[p.name] = String(v);
      } else if (p.in === 'header' && !missing) headers[p.name] = String(v);
    }
    if (op.facilityRequired) needFacility(args.facilityId, label);
    if (op.bodyRequired && args.body === undefined) throw new CposClientError(`${label}: body がありません`, `${op.method} ${op.path} は JSON の body が必須です。{ body: {...} } で渡してください`);
    return raw(op.method, path, { facilityId: args.facilityId, query, body: args.body, headers });
  }
  function namespace(ns) {
    const out = {};
    for (const op of loadApi().operations) {
      if (op.ns !== ns) continue;
      (out[op.group] ??= {})[op.name] = (args) => callOperation(op, args);
    }
    return out;
  }

  // ---- raw(): 生成されたメソッドで足りないときだけ。OpenAPI に無いパスは呼べない (推測で叩かせない) --------------
  // rawPolicy: 'allow' は kit 自身のテストと保守の道具だけ (env CPOS_KIT_MAINTAINER=1 が無いと無効)。アプリのコードからは使えない
  const rawPolicy = opts.rawPolicy === 'allow' && process.env.CPOS_KIT_MAINTAINER === '1' ? 'allow' : 'guard';
  const guardedRaw = async (method, path, o = {}) => {
    if (rawPolicy === 'allow') return raw(method, path, o);
    const op = lookupOperation(method, path);
    if (!op) {
      throw new CposClientError(`raw('${method}', '${path}'): CPOS の OpenAPI に無いパスです`,
        'kit が知らない API は raw() でも呼べません。kit/api.d.ts (cpos.app.* / cpos.session.*) で正しいパスを確かめてください。CPOS 側が増やした API なら kit の再生成が要ります (npx cpos-kit doctor で差分が分かる)');
    }
    if (op.facilityRequired && !o.facilityId) {
      throw new CposClientError(`raw('${method}', '${path}'): facilityId がありません`,
        "CPOS のデータは事業所単位です。raw('GET', path, { facilityId }) のように渡してください");
    }
    return raw(method, path, o);
  };

  const client = {
    baseUrl,
    raw: guardedRaw,
    /** 生成元の情報 (OpenAPI の版・revision・取得日) と、パスから operation を引く道具。 */
    api: { generatedFrom: loadApi().generatedFrom, lookup: lookupOperation },
    /** Bearer (App Token / PAT / OAuth) で呼べる全 operation + 認証なし。kit/api.d.ts に一覧。 */
    app: namespace('app'),
    /** 管理画面のセッション Cookie でしか呼べない operation。createCposClient({ cookie }) のときだけ使える。 */
    session: namespace('session'),
    auth: {
      /** ログイン中のユーザー (Cookie 転送用)。サーバ間なら platform.me を使う。 */
      me: () => raw('GET', '/api/auth/me')
    },
    platform: {
      /** App Token が有効か、どのスコープか。起動時の疎通確認に。 */
      me: () => raw('GET', '/api/platform/me'),
      /** CPOS が有効にしている機能 (features.appData.attachments など)。「この CPOS でできるか」を機械的に確かめる。 */
      capabilities: () => raw('GET', '/api/capabilities')
    },
    facilities: {
      /** 呼び出し側が見てよい事業所の一覧。 */
      list: () => raw('GET', '/api/platform/facilities')
    },
    masterUsers: {
      /**
       * 事業所の利用者 (介護を受ける人) の一覧。CPOS の用語では master user。
       * CPOS 本体は facilityId 省略時に「許可された全事業所」を返すが、kit では省略を許さない
       * (画面が「どの事業所を見ているか」を持たない事故を防ぐため)。
       * @param {{ facilityId: string, q?: string, activeOnly?: boolean, limit?: number }} p
       */
      list: async (p) => {
        needFacility(p && p.facilityId, 'masterUsers.list');
        return raw('GET', '/api/platform/master-users', { facilityId: p.facilityId, query: { facilityId: p.facilityId, query: p.q, activeOnly: p.activeOnly ? 'true' : undefined, limit: p.limit ? String(p.limit) : undefined } });
      }
    },
    staffAccounts: {
      /**
       * 組織内のログインユーザー (職員のアカウント) の一覧。利用者ではない。
       * 本物は scope users:read が要る。
       */
      list: async () => {
        const r = await raw('GET', '/api/platform/users');
        return Array.isArray(r) ? r : (r && Array.isArray(r.users) ? r.users : []);
      }
    },
    /**
     * アプリ専用データ。resource は cpos.manifest.json の resources に宣言した名前。
     * @param {string} appId
     */
    appData: (appId) => {
      if (!appId) throw new CposClientError('appData(appId) の appId がありません', 'cpos.manifest.json の appId を渡してください');
      const base = `/api/app-data/${encodeURIComponent(appId)}`;
      // CPOS 本体は resource 名を a-z 0-9 ハイフンに限る (camelCase は 400)。呼ぶ前に止める。
      // 事業所境界 (kit の方針 2026-09-08): 保存も読み出しも「facilityId を付ける」か「scope: 'organization' と明示する」かのどちらか。
      // CPOS 本体は facilityId 無しを許す (組織全体のレコードになる) が、付け忘れが別の事業所への漏えいになるので kit では止める。
      const boundary = (p, what) => {
        if (p && p.facilityId) return p.facilityId;
        if (p && p.scope === 'organization') return undefined;
        throw new CposClientError(`appData.${what}: facilityId が無く、scope: 'organization' の明示もありません`,
          "CPOS のデータは事業所単位です。{ facilityId } を渡してください。わざと全事業所で共有するデータだけ { scope: 'organization' } と書きます");
      };
      const res = (r) => {
        if (!/^[a-z0-9][a-z0-9-]{0,63}$/.test(r ?? '')) {
          throw new CposClientError(`resource 名 "${r}" は使えません (許可: a-z 0-9 ハイフン、1〜64 文字、先頭は英数字)`, '例: notes、transport-plans。cpos.manifest.json の resources の name も同じ規則です');
        }
        return encodeURIComponent(r);
      };
      // 利用者への紐づけ: 行を利用者に結ぶのは data の中ではなく「封筒」の insuredNumber (CPOS 2026-09-26 の利用者キー移行。本物で 2026-09-27 に実測)。
      // CPOS は番号・masterUserId・過去の番号・仮番号のどれで来ても本人の今の保存キーに揃えて masterUserId を付け、
      // 一覧の ?insuredNumber= は本人の全キーで引く。利用者ごとの画面・統合・番号変更の追随は封筒しか見ない (data の中は見ない)。
      // user を渡さない呼び出しは今までと同じ本文を送る。
      const who = (p, what) => {
        const u = p ? p.user : undefined;
        if (u === undefined || u === null) return undefined;
        if (typeof u !== 'string' || !u.trim()) {
          throw new CposClientError(`appData.${what}: user は利用者を指す文字列 (masterUserId) です`,
            '例: { facilityId, user: u.masterUserId }。番号 (insuredNumber) でも本人に着地しますが、番号は変わるので masterUserId を渡してください');
        }
        return u.trim();
      };
      return {
        list: async (resource, p = {}) => raw('GET', `${base}/${res(resource)}`, { facilityId: boundary(p, 'list'), query: { insuredNumber: who(p, 'list'), paginated: p.paginated ? 'true' : undefined, cursor: p.cursor, limit: p.limit ? String(p.limit) : undefined } }),
        get: async (resource, id, p = {}) => raw('GET', `${base}/${res(resource)}/${encodeURIComponent(id)}`, { facilityId: boundary(p, 'get') }),
        create: async (resource, data, p = {}) => { const f = boundary(p, 'create'); const u = who(p, 'create'); return raw('POST', `${base}/${res(resource)}`, { facilityId: f, body: { data, ...(f ? { facilityId: f } : {}), ...(u ? { insuredNumber: u } : {}) } }); },
        // user を渡すと封筒の利用者を付け直す。ふつうは作成時に付けたものが残るので渡さない
        // (2026-09-26 より前の CPOS は PUT の insuredNumber を保存キーに揃えずにそのまま入れる)
        update: async (resource, id, data, p = {}) => { const f = boundary(p, 'update'); const u = who(p, 'update'); return raw('PUT', `${base}/${res(resource)}/${encodeURIComponent(id)}`, { facilityId: f, body: { data, ...(u ? { insuredNumber: u } : {}) } }); },
        remove: async (resource, id, p = {}) => raw('DELETE', `${base}/${res(resource)}/${encodeURIComponent(id)}`, { facilityId: boundary(p, 'remove') }),
        /**
         * data[keyField] が一致する 1 件を探して update、無ければ create。
         * AppData に一意制約は無いので、ここで「利用者 1 人に 1 件」のような約束を守る。
         * 一覧を取って探すので件数が数千を超える resource には向かない (そのときは自前で index を持つ)。
         *
         * user を渡すと、本人の行だけを CPOS 側で絞ってから探し (全件を取らない)、作るときは本人に紐づける。
         * 紐づける前に作った行 (data にしか本人がいない行) は、keyField の値が user と同じとき
         * (例: keyField 'masterUserId' で data.masterUserId === user) だけ拾って本人に紐づける。
         * それ以外の keyField で紐づけ前の行を拾うと、別の人の行を付け替えうるので拾わない。
         * @param {string} resource
         * @param {string} keyField   例 'masterUserId'
         * @param {Record<string, unknown>} data  keyField を含むこと
         * @param {{ facilityId?: string, user?: string }} [p]
         */
        upsertBy: async (resource, keyField, data, p = {}) => {
          const keyValue = data?.[keyField];
          if (keyValue === undefined || keyValue === null || keyValue === '') {
            throw new CposClientError(`upsertBy: data.${keyField} がありません`, `例: upsertBy('${resource}', '${keyField}', { ${keyField}: '...', ... }, { facilityId })`);
          }
          const f = boundary(p, 'upsertBy');
          const u = who(p, 'upsertBy');
          const path = `${base}/${res(resource)}`;
          const rowsOf = (items) => (Array.isArray(items) ? items : items?.items ?? []);
          const same = (r) => r?.data?.[keyField] === keyValue;
          // 探す一覧は CPOS のキャッシュを素通しする (別インスタンスの書き込みが最大 30 秒古く見え、二重に作るのを防ぐ。CPOS 2026-09-15 から。古い CPOS は無視する)
          const fresh = { 'Cache-Control': 'no-cache' };
          let hits = rowsOf(await raw('GET', path, { facilityId: f, query: u ? { insuredNumber: u } : undefined, headers: fresh })).filter(same);
          let link = false;
          if (u && hits.length === 0 && keyValue === u) {
            hits = rowsOf(await raw('GET', path, { facilityId: f, headers: fresh })).filter((r) => same(r) && !r.insuredNumber && !r.masterUserId);
            link = hits.length > 0;
          }
          if (hits.length === 0) {
            return raw('POST', path, { facilityId: f, body: { data, ...(f ? { facilityId: f } : {}), ...(u ? { insuredNumber: u } : {}) } });
          }
          const [first, ...dupes] = hits.sort((a, b) => String(a.createdAt ?? '').localeCompare(String(b.createdAt ?? '')));
          // 封筒は紐づけ前の行を紐づけるときだけ送る (紐づいている行は CPOS が揃えた保存キーのまま触らない)
          const updated = await raw('PUT', `${path}/${encodeURIComponent(first.id)}`, { facilityId: f, body: { data: { ...first.data, ...data }, ...(link ? { insuredNumber: u } : {}) } });
          return dupes.length ? { ...updated, duplicates: dupes.map((d) => d.id) } : updated;
        }
      };
    }
  };
  return client;
}
