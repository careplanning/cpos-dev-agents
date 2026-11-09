---
name: cpos
description: >
  CPOS (介護の共通基盤) と連携するアプリを書くときのレシピ集。「CPOS から利用者を取りたい」
  「AppData に保存したい」「事業所で絞りたい」「App Token」「manifest」「KIT 模擬サーバで試したい」
  「ログインゲートウェイ」「403 / 401 が出た」と言われたら読む。@cpos/kit/client を使う前提。
---

# CPOS 連携レシピ

すべてのレシピは `@cpos/kit/client` を使う。fetch を直に書かない (ヘッダとエラー処理を間違えるため)。
動かないときは `err.hint` を読む。manifest が疑わしければ `npx github:loogo-inc/cpos-kit validate`。

## 0. 準備 (どのレシピでも共通)

```js
import { createCposClient, CposApiError } from '@cpos/kit/client';

const cpos = createCposClient({
  baseUrl: process.env.<APP>_CPOS_BASE_URL,          // KIT 模擬サーバ: http://127.0.0.1:4300
  token: () => process.env.<APP>_CPOS_APP_TOKEN,      // 本番は Secret Manager から毎回解決する関数にする
});
```

`<APP>` は appId を大文字にしたもの (例 appId `transport` → env 名は `TRANSPORT_CPOS_BASE_URL`。`-` は `_` に)。env 名は `.env.example` にある。

## 1. 事業所の利用者一覧を出す

```js
const facilities = await cpos.facilities.list();            // [{ id, name, type }]
const facilityId = facilities[0].id;
const users = await cpos.masterUsers.list({ facilityId });  // 利用者 = [{ masterUserId, insuredNumber, name, furigana, birthDate, careLevel, ... }]
```

- `facilityId` を省くと `CposClientError` になる (kit の方針。CPOS 本体は省略時に「許可された全事業所」を返すが、画面が事業所を持たない事故を防ぐため kit では必須)。
- **`cpos.staffAccounts.list()` は職員のログインアカウント**で、利用者ではない。CPOS の API 名 (`/api/platform/users`) が紛らわしいので注意。
- 画面に「どの事業所を見ているか」を必ず出す。切り替えは `facilities.list()` の結果から選ばせる。
- 名前で探すなら `masterUsers.list({ facilityId, q: '佐藤' })` (番号の部分一致でも当たる)。
- **利用者は `masterUserId` で指す。** `insuredNumber` (被保険者番号) は CPOS の保存キーで**変わる** (仮番号 → 本番号、転居、訂正)。番号の無い人は仮番号 (`tmp-*`) か `masterUserId` そのものが入る。保存・突き合わせのキーにしない。
- 帳票・画面に番号を出すなら `displayInsuredNumber(u)` (`import { displayInsuredNumber } from '@cpos/kit/client'`)。仮番号を本物の番号として出さない。`cpos.app.platform.getFacilitiesByFacilityIdUsers({ facilityId })` は CPOS が決めた `displayInsuredNumber` を載せて返す。
- 番号 (過去の番号・仮番号を含む) や masterUserId から本人を引く: `cpos.app.platform.getMasterUsersByInsuredNumber({ insuredNumber: key })`。番号しか持たないデータ (実績 `care-service-actuals` など) は `cpos.app.platform.getMasterUsersNameMap({ facilityId })` (過去の番号・仮番号は `kind: 'alias'`) で `masterUserId` に寄せてから突き合わせる。今の番号との完全一致で結ばない。

## 1.5 画面を作る (見た目と操作の決まり)

決まりは AGENTS.md の「画面のガイドライン」(推奨。外れてよいが理由を 1 行)。場所と作り方は `npx github:loogo-inc/cpos-kit ui` で 1 画面。**画面を作る前に見本を開いて真似る**:

```
node_modules/@cpos/kit/kit/ui/examples/   today.html / user.html / settings.html / users.html / record.html
```

