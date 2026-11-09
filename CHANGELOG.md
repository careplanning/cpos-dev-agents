# Changelog

形式は [Keep a Changelog](https://keepachangelog.com/ja/1.1.0/)。バージョンは [SemVer](https://semver.org/lang/ja/)。
v1 の間は API の削除をしない (deprecated の印だけ)。

## [Unreleased]

## [0.14.0] - 2026-11-09

### Changed
- CPOS の変更に追随 (operation の増減なし)。評価の全体承認 (`care-review-approvals:write`) は、正式版と同じ内容の作業版を承認したとき、新しい版も計画の準備の予約も作らず `unchanged: true` を返す (`approvalRef`・`servicePlanPreparationRefs` は付かない)。全体承認では作業版がそのまま正式版になり `currentWorkingBase` は null になる。AI の状態の取得には、承認した評価からの計画の準備の状況も加わった。

## [0.13.0] - 2026-11-09

### Added
- `@cpos/kit/robot`: 機体 (ロボット・アダプタ) 専用のクライアント。CPOS の機体専用の資格情報 (profile `cpos-robot-device/2026-10-28`: QR の機体登録 RFC 8628 + 鍵の証明 DPoP RFC 9449) を使う。鍵の生成と差し替えられる署名器、登録の開始 (QR 用の URL と短いコード)・待機・受取、`Authorization: DPoP` と要求ごとの新しい証明、更新の 1 回化 (保存先のロック)、鍵の交換、自己登録解除。401 は種類ごとに扱い (期限切れ→更新して 1 回、時計のずれ→補正して 1 回、失効→`RobotRegistrationRequiredError`)、400 / 403 / 404 / 409 / 422 は再送しない。5xx・通信断は GET か opId 付きのときだけ再送する (opId は同じ、証明は作り直す)。証明の検証 `verifyDpopProof` も入っている (模擬環境・エミュレータ用)。依存ゼロ。
- 模擬サーバ (`@cpos/kit/fake`) にはまだ機体登録は無い (本物の staging で確かめてから足す)。
- CPOS の API の追加に追随 (11 operation): 共通の資料取り込みで、未登録の人の資料から利用者登録へつなぐ `careManagement.getV2SourcesReceiptsByIdRegistration` / `postV2SourcesReceiptsByIdRegistration`、氏名を本文で送る登録可否の確認 `postV2SourcesReceiptsByIdRegistrationCheck`、検索語を本文で送る本人候補の検索 `postV2SubjectCandidates` (いずれも職員のログインが必要)。ほかに管理画面のステージングへのコピー (`maintenance.*StagingCopyV1*` 6 件) と定時実行の起動口 `cpos.app.triggers.postTasksStagingCopyDue`。
- CPOS の API の追加に追随 (3 operation): 利用者ごとのケアタスク `cpos.app.careTasks.getV1` / `postV1` / `patchV1ById`。
- CPOS の API の追加に追随 (35 operation): 機体まわり `cpos.app.robotics.*` (機体の登録・承認・鍵の交換、フロアプラン、観察の記録と確認、タスクの状態)、利用者 ID 保守の `userIdMaintenance.getV1AliasCollisions` / `getV1RepairPeople`、介護サービス実績の `careServiceActuals.postV1MaintenanceProjectCareRecords`、クラウドバックアップの `maintenance.getCloudBackupV1Status` / `postCloudBackupV1Restores`、同一人物候補の `masterUsers.postLikelySame`、福祉用具の写真 `welfareEquipment.postV2LogisticsByJobIdLinesByLineIdPhotos` と取得。
- `care-management/v2/capabilities` の `subjectSearch` は旧版の画面のためだけに残る (検索語が URL に残る)。新しく書くなら `postV2SubjectCandidates` を使う。
- CPOS の API の追加に追随 (1 operation): 職員のメールアドレスの差し替え `cpos.session.authUsers.postByIdEmail` (職員のログインが必要、システム管理者だけ。アカウントの ID は変わらない)。

### Changed
- 書類の振り分け (`/api/filing/*` の 7 operation) は App Token でも呼べるようになった (`filing:read` / `filing:write`)。
- 模擬サーバの OAuth は、本物と同じく `apps:admin` / `users:admin` / `organizations:provision` を要求されると `invalid_scope` で戻す。
- client の 403 の hint: PAT が発行した本人のロールで断られたとき (`pat_subject_forbidden`) は、スコープ不足と別の案内を出す。

- 雛形の CI (`.github/workflows/ci.yml`) を CPOS のアプリの標準 CI と同じ手順にした (依存の固定導入 `npm ci`、依存の脆弱性検査、SBOM、型検査、テスト、ビルド。kit の `validate` は導入の直後)。手順の正本は `kit/ci/standard.json`。CPOS の Cloud Build の CI に移ったリポジトリ (変数 `EXTERNAL_CI_ACTIVE=true`) では動かない。

### 既存アプリで手が要る
- CPOS の API 一覧の認証の書き方が、実際の動きに合わせて直った (本物での照らし合わせで見つかった 13 本)。呼び名が次のように移る (メソッド名は同じ):
  - `cpos.session.*` → `cpos.app.*` (App Token でも呼べる): `auth.getMe`、`platform.getMe`、`capabilities.get`、`buildInfo.get`、`device.getPing`・`getReleases`・`getReleasesLatest`
  - `cpos.app.*` → `cpos.session.*` (職員のログイン専用): `facilityFinancials.getLaborCostRatio` (super_admin だけ)、`platform.getBootstrap`、`platform.getEffectiveSettings`、なりすまし表示の `auth.*Impersonation*` 4 本
- `npx cpos-kit update` で ci.yml が新しい手順になる。`npm ci` を使うので `package-lock.json` を commit しておくこと。
- `cpos.session.filing.*` は `cpos.app.filing.*` に移った (メソッド名は同じ)。古い呼び名は無くなった。
- PAT と OAuth のトークンは、スコープがあっても発行した本人のロールを超える操作で 403 (`pat_subject_forbidden`) になる。サーバ間の呼び出しは App Token で書く。
- 記録の読み取り (`care-records:read`) となんでもボックス (`sources:*`) のスコープは、ステージングでも本番でも検査される。宣言せずに呼べていたアプリは 403 になる。
- `GET /api/apps` 系の読み取りは `apps:read` が要る (無ければ 403)。App Token から呼べるようになったので、`cpos.session.apps.get` / `getById` / `getByIdAccess` は `cpos.app.apps.*` に移った (メソッド名は同じ)。
- 共通の資料取り込みの登録確認 (`GET .../registration`) は `?name=` を読まなくなった。氏名は `POST .../registration-check` の本文で送る。
- manifest の取込は本文 1 MB まで。

<details><summary>CPOS 26b4a5d4..59e218e6 の分類 (候補・影響なし)</summary>

- 候補: CPOS の reusable CI (`node-app.yml`) の再利用と npm キャッシュ (0837641a, 78833bfc, 0935433c)、アプリのリポジトリへの CI 一式の配布 (f0aa18d6, b9bd17b3。kit の雛形 ci.yml と持ち主が重なる)、ステージングのアドレスを 1 つの domain から作る (733ecb47)、ステージングへのコピー後はログインが消える (20a4c818, fc0b0019)、Docker の lockfile 強制 (695280b1)、アプリ間起動の拒否条件 (b9065973)、filing のスコープ (78e0c30b)、受付からの登録 (766886a7, d30338d8)。
- 影響なし: CPOS 自身の CI・デプロイの整備 24 件、PAT 発行の入力検証 (4766cce8)、トークン管理の組織境界 (826de6bf)、export (88e58137)、大きい本文の前の認証 (34ec5a8a)、admin 作成 (2f76c4b8)、共用アカウント (9c528f65)、内部 wrapper (d95d4af8)、移管後の doc リンク (f4db312f)。
- 道具の側: CPOS のリポジトリの置き場所が変わったので、週次の差分ジョブの checkout 先を直した。

</details>

## [0.12.0] - 2026-10-21

### Added
- CPOS の API の追加に追随 (8 operation): 事業所の帳票の棚卸しを扱う `careDocuments.getV1FormInventory` / `postV1FormInventory` / `putV1FormInventoryById` と、候補 `getV1FormInventoryCandidates`、帳票ごとの出せるものの表示 `getV1FormInventorySummary`、人による確認 `postV1FormInventoryByIdConfirm` / `postV1FormInventoryByIdApplicability` / `postV1FormInventoryByIdOutputConfirmation`。いずれも職員のログインが必要。

## [0.11.0] - 2026-10-20

### Added
- CPOS の API の追加に追随 (2 operation): サービス計画の項目ごとに原記録の根拠と不足を見る `careDocuments.getV1ByIdEvidenceCoverage`、日々の記録から確認が必要なサービス計画を取る `careDocuments.getV1ReviewQueue` (いずれも読み取りだけ)。
- 既存の operation の引数が増えた: 記録一覧 `getRecords` (`masterUserId` ほか)、`getV1ReviewDrafts` / `getV2ReviewDrafts` (`targetId`)、`getV2SharedSourcesByKindById` (`nativeDocumentId` ほか)。

### 既存アプリで手が要る
- 記録一覧 (`getRecords`) を利用者の氏名だけで絞っているアプリは、`400 PERSON_REFERENCE_REQUIRED` になる。`masterUserId` (または保険者番号) で本人を指定すること。
- `careDocuments.postV1ByIdDuplicateDraft` は `body` が必須になった。

## [0.10.0] - 2026-10-17

### 既存アプリで手が要る
- 利用者の性別 (`masterUsers` の `gender`) は、CPOS に `male` / `女性` / `FEMALE` / `男` / `1` などの綴りが混在して保存されている。kit は値をそのまま返すので、読むアプリはどの綴りも受けること (書くときは `male` / `female` / `other`)。

## [0.9.0] - 2026-10-12

### Added
- CPOS の API の追加に追随 (2 operation): 受領資料の比較の違いについて AI の説明案 (下書き) を作る `cpos.session.careManagement.postV2SourcesReceiptsByIdComparisonsByComparisonIdExplanations` (職員のログインが必要)、AI の稼働状況を見る `cpos.session.operations.getAiStatus` (管理者向け・読み取りだけ)。

### Changed
- 受領資料の確認 (verify) は、現在の確認だけで約 640 KiB を超えると `413 RECEIPT_TOO_LARGE` を返すことがある (除外・保留は通る)。同じ再読み取り値の以前の確認は、除外で取り消せるようになった。

## [0.8.0] - 2026-10-12

### Added
- CPOS の API の追加に追随 (23 operation): 共有の受付とサービス計画の準備 (`cpos.app.careManagement.*` / `cpos.session.careManagement.*` の `getV2ServicePlanPreparations*` / `postV2ServicePlanPreparations*` / `postV2IntakeContexts`)。受領資料の抽出・照合・判断・分割・対象者の確定・相談の種 (`postV2SourcesReceiptsById*`、`getV2SourcesExtractionJobsById`)。定時実行の起動口 `cpos.app.triggers.postTasksServicePlanPreparationDue` / `postTasksSourceExtractionDue`。人の判断を伴う操作は職員のログイン (`cpos.session.*`) が必要。
- 受領資料まわりの既存 operation (`getV2Sources`、`postV2SourcesReceipts` と upload・verify・withdraw・local-draft・original、`careDocuments.getV1ById`、`fieldProposals` の承認 2 件) は引数が増えた。

### 既存アプリで手が要る
- 書類取り込み (`care-plan-import` の preview / commit)・提案の承認 (`field-proposals` の approve / edit-and-approve)・アプリ間起動 (`app-invocations`) の契約が変わった。取り込みはサービス種別の指定が必須で、原本の保管だけを行い、上限も下がった。確認済み資料付きの提案の承認は `clientOpId` と `expectedTargetRevision` が必須。起動の `targetAppId` は実登録 ID を使う。これらを呼んでいるアプリは見直すこと。

## [0.7.0] - 2026-10-10

### Added
- CPOS の API の追加に追随 (28 operation): 継続アセスメントの v2 (`cpos.app.careManagement.*` の `getV2*` / `postV2*` / `putV2*`)。アセスメントの取得と変更履歴、対象者ごとの対象と作業中の内容、レビューの下書き・判断、受領資料の登録・アップロード・確認・撤回・元ファイルの取得、共有元の参照、再計算と再試行。共有の作成・一覧・取り消しは職員のログイン (`cpos.session.careManagement.getV2Shares` / `postV2Shares` / `postV2SharesByIdRevoke`) が必要。
- 新しい scope: `care-review-approvals:write` / `care-review-sharing:read` / `care-review-sharing:write` (`scopes` コマンドに反映)。

## [0.6.0] - 2026-10-09

### Added
- CPOS の API の追加に追随 (18 operation): 継続アセスメント・ケアマネジメント (`cpos.app.careManagement.*`)。契約版と操作能力の確認 (`getV1Capabilities`)、受領資料の一覧・登録・確認・撤回、更新候補の取得、手動の準備要求 (`postV1Recompute`)、判断・途中保存・正式承認 (`postV1ReviewDecisions`)、準備処理の状態と再試行 (`getV1RunsById` / `postV1RunsByIdRetry`)。受領・判断・承認・再試行には認証済みの職員が必要で、App Token だけで人の承認は代用できない。機能フラグは既定 OFF。定時実行の起動口 `cpos.app.triggers.postTasksCareReviewDetect` / `Due` / `Reconcile` も増えた。

## [0.5.0] - 2026-10-08

### Added
- CPOS の API の追加に追随 (10 operation): 削除したデータの復元 (`cpos.session.restore.*`: 項目・ファイル・履歴の一覧、復元、履歴の取り消し)、記録の写真・ファイルの参照一覧 (`cpos.session.operations.getMemoryFileRefs`)、バックアップの定期実行の起動 (`cpos.app.triggers.postTasksBackupDue`)。
- CPOS の API の追加に追随 (2 operation): 組織の他事業所の閲覧設定 (`cpos.session.systemSettings.getFacilityAccess` / `putFacilityAccess`、管理者向け)。`GET /api/auth/me` の `facilityScope` に `readScope` (`organization` / `membership`) が載る。
- CPOS の API の追加に追随 (8 operation): 月の固定基準 (`cpos.app.careServiceActuals.getV1MonthlyBaselines`、採用・候補作成は `cpos.session.careServiceActuals.*`。API トークンで呼べるのは一覧の取得だけ)、予定の履歴の試算 (`cpos.session.careSchedules.getV1HistoryBackfillDryRun`)、事業所のフラグ設定 (`cpos.session.systemSettings.getFirstTrackFlags` / `putFirstTrackFlags`)。ケアプラン相談・予定・月次比較の既存 operation は引数が増えた (`careDocuments` の `evidence`、予定の `planBasis` など)。
- CPOS の API の追加に追随 (69 operation): ケアプランの版 (`cpos.app.careDocuments.*CarePlanVersions*`・`getV1Inbox`・やり取りの記録) と、ロボット連携 (`cpos.app.robotics.*` / `cpos.session.robotics.*`)、介護サービス実績の月次比較・変更のあった利用者 (`cpos.app.careServiceActuals.getV1MonthlyComparison` / `getV1ChangedPersons`)。
- CPOS の API の追加に追随 (16 operation): 事業所の吸収 (`cpos.session.facilityChanges.*`、管理者のセッション専用)、事業所の請求事務所まとめ・サテライトの連携報告 (`cpos.session.facilities.*`)、割当の終了日の下見 (`cpos.app.assignmentEndDates.getV1Preview`、管理者専用)。`cpos.app.platform.getMasterUsers` に `assignedDuring` (YYYY-MM)、事業所の一覧に `includeClosed` が付いた。

### Changed
- 非管理者のログイン (Cookie) セッションは、組織の設定が ON (未設定は ON) なら同じ組織の他事業所の利用者・記録を読めるようになった (AppData の GET・利用者・支援経過の GET)。書き込み、API トークン、機密・本人限定の行は従来どおり所属事業所だけ。所属外で読めるのは利用者に紐づく行 (`masterUserId` か番号を持つもの) だけ。
- 記録アプリの未分類一覧に期間 (`from` / `to`) の絞り込みが付いた。
- AppData の一覧をページ分け (`paginated=true` / `cursor=`) で読むと、ページをまたいで同じ行が繰り返され別の行が落ちる不具合が CPOS 側で直った。1 ページを超える一覧は更新日の新しい順 (同時刻は id 順) で漏れなく返る。ページ分けなしの一覧は変わらない。
- 予定の日次の読み取り (`careSchedules` の today / occurrences / reconciliation の説明) と実績の日次の盤の説明が更新された。CPOS の能力 `careSchedules.scheduleHistoryDailyScreens` が `platform.capabilities()` に出る。
- `guide`: スコープ数の固定表記をやめた。
- 閉鎖済み・閉鎖中・切替日前の事業所は、事業所の一覧 (`facilities` / `platform.getFacilities`) に既定では出なくなった (`includeClosed=true` で取れる)。各事業所に `effectiveBusinessNumber` / `billingFacilityId` / `successorFacilityId` などが付く。

### 既存アプリで手が要る
- 記録の添付: 作成 (`POST /api/records/:recordId/attachments`) の保存場所が検査されるようになった。`gcs` はその記録の事業所の写真置き場の `objectPath` だけ、`drive` は Drive のファイル ID が必須で、外れると 400。中身の配信 (`/api/record-app/attachments/:attachmentId/content`) も事業所の写真置き場にある行だけを返し、それ以外は 404。任意の保存場所を添付に書いていたアプリは直す。
- 業務ドキュメントの原本・生成物は、本番で Drive に保存できないとき 503 (`file-not-stored`) になった (以前はメモリに黙って置いていた)。再試行するか Drive の設定を確かめる。
- 他事業所の閲覧: app-kit の `canSeeFacility` は所属事業所だけで判定するため、本部から他事業所の利用者を開く画面は kit 上では拒否のまま (読めない側に倒れる)。模擬サーバも組織横断の閲覧を再現しない。他事業所の行を読みたいアプリは `masterUserId` を付けて保存する。
- 測定値の読み取りで本人が引けないとき、200 で事業所全体を返さず 503 (`person-lookup-unavailable`、`Retry-After: 2`) になった。再試行する。
- 事業所のフラグ `scheduleHistory` が ON の事業所では、予定の today / occurrences / reconciliation と実績の日次の盤が、取消・終了した予定のその日に有効だった部分も返す。「取消済みは一覧に出ない」前提の表示・集計は直す。月の固定基準の候補も月途中の取消前の枠を含む。OFF の事業所は変わらない。
- ケアプランの保存 (`care-plans` の保存・一括保存) で body の `status` を送っていると 400 (`status-not-writable`) になる。`status` を送らない。
- 一括保存で他組織の id を渡したときの 404 の形が `{ error: '見つかりません', reasonCode: 'not-found' }` に変わった。`error` の文字列で判定している場合は `reasonCode` で見る。
- ロボット連携: `robots:act` を持つ App Token は `/api/robotics` 専用 (他は 403)。kit の警告・模擬サーバはまだ対応していない。
- 予定の更新 (PUT) は body の `expectedUpdatedAt` を予定に保存しなくなった。別の事業所への PUT は移す先の権限も確認され、他の事業所・組織の予定 id での作成は 409 (`schedule-id-conflict`) になる。事業所を限ったトークンで事業所をまたいで書いていると失敗する。
- 予定の取消 (cancel) の `effectiveFrom` は、事業所のフラグ `scheduleHistory` が ON のときだけ効き、受け付けるのは明日まで (それより先は 400)。
- ケアプラン相談の読み取り (`getV1ById`) は、`evidence=1` を付けないと根拠の現在性 (`evidenceStatus` / `evidenceCheck`) が返らない。根拠を見るアプリは付ける。
- AppData: id を指定した POST で他組織に同じ id があると 409 (`id_conflict`)。組織ごとに固定 id で作るのをやめ、採番に任せる。
- AppData: PAT で作ったレコードの `createdBy` が、トークン id ではなく本人の userId になる (以前のレコードは混在)。
- AppData: PUT の 409 の `current` は読み取り権限が無いと null。状態遷移・添付の追加削除も競合時は 409 (`stale_record`) になるので再取得してやり直す。PUT には任意の `expectedUpdatedAt` が付けられる (client はまだ対応していない)。
- AppData: 本人限定 (`ownerOnly`) のレコードは、共有に戻す (400)・事業所を変える (400)・なりすまし中に書く (403 `impersonation_owner_only`) ができない。共有を本人限定にできるのは作成者だけ (403)。読めない機密・他人の本人限定は、状態遷移・集計・添付でも見えない (404・件数から除外)。模擬サーバはこれらをまだ再現しない。
- 閉鎖済みの事業所への書き込みは 409 (`facility-closed`、まとめた先は `successorFacilityId`)、閉鎖作業中は 503 (`facility-maintenance`、`Retry-After`)、切替日前のサテライトは 409 (`facility-not-open-yet`) になる。`CposError` の body で見分け、503 だけ再試行する。模擬サーバはまだ再現しない。
- manifest の `resources[].facilityScope` は、CPOS が登録時に検査し、知らないキー・範囲外の値があると取込が止まる。書いているアプリは CPOS の許可キー (`kind` / `singletonBy` / `onCollision` / `sumPaths` / `onAbsorb` など) だけにする。`cpos-kit validate` はまだこの検査をしない。

## [0.4.1] - 2026-09-29

### Fixed
- 0.4.0 は中身が 0.3.0 のまま公開されていた (公開の手順の誤り)。0.4.0 に書いた変更 (下の Changed) はこの版で届く。

### Changed
- `create`: 選択式の質問 (見本のコード・作業規律・画面の規約・事業所をヘッダで選ぶか・ヘッダの貼り付け・接続先) を **↑↓ で選んで Enter** にした (番号キーでも選べる。Ctrl+C / Esc で中止)。外部パッケージは足していない (Node の readline だけ)。決まると 1 行に畳む。表示名・appId・URL・トークンは今までどおり文字で入れる。`--sample fastify` などの引数、`--yes`、端末でないとき (CI・AI が打つとき) の既定は変わらない。矢印キーが効かない端末では `CPOS_KIT_PLAIN=1` で文字の入力に戻せる。

## [0.4.0] - 2026-09-28

中身は 0.3.0 と同じ (公開の手順の誤りで、変更が入らないまま出た。変更は 0.4.1 に)。

## [0.3.0] - 2026-09-28

### Added
- **画面のガイドライン** (推奨であって強制ではない。外れてよく、外れるなら理由を RESUME に 1 行): `create` / `adopt` が AGENTS.md に「画面のガイドライン (cpos-kit)」を入れる (`--design no` で入れない)。頭に**ばらつかせない 19 の決め** — 意思決定のボタンは右・取消は左、主ボタンは 1 画面に 1 つ、検索は打つたびに即絞り込み (検索ボタンを置かない)、絞り込みは押した瞬間に反映、必須は赤い「必須」の文字、誤りは欄の直下、保存は保存バー、確認は取り消せない操作だけ、状態は色 + 文字、事業所 (作業対象) は**どの事業所のデータかが分かること**だけを求める (置き場と上への固定はアプリが決める。`.cpos-appbar.cpos-pinned` で貼り付けられる)。切り替えられるアプリでは **2 手** (名前を押す → 一覧から選ぶ。1 タップで切り替わる選択肢を常時置かない)。1 つの事業所しか扱わないアプリは表示だけでよい、0 件は理由 + 次の一手、値が無い項目は「未設定」、**行き先 (グローバルナビ) は 5 つまで・狭い幅は画面の下/広い幅は左・いまいる所を示す**、**自分とログアウトは画面の右上のメニュー (ログアウトは CPOS に返す)**、**アプリはアプリ固有の設定しか持たない** (氏名・権限は CPOS)、**事業所に関係ない画面 (法人単位・自分だけの設定) には事業所を出さない** (範囲の札は誤解されそうなときだけ。画面名で明らかなら足さない)、**文字の大きさは端末の設定に追随した上でアプリ内でも 3 段階 (標準 / 大 / 特大)**、**多言語は後で訳せる形で書く** (lang・文言を集める・Intl・文字が伸びても壊れない・CSS は左右でなく inline-start / inline-end)。見やすさの下限 (本文 16px・端末の文字サイズに追随・コントラスト 4.5:1・押せる領域 44px・キーボード) は WCAG 2.2 AA の引用。
- **`@cpos/kit/ui/cpos-ui.js`** (依存なし・ビルド不要): 文字の大きさ 3 段階。`<div data-cpos-text-size></div>` を置くと 標準 / 大 / 特大 のボタンが出て、選んだ大きさをその端末に覚える (localStorage)。端末の文字サイズ設定の上に掛かる。将来 CPOS のユーザー設定に入ったらそちらを優先する。
- **共通スタイル `@cpos/kit/ui/cpos-ui.css`**: 上の決めを実装した CSS (トークン `--cpos-*`、応答する表 = 狭い幅で 1 行 1 カード、保存バー、スナックバー、確認ダイアログ、空の状態、印刷)。色を変えるときは後ろで `theme.css` を読み、変数だけ上書きする (構造の class は触らない)。
- **見本 `@cpos/kit/ui/examples/`** 5 枚: `today.html` (最初の画面・行き先・自分のメニュー)、`user.html` (1 件の詳細・削除の確認)、`settings.html` (設定と自分・ログアウト)、`users.html` (一覧 + その場で入力)、`record.html` (必須・エラー・保存バー)。ブラウザでそのまま開ける。画面を作るときはこれを真似る。

### Changed
- **`ui` コマンド**: 画面の作り方を 1 画面で出す (見本の場所・スタイル・文字拡縮・ロゴ・色・`FACILITY_IN_HEADER`・よく落とす所)。`ui --open` で見本をブラウザで開く。読み取り専用で何も書き換えない。
- `guide`: 先頭に**「打つコマンドはこれだけ」の一覧**を出す (これまでは長い手順だけで、何を打てばよいか分かりにくかった)。`guide --commands` でその一覧だけ。
- `cpos-ui.css` / 雛形の直し (実験 16 で見つかった): 左レールが無い画面でヘッダが画面外に出ていた / 行ごとの保存ボタンが `primary` で「1 画面に primary は 1 つ」に反していた / 保存バーが 1 行しか送らず、自分の保存でも「このページを離れますか」が出ていた。チェック・ラジオを 44px の的にする `.cpos-check` を追加。
- `create`: 画面の作りを **2 問だけ聞く** (何を聞いていて答えると何が変わるかを先に説明する)。
  1. **事業所の選択をヘッダで行いますか** (`--facility-in-header`、既定 yes)。yes = ヘッダに事業所名を出し押すと一覧から切り替え。no = **ヘッダに事業所を出さない** (1 事業所だけのアプリ・事業所に関係ないアプリ。範囲の札も出さない)。答えは `server.mjs` の `const FACILITY_IN_HEADER` になり、あとから書き換えられる。
  2. **そのヘッダを上に貼り付けますか** (`--facility-pinned`、既定 no)。
  規約で全アプリに強制せず、アプリごとに選ぶ形。現場や画面の性格で答えが変わるものは、これからもこの形で増やす。
- **アプリ名とロゴ** (決め 12b): ヘッダの左端に 1 回だけ (`.cpos-brand`)。ロゴは任意で、アプリのフォルダに `logo.svg` を置けば出る (無ければ名前だけ)。広い幅でも**左のレールにアプリ名を重ねて出さない** (レールはヘッダの下から始まる)。`create` のあとの案内 (【4.5】見た目を自分のものにする) にロゴと `theme.css` の置き方を書いた。
- `update`: **画面の規約が変わった回だけ**「この画面を基礎 UI に合わせますか？」と聞く (CPOS 追随の質問とは別。断ってもよく、次に規約が変わればまた聞く。規約を入れていないアプリには聞かない)。規約はまだ育つので、変更のたびにこの 1 問で追随できる。
- 雛形 (`--sample node` / `fastify`) の画面を規約どおりに作り直した (fastify のログアウトは右上のメニューに): viewport を宣言、`/cpos-ui.css` を配信して読む、本文 16px、押せるものは 44px、狭い幅では表がカードになる、検索は即時、保存バーと「保存しました」、0 件の表示、値が無い項目は「未設定」。

## [0.2.2] - 2026-09-27

### Fixed
- `update`: `docs/cpos/UPGRADE.md` が書かれず、「実装を直しますか？」も出なかった。配布する kit に `CHANGELOG.md` が入っていなかった (package.json の `files` に無い) → 入れる。見つからないときも UPGRADE.md を書き、公開リポの CHANGELOG を指す。

## [0.2.1] - 2026-09-27

### Changed
- `update` の 1 回で、既存アプリを新しい kit と CPOS に合わせるところまで進む:
  - 始める前に git がきれいか確かめる (汚れていれば何も書かずに止まる。`--allow-dirty` で続行)。
  - kit のファイルと依存を上げ、`npm install` → `npm test` が通れば「cpos-kit <旧> → <新> に更新」で 1 コミット (落ちたらコミットしない)。
  - 版が上がったら `docs/cpos/UPGRADE.md` に、旧版より後の CHANGELOG と AI への依頼文を書く。
  - 端末なら「最新の CPOS に合わせて実装を直しますか？」と聞き、y なら Claude Code (`claude`) か Codex (`codex`) を依頼文で起動する (AI が直してテストを通し、コミットする)。端末でなければ依頼文を出すだけ。`--no-test` / `--no-ai` で省ける。

### Fixed
- `update`: `package.json` の `@cpos/kit` の依存を、今の kit の系統 (`#semver:^0.<minor>`) に上げて `npm install` するようにした (`--no-install` で省ける)。これまでは AI 向けのファイルだけが新しくなり、依存は `^0.1` のままだったので、コードの kit は 0.1.0 のまま食い違っていた。**既存のアプリは `npx github:loogo-inc/cpos-kit update` の 1 回で新しい版に上がる** (0.2.0 の節にある「依存を手で書き換える」手順は不要になった)。semver の範囲でない依存 (`git+file` など) は触らない。

## [0.2.0] - 2026-09-27

### CPOS 00278-7tl (2026-09-27) に追随
生成元: CPOS OpenAPI 1.0.0 (revision 00201-58l → 00278-7tl、1,418 operations)。本物での検証: 呼んだ 270 / 200 116 / 後退 0。

- 生成: 増えた 46 / 消えた 0 / 署名が変わった 4。
  <details><summary>一覧</summary>

  - `GET /api/auth/impersonation` → `cpos.app.auth.getImpersonation`
  - `POST /api/auth/impersonation` → `cpos.app.auth.postImpersonation`
  - `DELETE /api/auth/impersonation` → `cpos.app.auth.deleteImpersonation`
  - `GET /api/auth/impersonation/candidates` → `cpos.app.auth.getImpersonationCandidates`
  - `GET /api/build-info` → `cpos.session.buildInfo.get`
  - `POST /api/chat/google` → `cpos.app.chat.postGoogle`
  - `POST /api/data-browser/exports` → `cpos.session.dataBrowser.postExports`
  - `POST /api/welfare-equipment/v2/products/eligibility-from-usage` → `cpos.app.welfareEquipment.postV2ProductsEligibilityFromUsage`
  - `GET /api/welfare-equipment/v2/assignments` → `cpos.app.welfareEquipment.getV2Assignments`
  - `POST /api/welfare-equipment/v2/assignments` → `cpos.app.welfareEquipment.postV2Assignments`
  - `GET /api/welfare-equipment/v2/assignments/{assignmentId}` → `cpos.app.welfareEquipment.getV2AssignmentsByAssignmentId`
  - `POST /api/welfare-equipment/v2/assignments/bulk` → `cpos.app.welfareEquipment.postV2AssignmentsBulk`
  - `PATCH /api/welfare-equipment/v2/placements/{placementId}` → `cpos.app.welfareEquipment.patchV2PlacementsByPlacementId`
  - `POST /api/welfare-equipment/v2/imports/roster-repair` → `cpos.app.welfareEquipment.postV2ImportsRosterRepair`
  - `GET /api/welfare-equipment/v2/imports/{importId}/persons` → `cpos.app.welfareEquipment.getV2ImportsByImportIdPersons`
  - `POST /api/welfare-equipment/v2/imports/reassign-person` → `cpos.app.welfareEquipment.postV2ImportsReassignPerson`
  - `POST /api/welfare-equipment/v2/imports/{importId}/prune-absent` → `cpos.app.welfareEquipment.postV2ImportsByImportIdPruneAbsent`
  - `POST /api/welfare-equipment/v2/reason-templates` → `cpos.app.welfareEquipment.postV2ReasonTemplates`
  - `GET /api/welfare-equipment/v2/exports` → `cpos.app.welfareEquipment.getV2Exports`
  - `GET /api/welfare-equipment/v2/exports/{dataset}` → `cpos.app.welfareEquipment.getV2ExportsByDataset`
  - `GET /api/app-data/lifecycle-health` → `cpos.session.appData.getLifecycleHealth`
  - `POST /api/app-data/{appId}/{resource}/{id}/unvoid` → `cpos.app.appData.postByAppIdByResourceByIdUnvoid`
  - `POST /api/device/records/{id}/classify` → `cpos.app.device.postRecordsByIdClassify`
  - `POST /api/device/records/{id}/unvoid` → `cpos.app.device.postRecordsByIdUnvoid`
  - `POST /api/master-users/{insuredNumber}/geocode` → `cpos.app.masterUsers.postByInsuredNumberGeocode`
  - `POST /api/master-users/assignments/dedupe` → `cpos.session.masterUsers.postAssignmentsDedupe`
  - `POST /api/care-documents/v1/maintenance/backfill-master-user-id` → `cpos.app.careDocuments.postV1MaintenanceBackfillMasterUserId`
  - `GET /api/care-service-actuals/v1/metrics.csv` → `cpos.app.careServiceActuals.getV1MetricsCsv`
  - `GET /api/user-id-maintenance/v1/unlinked-app-data` → `cpos.app.userIdMaintenance.getV1UnlinkedAppData`
  - `POST /api/user-id-maintenance/v1/unlinked-app-data/link` → `cpos.app.userIdMaintenance.postV1UnlinkedAppDataLink`
  - `DELETE /api/platform/facility-assignments/membership/{userId}/{facilityId}` → `cpos.session.platform.deleteFacilityAssignmentsMembershipByUserIdByFacilityId`
  - `POST /api/platform/facility-assignments/backfill-user-facilities` → `cpos.session.platform.postFacilityAssignmentsBackfillUserFacilities`
  - `POST /api/care-records/v1/records/{id}/classify` → `cpos.app.careRecords.postV1RecordsByIdClassify`
  - `POST /api/care-records/v1/records/{id}/unvoid` → `cpos.app.careRecords.postV1RecordsByIdUnvoid`
  - `POST /api/maintenance/purge-user-test-data` → `cpos.session.maintenance.postPurgeUserTestData`
  - `POST /api/record-app/records/{id}/classify` → `cpos.app.recordApp.postRecordsByIdClassify`
  - `POST /api/record-app/records/{id}/unvoid` → `cpos.app.recordApp.postRecordsByIdUnvoid`
  - `PUT /api/apps/{id}/scopes` → `cpos.session.apps.putByIdScopes`
  - `POST /api/facilities/{id}/geocode` → `cpos.app.facilities.postByIdGeocode`
  - `POST /api/facilities/{facilityId}/staff/sync-names-from-users` → `cpos.app.facilities.postByFacilityIdStaffSyncNamesFromUsers`
  - `GET /api/platform/sales/pipeline` → `cpos.app.platform.getSalesPipeline`
  - `GET /api/platform/sales/referral-outcomes` → `cpos.app.platform.getSalesReferralOutcomes`
  - `POST /api/platform/geo/travel-matrix` → `cpos.app.platform.postGeoTravelMatrix`
  - `POST /api/platform/geo/geocode` → `cpos.app.platform.postGeoGeocode`
  - `POST /api/platform/geo/geocode-missing` → `cpos.app.platform.postGeoGeocodeMissing`
  - `POST /api/platform/audit-events` → `cpos.app.platform.postAuditEvents`
  - (署名) `GET /api/care-records/v1/records` → `cpos.app.careRecords.getV1Records`
  - (署名) `GET /api/care-records/v1/records/updates` → `cpos.app.careRecords.getV1RecordsUpdates`
  - (署名) `GET /api/device/records` → `cpos.session.device.getRecords`
  - (署名) `GET /api/record-app/records` → `cpos.app.recordApp.getRecords`
  </details>
- **利用者を masterUserId で持つ (CPOS 2026-09-26 の利用者キー移行)。** CPOS は AppData の行を「封筒」の `insuredNumber` でだけ本人に結ぶ。利用者ごとの一覧、統合や番号変更への追随、保存時の `masterUserId` の付与は、どれも封筒しか見ない。`data.masterUserId` だけの行は、CPOS の整備画面でも本人に結べない (候補を data の氏名でしか出さないため)。
  - client: `appData.create / update / list / upsertBy` に任意の `{ user }` (masterUserId) を足した。create / update は `body.insuredNumber` として、list は `?insuredNumber=` として送る。`user` を渡さなければ、送る本文は今までと同じ。
  - client の `upsertBy`: `user` を付けると、本人の行だけを CPOS 側で絞ってから探す。封筒の無い古い行は、`data[keyField] === user` のときだけ拾って本人に結ぶ (別の人の行は付け替えない)。探すときの一覧は `Cache-Control: no-cache` で CPOS のキャッシュを素通しする (最大 30 秒古く見えて二重に作るのを防ぐ)。
  - client の型: `AppDataRecord` に封筒の `insuredNumber` / `masterUserId` を足した。
  - client: `displayInsuredNumber(user)` を足した。帳票・画面に出してよい番号を返す。CPOS が値を返せばそれを使い、返さない API では仮番号 (`tmp-*`) と `mu_` + 6 文字以上を出さない (CPOS の正本と同じ規則)。
  - KIT 模擬サーバ: 封筒の扱いを本物に合わせた (保存キーへの揃え、保存時の mu の付与、一覧は送った値・今の番号・過去の番号で引く、PUT の付け直しと null での解除、PUT は data を省ける)。
  - KIT 模擬サーバ: `platform/master-users/{key}`・`name-map`・`facilities/{facilityId}/users` (`displayInsuredNumber` が載る) を足した。利用者検索の `q` が番号にも当たる。形はどれも本物で実測したもの。
  - 雛形: 送られた `masterUserId` がその事業所の利用者かを確かめ、違えば 400。メモは `{ user }` で本人に結ぶ。
  - スキル・標準ブロック・GLOSSARY: 利用者は `masterUserId` で指す。`insuredNumber` は変わる保存キーなのでキーにしない。番号しか持たないデータは name-map で mu に寄せてから結ぶ。
  - 元は kimuchi の PR #6 (TK-004 として出されたもの)。本物での実測と CPOS のコードとの照合で、模擬サーバの 4 か所を直して取り込んだ。
- `create`: 新しいアプリに書く `@cpos/kit` の依存を、kit の版の系統 (`#semver:^0.<minor>`) にした (`^0.1` 固定だったので、0.2.0 を出しても新しいアプリに 0.1 系が入るところだった)。
- `/api/health`: 雛形と模擬サーバの応答を、CPOS と同じ形 `{ status, app, appEnv, revision, timestamp }` にした (CPOS の APP_HEALTH の規約。コミットの SHA は載せない)。
- manifest: appId `jinji` は CPOS が scope の上限を 3 つに固定している。上限の外を書くと `validate` が warning を出す (CPOS は取込で黙って捨てる)。
- `token` の案内: トークンの入れ替えを「発行 → .env / Secret Manager に入れ直し → `verify:staging` → 古いトークンを失効」の順にした (発行しただけではアプリに届かない)。ステージングに登録・発行するときはステージングの CPOS で行う。
- スキル: ステージングだけ 403 になる原因は古いトークン。`apps:fleet` の rotate のたびに CPOS が manifest を取りに来る。ステージングの secret は `<secret>-staging`。
- 判断を保留したもの (候補): なりすまし表示 (view-as) を app-kit に通すか、監査イベント、geo・営業・unvoid のレシピ化。いまの app-kit は `cpos_session` だけを転送するので、なりすまし中の管理者は本人として見える (壊れはしない)。
- **既存アプリへの影響**
  - **既存アプリにこの版を入れるには、依存を `github:loogo-inc/cpos-kit#semver:^0.2` に書き換えて `npm install` する。** 0.x の間は minor が変わると別系統なので、`^0.1` のままでは 0.1.0 のまま。入れた後は `npx github:loogo-inc/cpos-kit update` で標準ブロックとスキルを新しくする。
  - KIT 模擬サーバの利用者が 20 人から 22 人になった (番号が変わった人・仮番号の人を足した)。件数を固定しているテストは直す必要がある。
  - KIT 模擬サーバの capabilities から、模擬に無い機能のキーが消えた。本物の規約どおりで、無い機能はキーごと無い。
  - 雛形の `/api/health` から `ok: true` が無くなった。
  - 既存の AppData の行は、封筒が空のままだと利用者ごとの一覧に出ない。`upsertBy(…, { user })` を使えば、次の保存で本人に結ばれる。

### Added
- `docs` — CPOS の API 一覧を Redoc の画面で見る (kit が持つ OpenAPI の写し。ログイン不要)。

### Changed
- **原則はステージング。** `create` が接続先 (staging / mock) を聞き、staging なら URL とトークンをその場で `.env` に書いて疎通を確かめる。`npm run dev` は `.env` の接続先に従い (https = ステージング、127.0.0.1 = 模擬)、`npm run dev:mock` は常に模擬サーバ。起動ログに「接続先:」を出す。接続先が無ければ案内して止まる。

### Fixed
- `help`: 一覧に `connect` を載せ、廃止した `ask` の選択肢 (`--markdown` `--append` `--json`) を消した。公開 README の CLI 一覧 (`find` `ask` が残っていた) と ADOPT.md の adopt の出力例を実物に合わせた。
- `npm test` (kit 自身) が bash の環境変数書式 (`CPOS_KIT_MAINTAINER=1 node …`) で PowerShell / cmd では動かなかった → テスト側で立てる。
- `update`: 自前の同名スキル (`.claude/skills/cpos/SKILL.md` に `@cpos/kit` が無い) を上書きしていた → kit 所有の印 (`@cpos/kit`) があるものだけ更新し、自前は「触らない」と出す。書き先が symlink でプロジェクトの外を指すときも書かない。
- `adopt`: スキルに `<appId>` `<APP>` を埋めていなかった (create / update は埋める) ため、adopt 直後の `update --check` が赤になった → 埋める。
- `adopt`: ルートに手書きの `SKILLS.md` (スキルの索引) があって cpos の行が無ければ知らせる (索引は kit が書かない)。

- `tickets`: 台帳が「入っている」かを `docs/tickets/` フォルダの有無で見ていたため、自前の `docs/tickets/` (JIRA-101.md 等) と自前の `docs/TICKETS.md` を持つ既存プロジェクトで `npx cpos-kit tickets` が自前の索引を黙って上書きした。init が書く `docs/tickets/README.md` で判定する。`tickets init` は kit のものでない `docs/TICKETS.md` の上には入らず、`TK-###.md` でないファイルは名指しで知らせる。
- `adopt`: 既にある同名ファイル (`.claude/skills/cpos/SKILL.md`、`docs/cpos/README.md` 等) の中身が kit のものと違うときにそう言う (`--show <パス>` で kit が書く中身を出して見比べる)。既存の `CLAUDE.md` に `@AGENTS.md` の 1 行が無ければ末尾に足す (今までは「自分で足してください」)。`help` に adopt を載せた。 `--apply --replace <パス>` で、見比べた上でそのファイルだけ kit のもので置き換える (同名の自前 `cpos` スキルが kit のスキルを隠すとき。kit のスキルを新しい版に上げるときも同じ)。
- `adopt`: `CLAUDE.md` が `AGENTS.md` への symlink のとき `@AGENTS.md` を足していた (自分自身を指す 1 行になる) → 同じファイルなら足さない。書き先が symlink でプロジェクトの外 (共有スキル置き場) に抜けるときは書かない (`--replace` でも)。旧式の `.claude/commands/cpos.md` があれば `/cpos` の名前が被ると知らせる。`.cursor/` があるプロジェクトには create と同じ `.cursor/rules/cpos.mdc` を足す (今までは create だけが書いていた)。

## [0.1.0] - 2026-09-14

最初の公開。生成元: CPOS OpenAPI 1.0.0 (revision 00201-58l、1,372 operations)。

### Added
- `@cpos/kit/client` — CPOS を呼ぶ薄いクライアント。手書きの 5 系統 (platform / facilities / masterUsers / staffAccounts / appData) に加え、CPOS の公式 OpenAPI に載る全 operation を `cpos.app.*` (App Token) / `cpos.session.*` (セッション Cookie) のメソッドとして機械生成 (1 operation = 1 メソッド)。事業所境界とスコープ不足を日本語のエラーで返す。
- `@cpos/kit/fake` — KIT 模擬サーバ (TCP と in-process)。スコープ検査、本物と同じ失敗応答。
- `@cpos/kit/manifest` — `cpos.manifest.json` の検証 (JSON Schema)。
- `@cpos/kit/testing` — テスト用の補助 (`pickFacilities`、`cposForTests`)。
- `@cpos/kit/app-kit` — CPOS のログインを引き継ぐゲートウェイ。
- CLI `cpos-kit` — `create` / `adopt` / `fake` / `validate` / `guide` / `token` / `connect` / `doctor` (kit と接続先 CPOS の API の版を比べる) / `tickets` (後から入れるチケット台帳。`tickets init --apply` まで何も動かない)。
- 雛形 — docs の型、Node と Fastify の見本、作業規律 (AGENTS.md + Claude Code の Stop hook)。
- `skills/cpos` — Agent Skills 形式のレシピ。

### CPOS 2026-09-14 の変更への追随 (公開前に取り込み)
- manifest: `resources[].schema` (data の形の宣言。type / properties / required / items / enum / additionalProperties / description / format のみ)、`tokenDelivery.secretManager`、`isPublic` は初回登録時のみ。`apps:admin` は App Token に付けられないので validate がエラーにする。雛形の notes に schema の見本。
- KIT 模擬サーバ: manifest の schema に合わない data の作成・更新を 400 (`issues` 付き。本物は既定で報告のみ)。事業所限定トークンが facilityId 無しで一覧を呼ぶと 400 `facility-id-required` (本物と同じ形)。
- client: `CposApiError.body` に CPOS の応答 JSON。`tokenResolver()` (Secret Manager の mount ファイルを 60 秒ごとに読み直す。CPOS 側のトークン入替に追随)。雛形はこれを使う。
- app-kit: OAuth の既定 scope を `facilities:read` に (省略すると MCP の読み取り全部の同意になるため)。失効は access と refresh の両方。429 を日本語のエラーに。`oauth.revoke: false` で失効を省ける。
- CLI: `scopes` が管理者 PAT 専用 (`apps:admin`) を区別する。`token` の案内に manager の発行条件 (事業所限定・ワイルドカード不可)。
- skills: manifest の schema、取込の 5 秒制限、tokenDelivery、MCP の PHI ツール、404 の調べ方を更新。
