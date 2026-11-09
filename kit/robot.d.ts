// @cpos/kit/robot — 機体 (ロボット・アダプタ) 専用のクライアントの型。

export declare const ROBOT_DEVICE_PROFILE: 'cpos-robot-device/2026-10-28';
export declare const DEVICE_CODE_GRANT: 'urn:ietf:params:oauth:grant-type:device_code';
export declare const DPOP_ALGORITHMS: readonly ['ES256', 'EdDSA'];

export interface PublicJwk {
  kty: 'EC' | 'OKP';
  crv: 'P-256' | 'Ed25519';
  x: string;
  y?: string;
}

export interface DeviceKey {
  alg: 'ES256' | 'EdDSA';
  /** 秘密鍵。安全な保管先にだけ置く (平文で一般の DB・ブラウザに置かない)。 */
  privateJwk: Record<string, string>;
  publicJwk: PublicJwk;
  /** RFC 7638 の thumbprint。 */
  jkt: string;
}

/** 署名器。クラウドの鍵管理や機体内の格納でも、この形にすれば差し替えられる。 */
export interface DeviceSigner {
  alg: 'ES256' | 'EdDSA';
  publicJwk: PublicJwk;
  jkt: string;
  sign(bytes: Uint8Array): Promise<Uint8Array>;
}

export declare function generateDeviceKey(opts?: { alg?: 'ES256' | 'EdDSA' }): DeviceKey;
export declare function createSoftwareSigner(key: { alg?: 'ES256' | 'EdDSA'; privateJwk: Record<string, string> }): DeviceSigner;
export declare function jwkThumbprint(jwk: PublicJwk): string;
export declare function htuOf(url: string): string;
export declare function redactSecrets(text: unknown): string;

export declare function createDpopProof(input: {
  signer: DeviceSigner;
  htm: string;
  htu: string;
  accessToken?: string;
  nowSeconds?: number;
  jti?: string;
  claims?: Record<string, unknown>;
}): Promise<string>;

export interface DpopReplayStore {
  /** 同じ鍵と jti の 2 回目に false。複数インスタンスで共有する保存先にする。 */
  markOnce(key: string, expiresAt: Date): Promise<boolean>;
}

export type DpopFailureCode =
  | 'dpop-proof-missing'
  | 'dpop-proof-multiple'
  | 'dpop-proof-invalid'
  | 'dpop-proof-private-key'
  | 'dpop-htm-mismatch'
  | 'dpop-htu-mismatch'
  | 'dpop-iat-out-of-range'
  | 'dpop-jti-missing'
  | 'dpop-replay'
  | 'dpop-ath-mismatch'
  | 'dpop-key-mismatch';

/** 証明の検証 (RFC 9449 §4.3)。模擬環境・エミュレータ・テスト用。 */
export declare function verifyDpopProof(input: {
  header: string | string[] | undefined;
  method: string;
  expectedHtu: string;
  now?: Date;
  replay?: DpopReplayStore;
  accessToken?: string;
  expectedJkt?: string;
  maxSkewSeconds?: number;
}): Promise<{ ok: true; jkt: string; payload: Record<string, unknown> } | { ok: false; code: DpopFailureCode }>;

export declare function memoryReplayStore(): DpopReplayStore;

export type RobotErrorKind =
  | 'token-expired'
  | 'clock-skew'
  | 'registration-required'
  | 'auth'
  | 'permission'
  | 'not-found'
  | 'conflict'
  | 'invalid'
  | 'transient'
  | 'other';

export declare function classifyStatus(status: number, reasonCode?: string | null): RobotErrorKind;

export declare class RobotApiError extends Error {
  status: number;
  reasonCode: string | null;
  body: unknown;
  method?: string;
  path?: string;
  kind: RobotErrorKind;
  /** 待って再送してよいか (GET か opId 付きのときだけ client が再送する)。 */
  retryable: boolean;
}

/** 資格情報が使えない。職員に QR で登録し直してもらう。 */
export declare class RobotRegistrationRequiredError extends RobotApiError {}

/** CPOS に届かなかった。保存済みかもしれないので、やり直す前に状態を照会する。 */
export declare class RobotNetworkError extends Error {
  kind: 'transient';
  retryable: true;
  outcomeUnknown: true;
  method?: string;
  path?: string;
}

export interface RobotCredentials {
  accessToken: string;
  refreshToken: string;
  accessExpiresAt: string;
  refreshExpiresAt: string | null;
  registrationId: string;
  robotId: string;
  facilityId: string;
  environment: string;
  permissionVersion: number | null;
  scope: string;
  jkt: string;
  baseUrl: string;
}

export type PublicRobotCredentials = Omit<RobotCredentials, 'accessToken' | 'refreshToken' | 'jkt'>;

/** 資格情報の保存先。再起動・入れ替えで消えないものにする。 */
export interface RobotCredentialStore {
  load(): Promise<RobotCredentials | null>;
  save(value: RobotCredentials | null): Promise<void>;
  /** 複数プロセスが同じ機体として動くとき、更新を 1 つに絞るロック。 */
  withLock?<T>(fn: () => Promise<T>): Promise<T>;
}

export declare function memoryCredentialStore(initial?: RobotCredentials | null): Required<RobotCredentialStore>;

export interface RegistrationGrant {
  /** 機体だけが持つ。QR・画面・ログに出さない。 */
  deviceCode: string;
  /** 画面に出す短いコード (例 BCDF-GHJK)。 */
  userCode: string;
  verificationUri: string;
  /** QR に入れる URL (確認画面 + 短いコードだけ)。 */
  verificationUriComplete: string;
  expiresAt: string;
  intervalSeconds: number;
  environment: string;
  profile: string;
}

export interface RobotDeviceClientOptions {
  baseUrl: string;
  clientId: string;
  environment: 'production' | 'staging' | 'development';
  signer: DeviceSigner;
  store: RobotCredentialStore;
  fetch?: typeof fetch;
  now?: () => number;
  refreshSkewSeconds?: number;
  maxRetries?: number;
  retryBaseMs?: number;
  timeoutMs?: number;
  userAgent?: string;
}

export interface RobotDeviceClient {
  readonly jkt: string;
  readonly clockOffsetMs: number;
  startRegistration(input: {
    robot: { name: string; vendor: string; model: string; serialNumber?: string; kind: string; softwareVersion?: string; simulation: boolean };
    capabilities: string[];
  }): Promise<RegistrationGrant>;
  pollRegistration(grant: Pick<RegistrationGrant, 'deviceCode' | 'intervalSeconds'>): Promise<{
    status: 'pending' | 'slow_down' | 'registered' | 'denied' | 'expired' | 're-registration-required';
    intervalSeconds?: number;
    credentials?: PublicRobotCredentials;
  }>;
  /** `/api/robotics/...` だけ。opId は本文に入る (作業の操作が受ける)。 */
  request<T = any>(method: string, path: string, opts?: { body?: unknown; opId?: string; retry?: boolean }): Promise<T>;
  get<T = any>(path: string): Promise<T>;
  post<T = any>(path: string, body?: unknown, opts?: { opId?: string; retry?: boolean }): Promise<T>;
  refresh(): Promise<RobotCredentials>;
  status(): Promise<PublicRobotCredentials | null>;
  rotateKey(newSigner: DeviceSigner): Promise<PublicRobotCredentials>;
  deregister(): Promise<unknown>;
}

export declare function createRobotDeviceClient(options: RobotDeviceClientOptions): RobotDeviceClient;
