# 既存プロジェクトに cpos-kit を入れる (手順)

**足すだけ。既存のファイルは上書きしない。** 実際に空でない既存プロジェクトで一巡させて確かめた手順
(2026-09-13)。所要 10 分。

---

## 0. 先に `package.json` があることを確かめる  ★ここで詰まる

```
npm pkg get name    # 名前が出れば package.json がある。エラーなら  npm init -y   (bash / PowerShell 共通)
```

**`package.json` が無いフォルダで `npm install` すると、npm は親フォルダを順にたどって
別のプロジェクトを掴みにいく。** ホームディレクトリなどに `package.json` と `node_modules`
(特に pnpm 形式) があると、npm 自身がこのエラーで落ちる:

```
npm error Cannot read properties of null (reading 'isDescendantOf')
```

cpos-kit の問題ではないが、必ず先に確かめること。
新規なら `npx github:loogo-inc/cpos-kit create <dir>` から始めれば `package.json` も書かれる。
(`npx github:loogo-inc/cpos-kit …` は npm レジストリを探しに行って 404 になる。**npx には URL を渡す**。)

## 1. kit を入れる

```
npm install github:loogo-inc/cpos-kit#semver:^0.2
```

入れたあとは、そのプロジェクトの中でだけ `npx github:loogo-inc/cpos-kit …` が使える
(`node_modules/.bin` を見るため)。入れる前は URL を渡すこと。

push 前は、手元のリポジトリを **git 参照で** 指す:

```
npm install git+file:///<cpos-kit の絶対パス>    # Windows は git+file:///C:/…/cpos-kit
```

**`file:` は使わない。** `file:` はフォルダをそのままコピーするので、
「配ったものが本当にリポジトリの中身か」を誰も確かめられない。
git 参照なら**コミットされた状態**しか入らないので、手元と配布物がずれない。

確認: `npx github:loogo-inc/cpos-kit help` が出れば入っている。**npm への登録は要らない**
(git 参照だけで入り、`npx` も動く。実証済み)。

注意: git 参照は**コミット済みの内容**を取る。直したのに反映されないときは、
kit 側でコミットしたか確かめること。

---

## 2. 足すものを見る (何も書かない)

```
npx github:loogo-inc/cpos-kit adopt
```

こう出る。**既にあるファイルは「触らない」と表示され、書き換えない。**

```
足すファイル (既にあるものは触りません):
  + cpos.manifest.json
  + docs/cpos/README.md
  + docs/cpos/asks.md
  + .claude/skills/cpos/SKILL.md
  + .agents/skills/cpos/SKILL.md
  + .github/skills/cpos/SKILL.md
  + .claude/settings.json

マーカーの間に追記するもの:
  + AGENTS.md  (新規)
  + .github/copilot-instructions.md  (新規)

作業規律「止まる前に証拠」(--discipline no で入れない):
  + AGENTS.md  (節を末尾に足す)
  + .github/copilot-instructions.md  (節を末尾に足す)

CLAUDE.md: @AGENTS.md の 1 行で作ります
```

## 3. 足す

```
npx github:loogo-inc/cpos-kit adopt --apply
```

`AGENTS.md` には**末尾に追記**される。既存のルールはそのまま残る:

```markdown
# AGENTS.md
このプロジェクトのルール:
- コミットメッセージは日本語で書く      ← 残る
- src/ の下だけを触る                   ← 残る

<!-- cpos-kit:begin (この間は cpos-kit が所有する。手で直さない) -->
## CPOS との連携 (cpos-kit 標準ブロック)
…
<!-- cpos-kit:end -->
```

**自分の AI 設定に自分で貼りたいなら** (Cline / 独自の指示ファイルなど):

```
npx github:loogo-inc/cpos-kit adopt --print > /tmp/block.md
```

戻すには: `npx github:loogo-inc/cpos-kit remove --apply` (kit が置いた標準ブロック・作業規律・skills・Stop hook・ci.yml を取り除く。コードと manifest には触らない)。残った `cpos.manifest.json` / `docs/cpos/` は `git status` で見て個別に消す。`git clean -fd` は無関係な未追跡ファイルまで消すので使わない。