- スタイルは `/cpos-ui.css` (雛形が配信済み)。`<link rel="stylesheet" href="/cpos-ui.css">` と `<meta name="viewport" content="width=device-width,initial-scale=1">` を必ず書く。
- よく使う class: `.cpos-appbar` `.cpos-brand` `.cpos-page` `.cpos-card` `.cpos-table` (狭い幅でカードになる) `.cpos-field` + `.cpos-required` + `.cpos-error` `.cpos-btn primary|danger|text` `.cpos-actions` (右寄せ) `.cpos-savebar` `.cpos-snackbar` `.cpos-dialog` `.cpos-empty` `.cpos-badge` `.cpos-nav` `.cpos-usermenu`。
- **よく落とす所**: 意思決定のボタンは右 / 検索は打つたびに即絞り込み (ボタンを置かない) / 必須は赤い「必須」の文字 / 保存は保存バー / 確認は取り消せない操作だけ (`window.confirm` は使わない) / 値が無い項目は「未設定」。
- 文字の大きさは `/cpos-ui.js` + `<div data-cpos-text-size></div>` (設定の画面に置く)。
- 事業所をヘッダで選ぶかは `server.mjs` の `FACILITY_IN_HEADER`。事業所に関係ない画面 (法人単位・自分の設定) では事業所を出さない。

## 2. AppData に保存する / 読む

manifest の `resources` に名前を宣言してから使う (例 `notes`)。**名前は英小文字・数字・ハイフンだけ** (`transport-plans` は可、`transportPlans` は CPOS が 400 で拒否)。

```js
const notes = cpos.appData('<appId>');
const u = users[0];                                            // §1 の利用者
const rec = await notes.create('notes', { masterUserId: u.masterUserId, text: '玄関前で待つ' }, { facilityId, user: u.masterUserId });
const all = await notes.list('notes', { facilityId });        // [{ id, data, insuredNumber, masterUserId, createdAt, updatedAt, ... }]
const hers = await notes.list('notes', { facilityId, user: u.masterUserId });   // その人の行だけ (番号が変わる前に作った行も)
await notes.update('notes', rec.id, { ...rec.data, text: '裏口で待つ' }, { facilityId });   // 本人への紐づけはそのまま残る
await notes.remove('notes', rec.id, { facilityId });
```

- **必ず `{ facilityId }` を付ける。** わざと全事業所で共有するデータ (アプリの設定など) だけ `{ scope: 'organization' }` と明示する。どちらも無いと client が止める (付け忘れは別の事業所への漏えいになるため。CPOS 本体は許すが kit では止める)。
- `data` の中身は自由 (JSON)。形はアプリの `docs/specs/<機能>/design.md` に書き、**manifest の `resources[].schema` にも宣言できる** (使えるのは type / properties / required / items / enum / additionalProperties / description / format(date, date-time) だけ。他のキーワードは登録で落ちる)。本物は既定で「報告のみ」だが、CPOS が `APP_DATA_SCHEMA_ENFORCE=true` にすると 400。KIT 模擬サーバは常に 400 にするので、宣言のずれは手元で分かる。
- 個人情報を `data` に入れるときは最小限に。利用者は `masterUserId` (本物の一意キー。`id` という項目は無い) で参照し、名前を複製しない。
- **利用者のデータは `{ user: masterUserId }` を付けて保存する。** 行が「封筒」の `insuredNumber` で本人に紐づく (CPOS が本人の今の保存キーに揃え、`masterUserId` を付ける)。CPOS の利用者ごとの画面・利用者の統合・番号変更の追随は封筒しか見ない (`data` の中は見えない)。自分のアプリが引くキーとして `data.masterUserId` も入れておく。`user` を付けずに作った古い行は、封筒に本人がいないので `list({ user })` には出ない。
- 件数が多いなら `list('notes', { facilityId, paginated: true, limit: 100 })` → `{ items, nextCursor }`。
- **「利用者 1 人に 1 件」のような約束は `upsertBy`** で守る。AppData に一意制約は無い。
  ```js
  await notes.upsertBy('notes', 'masterUserId', { masterUserId, text }, { facilityId, user: masterUserId });   // あれば update、無ければ create
  // 戻り値は保存後のレコード。同じキーが複数あった (過去の重複) ときだけ duplicates: [id, ...] が付く。消すかは自分で決める
  // user を付けると本人の行だけを CPOS 側で絞って探す。user を付ける前に作った行 (data.masterUserId だけの行) も拾って本人に紐づける
  ```

