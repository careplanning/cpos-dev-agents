// 開発用。接続先は .env で決まる (原則は模擬サーバ = 架空データ。ステージングは架空データに置き換わってから)。
//   npm run dev        .env の {{APP}}_CPOS_BASE_URL がステージングならそこへ、127.0.0.1 なら模擬サーバを一緒に起動
//   npm run dev:mock   .env に関わらず模擬サーバ (オフラインのとき、自分で選ぶとき)
//   ステージングに切り替える: npx github:loogo-inc/cpos-kit connect
//
// ブラウザで開く URL は **127.0.0.1** (localhost ではない)。KIT 模擬サーバのログイン cookie は
// 127.0.0.1 に発行されるので、localhost で開くとログインが一巡しない (実験 12 で詰まった)。
// 4300 が使用中なら FAKE_PORT=4311 のように変える。

import { startFakeCpos } from '@cpos/kit/fake';
import { connectionMode } from '@cpos/kit/client';
import { createApp, configFromEnv } from './server.mjs';

const base = configFromEnv();
const mode = connectionMode({ baseUrl: base.cposBaseUrl });
if (mode === 'unset') {
  console.error('接続先が未設定です。ステージング: npx github:loogo-inc/cpos-kit connect  /  模擬サーバ: npm run dev:mock');
  process.exit(2);
}
let fake = null;
let cfg;
if (mode === 'mock') {
  const fakePort = Number(process.env.FAKE_PORT) || 4300;
  try {
    fake = await startFakeCpos({ port: fakePort, log: (l) => process.env.FAKE_LOG && console.log('[KIT模擬サーバ]', l) });
  } catch (e) {
    console.error(`KIT 模擬サーバを ${fakePort} で起動できません (${e.message})。FAKE_PORT=4311 のように別の番号を指定してください`);
    process.exit(2);
  }
  console.log(`接続先: 模擬サーバ ${fake.baseUrl}  (架空データ。ログイン画面: ${fake.baseUrl}/api/auth/login?next=/ 。ステージングに切り替える: npx github:loogo-inc/cpos-kit connect)`);
  cfg = { ...base, cposBaseUrl: fake.baseUrl, cposToken: 'cpos_app_dev', appDataAppId: undefined };
} else {
  console.log(`接続先: ステージング ${base.cposBaseUrl}  (本物のデータ。模擬サーバにするなら npm run dev:mock)`);
  cfg = { ...base };
}
const app = createApp(cfg);
const port = await app.listen(cfg.port);
console.log(`{{name}}: http://127.0.0.1:${port}`);
console.log('止めるときは Ctrl+C');

process.on('SIGINT', async () => { await app.close(); if (fake) await fake.close(); process.exit(0); });
