# {{name}}

CPOS の上で動くアプリ (appId: `{{appId}}`)。`npx github:loogo-inc/cpos-kit create` で作った。

## 最初の 30 分

{{firstSteps}}
4. AI ツール (Claude Code / Cursor / Codex / Copilot) でこのフォルダを開く。CPOS のことを頼むときは `/cpos` (Codex は `$cpos`) を付けると確実
5. 作りたいものを `docs/PRODUCT.md` に 1 段落書く。決めたことは `docs/DECISIONS.md` に追記する

## 接続先

`.env` の `{{APP}}_CPOS_BASE_URL` で決まる。127.0.0.1 = 模擬サーバ (原則。架空データ)、https… = ステージング (いまは本番の写し。架空データに置き換わるまで担当者に頼まれた確認のときだけ)。`npm run dev` はそれに従い、`npm run dev:mock` は常に模擬。起動ログの「接続先:」で確かめる。切り替えは `npx github:loogo-inc/cpos-kit connect`。

## 本物の CPOS につなぐとき

**いまのステージングは本番の写し。** 架空データに置き換わるまで、つなぐ (下の 2〜4) のは担当者に頼まれた確認のときだけ。

{{authNote}}

1. 権限を持つ人 (CPOS の admin か app-publisher) に、アプリの URL を CPOS 管理画面で登録してもらい、App Token を発行してもらう (登録前でも、既存のトークンがあれば試せる)
2. `npx github:loogo-inc/cpos-kit connect` — URL とトークンを `.env` に書き、疎通とスコープを確かめる (本番は Secret Manager)
3. `npm run verify:staging` — 読み取りの件数と AppData の 作る→取る→消す。`npm run test:staging` で `.env` を読んでテストを本物に向ける
4. `npm start` — ログイン付きの見本なら、ブラウザで `http://127.0.0.1:3000` を開くと本物の Google ログインが一巡する

## 画面を作る

まず `npx github:loogo-inc/cpos-kit ui` (場所と作り方が 1 画面で出る。`--open` で見本をブラウザに)。
決まりは `AGENTS.md` の「画面のガイドライン」(推奨。外れてよいが、外れるなら理由を `docs/handoff/RESUME.md` に 1 行)。AI はそこを読む。人が見るなら:

- **見本**: `node_modules/@cpos/kit/kit/ui/examples/` の HTML をブラウザで開く (`today` 今日やること / `user` 1 件の詳細 / `settings` 設定と自分 / `users` 一覧 + 入力 / `record` 1 件の入力)。**画面を作るときはこれを真似る**
- **スタイル**: `/cpos-ui.css` (このアプリが配信している)。`.cpos-page` `.cpos-card` `.cpos-table` `.cpos-field` `.cpos-btn primary` `.cpos-savebar` `.cpos-dialog` などを組む。自前の CSS フレームワークを入れない
- **文字の大きさ**: `/cpos-ui.js` を読み、設定の画面に `<div data-cpos-text-size></div>` を置くと 標準 / 大 / 特大 を選べる (その端末に覚える)
- **ロゴ**: このフォルダに `logo.svg` を置くとヘッダのアプリ名の隣に出る (置かなければ名前だけ)
- **色**: `theme.css` を作って `cpos-ui.css` の**後ろ**で読み、`--cpos-color-primary` などの変数だけ上書きする (構造の class は触らない)
- **事業所をヘッダで選ぶか**: `server.mjs` の `const FACILITY_IN_HEADER`。`create` の質問の答えが入っている。後から変えてよい
- kit を上げたときに規約が変わっていれば、`npx github:loogo-inc/cpos-kit update` が「この画面を基礎 UI に合わせますか」と聞く (断ってよい)

## この中で何がどこにあるか

| 場所 | 何 | 誰のもの |
|---|---|---|
| `cpos.manifest.json` | アプリの名札。CPOS が読む | あなた |
| `docs/` | 何を作るか、決めたこと、ルール、用語、仕様、引き継ぎ | あなた |
| `AGENTS.md` | AI への指示。上の標準ブロックは cpos-kit が更新する。下は自由 | 半分ずつ |
| `.claude/` `.agents/` `.cursor/` `.github/` | AI ツールごとの設定と CPOS のスキル。中身は同じ | cpos-kit |
| それ以外 | あなたのコード | あなた |

困ったら `docs/handoff/RESUME.md` を読む。次の人のために、終わるときに書く。
