# cpos-kit

CPOS (介護事業所向けの共通基盤) の上でアプリを作る人に配る共通開発基盤。
このリポジトリそのものが npm パッケージ `@cpos/kit` (依存ゼロ、Node 22+)。git 参照で入れる。

```
npx github:loogo-inc/cpos-kit create my-app    # 名前・appId・見本の有無・作業規律の有無を聞いて生成
cd my-app && npm install && npm run dev               # .env の接続先で起動 → http://127.0.0.1:3000 (模擬サーバは npm run dev:mock)
npm test
```

既存プロジェクトに足すだけなら [ADOPT.md](ADOPT.md)。

## 前提

- **Node.js 22.9 以上** (npm が同梱される)。`node -v` で確かめる。
- **git** (`npx github:…` と `npm install github:…` は git で取ってくる)。Windows は PowerShell で可。
- `npm install` は kit のタグ (`v0.1.x`) を GitHub から探す。`npm error … correct access rights and the repository exists` と出たら、鍵の問題ではなく **その版のタグが GitHub に無い** (kit 側が `git push origin v0.1.0` を忘れている)。つなぎに `npm install github:loogo-inc/cpos-kit#main` で入る。
- **原則は模擬サーバ (kit に同梱の架空データ。CPOS のアカウント不要) で作る。** `create` の既定が mock。`npm run dev:mock` は常に模擬。
- **いまのステージングは本番の写し。** 架空データに置き換わるまで、ステージングにつなぐのは CPOS の担当者に頼まれた確認のときだけ (`create --connect staging`、後からなら `npx github:loogo-inc/cpos-kit connect`。どちらも注意を出す)。置き換わったら、原則をステージングに戻す。

## 大まかな使い方

1. **作る**: `npx github:loogo-inc/cpos-kit create my-app` → 名前・appId・見本 (node / fastify / none)・作業規律・**接続先 (mock = 模擬サーバ [原則] / staging = ステージング)**・**画面の作り 2 問** (事業所の選択をヘッダで行うか / そのヘッダを上に貼り付けるか) を聞かれる。staging なら注意を出し、URL とトークンをその場で `.env` に書き疎通を確かめる。`npm install && npm run dev` で起動 (起動ログに「接続先: ステージング / 模擬サーバ」が出る)。
2. **AI ツールで開く** (Claude Code / Cursor / Codex / Copilot)。CPOS の呼び方と約束は最初から読み込まれている (`AGENTS.md` の標準ブロックとスキル `cpos`)。依頼は普通の日本語でよい (`/cpos` は任意。付けると CPOS のレシピを確実に読み込む)。
3. **作りたいものを書いて頼む**: `docs/PRODUCT.md` に 1 段落。依頼は「誰が・何を・CPOS のどのデータで」を書く。例:
   - 「事業所を選ぶと、その事業所の利用者一覧が出る画面。利用者ごとにメモを保存できる。テストも」
   - 「職員を職種別に集計して一覧にする。クリックで査定を入力。CPOS ログイン必須で、その人が見てよい事業所だけ出す」
   - 「送迎計画を日付で一覧にして、車両ごとに並べる。CPOS の transport の API を使う」
   AI は client のメソッド (`cpos.app.*`) で CPOS を呼び、必要なスコープを manifest に足し、模擬サーバで `npm test` を緑にするところまでやる。CPOS に無い機能はメモ (`docs/cpos/asks.md`) に残し、その画面だけ「準備中」にして、ほかは作り切る。最後に「どうしますか」と人に聞く (勝手に写しを作らない)。場面ごとの頼み方と AI の返答の例は [USAGE.md](USAGE.md)。