## 3. 起動時の疎通確認

```js
try {
  const me = await cpos.platform.me();                       // { ok, token: { scopes, allowedFacilityIds } }
  const cap = await cpos.platform.capabilities();            // { server: 'cpos', features: { appData: { attachments: true, ... }, ... } } この CPOS で有効な機能。無い機能はキーごと無い (cap.features.appData?.attachments === true で見る)
  console.log('CPOS 接続 OK', me.token?.scopes);
} catch (e) {
  if (e instanceof CposApiError) console.error(e.message, '\n→', e.hint);
  throw e;
}
```

App Token が無い状態でも起動はさせる (登録前は無いのが普通)。fatal にせず警告にする。

## 4. エラーの読み方

| status / error | 意味 | 直し方 |
|---|---|---|
| 401 「認証が必要です」 | トークンが無い・無効 | `Authorization: Bearer cpos_app_...`。KIT 模擬サーバは接頭辞だけ見る |
| `err.error` は日本語の文 | 本物はスラッグを返さない | 分岐は `err.status` と `err.requiredScope` で。文面を正規表現で当てにしない |
| 403 (`requiredScope` 付き) | スコープ不足。本物の文面は「この API トークンにスコープ「x」がありません。…」 | manifest の `apiTokenScopes` に足し、再登録とトークン再発行 |
| 403 (ステージングだけ。本番は通る) | アプリが持っているステージングの App Token が、発行した当時のスコープのまま | ステージングの `/app-tokens` で発行し直して入れ直す (`npx github:loogo-inc/cpos-kit connect`)。本番で発行しても届かない |
| 403 (事業所) | 許可されていない事業所 | `facilities.list()` にある id を使う。fail-close は仕様 |
| 404 「facility x が見つかりません」 | 存在しない事業所 | id の打ち間違い。`facilities.list()` で確認 |
| 404 (HTML) | 本物に無いパス | `kit/api.d.ts` を grep、`npx github:loogo-inc/cpos-kit doctor` で kit と接続先の版を比べる |
| 501 `not_implemented` | KIT 模擬サーバに応答が無い | 本物 (ステージング) で確かめる。それまで画面は CPOS 接続待ち |

## 5. 接続先: 原則はステージング、模擬サーバは選んだときだけ

- `.env` の `<APP>_CPOS_BASE_URL` が https ならステージング (本物の応答)。`127.0.0.1` なら模擬サーバ。`npm run dev` はそれに従い、`npm run dev:mock` は常に模擬。起動ログの「接続先:」を見る。
- 切り替え: ステージングへは `npx github:loogo-inc/cpos-kit connect`。模擬へは `.env` の 2 行を `http://127.0.0.1:4300` / `cpos_app_dev` に。
- テスト (`npm test`) は模擬サーバで動く (オフラインで通る)。本物に向けるのは `npm run test:staging` と `npm run verify:staging`。

### KIT 模擬サーバで開発する (模擬を選んだとき)

```
npx github:loogo-inc/cpos-kit fake            # http://127.0.0.1:4300、架空の事業所 2 つ・利用者 22 人 (番号が変わった人・仮番号の人を含む)・ログイン用アカウント 3 つ
```

- 偽ログイン: ブラウザで `http://127.0.0.1:4300/api/auth/login?next=<戻り先>` → 誰として入るか選ぶ。
  - 管理 太郎 = 全事業所、介護 花子 = さくら訪問介護のみ、権限 なし = 事業所なし (一覧が空になるのが正しい)。