---

## 3.5 画面の規約 (入れたくなければ入れない)

`adopt --apply` は AGENTS.md に「画面のガイドライン」(推奨。強制ではない) の節も足す。**文だけで、コードとスタイルには触らない。**

- 要らないなら `npx github:loogo-inc/cpos-kit adopt --apply --design no`。あとで `remove --apply` でも外れる。
- 入れた場合の使い方: 見本は `node_modules/@cpos/kit/kit/ui/examples/` (ブラウザで開ける)、スタイルは `@cpos/kit/ui/cpos-ui.css`。既存アプリには**配信されない**ので、自分のやり方 (静的配信・バンドル・`<link>`) で読むか、規約だけ守って自前の CSS で書く。
- `update` は、規約が変わった回だけ「この画面を基礎 UI に合わせますか」と聞く。断ってよい (次に規約が変わればまた聞く)。

## 4. manifest を書く

`cpos.manifest.json` を作る (`adopt` が雛形を置くが、中身は自分で決める)。

```jsonc
{
  "appId": "my-app",              // 英小文字・数字・- _ 。CPOS 側の名札になる
  "name": "アプリの表示名",
  "version": "1.0.0",
  "type": "fullstack",
  "url": "https://my-app.example.jp",           // 公開先。/cpos.manifest.json を配信する場所
  "apiTokenScopes": [
    "app-data:my-app:read",
    "app-data:my-app:write",
    "facilities:read",
    "master-users:read"
    // 使う API が増えたらここに足す。足りないと本物で 403 になる
  ],
  "resources": [
    { "name": "my-records", "description": "このアプリが保存するもの" }
    // 英小文字・数字・ハイフンのみ。camelCase は CPOS が 400 で拒否する
  ]
}
```

確認:

```
npx github:loogo-inc/cpos-kit validate
```

---

## 5. コードから CPOS を呼ぶ

```js
import { createCposClient } from '@cpos/kit/client';

const cpos = createCposClient({
  baseUrl: process.env.MY_APP_CPOS_BASE_URL,        // 環境変数名は appId を大文字にしたもの
  token: () => process.env.MY_APP_CPOS_APP_TOKEN
});

await cpos.facilities.list();                       // 見てよい事業所
await cpos.masterUsers.list({ facilityId });        // 利用者 (facilityId は必須)

const store = cpos.appData('my-app');
await store.create('my-records', { memo: '…' }, { facilityId });
await store.list('my-records', { facilityId });
await store.get('my-records', id, { facilityId });
await store.update('my-records', id, { memo: '…' }, { facilityId });
await store.remove('my-records', id, { facilityId });

// CPOS の API は全部メソッドになっている (cpos.app.<機能>.<操作>。facilityId は必須)。パスを推測して raw() で叩かない (OpenAPI に無いパスは kit が拒む)
await cpos.app.platform.getFacilityStaff({ facilityId });
```

**既に自前の CPOS クライアントがあるなら、それを捨てる必要はない。**
新しく書くところから `@cpos/kit/client` にすればよい。

---

## 6. 手元で動かす (本番データに触らない)

```
npx github:loogo-inc/cpos-kit fake          # KIT 模擬サーバ  http://127.0.0.1:4300
```

テストからは、ソケット無しで同じものを使える:

```js
import { createFakeCpos, fetchFromHandler } from '@cpos/kit/fake';
const fake = createFakeCpos();
const cpos = createCposClient({ baseUrl: 'http://fake', token: 'cpos_app_dev', fetch: fetchFromHandler(fake.handle) });
```

**事業所 ID をテストに書かない。** 模擬サーバの `fac_sakura` を書くと本物では 404 になる:

```js
import { pickFacilities, findFacilityWith } from '@cpos/kit/testing';
const [main, other] = await pickFacilities(cpos, 2);
// テストに必要なデータがある事業所を探すなら
const f = await findFacilityWith(cpos, async (fac) =>
  (await cpos.app.platform.getFacilityStaff({ facilityId: fac.id })).items?.length > 0);
```

---

## 7. 欲しいデータがあるか調べる