4. **本物 (ステージング) につなぐ** (ステージングが架空データに置き換わってから。それまでは担当者に頼まれた確認のときだけ): 管理者から URL と App Token を受け取り、`npx github:loogo-inc/cpos-kit connect` で `.env` に入れる (トークンはチャットやコードに貼らない。ファイルに置いてパスを伝える)。`npm run verify:staging` で読み取りと AppData の作る→取る→消すを確かめる。足りないスコープは `npx github:loogo-inc/cpos-kit scopes --used` が示す。
5. **登録して公開**: アプリを https で公開し、管理者に `cpos.manifest.json` の URL を CPOS に登録してもらう。以後、CPOS が変わっても `npx github:loogo-inc/cpos-kit update` の 1 回で追随できる (kit を上げてコミットし、実装を直すかを聞く)。

## 画面 (見た目と操作を揃える)

アプリごとに「使い方」がばらつかないように、**画面の決まりと共通スタイルも kit が配る**。

- **決まり**: `AGENTS.md` の「画面のガイドライン」(推奨。強制ではない)。AI がこれを読んで画面を作る。要らなければ `create --design no` / `adopt --design no`、あとから `remove --apply`。
- **見本**: `node_modules/@cpos/kit/kit/ui/examples/*.html` (`today` / `user` / `settings` / `users` / `record`)。**ブラウザでそのまま開ける。画面を作るときはこれを真似る。**
- **スタイル**: `@cpos/kit/ui/cpos-ui.css` (雛形は `/cpos-ui.css` で配信済み)。色を変えるなら `theme.css` を後ろで読み、`--cpos-*` の変数だけ上書きする。
- **文字の大きさ**: 端末の設定に追随。さらに `/cpos-ui.js` + `<div data-cpos-text-size></div>` で 標準 / 大 / 特大 を選べる (その端末に覚える)。
- **ロゴ**: アプリのフォルダに `logo.svg` を置くとヘッダのアプリ名の隣に出る。
- 主な決め: 意思決定のボタンは右・取消は左 / 検索は打つたびに即絞り込み / 必須は赤い「必須」の文字 / 誤りは欄の直下 / 保存は保存バー / 確認は取り消せない操作だけ (`window.confirm` は使わない) / 値が無い項目は「未設定」/ 本文 16px・押せる領域 44px・幅 360px で横スクロールしない。
- kit を上げたときに規約が変わっていれば、`update` が「この画面を基礎 UI に合わせますか」と 1 回聞く (断ってよい)。

## 誰のためのものか

- **CPOS の利用契約があり、その上でアプリを作る開発者** (と、その開発者が使う AI ツール)。
- CPOS 本体は一般に公開されていない。CPOS を持っていない人がこの kit を使っても、模擬サーバ (`kit/fake`) が動くだけで本物にはつながらない。
- CPOS は提供元の製品名であり、この kit は CPOS 提供元の公式サポートの対象ではない。CPOS の API の互換性は `spec/cpos-api.yaml` に載せたものだけを kit が約束する (v1 の間は追加のみ)。

## 何が入っているか

```
cpos-kit/
├─ spec/         正本。cpos-openapi.json (CPOS の公式 OpenAPI の写し。client の生成元)、manifest の JSON Schema、模擬サーバの契約 (cpos-api.yaml)
├─ kit/          配るもの (= パッケージの中身)
│   ├─ client.js / manifest.js / fake/ / testing.js / app-kit.js   @cpos/kit/client, /manifest, /fake, /testing, /app-kit
│   ├─ api.json / api.d.ts   生成物: CPOS の全 operation (1 operation = 1 メソッド)
│   ├─ agents/       AGENTS.md・CLAUDE.md・.cursor・copilot-instructions に書き出す標準ブロックと作業規律
│   ├─ templates/    雛形 (docs の型) と Node / Fastify の見本
│   ├─ bin/cpos-kit.mjs   create · adopt · fake · validate · guide · token · scopes · connect · update · remove · doctor · tickets
│   └─ test/
├─ skills/cpos/  Agent Skills (レシピ)。生成時に .claude / .agents / .github の skills に複製される
├─ ADOPT.md      既存プロジェクトへの入れ方
└─ README.md
```

### CPOS の API は全部メソッドになっている