- App Token は `cpos_app_` で始まれば何でも通る (全スコープ・全事業所)。スコープ不足や事業所制限を試すときは seed の `appTokens` に書いたトークン (既定で `cpos_app_limited`: さくら訪問介護のみ、`transport` の read だけ) を使う。
- 状態を見る: `GET /__fake/state`。消す: `POST /__fake/reset`。
- **テストで事業所 ID を固定しない。** `fac_sakura` のような seed の ID を書くと、本物では 404 になりそのテストは二度と本物で流せない。`import { pickFacilities, cposForTests } from '@cpos/kit/testing'` で「見てよい事業所」から選ぶ (雛形のテストがその形)。
- **テストではソケットを使わない**: `import { createFakeCpos } from '@cpos/kit/fake'` → `createCposClient({ baseUrl: fake.baseUrl, fetch: fake.fetch })`。AI エージェントのサンドボックスは TCP の listen を禁止していることがある (Codex で確認)。自前の擬似クライアントを書かず、このKIT 模擬サーバを差し込む。
- 自分のアプリもソケット無しで呼ぶ: `fetchFromHandler(handle)` (雛形の `app.inject`)。**返る `Response` の本文は 1 回しか読めない** (`await res.text()` を assert の引数に書くと、次の `json()` で壊れる)。先に `text` を変数に取る。

## 6. manifest

```json
{
  "appId": "<appId>",
  "name": "<表示名>",
  "type": "fullstack",
  "url": "https://<appId>.example.com",
  "apiTokenScopes": ["app-data:<appId>:read", "app-data:<appId>:write", "facilities:read", "master-users:read"],
  "resources": [{ "name": "notes", "description": "送迎メモ" }]
}
```

- `npx github:loogo-inc/cpos-kit validate` で形を確認する。
- 公開 URL の直下 (`/cpos.manifest.json`) で配信する。トークンが無くても配信できること。**5 秒以内に応答すること** (CPOS の取込はリダイレクト込みで 5 秒固定。Cloud Run の min-instances 0 でコールドスタートすると落ちる)。本文は 1 MB 以内 (超えると取込が `body_too_large` で落ちる)。URL とリダイレクト先は公開ホストの https だけ (localhost・private IP は登録でも rotate でも拒否される)。登録のときだけでなく、`apps:fleet` の rotate のたびに取りに来る。落ちていると新しいスコープのトークンが出ない (古いトークンのまま)。
- App Token を Secret Manager で受け取るなら `tokenDelivery.secretManager.secret` を宣言する。CPOS 側の一括運用 (`apps:fleet rotate`) が新トークンを新しい版として書き、貼り替えが要らなくなる。ステージングでは `<secret>-staging` に配られる (その secret の枠と権限が先に要る。ステージングの台帳は本番と別なので、スコープを足したら両方で回す)。`apps:admin` は管理者の PAT 専用で manifest には書かない。
- 変えたら CPOS への再登録 (`register-from-url`) と App Token の再発行が要る。admin か app-publisher の人に頼む。**manager が発行するトークンは事業所限定 (allowedFacilityIds 必須) でワイルドカード不可。組織全体のトークンは admin だけ。** トークンは発行後 30 秒キャッシュされる (失効が他のインスタンスに効くまで最長 30 秒)。

## 6.5 アプリ登録とスコープ (ここで全員が詰まる)

CPOS を呼ぶには 2 つの関門がある。**別物なので両方いる。**

| 関門 | 誰が開けるか | 開いていないと |
|---|---|---|
| **スコープ** (CPOS 側) | manifest に宣言 → アプリ登録 → App Token 発行 | 本物が **403** (`requiredScope` 付き) |
| **OpenAPI と facilityId** (kit 側) | OpenAPI にある operation を、`facilityId` を付けて呼ぶ | 生成メソッドと `raw()` が手前で失敗する |

記録の読み取り (`care-records:read`) となんでもボックス (`sources:*`) のスコープは、ステージングでも本番でも検査される (2026-10-23 の CPOS から)。宣言せずに呼べていたアプリは 403 になる。

KIT 模擬サーバは `cpos.manifest.json` の `apiTokenScopes` を既定スコープにして検査する (manifest が無い場所だけ全スコープ)。manifest に無いスコープの API は模擬でも 403 になるので、**模擬サーバで動いて本物で 403** はスコープ宣言漏れではなく、トークンの発行時に付け忘れたときに起きる (`npx github:loogo-inc/cpos-kit connect` が照合する)。

