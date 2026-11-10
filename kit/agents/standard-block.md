<!-- cpos-kit:begin (この間は cpos-kit が所有する。update で置き換わる。手で直さない) -->
## CPOS との連携 (cpos-kit 標準ブロック)

このアプリ「{{name}}」(appId `{{appId}}`) は CPOS (介護の共通基盤) の上で動く。
CPOS とは **HTTP でしか話せない**。DB を共有しない、CPOS のパッケージを import しない。

### 覚える言葉は 5 つ
- **manifest** … `cpos.manifest.json`。アプリの名札。`https://<公開URL>/cpos.manifest.json` で配信され、CPOS がそれを読んで登録する。
- **App Token** … サーバから CPOS を呼ぶ鍵 (`cpos_app_*`)。サーバの env か Secret Manager にだけ置く。ブラウザ・リポジトリ・ログに出さない。
- **facility** … 事業所。CPOS のデータは必ず事業所単位。`X-Cpos-Facility-Id` は client が付ける。許可されていない事業所は 403、存在しない事業所は 404。それが正しい動き。
- **利用者と職員は別の API。** 利用者 (介護を受ける人) は `masterUsers`、事業所の職員 (職種あり) は `cpos.app.platform.getFacilityStaff`、ログインアカウントは `staffAccounts`。利用者のキーは `masterUserId` (`insuredNumber` は変わる)。
- **AppData** … このアプリ専用の保存場所。`/api/app-data/{{appId}}/<resource>`。読み書きに必ず `{ facilityId }` (全事業所で共有するものだけ `{ scope: 'organization' }`)。resource 名は manifest の `resources` に宣言。英小文字・数字・ハイフンだけ (camelCase は 400)。

### 作業の進め方
- 作業は別ブランチで (できれば `git worktree`)。テストが通ったら元のブランチに合流。困ったら聞く。

### 呼び方 (これ以外の方法で CPOS を呼ばない)
```js
import { createCposClient } from '@cpos/kit/client';
const cpos = createCposClient({ baseUrl: process.env.{{APP}}_CPOS_BASE_URL, token: () => process.env.{{APP}}_CPOS_APP_TOKEN });
await cpos.platform.me(); // 疎通と権限の確認
await cpos.facilities.list(); // 見てよい事業所
await cpos.masterUsers.list({ facilityId }); // 事業所の利用者 (介護を受ける人。facilityId 必須)
const notes = cpos.appData('{{appId}}');
await notes.create('notes', { text }, { facilityId }); // 保存
await notes.list('notes', { facilityId }); // 一覧
await notes.upsertBy('notes', 'masterUserId', { masterUserId, text }, { facilityId, user: masterUserId }); // 利用者 1 人に 1 件。user で本人に紐づける
await cpos.app.transport.getPlans({ facilityId }) // 全 API が cpos.app.<機能>.<操作>() にある。戻り値は生の JSON
```
失敗は `CposApiError`。`err.hint` に次にやることが入る。**hint を読んで直す。握りつぶさない。**

### 開発と確認
- 接続先は `.env` (原則は模擬サーバ `npm run dev:mock` = 架空データ)。起動ログの「接続先:」で確かめる。ブラウザは **`http://127.0.0.1:3000`** (`localhost` は cookie が合わない)。
- `npm test` (模擬) が通ってから「できた」と言う。**いまのステージングは本番の写し。** 架空データになるまで `npx github:loogo-inc/cpos-kit connect`・`npm run verify:staging` は頼まれたときだけ。
- トークンの AppData スコープが別の appId のものしか無いときは `{{APP}}_APPDATA_APP_ID` で読み書き先だけ切り替える (connect が案内。本登録後は消す)。
- テストで事業所 ID を固定しない (`@cpos/kit/testing` の `pickFacilities`)。固定すると本物で二度と流せない。
- manifest を変えたら `npx github:loogo-inc/cpos-kit validate` を通し、CPOS への再登録と App Token の再発行が要ることを RESUME.md に書く。
- **ログイン**: fastify の見本には CPOS のログイン (`fastifyLoginGate`) が付いている。node の見本には無いので KIT 模擬サーバ以外に向けて公開しない。方式 (cookie 転送・OAuth 2.1) と付け方はスキル §7。