```
npx github:loogo-inc/cpos-kit scopes シフト     # 語 (日本語) で探す。API とメソッド名 (cpos.app.shifts.getPlans 等) と必要スコープが出る。bash / PowerShell 共通
npx github:loogo-inc/cpos-kit doctor            # kit が持つ CPOS API の版と、接続先の版を比べる
(エディタの補完か node_modules/@cpos/kit/kit/api.d.ts の JSDoc でも同じものが読める)
```

使うメソッドの JSDoc に `scope …` があれば、**その scope を manifest の `apiTokenScopes` に足す**。
足し忘れると模擬サーバでは動いて本物で 403 になる (模擬サーバは manifest を読んでスコープを検査する)。

---

## 8. 本物 (ステージング) につなぐ

**いまのステージングは本番の写し。** 架空データに置き換わるまで、作るのは模擬サーバで行い、ステージングにつなぐのは CPOS の担当者に頼まれた確認のときだけにする (`connect` と `token` も同じ注意を出す)。そこで見えた利用者・職員の情報を、コード・テスト・ログ・AI への依頼文に写さない。

ここから先は**人の作業**。自動化できない (CPOS の登録 API はブラウザのログイン専用)。

1. アプリを https で公開し、`https://<公開URL>/cpos.manifest.json` がトークン無しで開けることを確かめる
2. CPOS 管理画面「アプリ管理」→ 上段の「**URL から登録**」にその URL を入れる
   (公開前なら下段「新規アプリ登録 (下書きとして作成)」で手入力)
3. 「設定 → API トークン」で App Token を発行。**スコープは manifest の `apiTokenScopes` が既定で選択される**
4. 受け取ったトークンを `.env` に置く。**リポジトリ・ブラウザ・ログには置かない**

```
MY_APP_CPOS_BASE_URL=https://<CPOS の URL (担当者から受け取る)>
MY_APP_CPOS_APP_TOKEN=cpos_app_xxxxx
```

5. `npm start` → 起動時に `platform.me()` が通れば疎通 OK

案内をもう一度見るには `npx github:loogo-inc/cpos-kit token`。

**登録しないと API が動かない、ではない。** 通るかどうかを決めるのは**トークンのスコープ**で、
登録はそのスコープを持つトークンを発行してもらうための入口 (＋ランチャー掲載)。
既にスコープを持つトークンがあるなら、登録を待たずに開発を進められる。

---

## してはいけないこと (5 つ)

1. App Token をブラウザに送る / コードやリポジトリに書く / ログに出す
2. 事業所 ID を省いて利用者データを取る (全事業所まとめて取る API は無い)
3. CPOS の利用者のために独自のログイン (パスワード DB・JWT) を作る
4. 本番の個人情報を開発環境にコピーする
5. `window.confirm` / `alert` / `prompt` を使う (CPOS の画面規約)

## CPOS にあるデータを自前に持つとき

原則、写しは作らない (2 箇所にあるとズレる)。ただし禁止ではない。持つなら 5 つ全部書く:

1. なぜ持つか (通信断のキャッシュ / CPOS にまだ無いので暫定)
2. 写しだと分かる形 (`cache-` 接頭辞か、各行に `_source: 'cpos'` と `_fetchedAt`)
3. 書き戻さない (読むだけ)
4. 消す条件を `docs/cpos/asks.md` と引き継ぎに残す
5. 画面に明示する (黙って本物のように見せない)

## 後から: チケット台帳を入れる (任意)

作業が複数セッションにまたがり、AI がやり残しを落とす・優先度を見失うようになったら:

```
npx github:loogo-inc/cpos-kit tickets init            # 何を足すかを見るだけ
npx github:loogo-inc/cpos-kit tickets init --apply    # docs/tickets/ と docs/TICKETS.md、CI に tickets --check の 1 行、npm run tickets
npx github:loogo-inc/cpos-kit tickets new <タイトル>   # 起票 (番号を採り、索引を作り直す)
```

正本は `docs/tickets/TK-###.md`、索引 `docs/TICKETS.md` は生成物。`--check` は索引のズレ・進行中 3 枚超・closed の未完・置き去りの子・迷子と孫を赤にする。打たなければ何も変わらない。