```jsonc
// cpos.manifest.json — 使うメソッドの scope (api.d.ts の JSDoc) をそのまま書く
"apiTokenScopes": [
  "app-data:<appId>:read", "app-data:<appId>:write",
  "facilities:read", "master-users:read",
  "facility-staff:read"        // ← cpos.app.platform.getFacilityStaff の scope
]
```

**API が通るかを決めるのはトークンのスコープであって、登録ではない** (ステージングで実測):

```
GET /api/app-data/vns/…                  → 200   (スコープ app-data:vns:read を持っている)
GET /api/app-data/intake-scheduler/…     → 403   スコープ app-data:intake-scheduler:read がありません
GET /api/app-data/totally-unknown-app/…  → 403   同上 (「登録されていません」とは言われない)
```

未登録の appId でも「登録されていません」ではなく**スコープ不足の 403** が返る。
つまり登録は API の関門ではなく、**そのスコープを持つ App Token を発行してもらうための入口**
(＋ランチャーへの掲載、`resources` の宣言)。既にスコープを持つトークンがあるなら、
登録を待たずに開発を進められる。

**登録そのものは人がブラウザでやる。自動化できない** (ステージングで確認: `POST /api/apps`、
`/api/apps/register-from-url`、`/api/apps/:id/manifest` はすべて `sessionCookie` 専用。
App Token や PAT では 401。読み取りの `GET /api/apps`・`/api/apps/:id`・`/:id/scopes`・`/:id/access` は `apps:read` を持つ Bearer なら通る (無ければ 403、他の組織のアプリは 404)。職員の入口は `/api/apps/launcher`)。

登録は CPOS 管理画面の「アプリ管理」から。**上段の「URL から登録」が本命**:

1. アプリを公開 URL に置く (`https://<公開URL>/cpos.manifest.json` が配信される状態)
2. 「URL から登録」にその URL を入れる → CPOS が manifest を読んで appId・名称・スコープを取り込む (既存 appId は更新)
3. 発行された App Token に、宣言したスコープが付く

公開 URL がまだ無いときは下段「新規アプリ登録 (下書きとして作成)」で手入力する。

**manifest の形と CPOS 側の形は違う** (CPOS が変換する)。manifest には `apiTokenScopes`
(`"master-users:read"` の並び) を書けばよい。CPOS の台帳では
`requiredPermissions: [{ resource: "master-users", actions: ["read"] }]` になる。
`requiredPermissions` を manifest に直接書くこともできるが、**`apiTokenScopes` が無いときのフォールバック**なので
ふつうは書かない。

**登録を待たずに試すには**: 所有者から既存のトークン (`cpos_app_…` / `cpos_pat_…`) を受け取り、
`npx github:loogo-inc/cpos-kit connect` で `.env` に書く。そのトークンの AppData スコープが別の appId (`app-data:vns:*` 等)
のものしか無ければ、connect が `<APP>_APPDATA_APP_ID=vns` を書く (AppData の読み書き先だけ切り替わる。
manifest の appId は変えない)。`npm run verify:staging` で読み取りの件数と AppData の 作る→取る→消す を確かめる。
自分のアプリを正式に登録するのはブラウザでの登録が済んでから。登録が済んだら `<APP>_APPDATA_APP_ID` を消す。

**ステージングに書き込むときの線引き** (実験 14、2026-09-14):
- 既存のレコードや計画には触らない (形を探るための空 PUT も打たない。revision と履歴が残る)。
- **消す API が無い資源がある** (例: シフト計画 `POST /api/shifts/plans` に DELETE は無い)。そういう資源は、先に検証用の事業所と月を決め
  (例: 利用者のいない事業所の未来の月)、そこにだけ作る。割当は `PUT …/assignments { assignments: [] }` で 0 に戻せるが、計画そのものは残る。残したものは報告に書く。
- 本文の形が OpenAPI に無い書き込み系 (`additionalProperties: true`) は、api.d.ts の JSDoc に「本文の形は spec/cpos-api.yaml」とあればそこを読む。
  無ければ KIT 模擬サーバで試し (400 の hint が形を言う)、それも無ければ自分の計画に対してだけ試す。**本物は必須項目の無い割当を 400 にせず黙って捨てる** ことがある (shifts)。