### データが要るときの手順 (依頼文に「CPOS から」と無くても、取得元の第一候補は CPOS)
1. **CPOS の API は全部 client のメソッド** (`cpos.app.<機能>.<操作>()`、Cookie 専用は `cpos.session.*`)。一覧・引数・スコープは `node_modules/@cpos/kit/kit/api.d.ts` を grep。パスを推測して `raw()` で叩かない。
2. **戻り値は生の JSON。項目名を推測して整形しない。** 実物を見てから列を決め、項目名は `docs/specs/<機能>/design.md` と契約テストに残す。
3. **KIT 模擬サーバに無い API は 501** が返る。画面は「CPOS 接続待ち」にして、担当者に確かめてもらう。
4. **api.d.ts に無い機能** → 推測で叩かず、写しも作らない。`docs/cpos/asks.md` (CPOS 側に頼むことの一覧) に 1 行残し、その画面だけ「準備中」にして他は作り切り、最後に「アプリで持つか CPOS 側に頼むか」を人に聞く。
5. **使うメソッドの scope を `cpos.manifest.json` の `apiTokenScopes` に足す。** `npx github:loogo-inc/cpos-kit scopes --used` がソースから必要なスコープを出し、足りないものを示す (全スコープの一覧は `npx github:loogo-inc/cpos-kit scopes`)。
宣言していないスコープは App Token に付かず、KIT 模擬サーバでは動いて本物で 403 になる。足したら再登録と App Token の再発行 (スキル §6.5)。

### CPOS のデータを自前に持つときの原則

正本は CPOS。**原則、写しは作らない** (2 箇所にあると必ずズレる)。通信断のキャッシュや、CPOS にまだ無いものの暫定保持は持ってよい。持つなら 5 つ全部書く:

1. **なぜ持つか** (キャッシュ / CPOS に無いので暫定、のどちらか)
2. **写しだと分かる形** (`cache-` 接頭辞か、各行に `_source: 'cpos'` と `_fetchedAt`)
3. **書き戻さない** (読むだけ。人が直した値を正本にしない)
4. **消す条件** を `asks.md` と `RESUME.md` に残す (「CPOS から取れたら消す」)
5. **画面に明示** (「CPOS 接続待ち・手入力」等。黙って本物のように見せない)

迷ったら持たない。

### 見本について
雛形の notes (メモ) は見本。使わなければ server.mjs の該当部分と、manifest の `resources` と `app-data:*` のスコープを消す。ログインの関門と `scripts/verify-staging.mjs` は消さない。

### してはいけないこと (5 つ)
1. App Token をブラウザに送る、コードやリポジトリに書く、ログに出す。
2. 事業所 ID を省いて利用者データを取ろうとする (全事業所まとめて取る API は無い)。
3. CPOS のユーザーのために独自のログイン (パスワード DB・JWT) を作る。CPOS のユーザーは CPOS がログインさせる。
4. 本番の個人情報を開発環境にコピーする (いまはステージングも同じ)。開発は KIT 模擬サーバで。
5. `window.confirm` / `alert` / `prompt` を使う (CPOS の画面規約。アプリ内ダイアログを使う)。

### 文書の置き場 (指示が無くてもここに書く)
- 何を作るか → `docs/PRODUCT.md` / 決めたことと理由 (追記のみ) → `docs/DECISIONS.md` / この現場のルール → `docs/RULES.md` / 用語 → `docs/GLOSSARY.md`
- 機能ごとの要件と設計 → `docs/specs/<機能>/requirements.md`, `design.md`
- 次のセッションへの引き継ぎ → `docs/handoff/RESUME.md` (開始時に読み、終了時に更新)。`docs/TICKETS.md` があれば先に読む / CPOS 側への要望 → `docs/cpos/asks.md`

レシピ (利用者一覧、AppData、ログイン、全 API の呼び方) はスキル `cpos` にある。`/cpos` か `$cpos` で呼べる。
<!-- cpos-kit:end -->