CPOS が公開する OpenAPI の operation を、1 operation = 1 メソッドで機械生成してある (`kit/api.json`、型は `kit/api.d.ts`)。

```js
const cpos = createCposClient({ baseUrl, token });
await cpos.masterUsers.list({ facilityId });                       // 手書きの 5 系統 (型と日本語のエラー案内つき)
await cpos.app.transport.getPlans({ facilityId, serviceDate });    // GET /api/transport/plans   (App Token で呼べるもの)
await cpos.session.apps.get();                                     // 管理画面のセッション Cookie でしか呼べないもの (cookie を渡したときだけ)
```

- 名前は HTTP メソッド + パス (`{id}` は `ById`)。一覧・引数・必要スコープ・「模擬サーバに応答があるか」は `kit/api.d.ts` の JSDoc にある。
- 戻り値は生の JSON。応答の形は OpenAPI にほとんど無いので、項目名を推測して整形しない。
- 事業所単位の API は `{ facilityId }` が必須。付け忘れは呼ぶ前に kit が止める。OpenAPI に無いパスは `raw()` でも呼べない。
以下の `npx github:loogo-inc/cpos-kit …` は **kit を入れたアプリのフォルダの中** で打つ (`npx github:loogo-inc/cpos-kit guide` などの scripts も同じ)。外から使うなら `npx github:loogo-inc/cpos-kit <コマンド>`。

- `npx github:loogo-inc/cpos-kit scopes --used` で、ソースが呼ぶメソッドから必要なスコープを出し `cpos.manifest.json` と照合する。`npx github:loogo-inc/cpos-kit scopes` で CPOS が知る全スコープ。
- `npx github:loogo-inc/cpos-kit docs` で CPOS の API 一覧を見やすい画面 (Redoc) でブラウザに出す (ログイン不要。kit が持つ OpenAPI の写し)。
- `npx github:loogo-inc/cpos-kit doctor` で、kit が持つ OpenAPI の版と接続先 CPOS の版を比べる (増えた / 消えた / 変わった operation)。
- kit を上げるのは `npx github:loogo-inc/cpos-kit update` の 1 回 (git をきれいにしてから)。kit が置いたファイル (AGENTS.md の標準ブロック・skills・Stop hook・ci.yml。人が書いた部分は触らない) と `@cpos/kit` の依存を今の版にし、`npm install` → `npm test` → 1 コミット。版が上がったら `docs/cpos/UPGRADE.md` に CHANGELOG の差分を書き、「最新の CPOS に合わせて実装を直しますか？」と聞いて AI (Claude Code / Codex) に頼む。`--check` で差分だけ。外すのは `npx github:loogo-inc/cpos-kit remove --apply` (kit が置いたものだけ取り除く。コード・manifest・依存には触らない)。

## `npx github:loogo-inc/cpos-kit …` は動かない

npm レジストリに登録していない (`private: true`) ので、名前で呼ぶと 404 になる。**npx には URL を渡す。**

```
npx github:loogo-inc/cpos-kit create …                              ✗ 404
npx github:loogo-inc/cpos-kit create …       ○ GitHub から取って実行
npm install github:loogo-inc/cpos-kit#semver:^0.2   ○ 依存として固定 (以後プロジェクト内では npx github:loogo-inc/cpos-kit … が使える)
```

## 開発

```
npm test        # node --test。模擬サーバは in-process で動く (TCP 不要)
```

PR の作法は [CONTRIBUTING.md](CONTRIBUTING.md)。秘密や脆弱性の報告は [SECURITY.md](SECURITY.md) (公開 issue に書かない)。
変更履歴は [CHANGELOG.md](CHANGELOG.md)。

## ライセンス

[MPL-2.0](LICENSE)。ファイル単位のコピーレフト: この kit のファイルを改変して配るときはそのファイルの変更を公開する。
kit を使うだけのアプリ、`create` が生成したアプリ側のコードには及ばない。
雛形 (`kit/templates/`) から生成されたファイルは、生成したアプリの所有者が自由に扱ってよい (MPL の義務を課さない)。