**403 が返ったら**: `err.requiredScope` にそのまま必要なスコープ名が入る。manifest に足して再登録 → 再発行。
kit 側は承認で止めない (2026-09-13 の方針)。CPOS にあるものは原則すべて使ってよい。

## 7. ログイン (ブラウザのユーザーを CPOS で認証する)

**node の見本 (`--sample node`) には利用者の認証が無い。そのままでは本物に向けて公開できない。**
`--sample fastify` の見本には最初から付いている (`fastifyLoginGate`)。自分で付けるときはこれ。

方式は 2 つあり、`mode: 'auto'` (既定) は置き場所で自動で選ぶ:

| 方式 | いつ | 流れ |
|---|---|---|
| **cookie** (ゲートウェイ) | アプリが CPOS と同じ cookie ドメイン (`<app>.<CPOS のドメイン>`) にある | 未ログイン → `CPOS/api/auth/login?next=<自分の URL>` へ 302 → CPOS が Google で認証し `cpos_session` を発行 → アプリは**その cookie だけ**を `CPOS/api/auth/me` に転送して「誰か」を聞く |
| **oauth** (OAuth 2.1) | 手元の `127.0.0.1`、別ドメイン、モバイル | 未ログイン → `CPOS/oauth/authorize` へ 302 (PKCE) → CPOS が Google で認証 → 同意 → 認可コードで戻る → アプリは code をトークンに換え、`/api/platform/me` を 1 回呼んで「誰か」を取り、**トークンは捨てる** (失効させる) |

どちらも CPOS が推奨する **Google ログイン**そのもの。アプリは独自のパスワード DB を作らない。

| **token** (`<APP>_LOGIN_MODE=token`) | AI / CI が本物のログインまで検証するとき、Google アカウントの無い運用端末 | 未ログイン → アプリ自身の `/login` → CPOS が発行したトークン (PAT `cpos_pat_` = 本人 / App Token `cpos_app_` = そのトークン、role `app-token`) を貼る → アプリが `/api/platform/me` で検証 → 自分のセッションを発行し**トークンは捨てる**。Google を通らないので、AI がステージングで一巡を確かめられる (実験 14 の所有者の指摘) |
`cookie` 方式は本物の `/api/auth/login` が `next` を**許可された origin にしか戻さない**ので、
手元 (`127.0.0.1`) からは一巡しない。手元でステージングにつないで本物のログインを試すなら `oauth`。

```js
// Fastify
import Fastify from 'fastify';
import { fastifyLoginGate, canSeeFacility } from '@cpos/kit/app-kit';
const app = Fastify();
const gate = fastifyLoginGate(app, {
  cposBaseUrl: process.env.MYAPP_CPOS_BASE_URL,
  secret: process.env.MYAPP_SESSION_SECRET,     // 16 バイト以上。env に置く (connect が作る)
  appUrl: process.env.MYAPP_APP_URL,            // 公開 URL。無ければ要求の Host から組み立てる
  mode: 'auto',                                 // 'cookie' | 'oauth' で固定もできる
  oauth: { clientName: '送迎表', clientId: process.env.MYAPP_OAUTH_CLIENT_ID },   // clientId が無ければ動的登録 (gate.clientId で読める)
  publicPaths: ['/api/health', '/cpos.manifest.json']   // ログイン不要のパス。/oauth/callback と /logout は自動で付く
});
app.get('/api/me', async (req) => req.session.user);   // 以後のルートは req.session に身元

// Express
import { expressLoginGate } from '@cpos/kit/app-kit';
app.use(expressLoginGate({ cposBaseUrl, secret, appUrl, oauth: { clientName: '送迎表' } }));

// 素の node:http (cookie 方式だけ) / どのフレームワークでも使える中核
import { requireLogin, createLoginGate } from '@cpos/kit/app-kit';
const gate = createLoginGate({ cposBaseUrl, secret, appUrl, mode: 'auto' });
const r = await gate.resolve({ url: 現在の絶対URL, cookie: req.headers.cookie });   // { ok, session, setCookie?, redirectTo? }
const c = await gate.callback({ url, cookie });                                    // OAuth の戻り (gate.callbackPath)
```

未ログインの扱い: 画面は 302 (CPOS へ)、`/api/` 配下は 401 `{ ok: false, error: 'login_required', loginUrl }`。

```js
req.session.user            // { id, email, name, role }
req.session.organizationId
req.session.facilityScope   // { mode: 'all' } | { mode: 'list', ids: [...] } | { mode: 'unknown' }
req.session.via             // 'oauth' (cookie 方式では無い)

// 事業所ごとに必ず確かめる。unknown は「見せない」
const visible = (await cpos.facilities.list()).filter((f) => canSeeFacility(req.session.facilityScope, f.id));
```

守ること (kit が守っているが、自分で書くときも同じ):

- **App Token / アクセストークンを cookie に入れない。** ブラウザに鍵を渡さない
- **CPOS に転送する cookie は `cpos_session` だけ。** 自分のセッション cookie を CPOS に送らない
- **`facilityScope` が読めなければ「権限なし」。** 「分からない = 全事業所」にすると他事業所が見える
- セッションに CPOS のトークンを入れない (身元だけ入れる)。OAuth で得たトークンは身元を取ったら失効させる

手元で確かめる:

- **KIT 模擬サーバでも両方式が動く** (`/api/auth/login` も `/oauth/authorize` も「誰として入るか」を選ぶだけ)。
  `npm run dev` は同じ host (127.0.0.1) なので auto は cookie になる。oauth を試すなら `<APP>_LOGIN_MODE=oauth npm run dev`
- ブラウザで開くのは **`http://127.0.0.1:3000`** (`localhost` ではない)。模擬サーバの cookie は 127.0.0.1 に発行される
- **本物の Google ログインを一巡させる**: `npx github:loogo-inc/cpos-kit connect` → `npm start` → ブラウザで `http://127.0.0.1:3000` を開く。
  auto が oauth を選び、CPOS の Google ログイン → 同意 → 戻る、まで通る (redirect_uri は `http://127.0.0.1` が許されている)
  - Google の後に CPOS のドメインで `{"error":"このアカウントはこのアプリへのアクセス権がありません。登録済みでログイン不可 (isActive=false) …"}` が出たら、
    **CPOS のログインそのもの** (`/api/auth/google/callback`) が、選んだ Google アカウントを「その CPOS (組織) のログインユーザー」として認めていない。
    アプリにも kit にも原因は無い。CPOS の管理画面に入れるのと同じアカウントを選ぶか、CPOS の管理者にそのアカウントの登録・有効化を頼む
    (ステージングは本番と別の利用者台帳。2026-09-14 の実験 14 で所有者が当たった)。
- ログアウト (`/logout`) はアプリのセッションを消すだけ。cookie 方式では CPOS にログインしたままなので、開き直すとまた入れる。それが正しい動き
- テストではログイン済みの人を `sealSession({ user, organizationId, facilityScope, exp }, secret)` で直接作る (見本のテストにある)

## 7.5 開発者自身が CPOS を直接見る (MCP / OAuth)

CPOS 本体は MCP サーバ (`/mcp`) と OAuth 2.1 (認可コード + PKCE) を持つ。**CPOS のアカウントを持つ開発者**は、自分の権限で CPOS のデータを AI から直接引ける:

```
claude mcp add --transport http cpos <CPOS の URL>/mcp    # 初回はブラウザで Google ログイン → 同意
```

- 用途: 「本物の応答の形を見る」「あるか無いかを実物で確かめる」。**アプリのコードは MCP ではなく client / raw で書く** (アプリはサーバ間で App Token を使う)。
- 利用者の個人情報を含むツール (master_users_list、master_user_get、transport_plans_list、alerts_list) は CPOS 側が `MCP_ALLOW_PHI=true` にしないと出ない。利用者系の「本物の形」は verify:live の証跡 (api.d.ts の JSDoc「応答の項目」) で見る。
- ステージングは本番データのコピーを含む。MCP で見た個人情報をコード・テスト・docs に貼らない。
- OAuth で `apps:admin` / `users:admin` / `organizations:provision` を要求すると同意の前に `invalid_scope` で落ちる (管理者の PAT 専用)。PAT と OAuth のトークンは、スコープがあっても**発行した本人のロールで許されない操作は 403 (`pat_subject_forbidden`)** になる。サーバ間の呼び出しは App Token で書く。
- モバイルや別ドメインのアプリで「利用者本人の代理」で動きたい場合も、同じ OAuth 2.1 (公開クライアント、PKCE) が入口になる。

## 8. データが要るとき: CPOS の API は全部メソッドになっている (推測で呼ばない)

```js
// 1 operation = 1 メソッド。名前は HTTP メソッド + パス。一覧・引数・scope は node_modules/@cpos/kit/kit/api.d.ts
const plans = await cpos.app.transport.getPlans({ facilityId, serviceDate: '2026-09-14' });   // GET /api/transport/plans
const staff = await cpos.app.platform.getFacilityStaff({ facilityId });                        // GET /api/platform/facility-staff
await cpos.app.transport.postPlans({ facilityId, body: { ... } });                              // POST /api/transport/plans
```

- 依頼文に「CPOS から」と書いてなくても、取得元の第一候補は CPOS。api.d.ts を検索 (grep) してから設計する。
- `cpos.app.*` は App Token で呼べるもの (認証なしも含む)。`cpos.session.*` は管理画面のセッション Cookie でしか呼べないもので、ログインを引き継ぐアプリ (§7) で `createCposClient({ cookie })` にしたときだけ使える。
- 止まるのは 3 つだけ: 必須パラメータの欠け、`facilityId` の付け忘れ (kit が呼ぶ前に止める)、OpenAPI に無いパス (`raw()` が拒む)。
- **戻り値は生の JSON。応答の形は OpenAPI にほとんど無い。** 推測で項目名を決めて整形しない。まず生の JSON を `<pre>` で出し、実物を見てから列を決める。決めた項目名は `docs/specs/<機能>/design.md` に書き、契約テストに残す。
- **KIT 模擬サーバに応答があるのは一部だけ** (api.d.ts の JSDoc に「模擬サーバ: あり / 無し」。shifts の計画・割当・勤務区分、employees / qualified-persons / trainings / fte / staffing-standards は 2026-09-14 から あり)。無いものは 501。画面には「CPOS との接続を担当者が確認中です」と出し、ステージングにつないで確かめる (`npm run verify:staging`)。
- **api.d.ts に無いもの** だけ「CPOS に無い」。アプリ専用のデータとして AppData に持つか、asks.md に「CPOS にあるか確認」と書く。
- **スコープ**: `npx github:loogo-inc/cpos-kit scopes --used` がソースが呼ぶメソッドから必要なスコープを出し、manifest に足りないものを示す。`npx github:loogo-inc/cpos-kit scopes 送迎` で語から引く。CPOS が知るスコープは 160 種 + アプリ固有の雛形 4 種 (`app-data:<appId>:read/write/delete`、`apps:<appId>:ai:run`) で、それ以外の文字列を発行しても要求する API が無い。
- **kit を上げる**: `npx github:loogo-inc/cpos-kit update` (git をきれいにしてから)。kit のファイルと依存を上げてコミットし、`docs/cpos/UPGRADE.md` に CHANGELOG の差分を書く。頼まれて実装を直すときは UPGRADE.md の「既存アプリへの影響」を 1 つずつ見て、直すか、要らない理由を書き、`npm test` を通してコミット。外すなら `npx github:loogo-inc/cpos-kit remove --apply` (置いたものだけ取り除く)。
- **API を画面で眺める**: `npx github:loogo-inc/cpos-kit docs` (Redoc。検索で絞れる)。
- **kit と接続先の版の確認**: `npx github:loogo-inc/cpos-kit doctor` が kit の持つ OpenAPI の revision と接続先を比べ、増えた・消えた・変わった operation を出す。
