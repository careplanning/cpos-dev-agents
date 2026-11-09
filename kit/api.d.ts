// 生成物。kit の保守者が生成器 (gen-api) で spec/cpos-openapi.json から作る。手で編集しない。
// 生成元: CPOS OpenAPI 0.1.0 / revision main@8b68de48 / 2026-11-09 / 1656 operations

export interface CposApi_app {
  alerts: {
    /** アラートの一覧
     * GET /api/alerts / scope alerts:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: alertType, appId, createdAt, data, dueDate, facilityId, id, insuredNumber, message, organizationId, severity, status … / 模擬サーバ: 無し (501) */
    get(args?: { facilityId?: string; status?: string; severity?: string; alertType?: string; appId?: string; insuredNumber?: string; since?: string; limit?: number; targetResource?: string; targetId?: string }): Promise<unknown>;
    /** 新規作成 (重複防止: 同じ
     * POST /api/alerts / scope alerts:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    post(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** アラート: 1 件取得 (:id)
     * GET /api/alerts/{id} / scope alerts:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: alertType, appId, createdAt, data, dueDate, facilityId, id, insuredNumber, message, organizationId, severity, status … / 模擬サーバ: 無し (501) */
    getById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 確認済みへ
     * POST /api/alerts/{id}/acknowledge / scope alerts:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByIdAcknowledge(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 棄却 (誤報など)
     * POST /api/alerts/{id}/dismiss / scope alerts:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByIdDismiss(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 解決済みへ (resolvedNote 付与可)
     * POST /api/alerts/{id}/resolve / scope alerts:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByIdResolve(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 検索条件 / id 指定の一括操作 (admin)
     * POST /api/alerts/bulk / scope alerts:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postBulk(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 詳細検索 (複数値・期間・部分一致・並替・ページング)
     * GET /api/alerts/search / scope alerts:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: items, limit, offset, scanCap, total, truncated / 模擬サーバ: 無し (501) */
    getSearch(args?: { facilityId?: string }): Promise<unknown>;
  };
  androidApp: {
    /** 端末の一覧 (管理者)
     * GET /api/android-app/v1/devices / scope android-app:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1Devices(args?: { facilityId?: string }): Promise<unknown>;
    /** 端末を切り離す (使っているトークンを失効させる)
     * POST /api/android-app/v1/devices/disconnect / scope android-app:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1DevicesDisconnect(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 端末が起動時に自分を知らせる
     * POST /api/android-app/v1/devices/heartbeat / scope android-app:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1DevicesHeartbeat(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 事業所の届出から決まる端末の機能セット
     * GET /api/android-app/v1/feature-set / scope android-app:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1FeatureSet(args?: { facilityId?: string }): Promise<unknown>;
    /** 配布版の一覧 (管理者)
     * GET /api/android-app/v1/releases / scope android-app:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1Releases(args?: { facilityId?: string }): Promise<unknown>;
    /** 配布版の登録・更新 (管理者)
     * PUT /api/android-app/v1/releases/{versionCode} / scope android-app:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putV1ReleasesByVersionCode(args: { versionCode: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 配布版の削除 (管理者)
     * DELETE /api/android-app/v1/releases/{versionCode} / scope android-app:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteV1ReleasesByVersionCode(args: { versionCode: string; facilityId?: string }): Promise<unknown>;
    /** **案内・更新確認**。登録が無ければ null
     * GET /api/android-app/v1/releases/latest / scope android-app:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1ReleasesLatest(args?: { facilityId?: string }): Promise<unknown>;
  };
  appData: {
    /** AppData の一覧 (アプリ固有レコードの検索)
     * GET /api/app-data/{appId}/{resource} / scope app-data:{appId}:read / 認証 both / 応答の形あり / 模擬サーバ: あり */
    getByAppIdByResource(args: { appId: string; resource: string; facilityId?: string; insuredNumber?: string; status?: string; owner?: string; from?: string; to?: string; serviceMonth?: string; paginated?: boolean; cursor?: string; limit?: number }): Promise<unknown>;
    /** AppData のレコードを作成
     * POST /api/app-data/{appId}/{resource} / scope app-data:{appId}:write / 認証 both / 応答の形あり / 模擬サーバ: あり (本文の形は spec/cpos-api.yaml。本物で実測) */
    postByAppIdByResource(args: { appId: string; resource: string; body: unknown; facilityId?: string }): Promise<unknown>;
    /** AppData のレコードを 1 件取得
     * GET /api/app-data/{appId}/{resource}/{id} / scope app-data:{appId}:read / 認証 both / 応答の形あり / 模擬サーバ: あり */
    getByAppIdByResourceById(args: { appId: string; resource: string; id: string; facilityId?: string }): Promise<unknown>;
    /** AppData のレコードを更新
     * PUT /api/app-data/{appId}/{resource}/{id} / scope app-data:{appId}:write / 認証 both / 応答の形あり / 模擬サーバ: あり (本文の形は spec/cpos-api.yaml。本物で実測) */
    putByAppIdByResourceById(args: { appId: string; resource: string; id: string; body: unknown; facilityId?: string }): Promise<unknown>;
    /** AppData のレコードを削除
     * DELETE /api/app-data/{appId}/{resource}/{id} / scope app-data:{appId}:delete / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: あり */
    deleteByAppIdByResourceById(args: { appId: string; resource: string; id: string; facilityId?: string }): Promise<unknown>;
    /** 添付の一覧 (メタデータ)
     * GET /api/app-data/{appId}/{resource}/{id}/attachments / scope app-data:{appId}:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getByAppIdByResourceByIdAttachments(args: { appId: string; resource: string; id: string; facilityId?: string }): Promise<unknown>;
    /** 添付をアップロード (JSON + base64)
     * POST /api/app-data/{appId}/{resource}/{id}/attachments / scope app-data:{appId}:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByAppIdByResourceByIdAttachments(args: { appId: string; resource: string; id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 添付をダウンロード (Content-Disposition: attachment)
     * GET /api/app-data/{appId}/{resource}/{id}/attachments/{fileId} / scope app-data:{appId}:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getByAppIdByResourceByIdAttachmentsByFileId(args: { appId: string; resource: string; id: string; fileId: string; facilityId?: string }): Promise<unknown>;
    /** 添付を削除
     * DELETE /api/app-data/{appId}/{resource}/{id}/attachments/{fileId} / scope app-data:{appId}:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteByAppIdByResourceByIdAttachmentsByFileId(args: { appId: string; resource: string; id: string; fileId: string; facilityId?: string }): Promise<unknown>;
    /** 添付を inline 配信 (<img> 用)
     * GET /api/app-data/{appId}/{resource}/{id}/attachments/{fileId}/content / scope app-data:{appId}:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getByAppIdByResourceByIdAttachmentsByFileIdContent(args: { appId: string; resource: string; id: string; fileId: string; facilityId?: string }): Promise<unknown>;
    /** 直接アップロードの完了を通知
     * POST /api/app-data/{appId}/{resource}/{id}/attachments/complete-upload / scope app-data:{appId}:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByAppIdByResourceByIdAttachmentsCompleteUpload(args: { appId: string; resource: string; id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 添付の直接アップロードを開始 (署名 URL)
     * POST /api/app-data/{appId}/{resource}/{id}/attachments/upload-session / scope app-data:{appId}:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByAppIdByResourceByIdAttachmentsUploadSession(args: { appId: string; resource: string; id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** AppData レコードを差し戻す
     * POST /api/app-data/{appId}/{resource}/{id}/reopen / scope app-data:{appId}:write / 認証 both / 応答の形あり / 模擬サーバ: 無し (501) */
    postByAppIdByResourceByIdReopen(args: { appId: string; resource: string; id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** AppData レコードを提出 (ライフサイクル)
     * POST /api/app-data/{appId}/{resource}/{id}/submit / scope app-data:{appId}:write / 認証 both / 応答の形あり / 模擬サーバ: 無し (501) */
    postByAppIdByResourceByIdSubmit(args: { appId: string; resource: string; id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** AppData レコードの取消を戻す
     * POST /api/app-data/{appId}/{resource}/{id}/unvoid / scope app-data:{appId}:write / 認証 both / 応答の形あり / 模擬サーバ: 無し (501) */
    postByAppIdByResourceByIdUnvoid(args: { appId: string; resource: string; id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** AppData レコードを無効にする
     * POST /api/app-data/{appId}/{resource}/{id}/void / scope app-data:{appId}:write / 認証 both / 応答の形あり / 模擬サーバ: 無し (501) */
    postByAppIdByResourceByIdVoid(args: { appId: string; resource: string; id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** AppData の集計 (件数のみ。個人情報なし)
     * GET /api/app-data/{appId}/{resource}/aggregate / scope app-data:{appId}:read / 認証 both / 応答の形あり / 模擬サーバ: あり */
    getByAppIdByResourceAggregate(args: { appId: string; resource: string; facilityId?: string; from?: string; to?: string; serviceMonth?: string }): Promise<unknown>;
    /** AppData の自由記述を AI で分析
     * POST /api/app-data/{appId}/{resource}/analyze-free-text / scope app-data:{appId}:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByAppIdByResourceAnalyzeFreeText(args: { appId: string; resource: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 添付の上限 (サイズ・枚数・許可 MIME) の設定
     * GET /api/app-data/attachments/config / 認証 both / 実測 200 (2026-09-27) 応答の項目: allowedMimeTypes, jsonBodyLimit, maxAttachmentsPerRecord, maxBinaryBytes, recommendedClientMaxBytes, signedUploadSupported / 模擬サーバ: あり */
    getAttachmentsConfig(args?: { facilityId?: string }): Promise<unknown>;
    /** AppData のリソース台帳 (どのアプリに何のリソースがあるか)
     * GET /api/app-data/catalog / scope apps:read / 認証 both / 応答の形あり / 模擬サーバ: 無し (501) */
    getCatalog(args?: { appId?: string; facilityId?: string; withCounts?: boolean }): Promise<unknown>;
  };
  appUsage: {
    /** — 利用時間バッチの受け取り。全職種 (自分の
     * POST /api/app-usage/ingest / scope app-usage:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postIngest(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 機能別の利用時間の集計
     * GET /api/app-usage/summary / scope app-usage:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getSummary(args?: { facilityId?: string }): Promise<unknown>;
  };
  apps: {
    /** 登録アプリの一覧 (status フィルタ対応)。admin / manager のログインか apps:read の Bearer
     * GET /api/apps / scope apps:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: approvedAt, approvedBy, createdAt, description, icon, id, isPublic, manifestPath, name, organizationId, publishedAt, rejectedAt … / 模擬サーバ: 無し (501) */
    get(args?: { facilityId?: string }): Promise<unknown>;
    /** プロンプトの解決結果の診断 (本文は返さない)
     * GET /api/apps/{appId}/ai/{promptKey}/resolve / scope apps:{appId}:ai:run / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getByAppIdAiByPromptKeyResolve(args: { appId: string; promptKey: string; facilityId?: string }): Promise<unknown>;
    /** 登録アプリのプロンプトで AI を実行
     * POST /api/apps/{appId}/ai/{promptKey}/run / scope apps:{appId}:ai:run / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByAppIdAiByPromptKeyRun(args: { appId: string; promptKey: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ファイル (音声・PDF・画像) を渡して AI を実行
     * POST /api/apps/{appId}/ai/{promptKey}/run-document / scope apps:{appId}:ai:run / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByAppIdAiByPromptKeyRunDocument(args: { appId: string; promptKey: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 大きなファイルの分割アップロードを開始
     * POST /api/apps/{appId}/ai/document-uploads / scope apps:{appId}:ai:run / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByAppIdAiDocumentUploads(args: { appId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 分割アップロードの断片を送る
     * POST /api/apps/{appId}/ai/document-uploads/{uploadId}/parts / scope apps:{appId}:ai:run / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByAppIdAiDocumentUploadsByUploadIdParts(args: { appId: string; uploadId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ワークフロー対応のリスト（status フィルタ対応）
     * GET /api/apps/{appId}/bootstrap / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 404 (2026-09-27) app-not-found / 模擬サーバ: 無し (501) */
    getByAppIdBootstrap(args: { appId: string; facilityId?: string }): Promise<unknown>;
    /** ============================ GET /:appId/connect ============================
     * GET /api/apps/{appId}/connect / 認証 both / 実測 200 (2026-09-27) だが 0 件で項目名は未確認 (推測しない) / 模擬サーバ: 無し (501) */
    getByAppIdConnect(args: { appId: string; facilityId?: string }): Promise<unknown>;
    /** 新規登録（draft）
     * POST /api/apps/{appId}/session/exchange / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByAppIdSessionExchange(args: { appId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ワークフロー対応のリスト（status フィルタ対応）
     * GET /api/apps/{appId}/sheet-mappings / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getByAppIdSheetMappings(args: { appId: string; facilityId?: string }): Promise<unknown>;
    /** 新規登録（draft）
     * POST /api/apps/{appId}/sheet-mappings / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByAppIdSheetMappings(args: { appId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 編集 (PUT /api/apps/:id) 編集可能なフィールド: name / description / type / url / manifestPath / isPublic / requiredPermissions / icon / resources。 認可: - draft / rejected ステ
     * PUT /api/apps/{appId}/sheet-mappings/{id} / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putByAppIdSheetMappingsById(args: { appId: string; id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** シート同期のマッピングを削除
     * DELETE /api/apps/{appId}/sheet-mappings/{id} / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteByAppIdSheetMappingsById(args: { appId: string; id: string; facilityId?: string }): Promise<unknown>;
    /** ワークフロー対応のリスト（status フィルタ対応）
     * GET /api/apps/{appId}/sheet-sync/jobs / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getByAppIdSheetSyncJobs(args: { appId: string; facilityId?: string }): Promise<unknown>;
    /** シート同期ジョブを 1 件取得
     * GET /api/apps/{appId}/sheet-sync/jobs/{id} / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getByAppIdSheetSyncJobsById(args: { appId: string; id: string; facilityId?: string }): Promise<unknown>;
    /** 新規登録（draft）
     * POST /api/apps/{appId}/sheet-sync/run / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByAppIdSheetSyncRun(args: { appId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 登録アプリ: 1 件取得 (:id)
     * GET /api/apps/{id} / scope apps:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: approvedAt, approvedBy, createdAt, description, icon, id, isPublic, manifestPath, name, organizationId, publishedAt, rejectedAt … / 模擬サーバ: 無し (501) */
    getById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** — 該当アプリの grant 一覧
     * GET /api/apps/{id}/access / scope apps:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: appId, grants, isPublic / 模擬サーバ: 無し (501) */
    getByIdAccess(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** アプリの権限宣言から API トークンのスコープを生成
     * GET /api/apps/{id}/scopes / scope apps:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: appId, scopes / 模擬サーバ: 無し (501) */
    getByIdScopes(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 1 アプリの App Token を発行し直して配る (dryRun 可)。manifest を確かめられなければ 422 で断る
     * POST /api/apps/{id}/tokens/rotate / scope apps:admin / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByIdTokensRotate(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ワークフロー対応のリスト（status フィルタ対応）
     * GET /api/apps/available / scope apps:{appId}:ai:run / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getAvailable(args?: { facilityId?: string }): Promise<unknown>;
    /** 登録アプリの棚卸し (manifest が要るスコープと有効トークンの不足、配信先の有無)。既定で manifest を取り直す (?verify=false で登録の保存値のみ)
     * GET /api/apps/fleet / scope apps:admin / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getFleet(args?: { facilityId?: string }): Promise<unknown>;
    /** 不足のあるアプリの App Token を発行し直し、Secret Manager に配って旧トークンを猶予付きで失効 (dryRun 可)。manifest を確かめられないアプリは発行しない
     * POST /api/apps/fleet/rotate-tokens / scope apps:admin / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postFleetRotateTokens(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 全アプリの cpos.manifest.json を取り直して登録を更新 (dryRun 可)
     * POST /api/apps/fleet/sync-manifests / scope apps:admin / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postFleetSyncManifests(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  assignmentEndDates: {
    /** 終了日の無い利用終了の登録と、付ける予定の終了日 (最後に変更された日) の一覧 (書き込みなし)
     * GET /api/assignment-end-dates/v1/preview / scope master-users:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1Preview(args?: { facilityId?: string }): Promise<unknown>;
  };
  auth: {
    /** 認証: 設定の取得 (config)
     * GET /api/auth/config / 認証 none / 実測 200 (2026-09-27) 応答の項目: appUrl, configured, loginPath / 模擬サーバ: 無し (501) */
    getConfig(args?: { facilityId?: string }): Promise<unknown>;
    /** (台帳未記載)
     * GET /api/auth/google / 認証 none / 実測 200 (2026-09-27) だが 0 件で項目名は未確認 (推測しない) / 模擬サーバ: 無し (501) */
    getGoogle(args?: { facilityId?: string }): Promise<unknown>;
    /** (台帳未記載)
     * GET /api/auth/google/callback / 認証 none / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 400 (2026-09-27) パラメータが要る: missing code / 模擬サーバ: 無し (501) */
    getGoogleCallback(args?: { facilityId?: string }): Promise<unknown>;
    /** (台帳未記載)
     * GET /api/auth/login / 認証 none / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 400 (2026-09-27) パラメータが要る: {"code":"INVALID_NEXT","message":"next が指定されていません"} / 模擬サーバ: 無し (501) */
    getLogin(args?: { facilityId?: string }): Promise<unknown>;
    /** (台帳未記載)
     * GET /api/auth/logout / 認証 none / 実測 200 (2026-09-27) だが 0 件で項目名は未確認 (推測しない) / 模擬サーバ: 無し (501) */
    getLogout(args?: { facilityId?: string }): Promise<unknown>;
    /** (台帳未記載)
     * POST /api/auth/logout / 認証 none / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postLogout(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 認証: 自分の取得 (me)。事業所スコープ (facilityScope) と閲覧の範囲 (facilityScope.readScope) を含む
     * GET /api/auth/me / 認証 both / 応答の形あり / 実測 401 (2026-09-27) not authenticated / 模擬サーバ: あり */
    getMe(args?: { facilityId?: string }): Promise<unknown>;
    /** (台帳未記載)
     * POST /api/auth/operator / 認証 none / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postOperator(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** (台帳未記載)
     * POST /api/auth/operator/clear / 認証 none / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postOperatorClear(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** (台帳未記載)
     * GET /api/auth/return / 認証 none / 実測 200 (2026-09-27) だが 0 件で項目名は未確認 (推測しない) / 模擬サーバ: 無し (501) */
    getReturn(args?: { facilityId?: string }): Promise<unknown>;
  };
  billingMasters: {
    /** … program=kaigo に固定
     * GET /api/billing-masters/area-rates / scope billing-masters:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: items / 模擬サーバ: 無し (501) */
    getAreaRates(args?: { facilityId?: string }): Promise<unknown>;
    /** PUT /area-rates/:id  DELETE /area-rates/:id
     * POST /api/billing-masters/area-rates / scope billing-masters:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postAreaRates(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 地域区分・加算率を 1 件更新
     * PUT /api/billing-masters/area-rates/{id} / scope billing-masters:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putAreaRatesById(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 地域区分・加算率を 1 件削除
     * DELETE /api/billing-masters/area-rates/{id} / scope billing-masters:delete / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteAreaRatesById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 地域区分・加算率を CSV で出力
     * GET /api/billing-masters/area-rates/export.csv / scope billing-masters:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getAreaRatesExportCsv(args?: { facilityId?: string }): Promise<unknown>;
    /** 地域区分 CSV を取込
     * POST /api/billing-masters/area-rates/import-csv/apply / scope billing-masters:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postAreaRatesImportCsvApply(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 地域区分 CSV 取込のプレビュー
     * POST /api/billing-masters/area-rates/import-csv/preview / scope billing-masters:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postAreaRatesImportCsvPreview(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** /area-rates/export.csv
     * GET /api/billing-masters/area-rates/template.csv / scope billing-masters:read / 認証 both / 実測 200 (2026-09-27) だが 0 件で項目名は未確認 (推測しない) / 模擬サーバ: 無し (501) */
    getAreaRatesTemplateCsv(args?: { facilityId?: string }): Promise<unknown>;
    /** 医療保険の地域加算率
     * GET /api/billing-masters/iryou/area-rates / scope billing-masters:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: items / 模擬サーバ: 無し (501) */
    getIryouAreaRates(args?: { facilityId?: string }): Promise<unknown>;
    /** 医療保険 (訪問看護療養費) のコード表
     * GET /api/billing-masters/iryou/service-codes / scope billing-masters:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: items, version / 模擬サーバ: 無し (501) */
    getIryouServiceCodes(args?: { facilityId?: string }): Promise<unknown>;
    /** … program=kaigo に固定
     * GET /api/billing-masters/kaigo/area-rates / scope billing-masters:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: items / 模擬サーバ: 無し (501) */
    getKaigoAreaRates(args?: { facilityId?: string }): Promise<unknown>;
    /** 介護保険のサービスコード表
     * GET /api/billing-masters/kaigo/service-codes / scope billing-masters:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: items, version / 模擬サーバ: 無し (501) */
    getKaigoServiceCodes(args?: { facilityId?: string }): Promise<unknown>;
    /** 1 件作成
     * POST /api/billing-masters/service-codes / scope billing-masters:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postServiceCodes(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** DELETE /service-codes/:id
     * PUT /api/billing-masters/service-codes/{id} / scope billing-masters:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putServiceCodesById(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** サービスコードを 1 件削除
     * DELETE /api/billing-masters/service-codes/{id} / scope billing-masters:delete / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteServiceCodesById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** サービスコード表を CSV で出力
     * GET /api/billing-masters/service-codes/export.csv / scope billing-masters:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getServiceCodesExportCsv(args?: { facilityId?: string }): Promise<unknown>;
    /** サービスコード CSV を取込
     * POST /api/billing-masters/service-codes/import-csv/apply / scope billing-masters:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postServiceCodesImportCsvApply(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** サービスコード CSV 取込のプレビュー
     * POST /api/billing-masters/service-codes/import-csv/preview / scope billing-masters:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postServiceCodesImportCsvPreview(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 公式マスタ (ビルド同梱の seed *.csv.gz) を 1 操作で一括取込する。 本番では Firestore へバッチ書込。決定的 docId のため再実行は冪等。
     * POST /api/billing-masters/service-codes/import-seed / scope billing-masters:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postServiceCodesImportSeed(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 登録総数 (全期間・全版・保険区分別)。一覧 API は表示用に limit が掛かるため、 一括取込が全件入ったかの確認はこちらを使う (Firestore は集計 count で安価)。
     * GET /api/billing-masters/service-codes/stats / scope billing-masters:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: areaRates, byProgram, total / 模擬サーバ: 無し (501) */
    getServiceCodesStats(args?: { facilityId?: string }): Promise<unknown>;
    /** /service-codes/export.csv
     * GET /api/billing-masters/service-codes/template.csv / scope billing-masters:read / 認証 both / 実測 200 (2026-09-27) だが 0 件で項目名は未確認 (推測しない) / 模擬サーバ: 無し (501) */
    getServiceCodesTemplateCsv(args?: { facilityId?: string }): Promise<unknown>;
    /** … program=shougai に固定
     * GET /api/billing-masters/shougai/area-rates / scope billing-masters:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: items / 模擬サーバ: 無し (501) */
    getShougaiAreaRates(args?: { facilityId?: string }): Promise<unknown>;
    /** 障害福祉サービスのコード表
     * GET /api/billing-masters/shougai/service-codes / scope billing-masters:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 500 (2026-09-27) JSON ではない / 模擬サーバ: 無し (501) */
    getShougaiServiceCodes(args?: { facilityId?: string }): Promise<unknown>;
    /** 請求マスタの版
     * GET /api/billing-masters/version / scope billing-masters:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: checkedAt, version / 模擬サーバ: 無し (501) */
    getVersion(args?: { facilityId?: string }): Promise<unknown>;
  };
  buildInfo: {
    /** いま動いている版 (設定画面の「ビルド版」)。コミット SHA を含むため認証が要る
     * GET /api/build-info / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    get(args?: { facilityId?: string }): Promise<unknown>;
  };
  capabilities: {
    /** 機能セット: 一覧
     * GET /api/capabilities / 認証 both / 実測 200 (2026-09-27) 応答の項目: features, server / 模擬サーバ: あり */
    get(args?: { facilityId?: string }): Promise<unknown>;
  };
  careBillingContexts: {
    /** 請求コンテキスト (利用者 × 月の請求条件) の一覧
     * GET /api/care-billing-contexts/v1 / scope care-claim-candidates:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: items / 模擬サーバ: 無し (501) */
    getV1(args?: { facilityId?: string }): Promise<unknown>;
    /** 請求コンテキストを 1 件登録・更新
     * PUT /api/care-billing-contexts/v1/{id} / scope care-claim-candidates:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putV1ById(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 請求コンテキストをまとめて登録・更新 (冪等)
     * POST /api/care-billing-contexts/v1/bulk-upsert / scope care-claim-candidates:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1BulkUpsert(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  careBillingPlans: {
    /** 請求予定 (利用者ごとの算定予定コード) の一覧
     * GET /api/care-billing-plans/v1 / scope care-claim-candidates:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: items / 模擬サーバ: 無し (501) */
    getV1(args?: { facilityId?: string }): Promise<unknown>;
    /** 1 件
     * GET /api/care-billing-plans/v1/{id} / scope care-claim-candidates:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getV1ById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 1 件 upsert
     * PUT /api/care-billing-plans/v1/{id} / scope care-claim-candidates:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putV1ById(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 3 namespace からの取り込み (dry-run 既定)
     * POST /api/care-billing-plans/v1/import-app-data / scope care-claim-candidates:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ImportAppData(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  careClaimCandidates: {
    /** 請求候補の一覧 (事業所・提供月で絞る)
     * GET /api/care-claim-candidates/v1 / scope care-claim-candidates:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: items / 模擬サーバ: 無し (501) */
    getV1(args?: { facilityId?: string }): Promise<unknown>;
    /** 請求候補を 1 件取得
     * GET /api/care-claim-candidates/v1/{id} / scope care-claim-candidates:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getV1ById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 請求候補を削除 (管理操作)
     * DELETE /api/care-claim-candidates/v1/{id} / scope care-claim-candidates:delete / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteV1ById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 請求候補を国保連請求明細書へ反映 (冪等)
     * POST /api/care-claim-candidates/v1/{id}/apply-to-claim / scope care-claim-candidates:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ByIdApplyToClaim(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 請求候補を確定
     * POST /api/care-claim-candidates/v1/{id}/confirm / scope care-claim-candidates:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ByIdConfirm(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 請求候補を無効にする
     * POST /api/care-claim-candidates/v1/{id}/void / scope care-claim-candidates:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ByIdVoid(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** VNS 互換 alias (/apply) と正式 (/apply-to-claims)。
     * POST /api/care-claim-candidates/v1/apply / scope care-claim-candidates:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1Apply(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 複数の請求候補をまとめて請求明細書へ反映
     * POST /api/care-claim-candidates/v1/apply-to-claims / scope care-claim-candidates:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ApplyToClaims(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 月次の実績とマスタから請求候補を生成 (dryRun 可)
     * POST /api/care-claim-candidates/v1/generate / scope care-claim-candidates:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1Generate(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  careDocuments: {
    /** 業務文書の一覧 (種類・利用者・状態で絞る)
     * GET /api/care-documents/v1 / scope care-documents:read / 認証 both / 応答の形あり / 模擬サーバ: 無し (501) */
    getV1(args?: { insuredNumber?: string; facilityId?: string; documentType?: string; documentSubType?: string; serviceDomain?: string; templateKey?: string; status?: string; canonicalOnly?: boolean; includeCarePlans?: boolean; includeData?: boolean; from?: string; to?: string; query?: string; limit?: number }): Promise<unknown>;
    /** 業務文書を作成 (下書き)
     * POST /api/care-documents/v1 / scope care-documents:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1(args: { body: unknown; facilityId?: string }): Promise<unknown>;
    /** 業務文書を 1 件取得
     * GET /api/care-documents/v1/{id} / scope care-documents:read / 認証 both / 応答の形あり / 模擬サーバ: 無し (501) */
    getV1ById(args: { id: string; view?: string; validatePlanBasis?: string; evidence?: string; facilityId?: string }): Promise<unknown>;
    /** 業務文書を更新
     * PUT /api/care-documents/v1/{id} / scope care-documents:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putV1ById(args: { id: string; body: unknown; facilityId?: string }): Promise<unknown>;
    /** 業務文書を削除 (管理操作)
     * DELETE /api/care-documents/v1/{id} / scope care-documents:delete / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteV1ById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 業務文書の空欄を AI で埋める
     * POST /api/care-documents/v1/{id}/ai-fill / scope care-documents:ai / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ByIdAiFill(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 業務文書を保管 (アーカイブ) に移す
     * POST /api/care-documents/v1/{id}/archive / scope care-documents:approve / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ByIdArchive(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 業務文書に原本ファイルを添付
     * POST /api/care-documents/v1/{id}/attach-file / scope care-documents:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ByIdAttachFile(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 計画をケアプランの版に結び付ける(照合)
     * POST /api/care-documents/v1/{id}/care-plan-link / scope care-documents:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ByIdCarePlanLink(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 汎用 convert (programmatic): { to: json|csv|xlsx|pdf }
     * POST /api/care-documents/v1/{id}/convert / scope care-documents:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ByIdConvert(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 送付・回答の記録
     * POST /api/care-documents/v1/{id}/correspondence / scope care-documents:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ByIdCorrespondence(args: { id: string; body: unknown; facilityId?: string }): Promise<unknown>;
    /** CPOS 上の宛先事業所の確認
     * POST /api/care-documents/v1/{id}/correspondence/preview-addressee / scope care-documents:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ByIdCorrespondencePreviewAddressee(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 正本 (や任意ドキュメント) を下書きとして複製する明示エンドポイント。 cpos-record が「正本を編集」する際に新 draft を作るのに使う。
     * POST /api/care-documents/v1/{id}/duplicate-draft / scope care-documents:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ByIdDuplicateDraft(args: { id: string; body: unknown; facilityId?: string }): Promise<unknown>;
    /** サービス計画の項目別に原記録の根拠と不足を表示
     * GET /api/care-documents/v1/{id}/evidence-coverage / scope care-documents:read / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1ByIdEvidenceCoverage(args: { id: string; facilityId: string; serviceDomain: string; masterUserId?: string; expectedDocumentRevision?: string; definitionKey?: string; caseId?: string }): Promise<unknown>;
    /** 業務文書を CSV で出力
     * GET /api/care-documents/v1/{id}/export.csv / scope care-documents:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1ByIdExportCsv(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 業務文書を JSON で出力
     * POST /api/care-documents/v1/{id}/export.json / scope care-documents:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ByIdExportJson(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 業務文書を PDF で出力
     * GET /api/care-documents/v1/{id}/export.pdf / scope care-documents:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1ByIdExportPdf(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 業務文書を Excel で出力
     * GET /api/care-documents/v1/{id}/export.xlsx / scope care-documents:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1ByIdExportXlsx(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 保存済み 原本/生成物 を取得する (sourceFiles/generatedFiles の fileId)。 - memory/取得可能な store: 実体バイナリを返す - Drive 等 (Google の配信ホスト) で storageUrl が絶対 URL: そこへ redirect する。 storag
     * GET /api/care-documents/v1/{id}/files/{fileId} / scope care-documents:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getV1ByIdFilesByFileId(args: { id: string; fileId: string; facilityId?: string }): Promise<unknown>;
    /** 業務文書を正本として確定
     * POST /api/care-documents/v1/{id}/mark-canonical / scope care-documents:approve / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ByIdMarkCanonical(args: { id: string; body: unknown; facilityId?: string }): Promise<unknown>;
    /** 添付ファイル (再アップロード) を解析して draft data にマージする。
     * POST /api/care-documents/v1/{id}/parse-attached-file / scope care-documents:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ByIdParseAttachedFile(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 確定 (正本化) の解除。下書きへ戻して編集できるようにする。 現場要望 2026-07-31:「確定の解除機能はすべてにおいて必要です」。 確定すると編集できなくなるが書き間違いは必ず出るので、戻せないと同じ文書を 作り直すしかなくなる。正本化で superseded にした兄弟も元の状態へ戻す。
     * POST /api/care-documents/v1/{id}/revert-canonical / scope care-documents:approve / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ByIdRevertCanonical(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 生成した文書を利用者の Drive フォルダにも保存
     * POST /api/care-documents/v1/{id}/save-to-user-drive / scope care-documents:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ByIdSaveToUserDrive(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 業務文書を確認依頼に回す
     * POST /api/care-documents/v1/{id}/submit-review / scope care-documents:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ByIdSubmitReview(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 業務文書を無効にする
     * POST /api/care-documents/v1/{id}/void / scope care-documents:approve / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ByIdVoid(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 文書の内容を利用者マスタに書き戻す
     * POST /api/care-documents/v1/{id}/write-back-master-user / scope care-documents:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ByIdWriteBackMasterUser(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 利用者のケアプランの版と現在有効な版
     * GET /api/care-documents/v1/care-plan-versions / scope care-documents:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1CarePlanVersions(args?: { facilityId?: string }): Promise<unknown>;
    /** ケアプランを構造化データで登録する
     * POST /api/care-documents/v1/care-plan-versions / scope care-documents:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1CarePlanVersions(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ケアプランの 1 版を正規化して読む
     * GET /api/care-documents/v1/care-plan-versions/{documentId} / scope care-documents:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1CarePlanVersionsByDocumentId(args: { documentId: string; facilityId?: string }): Promise<unknown>;
    /** 受領したケアプランを確定する
     * POST /api/care-documents/v1/care-plan-versions/{documentId}/confirm-received / scope care-documents:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1CarePlanVersionsByDocumentIdConfirmReceived(args: { documentId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ケアプランの 2 版の差分
     * GET /api/care-documents/v1/care-plan-versions/{documentId}/diff / scope care-documents:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1CarePlanVersionsByDocumentIdDiff(args: { documentId: string; facilityId?: string }): Promise<unknown>;
    /** ケアプランを事業所に共有する(原案の提供)
     * POST /api/care-documents/v1/care-plan-versions/{documentId}/share / scope care-documents:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1CarePlanVersionsByDocumentIdShare(args: { documentId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** PDF・画像からケアプランを読み取って下書きを作る
     * POST /api/care-documents/v1/care-plan-versions/extract-file / scope care-documents:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1CarePlanVersionsExtractFile(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 連携CSVを1人分取り込む
     * POST /api/care-documents/v1/care-plan-versions/import-csv/apply / scope care-documents:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1CarePlanVersionsImportCsvApply(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 連携CSVを1人分下見する
     * POST /api/care-documents/v1/care-plan-versions/import-csv/preview / scope care-documents:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1CarePlanVersionsImportCsvPreview(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 被保険者番号でケアプランの版を引く
     * POST /api/care-documents/v1/care-plan-versions/lookup / scope care-documents:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1CarePlanVersionsLookup(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 記録・経過などの文脈から業務文書の下書きを AI で作る
     * POST /api/care-documents/v1/draft-from-context / scope care-documents:ai / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1DraftFromContext(args: { body: unknown; facilityId?: string }): Promise<unknown>;
    /** SourceHub (ExternalSource: なんでもボックス/取込書類) から CareDocument draft を作る。本文 (OCR/抽出済テキスト) を classifier に通し分類、 data.sourceHubText に温存、原本を linkedDocuments/sourceFiles 
     * POST /api/care-documents/v1/from-source-hub / scope care-documents:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1FromSourceHub(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 業務文書を JSON から取込
     * POST /api/care-documents/v1/import / scope care-documents:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1Import(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ファイル (PDF / 画像 / Excel) から業務文書の下書きを作る
     * POST /api/care-documents/v1/import-file / scope care-documents:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ImportFile(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 事業所あての相談の受信一覧
     * GET /api/care-documents/v1/inbox / scope care-documents:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1Inbox(args?: { facilityId?: string }): Promise<unknown>;
    /** 法令項目レジストリ (GET /v1/:id より前に宣言して :id に食われないこと)
     * GET /api/care-documents/v1/legal-profiles / scope care-documents:read / 認証 both / 応答の形あり / 模擬サーバ: 無し (501) */
    getV1LegalProfiles(args?: { facilityId?: string }): Promise<unknown>;
    /** 法令項目レジストリを 1 件取得
     * GET /api/care-documents/v1/legal-profiles/{key} / scope care-documents:read / 認証 both / 応答の形あり / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getV1LegalProfilesByKey(args: { key: string; version?: string; facilityId?: string }): Promise<unknown>;
    /** masterUserId 未付与の業務文書に本人の不変 ID を付ける (保守。被保険者番号 → 氏名の順で名簿から引く。dryRun 既定)
     * POST /api/care-documents/v1/maintenance/backfill-master-user-id / scope care-documents:approve / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1MaintenanceBackfillMasterUserId(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 日々の記録から確認が必要なサービス計画を取得
     * GET /api/care-documents/v1/review-queue / scope care-documents:read / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1ReviewQueue(args: { facilityId: string; serviceDomain: string; from?: string; to?: string; masterUserId?: string; caseId?: string; cursor?: string; limit?: number }): Promise<unknown>;
    /** 文書テンプレートの一覧
     * GET /api/care-documents/v1/templates / scope care-documents:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: items / 模擬サーバ: 無し (501) */
    getV1Templates(args?: { facilityId?: string }): Promise<unknown>;
    /** 文書テンプレートを 1 件取得
     * GET /api/care-documents/v1/templates/{templateId} / scope care-documents:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: createdAt, documentType, facilityId, fieldMappings, fields, id, isActive, layout, name, organizationId, serviceDomain, templateKey … / 模擬サーバ: 無し (501) */
    getV1TemplatesByTemplateId(args: { templateId: string; facilityId?: string }): Promise<unknown>;
  };
  careManagement: {
    /** 継続アセスメントの契約版・対象・操作能力を確認
     * GET /api/care-management/v1/capabilities / scope care-documents:read / 認証 both / 応答の形あり / 模擬サーバ: 無し (501) */
    getV1Capabilities(args?: { facilityId?: string }): Promise<unknown>;
    /** 同じ処理経路へ手動の候補準備を要求
     * POST /api/care-management/v1/recompute / scope care-documents:ai / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1Recompute(args: { body: unknown; facilityId?: string }): Promise<unknown>;
    /** 対象本人の判断と適用結果を取得
     * GET /api/care-management/v1/review-decisions / scope care-documents:read / 認証 both / 応答の形あり / 模擬サーバ: 無し (501) */
    getV1ReviewDecisions(args: { facilityId?: string; masterUserId: string; serviceDomain?: string; cursor?: string; limit?: number }): Promise<unknown>;
    /** 単一対象の項目判断・途中保存・正式承認
     * POST /api/care-management/v1/review-decisions / scope care-documents:write / 認証 both / 応答の形あり / 模擬サーバ: 無し (501) */
    postV1ReviewDecisions(args: { facilityId?: string; body: unknown }): Promise<unknown>;
    /** 利用者の更新候補と実行状態を一覧
     * GET /api/care-management/v1/review-drafts / scope care-documents:read / 認証 both / 応答の形あり / 模擬サーバ: 無し (501) */
    getV1ReviewDrafts(args: { facilityId?: string; masterUserId: string; serviceDomain?: string; cursor?: string; limit?: number; targetId?: string }): Promise<unknown>;
    /** 候補・固定した根拠・現在の作業本文を取得
     * GET /api/care-management/v1/review-drafts/{id} / scope care-documents:read / 認証 both / 応答の形あり / 模擬サーバ: 無し (501) */
    getV1ReviewDraftsById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 準備処理の状態・不足・失敗を確認
     * GET /api/care-management/v1/runs/{id} / scope care-documents:read / 認証 both / 応答の形あり / 模擬サーバ: 無し (501) */
    getV1RunsById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 再試行可能な準備処理を同じ処理経路へ再登録
     * POST /api/care-management/v1/runs/{id}/retry / scope care-documents:ai / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1RunsByIdRetry(args: { id: string; facilityId?: string; body: unknown }): Promise<unknown>;
    /** 権限のある受領資料を一覧
     * GET /api/care-management/v1/sources / scope care-documents:read / 認証 both / 応答の形あり / 模擬サーバ: 無し (501) */
    getV1Sources(args?: { facilityId?: string; masterUserId?: string; serviceDomain?: string; cursor?: string; limit?: number }): Promise<unknown>;
    /** 保管済み原本または情報源の受領を登録
     * POST /api/care-management/v1/sources/receipts / scope care-documents:write / 認証 both / 応答の形あり / 模擬サーバ: 無し (501) */
    postV1SourcesReceipts(args: { body: unknown; facilityId?: string }): Promise<unknown>;
    /** 確認済み受領資料から自組織の評価の下書きを作成
     * POST /api/care-management/v1/sources/receipts/{id}/local-draft / scope care-documents:write / 認証 both / 応答の形あり / 模擬サーバ: 無し (501) */
    postV1SourcesReceiptsByIdLocalDraft(args: { id: string; facilityId?: string; body: unknown }): Promise<unknown>;
    /** 権限を再確認して受領原本の参照を取得
     * GET /api/care-management/v1/sources/receipts/{id}/original / scope care-documents:read / 認証 both / 応答の形あり / 模擬サーバ: 無し (501) */
    getV1SourcesReceiptsByIdOriginal(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 受領物の本人・抽出内容・原本照合を確認
     * POST /api/care-management/v1/sources/receipts/{id}/verify / scope care-documents:write / 認証 both / 応答の形あり / 模擬サーバ: 無し (501) */
    postV1SourcesReceiptsByIdVerify(args: { id: string; facilityId?: string; body: unknown }): Promise<unknown>;
    /** 受領物を理由付きで撤回
     * POST /api/care-management/v1/sources/receipts/{id}/withdraw / scope care-documents:delete / 認証 both / 応答の形あり / 模擬サーバ: 無し (501) */
    postV1SourcesReceiptsByIdWithdraw(args: { id: string; facilityId?: string; body: unknown }): Promise<unknown>;
    /** 外部資料の原本を保管し受領物を登録
     * POST /api/care-management/v1/sources/receipts/upload / scope care-documents:write / 認証 both / 応答の形あり / 模擬サーバ: 無し (501) */
    postV1SourcesReceiptsUpload(args: { body: unknown; facilityId?: string }): Promise<unknown>;
    /** 表示中の最大 50 人の評価概要を取得
     * POST /api/care-management/v2/assessment-summaries:batch / scope care-documents:read / 認証 both / 応答の形あり / 模擬サーバ: 無し (501) */
    postV2AssessmentSummariesBatch(args: { body: unknown; facilityId?: string }): Promise<unknown>;
    /** 共通アセスメントの契約・操作権限を確認
     * GET /api/care-management/v2/capabilities / scope care-documents:read / 認証 both / facilityId 必須 / 応答の形あり / 模擬サーバ: 無し (501) */
    getV2Capabilities(args: { facilityId: string; serviceDomain?: string; subjectSearch?: string }): Promise<unknown>;
    /** 本人の確認済み評価・更新候補・観察・確認事項を表示
     * GET /api/care-management/v2/persons/{id}/assessment / scope care-documents:read / 認証 both / facilityId 必須 / 応答の形あり / 模擬サーバ: 無し (501) */
    getV2PersonsByIdAssessment(args: { id: string; facilityId: string; serviceDomain?: string; from?: string; to?: string }): Promise<unknown>;
    /** 表示内容と閲覧権の変更を確認
     * GET /api/care-management/v2/persons/{id}/assessment/changes / scope care-documents:read / 認証 both / facilityId 必須 / 応答の形あり / 模擬サーバ: 無し (501) */
    getV2PersonsByIdAssessmentChanges(args: { id: string; facilityId: string; serviceDomain?: string; from?: string; to?: string; cursor: string }): Promise<unknown>;
    /** 登録済みのサービス評価・既存の保存先を確認
     * GET /api/care-management/v2/persons/{id}/targets / scope care-documents:read / 認証 both / facilityId 必須 / 応答の形あり / 模擬サーバ: 無し (501) */
    getV2PersonsByIdTargets(args: { id: string; facilityId: string; serviceDomain?: string; from?: string; to?: string }): Promise<unknown>;
    /** 既存のサービス評価を同じ保存先へ対応付け
     * POST /api/care-management/v2/persons/{id}/targets / scope care-documents:write / 認証 both / facilityId 必須 / 応答の形あり / 模擬サーバ: 無し (501) */
    postV2PersonsByIdTargets(args: { id: string; facilityId: string; serviceDomain?: string; body: unknown }): Promise<unknown>;
    /** 同じ処理経路へ手動の候補準備を要求
     * POST /api/care-management/v2/recompute / scope care-documents:ai / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2Recompute(args: { body: unknown; facilityId?: string }): Promise<unknown>;
    /** 対象本人の判断と適用結果を取得
     * GET /api/care-management/v2/review-decisions / scope care-documents:read / 認証 both / 応答の形あり / 模擬サーバ: 無し (501) */
    getV2ReviewDecisions(args: { facilityId?: string; masterUserId: string; serviceDomain?: string; cursor?: string; limit?: number }): Promise<unknown>;
    /** 単一対象の項目判断・途中保存・正式承認
     * POST /api/care-management/v2/review-decisions / scope care-review-approvals:write / 認証 both / 応答の形あり / 模擬サーバ: 無し (501) */
    postV2ReviewDecisions(args: { facilityId?: string; body: unknown }): Promise<unknown>;
    /** 利用者の更新候補と実行状態を一覧
     * GET /api/care-management/v2/review-drafts / scope care-documents:read / 認証 both / 応答の形あり / 模擬サーバ: 無し (501) */
    getV2ReviewDrafts(args: { facilityId?: string; masterUserId: string; serviceDomain?: string; cursor?: string; limit?: number; targetId?: string }): Promise<unknown>;
    /** 候補・固定した根拠・現在の作業本文を取得
     * GET /api/care-management/v2/review-drafts/{id} / scope care-documents:read / 認証 both / 応答の形あり / 模擬サーバ: 無し (501) */
    getV2ReviewDraftsById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 準備処理の状態・不足・失敗を確認
     * GET /api/care-management/v2/runs/{id} / scope care-documents:read / 認証 both / 応答の形あり / 模擬サーバ: 無し (501) */
    getV2RunsById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 再試行可能な準備処理を同じ処理経路へ再登録
     * POST /api/care-management/v2/runs/{id}/retry / scope care-documents:ai / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2RunsByIdRetry(args: { id: string; facilityId?: string; body: unknown }): Promise<unknown>;
    /** 現在の本人・事業所の計画準備を読み取りだけで再開
     * GET /api/care-management/v2/service-plan-preparations / scope care-documents:read / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2ServicePlanPreparations(args: { facilityId: string; serviceDomain: string; masterUserId?: string }): Promise<unknown>;
    /** 根拠・必要入力・実際に保存された計画案を確認
     * GET /api/care-management/v2/service-plan-preparations/{id} / scope care-documents:read / 認証 both / facilityId 必須 / 応答の形あり / 模擬サーバ: 無し (501) */
    getV2ServicePlanPreparationsById(args: { id: string; facilityId: string; serviceDomain: string; masterUserId?: string }): Promise<unknown>;
    /** 承認済み評価と計画根拠から相談案を取得
     * GET /api/care-management/v2/service-plan-preparations/{id}/consultation-seed / scope care-documents:read / 認証 both / facilityId 必須 / 応答の形あり / 模擬サーバ: 無し (501) */
    getV2ServicePlanPreparationsByIdConsultationSeed(args: { id: string; facilityId: string; serviceDomain: string; masterUserId?: string }): Promise<unknown>;
    /** 現在閲覧できる原記録の本文を確認
     * GET /api/care-management/v2/shared-sources/{kind}/{id} / scope care-documents:read / 認証 both / facilityId 必須 / 応答の形あり / 模擬サーバ: 無し (501) */
    getV2SharedSourcesByKindById(args: { kind: string; id: string; facilityId: string; masterUserId: string; serviceDomain: string; revision?: string; nativeDocumentId?: string; nativeDocumentRevision?: string; definitionKey?: string; caseId?: string }): Promise<unknown>;
    /** 現在共有できる受信先と共有設定の権限を確認
     * GET /api/care-management/v2/shares/options / 認証 both / facilityId 必須 / 応答の形あり / 模擬サーバ: 無し (501) */
    getV2SharesOptions(args: { facilityId: string; masterUserId: string; serviceDomain: string }): Promise<unknown>;
    /** 権限のある受領資料を一覧
     * GET /api/care-management/v2/sources / scope care-documents:read / 認証 both / facilityId 必須 / 応答の形あり / 模擬サーバ: 無し (501) */
    getV2Sources(args: { facilityId: string; masterUserId?: string; serviceDomain: string; cursor?: string; limit?: number; contextId?: string }): Promise<unknown>;
    /** 永続読み取り処理の状態・未処理範囲を確認
     * GET /api/care-management/v2/sources/extraction-jobs/{id} / scope care-documents:read / 認証 both / facilityId 必須 / 応答の形あり / 模擬サーバ: 無し (501) */
    getV2SourcesExtractionJobsById(args: { id: string; facilityId: string; serviceDomain: string; masterUserId?: string }): Promise<unknown>;
    /** 保管済み原本または情報源の受領を登録
     * POST /api/care-management/v2/sources/receipts / scope care-documents:write / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2SourcesReceipts(args: { facilityId: string; serviceDomain: string; masterUserId?: string; contextId?: string; body: unknown }): Promise<unknown>;
    /** 現在の閲覧範囲にある受領資料と版を取得
     * GET /api/care-management/v2/sources/receipts/{id} / scope care-documents:read / 認証 both / facilityId 必須 / 応答の形あり / 模擬サーバ: 無し (501) */
    getV2SourcesReceiptsById(args: { id: string; facilityId: string; serviceDomain: string; masterUserId?: string }): Promise<unknown>;
    /** 版付き比較と消えない判断履歴を取得
     * GET /api/care-management/v2/sources/receipts/{id}/comparisons/{comparisonId} / scope care-documents:read / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2SourcesReceiptsByIdComparisonsByComparisonId(args: { id: string; comparisonId: string; facilityId: string; serviceDomain: string; masterUserId?: string }): Promise<unknown>;
    /** 比較の固定根拠からケアマネへの相談案を取得
     * GET /api/care-management/v2/sources/receipts/{id}/comparisons/{comparisonId}/consultation-seed / scope care-documents:read / 認証 both / facilityId 必須 / 応答の形あり / 模擬サーバ: 無し (501) */
    getV2SourcesReceiptsByIdComparisonsByComparisonIdConsultationSeed(args: { id: string; comparisonId: string; facilityId: string; serviceDomain: string; masterUserId?: string }): Promise<unknown>;
    /** その原本範囲で閲覧できる不変の読み取り結果を取得
     * GET /api/care-management/v2/sources/receipts/{id}/extractions/{extractionId} / scope care-documents:read / 認証 both / facilityId 必須 / 応答の形あり / 模擬サーバ: 無し (501) */
    getV2SourcesReceiptsByIdExtractionsByExtractionId(args: { id: string; extractionId: string; facilityId: string; serviceDomain: string; masterUserId?: string }): Promise<unknown>;
    /** 確認済み受領資料から自組織の評価の下書きを作成
     * POST /api/care-management/v2/sources/receipts/{id}/local-draft / scope care-documents:write / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2SourcesReceiptsByIdLocalDraft(args: { id: string; facilityId: string; serviceDomain: string; masterUserId?: string; contextId?: string; body: unknown }): Promise<unknown>;
    /** 権限を再確認して受領原本の参照を取得
     * GET /api/care-management/v2/sources/receipts/{id}/original / scope care-documents:read / 認証 both / facilityId 必須 / 応答の形あり / 模擬サーバ: 無し (501) */
    getV2SourcesReceiptsByIdOriginal(args: { id: string; facilityId: string; serviceDomain: string; masterUserId?: string; contextId?: string }): Promise<unknown>;
    /** 受領物の本人・抽出内容・原本照合を確認
     * POST /api/care-management/v2/sources/receipts/{id}/verify / scope care-documents:write / 認証 both / facilityId 必須 / 応答の形あり / 模擬サーバ: 無し (501) */
    postV2SourcesReceiptsByIdVerify(args: { id: string; facilityId: string; serviceDomain: string; masterUserId?: string; contextId?: string; body: unknown }): Promise<unknown>;
    /** 受領物を理由付きで撤回
     * POST /api/care-management/v2/sources/receipts/{id}/withdraw / scope care-documents:delete / 認証 both / facilityId 必須 / 応答の形あり / 模擬サーバ: 無し (501) */
    postV2SourcesReceiptsByIdWithdraw(args: { id: string; facilityId: string; serviceDomain: string; masterUserId?: string; contextId?: string; body: unknown }): Promise<unknown>;
    /** 外部資料の原本を保管し受領物を登録
     * POST /api/care-management/v2/sources/receipts/upload / scope care-documents:write / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2SourcesReceiptsUpload(args: { facilityId: string; serviceDomain: string; masterUserId?: string; contextId?: string; body: unknown }): Promise<unknown>;
    /** 職員が確認して同じサービス評価へ正式反映
     * POST /api/care-management/v2/targets/{id}/approvals / scope care-review-approvals:write / 認証 both / facilityId 必須 / 応答の形あり / 模擬サーバ: 無し (501) */
    postV2TargetsByIdApprovals(args: { id: string; facilityId: string; serviceDomain?: string; body: unknown }): Promise<unknown>;
    /** サービス評価の正式本文・作成中の本文・版を比較
     * GET /api/care-management/v2/targets/{id}/working / scope care-documents:read / 認証 both / facilityId 必須 / 応答の形あり / 模擬サーバ: 無し (501) */
    getV2TargetsByIdWorking(args: { id: string; facilityId: string; serviceDomain?: string }): Promise<unknown>;
    /** 同じサービス評価へ職員の作業内容を保存
     * PUT /api/care-management/v2/targets/{id}/working / scope care-documents:write / 認証 both / facilityId 必須 / 応答の形あり / 模擬サーバ: 無し (501) */
    putV2TargetsByIdWorking(args: { id: string; facilityId: string; serviceDomain?: string; body: unknown }): Promise<unknown>;
  };
  careRecords: {
    /** 記録に関する質問を AI に投げる (記録本文を材料にする)
     * POST /api/care-records/v1/ask / scope help:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1Ask(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 添付画像の中身 (GCS から都度読み出す)
     * GET /api/care-records/v1/attachments/{attachmentId}/content / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1AttachmentsByAttachmentIdContent(args: { attachmentId: string; facilityId?: string }): Promise<unknown>;
    /** 記録をまとめて保存 (quick-records と同じ)
     * POST /api/care-records/v1/batch-records / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1BatchRecords(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 記録アプリの起動情報 (事業所・記録定義・機能の可否)
     * GET /api/care-records/v1/bootstrap / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1Bootstrap(args?: { facilityId?: string }): Promise<unknown>;
    /** 来所時バイタルを記録
     * POST /api/care-records/v1/day-service/arrival-vitals / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1DayServiceArrivalVitals(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 通所の出席状況 (日付ごと)
     * GET /api/care-records/v1/day-service/attendance / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1DayServiceAttendance(args?: { facilityId?: string }): Promise<unknown>;
    /** 水分の記録を対象者にまとめて保存
     * POST /api/care-records/v1/day-service/batch-fluid / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1DayServiceBatchFluid(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 食事の記録を対象者にまとめて保存
     * POST /api/care-records/v1/day-service/batch-meal / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1DayServiceBatchMeal(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** おやつの記録を対象者にまとめて保存
     * POST /api/care-records/v1/day-service/batch-snack / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1DayServiceBatchSnack(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 記録時刻のずれ (UTC 切り出し) を直す保守処理
     * POST /api/care-records/v1/maintenance/record-time-fix / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1MaintenanceRecordTimeFix(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 測定値の二重保存の移行状況 (件数)
     * GET /api/care-records/v1/measurement-migration / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1MeasurementMigration(args?: { facilityId?: string }): Promise<unknown>;
    /** 測定値の二重保存を CareRecord 側へ移行する
     * POST /api/care-records/v1/measurement-migration / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1MeasurementMigration(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 測定値 (バイタル・体重など) の一覧
     * GET /api/care-records/v1/measurements / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1Measurements(args?: { facilityId?: string }): Promise<unknown>;
    /** 測定値を保存
     * POST /api/care-records/v1/measurements / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1Measurements(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 測定値を削除
     * DELETE /api/care-records/v1/measurements/{recordId} / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteV1MeasurementsByRecordId(args: { recordId: string; facilityId?: string }): Promise<unknown>;
    /** 記録をまとめて保存 (クイック記録。1 件でも配列でも)
     * POST /api/care-records/v1/quick-records / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1QuickRecords(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 記録の利用者キー (不変 ID / 被保険者番号) の付き方を診断
     * GET /api/care-records/v1/record-key-diagnosis / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1RecordKeyDiagnosis(args?: { facilityId?: string }): Promise<unknown>;
    /** 記録の種類 (事業所ごとの定義)
     * GET /api/care-records/v1/record-types / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1RecordTypes(args?: { facilityId?: string }): Promise<unknown>;
    /** 記録の種類を保存
     * PUT /api/care-records/v1/record-types / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putV1RecordTypes(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 記録の種類を既定に戻す
     * DELETE /api/care-records/v1/record-types / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteV1RecordTypes(args?: { facilityId?: string }): Promise<unknown>;
    /** 記録の一覧 (利用者・種類・期間で絞る)
     * GET /api/care-records/v1/records / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1Records(args?: { includeVoided?: boolean; facilityId?: string }): Promise<unknown>;
    /** 記録を 1 件保存
     * POST /api/care-records/v1/records / scope care-records:write / 認証 none / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1Records(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** (フル編集)
     * PUT /api/care-records/v1/records/{id} / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putV1RecordsById(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 記録を取消 (物理削除せず voided にする)
     * DELETE /api/care-records/v1/records/{id} / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteV1RecordsById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 未分類の記録を利用者に分類する
     * POST /api/care-records/v1/records/{id}/classify / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1RecordsByIdClassify(args: { id: string; body: unknown; facilityId?: string }): Promise<unknown>;
    /** recordTypes 更新
     * PATCH /api/care-records/v1/records/{id}/flags / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    patchV1RecordsByIdFlags(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 重要度更新
     * PATCH /api/care-records/v1/records/{id}/importance / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    patchV1RecordsByIdImportance(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 記録の取消を戻す (voided → draft)
     * POST /api/care-records/v1/records/{id}/unvoid / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1RecordsByIdUnvoid(args: { id: string; body: unknown; facilityId?: string }): Promise<unknown>;
    /** 記録の添付一覧 (署名 URL は返さない)
     * GET /api/care-records/v1/records/{recordId}/attachments / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1RecordsByRecordIdAttachments(args: { recordId: string; facilityId?: string }): Promise<unknown>;
    /** 記録に写真を添付 (base64 JSON)
     * POST /api/care-records/v1/records/{recordId}/photos / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1RecordsByRecordIdPhotos(args: { recordId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 全件 (today/yesterday/week 等)
     * GET /api/care-records/v1/records/all / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1RecordsAll(args?: { facilityId?: string }): Promise<unknown>;
    /** オフラインで蓄積した op をまとめて送信。1 件失敗しても全体は継続し、 各 op に { clientOpId, ok, result?, error? } を返す。
     * POST /api/care-records/v1/records/batch-sync / scope care-records:sync / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1RecordsBatchSync(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** users + recordTypes + visitFields + configVersion
     * GET /api/care-records/v1/records/bootstrap / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1RecordsBootstrap(args?: { facilityId?: string }): Promise<unknown>;
    /** 旧 GAS 関数名互換 dispatch
     * POST /api/care-records/v1/records/gas-compatible/run / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1RecordsGasCompatibleRun(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** AppData に残る旧記録を CareRecord へ取り込む
     * POST /api/care-records/v1/records/import-from-app-data / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1RecordsImportFromAppData(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** AppData → CareRecord の移行を実行
     * POST /api/care-records/v1/records/migrate-from-app-data / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1RecordsMigrateFromAppData(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** AppData → CareRecord の移行結果を検証 (件数の突合)
     * GET /api/care-records/v1/records/migrate-from-app-data/verify / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1RecordsMigrateFromAppDataVerify(args?: { facilityId?: string }): Promise<unknown>;
    /** 写真アップロード (base64 JSON)
     * POST /api/care-records/v1/records/photos / scope care-records:photo:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1RecordsPhotos(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 疎通確認
     * GET /api/care-records/v1/records/ping / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1RecordsPing(args?: { facilityId?: string }): Promise<unknown>;
    /** 記録タイプ一覧
     * GET /api/care-records/v1/records/record-types / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1RecordsRecordTypes(args?: { facilityId?: string }): Promise<unknown>;
    /** 差分同期 (since 以降の更新を updatedAt 順にページで返す。取消・削除は removed[])
     * GET /api/care-records/v1/records/updates / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1RecordsUpdates(args?: { facilityId?: string; since?: string; limit?: number; cursor?: string }): Promise<unknown>;
    /** 利用者一覧 (master + assignment)
     * GET /api/care-records/v1/records/users / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1RecordsUsers(args?: { facilityId?: string }): Promise<unknown>;
    /** 利用者の重要事項 (旧パス)
     * GET /api/care-records/v1/records/users/{insuredNumber}/important-matters / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1RecordsUsersByInsuredNumberImportantMatters(args: { insuredNumber: string; facilityId?: string }): Promise<unknown>;
    /** 利用者の重要事項を追加 (旧パス)
     * POST /api/care-records/v1/records/users/{insuredNumber}/important-matters / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1RecordsUsersByInsuredNumberImportantMatters(args: { insuredNumber: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 利用者の記録用プロフィール (記録画面に出す情報)
     * GET /api/care-records/v1/records/users/{insuredNumber}/info / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1RecordsUsersByInsuredNumberInfo(args: { insuredNumber: string; facilityId?: string }): Promise<unknown>;
    /** 利用者の記録用プロフィールを保存
     * PUT /api/care-records/v1/records/users/{insuredNumber}/info / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putV1RecordsUsersByInsuredNumberInfo(args: { insuredNumber: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 事業所の利用者全員の記録用プロフィール
     * GET /api/care-records/v1/records/users/info/all / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1RecordsUsersInfoAll(args?: { facilityId?: string }): Promise<unknown>;
    /** 訪問記録テンプレート
     * GET /api/care-records/v1/records/visit-record-fields / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1RecordsVisitRecordFields(args?: { facilityId?: string }): Promise<unknown>;
    /** 訪問記録の入力フォーム定義 (端末アプリが描画する)
     * GET /api/care-records/v1/records/visit-record-form / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1RecordsVisitRecordForm(args?: { facilityId?: string }): Promise<unknown>;
    /** 利用者の重要事項 (アレルギー・注意点など)
     * GET /api/care-records/v1/users/{insured}/important-matters / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1UsersByInsuredImportantMatters(args: { insured: string; facilityId?: string }): Promise<unknown>;
    /** 利用者の重要事項を追加
     * POST /api/care-records/v1/users/{insured}/important-matters / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1UsersByInsuredImportantMatters(args: { insured: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 重要事項を非表示にする
     * PATCH /api/care-records/v1/users/{insured}/important-matters/{matterId}/hide / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    patchV1UsersByInsuredImportantMattersByMatterIdHide(args: { insured: string; matterId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 訪問介護のケア項目 (事業所ごとの設定)
     * GET /api/care-records/v1/visit-care/care-items / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1VisitCareCareItems(args?: { facilityId?: string }): Promise<unknown>;
    /** 訪問介護のケア項目を保存
     * PUT /api/care-records/v1/visit-care/care-items / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putV1VisitCareCareItems(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 訪問介護のケア項目を既定に戻す
     * DELETE /api/care-records/v1/visit-care/care-items / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteV1VisitCareCareItems(args?: { facilityId?: string }): Promise<unknown>;
    /** 訪問看護記録の一覧
     * GET /api/care-records/v1/visit-nursing/records / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1VisitNursingRecords(args?: { facilityId?: string }): Promise<unknown>;
    /** 訪問看護記録を保存
     * POST /api/care-records/v1/visit-nursing/records / scope care-records:write / 認証 none / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1VisitNursingRecords(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 訪問看護記録を Excel で出力
     * GET /api/care-records/v1/visit-nursing/records/{id}/export.xlsx / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1VisitNursingRecordsByIdExportXlsx(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 訪問看護記録の印刷用 HTML
     * GET /api/care-records/v1/visit-nursing/records/{id}/print / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1VisitNursingRecordsByIdPrint(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 訪問看護記録のテンプレート一覧
     * GET /api/care-records/v1/visit-nursing/templates / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1VisitNursingTemplates(args?: { facilityId?: string }): Promise<unknown>;
  };
  careScheduleExceptions: {
    /** 予定の例外 (休み・振替) の一覧
     * GET /api/care-schedule-exceptions / scope care-schedule-exceptions:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: items / 模擬サーバ: 無し (501) */
    get(args?: { facilityId?: string }): Promise<unknown>;
    /** 予定の例外を登録
     * POST /api/care-schedule-exceptions / scope care-schedule-exceptions:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    post(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 予定の例外を 1 件取得
     * GET /api/care-schedule-exceptions/{id} / scope care-schedule-exceptions:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 予定の例外を更新
     * PUT /api/care-schedule-exceptions/{id} / scope care-schedule-exceptions:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putById(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 予定の例外を削除 (管理操作)
     * DELETE /api/care-schedule-exceptions/{id} / scope care-schedule-exceptions:delete / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 予定の例外を取消
     * POST /api/care-schedule-exceptions/{id}/void / scope care-schedule-exceptions:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByIdVoid(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  careSchedules: {
    /** ケアスケジュール (基本予定) の一覧
     * GET /api/care-schedules / scope care-schedules:read / 認証 both / facilityId 必須 / 実測 200 (2026-09-27) 応答の項目: items / 模擬サーバ: 無し (501) */
    get(args: { facilityId: string; insuredNumber?: string; serviceDomain?: string; serviceType?: string; status?: string; activeOn?: string; limit?: number }): Promise<unknown>;
    /** ケアスケジュールを登録
     * POST /api/care-schedules / scope care-schedules:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    post(args: { body: unknown; facilityId?: string }): Promise<unknown>;
    /** ケアスケジュールを 1 件
     * GET /api/care-schedules/{id} / scope care-schedules:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** ケアスケジュールを更新
     * PUT /api/care-schedules/{id} / scope care-schedules:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putById(args: { id: string; body: unknown; facilityId?: string }): Promise<unknown>;
    /** ケアスケジュールを削除
     * DELETE /api/care-schedules/{id} / scope care-schedules:delete / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** スケジュールを取りやめる
     * POST /api/care-schedules/{id}/cancel / scope care-schedules:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByIdCancel(args: { id: string; body: unknown; facilityId?: string }): Promise<unknown>;
    /** スケジュールからサービス実績を起こす
     * POST /api/care-schedules/{id}/create-actual / scope care-schedules:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByIdCreateActual(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 取りやめたスケジュールを再開
     * POST /api/care-schedules/{id}/reactivate / scope care-schedules:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByIdReactivate(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ケアスケジュールをまとめて登録 (all-or-nothing / partial)
     * POST /api/care-schedules/batch / scope care-schedules:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postBatch(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 担当者・時間の重なりを検査 (保存しない)
     * POST /api/care-schedules/check-conflicts / scope care-schedules:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postCheckConflicts(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ケアスケジュールを期間に展開した発生日 (最大 90 日)
     * GET /api/care-schedules/occurrences / scope care-schedules:read / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 400 (2026-09-27) パラメータが要る: dateFrom / dateTo (YYYY-MM-DD) が必要です / 模擬サーバ: あり */
    getOccurrences(args: { facilityId: string; dateFrom: string; dateTo: string; insuredNumber?: string; staffId?: string; assignedStaffId?: string; serviceDomain?: string; includeSkipped?: boolean }): Promise<unknown>;
    /** 基本スケジュールと実績の突合 (予定どおりか)
     * GET /api/care-schedules/reconciliation / scope care-schedules:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: date, items, unscheduledActuals / 模擬サーバ: 無し (501) */
    getReconciliation(args?: { facilityId?: string }): Promise<unknown>;
    /** 今日 (指定日) の予定
     * GET /api/care-schedules/today / scope care-schedules:read / 認証 both / facilityId 必須 / 実測 200 (2026-09-27) 応答の項目: date, items / 模擬サーバ: 無し (501) */
    getToday(args: { facilityId: string; date?: string; insuredNumber?: string; serviceDomain?: string }): Promise<unknown>;
  };
  careServiceActuals: {
    /** サービス実績の一覧 (事業所・月・利用者で絞る)
     * GET /api/care-service-actuals/v1 / scope care-service-actuals:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: items / 模擬サーバ: あり */
    getV1(args?: { facilityId?: string }): Promise<unknown>;
    /** サービス実績を手入力で作成
     * POST /api/care-service-actuals/v1 / scope care-service-actuals:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** サービス実績を 1 件取得
     * GET /api/care-service-actuals/v1/{id} / scope care-service-actuals:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getV1ById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** サービス実績を更新
     * PUT /api/care-service-actuals/v1/{id} / scope care-service-actuals:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putV1ById(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** サービス実績を削除 (管理操作)
     * DELETE /api/care-service-actuals/v1/{id} / scope care-service-actuals:delete / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteV1ById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** サービス実績を承認 (バックオフィス)
     * POST /api/care-service-actuals/v1/{id}/approve / scope care-service-actuals:approve / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ByIdApprove(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 提出済みの実績を差し戻して編集可能にする
     * POST /api/care-service-actuals/v1/{id}/reopen / scope care-service-actuals:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ByIdReopen(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** サービス実績を提出 (確認待ちへ)
     * POST /api/care-service-actuals/v1/{id}/submit / scope care-service-actuals:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ByIdSubmit(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** サービス実績を無効にする
     * POST /api/care-service-actuals/v1/{id}/void / scope care-service-actuals:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ByIdVoid(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 期間内のアプリ記録から実績を一括生成
     * POST /api/care-service-actuals/v1/bulk-from-app-data / scope care-service-actuals:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1BulkFromAppData(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** since 以降に実績・予定・例外が更新された利用者 (件数と最終更新時刻のみ。日次タスクの差分検出用)
     * GET /api/care-service-actuals/v1/changed-persons / scope care-service-actuals:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1ChangedPersons(args: { since: string; facilityId?: string; serviceDomain?: string; limit?: number; cursor?: string }): Promise<unknown>;
    /** アプリの記録 1 件から実績を生成・更新
     * POST /api/care-service-actuals/v1/from-app-data / scope care-service-actuals:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1FromAppData(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 予定から空の実績を作る
     * POST /api/care-service-actuals/v1/from-schedule / scope care-service-actuals:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1FromSchedule(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 確定済みの記録を実績に入れ直す (下見 → 実行。管理者のセッションのみ)
     * POST /api/care-service-actuals/v1/maintenance/project-care-records / scope care-service-actuals:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1MaintenanceProjectCareRecords(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 月次の実績指標 (運営会議用。事業所・月で集計)
     * GET /api/care-service-actuals/v1/metrics / scope care-service-actuals:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: dateFrom, dateTo, facilityId, metrics, month, ok / 模擬サーバ: 無し (501) */
    getV1Metrics(args?: { facilityId?: string }): Promise<unknown>;
    /** 月次の実績指標を CSV で (人事考課アプリの月次KPI取込用。事業所・月が必須)
     * GET /api/care-service-actuals/v1/metrics.csv / scope care-service-actuals:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1MetricsCsv(args?: { facilityId?: string }): Promise<unknown>;
    /** 月の固定基準の一覧 (事業所 × 月。候補・採用・置き換え済みの全版。凍結した発生枠と単位を含む。氏名は返さない)
     * GET /api/care-service-actuals/v1/monthly-baselines / scope care-service-actuals:read / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1MonthlyBaselines(args: { facilityId: string; serviceMonth: string; serviceDomain?: string; insuredNumber?: string; state?: string }): Promise<unknown>;
    /** 月次締めの状況 (件数のみ。確定はしない)
     * GET /api/care-service-actuals/v1/monthly-close / scope care-service-actuals:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 400 (2026-09-27) パラメータが要る: serviceMonth (YYYY-MM) が必要です / 模擬サーバ: 無し (501) */
    getV1MonthlyClose(args?: { facilityId?: string }): Promise<unknown>;
    /** 一人一か月の月次比較 (利用者 × 保険区分 × 基準日。当初・改訂後予定、確定実績、未確認、中止、臨時、未来を別々に数える。金額・氏名は返さない)
     * GET /api/care-service-actuals/v1/monthly-comparison / scope care-service-actuals:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1MonthlyComparison(args: { facilityId?: string; serviceMonth: string; serviceDomain?: string; asOf?: string; tz?: string; insuredNumber?: string; includeDays?: boolean; contract?: string; baselineId?: string }): Promise<unknown>;
    /** 日次管理ボード (予定と実績の突合。金額・氏名は返さない)
     * GET /api/care-service-actuals/v1/operations-board / scope care-service-actuals:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 400 (2026-09-27) パラメータが要る: date (YYYY-MM-DD) が必要です / 模擬サーバ: 無し (501) */
    getV1OperationsBoard(args?: { facilityId?: string }): Promise<unknown>;
  };
  careTasks: {
    /** 利用者の「やること・見ること」の一覧 (事業所と利用者を指定。終了も含む)
     * GET /api/care-tasks/v1 / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1(args?: { facilityId?: string }): Promise<unknown>;
    /** 1 件作る
     * POST /api/care-tasks/v1 / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 名前・種類・やり方・必須・並び順を直す / 終了・再開 (削除の口は無い)
     * PATCH /api/care-tasks/v1/{id} / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    patchV1ById(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  chat: {
    /** Google Chat アプリのイベント受け口 (Google の署名付き JWT で検証)
     * POST /api/chat/google / 認証 none / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postGoogle(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  device: {
    /** 音声メモジョブの一覧
     * GET /api/device/audio-notes/v1 / scope audio-notes:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getAudioNotesV1(args?: { facilityId?: string }): Promise<unknown>;
    /** 音声メモの文字起こしジョブを作る
     * POST /api/device/audio-notes/v1 / scope audio-notes:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postAudioNotesV1(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 1 件
     * GET /api/device/audio-notes/v1/{id} / scope audio-notes:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getAudioNotesV1ById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 取り消す (音声は破棄)
     * POST /api/device/audio-notes/v1/{id}/cancel / scope audio-notes:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postAudioNotesV1ByIdCancel(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** **1 件だけ**文字起こしして記録にする
     * POST /api/device/audio-notes/v1/{id}/run / scope audio-notes:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postAudioNotesV1ByIdRun(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 音声の置き場を取る → uploadId
     * POST /api/device/audio-notes/v1/uploads / scope audio-notes:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postAudioNotesV1Uploads(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 4MB ずつ送る (順不同・再送可)
     * POST /api/device/audio-notes/v1/uploads/{uploadId}/parts / scope audio-notes:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postAudioNotesV1UploadsByUploadIdParts(args: { uploadId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** /ping
     * GET /api/device/ping / 認証 both / 実測 200 (2026-09-27) 応答の項目: appId, ok, scopes, serverTime, tokenId / 模擬サーバ: 無し (501) */
    getPing(args?: { facilityId?: string }): Promise<unknown>;
    /** (フル編集)
     * PUT /api/device/records/{id} / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putRecordsById(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 記録を取消 (物理削除せず voided にする)
     * DELETE /api/device/records/{id} / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteRecordsById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 未分類の記録を利用者に分類する
     * POST /api/device/records/{id}/classify / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postRecordsByIdClassify(args: { id: string; body: unknown; facilityId?: string }): Promise<unknown>;
    /** recordTypes 更新
     * PATCH /api/device/records/{id}/flags / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    patchRecordsByIdFlags(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 重要度更新
     * PATCH /api/device/records/{id}/importance / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    patchRecordsByIdImportance(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 記録の取消を戻す (voided → draft)
     * POST /api/device/records/{id}/unvoid / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postRecordsByIdUnvoid(args: { id: string; body: unknown; facilityId?: string }): Promise<unknown>;
    /** 全件 (today/yesterday/week 等)
     * GET /api/device/records/all / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getRecordsAll(args?: { facilityId?: string }): Promise<unknown>;
    /** AI 質問
     * POST /api/device/records/ask / scope care-records:ask-ai / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postRecordsAsk(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** オフラインで蓄積した op をまとめて送信。1 件失敗しても全体は継続し、 各 op に { clientOpId, ok, result?, error? } を返す。
     * POST /api/device/records/batch-sync / scope care-records:sync / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postRecordsBatchSync(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** users + recordTypes + visitFields + configVersion
     * GET /api/device/records/bootstrap / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getRecordsBootstrap(args?: { facilityId?: string }): Promise<unknown>;
    /** 旧 GAS 関数名互換 dispatch
     * POST /api/device/records/gas-compatible/run / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postRecordsGasCompatibleRun(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** アプリの訪問記録 (AppData) を CareRecord に一括取込 (冪等)
     * POST /api/device/records/import-from-app-data / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postRecordsImportFromAppData(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** AppData の訪問記録を CareRecord へ移行 (既定は dry-run)
     * POST /api/device/records/migrate-from-app-data / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postRecordsMigrateFromAppData(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** AppData と CareRecord の一致を検証 (非破壊)
     * GET /api/device/records/migrate-from-app-data/verify / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getRecordsMigrateFromAppDataVerify(args?: { facilityId?: string }): Promise<unknown>;
    /** 写真アップロード (base64 JSON)
     * POST /api/device/records/photos / scope care-records:photo:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postRecordsPhotos(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 疎通確認 (認証とスコープが通るか)
     * GET /api/device/records/ping / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getRecordsPing(args?: { facilityId?: string }): Promise<unknown>;
    /** 記録タイプ一覧
     * GET /api/device/records/record-types / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getRecordsRecordTypes(args?: { facilityId?: string }): Promise<unknown>;
    /** 利用者一覧 (master + assignment)
     * GET /api/device/records/users / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getRecordsUsers(args?: { facilityId?: string }): Promise<unknown>;
    /** 利用者の重要事項の一覧
     * GET /api/device/records/users/{insuredNumber}/important-matters / scope care-records:important:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getRecordsUsersByInsuredNumberImportantMatters(args: { insuredNumber: string; facilityId?: string }): Promise<unknown>;
    /** 利用者の重要事項を追加
     * POST /api/device/records/users/{insuredNumber}/important-matters / scope care-records:important:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postRecordsUsersByInsuredNumberImportantMatters(args: { insuredNumber: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 利用者の基本情報 (マスタ + 追加項目)
     * GET /api/device/records/users/{insuredNumber}/info / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getRecordsUsersByInsuredNumberInfo(args: { insuredNumber: string; facilityId?: string }): Promise<unknown>;
    /** 利用者の基本情報を更新
     * PUT /api/device/records/users/{insuredNumber}/info / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putRecordsUsersByInsuredNumberInfo(args: { insuredNumber: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 事業所の全利用者の基本情報
     * GET /api/device/records/users/info/all / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getRecordsUsersInfoAll(args?: { facilityId?: string }): Promise<unknown>;
    /** 訪問記録テンプレート
     * GET /api/device/records/visit-record-fields / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getRecordsVisitRecordFields(args?: { facilityId?: string }): Promise<unknown>;
    /** 訪問記録の入力項目 (事業所の届出種別から CPOS が決める)
     * GET /api/device/records/visit-record-form / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getRecordsVisitRecordForm(args?: { facilityId?: string }): Promise<unknown>;
    /** デバイス API: releasesの取得 (releases)
     * GET /api/device/releases / 認証 both / 実測 200 (2026-09-27) 応答の項目: appId, ok, releases / 模擬サーバ: 無し (501) */
    getReleases(args?: { facilityId?: string }): Promise<unknown>;
    /** デバイス API: latestの取得 (releases/latest)
     * GET /api/device/releases/latest / 認証 both / 実測 200 (2026-09-27) 応答の項目: appId, latest, ok, updateAvailable, updateRequired / 模擬サーバ: 無し (501) */
    getReleasesLatest(args?: { facilityId?: string }): Promise<unknown>;
  };
  facilities: {
    /** 事業所の一覧
     * GET /api/facilities / scope facilities:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: address, areaGrade, businessNumber, careplanFiling, createdAt, facilityCategoryCode, fax, id, isActive, name, nameKana, organizationId … / 模擬サーバ: 無し (501) */
    get(args?: { activeOnly?: boolean; includeClosed?: boolean; facilityId?: string }): Promise<unknown>;
    /** 事業所を登録
     * POST /api/facilities / scope facilities:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    post(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 入浴予定の一覧
     * GET /api/facilities/{facilityId}/bath-schedule / scope facility-modules:write / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getByFacilityIdBathSchedule(args: { facilityId: string }): Promise<unknown>;
    /** 入浴予定を 1 週分
     * GET /api/facilities/{facilityId}/bath-schedule/{weekStart} / scope facilities:read / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getByFacilityIdBathScheduleByWeekStart(args: { facilityId: string; weekStart: string }): Promise<unknown>;
    /** 入浴予定を保存
     * PUT /api/facilities/{facilityId}/bath-schedule/{weekStart} / scope facility-modules:write / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putByFacilityIdBathScheduleByWeekStart(args: { facilityId: string; weekStart: string; body?: unknown }): Promise<unknown>;
    /** 入浴予定を削除
     * DELETE /api/facilities/{facilityId}/bath-schedule/{weekStart} / scope facility-modules:write / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteByFacilityIdBathScheduleByWeekStart(args: { facilityId: string; weekStart: string }): Promise<unknown>;
    /** 業務日誌の一覧
     * GET /api/facilities/{facilityId}/business-diary / scope facility-users:import / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getByFacilityIdBusinessDiary(args: { facilityId: string }): Promise<unknown>;
    /** 業務日誌を 1 日分
     * GET /api/facilities/{facilityId}/business-diary/{date} / scope facilities:read / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getByFacilityIdBusinessDiaryByDate(args: { facilityId: string; date: string }): Promise<unknown>;
    /** upsert
     * PUT /api/facilities/{facilityId}/business-diary/{date} / scope facility-modules:write / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putByFacilityIdBusinessDiaryByDate(args: { facilityId: string; date: string; body?: unknown }): Promise<unknown>;
    /** 業務日誌を削除
     * DELETE /api/facilities/{facilityId}/business-diary/{date} / scope facility-modules:write / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteByFacilityIdBusinessDiaryByDate(args: { facilityId: string; date: string }): Promise<unknown>;
    /** 業務日誌を確定
     * POST /api/facilities/{facilityId}/business-diary/{date}/finalize / scope facility-modules:write / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByFacilityIdBusinessDiaryByDateFinalize(args: { facilityId: string; date: string; body?: unknown }): Promise<unknown>;
    /** 利用者と担当ケアマネの紐付け一覧
     * GET /api/facilities/{facilityId}/care-manager-links / scope facility-users:read / 認証 both / facilityId 必須 / 実測 200 (2026-09-27) 応答の項目: careManagerCount, includedAllProfessions, items, ok, summary / 模擬サーバ: 無し (501) */
    getByFacilityIdCareManagerLinks(args: { facilityId: string }): Promise<unknown>;
    /** 利用者と担当ケアマネの紐付けを反映
     * POST /api/facilities/{facilityId}/care-manager-links/apply / scope facility-users:write / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByFacilityIdCareManagerLinksApply(args: { facilityId: string; body?: unknown }): Promise<unknown>;
    /** date = YYYY-MM-DD
     * GET /api/facilities/{facilityId}/handover/{date} / scope facility-handover:read / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getByFacilityIdHandoverByDate(args: { facilityId: string; date: string }): Promise<unknown>;
    /** 申し送りを Google ドキュメントに書き出す
     * POST /api/facilities/{facilityId}/handover/{date}/export-doc / scope facility-handover:write / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByFacilityIdHandoverByDateExportDoc(args: { facilityId: string; date: string; body?: unknown }): Promise<unknown>;
    /** 申し送りの記録を外部から差し込む (トリガー用。共有秘密で認証)
     * POST /api/facilities/{facilityId}/handover/{date}/records / scope facility-modules:write / 認証 none / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByFacilityIdHandoverByDateRecords(args: { facilityId: string; date: string; body?: unknown }): Promise<unknown>;
    /** body { content }
     * PATCH /api/facilities/{facilityId}/handover/{date}/records/{recordId} / scope facility-handover:write / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    patchByFacilityIdHandoverByDateRecordsByRecordId(args: { facilityId: string; date: string; recordId: string; body?: unknown }): Promise<unknown>;
    /** 申し送りの記録を 1 件消す
     * DELETE /api/facilities/{facilityId}/handover/{date}/records/{recordId} / scope facility-handover:write / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteByFacilityIdHandoverByDateRecordsByRecordId(args: { facilityId: string; date: string; recordId: string }): Promise<unknown>;
    /** 受付 (インテーク) の一覧
     * GET /api/facilities/{facilityId}/intakes / scope facility-intakes:read / 認証 both / facilityId 必須 / 実測 200 (2026-09-27) 応答の項目: count, items / 模擬サーバ: 無し (501) */
    getByFacilityIdIntakes(args: { facilityId: string }): Promise<unknown>;
    /** 受付を登録
     * POST /api/facilities/{facilityId}/intakes / scope facility-intakes:write / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByFacilityIdIntakes(args: { facilityId: string; body?: unknown }): Promise<unknown>;
    /** 受付を 1 件
     * GET /api/facilities/{facilityId}/intakes/{id} / scope facility-intakes:read / 認証 both / facilityId 必須 / 実測 200 (2026-09-27) 応答の項目: convertedAt, createdAt, createdBy, createdByName, createdMasterUserInsuredNumber, facilityId, firstVisitPlannedAt, id, linkedInsuredNumber, organizationId, receivedAt, rejectedAt … / 模擬サーバ: 無し (501) */
    getByFacilityIdIntakesById(args: { facilityId: string; id: string }): Promise<unknown>;
    /** 受付を更新
     * PUT /api/facilities/{facilityId}/intakes/{id} / scope facility-intakes:write / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putByFacilityIdIntakesById(args: { facilityId: string; id: string; body?: unknown }): Promise<unknown>;
    /** 受付を削除
     * DELETE /api/facilities/{facilityId}/intakes/{id} / scope facility-intakes:delete / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteByFacilityIdIntakesById(args: { facilityId: string; id: string }): Promise<unknown>;
    /** 受付を利用者マスタに起こす
     * POST /api/facilities/{facilityId}/intakes/{id}/convert-to-master-user / scope facility-intakes:write / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByFacilityIdIntakesByIdConvertToMasterUser(args: { facilityId: string; id: string; body?: unknown }): Promise<unknown>;
    /** 受付を差し戻す
     * POST /api/facilities/{facilityId}/intakes/{id}/reject / scope facility-intakes:write / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByFacilityIdIntakesByIdReject(args: { facilityId: string; id: string; body?: unknown }): Promise<unknown>;
    /** 受付を提出
     * POST /api/facilities/{facilityId}/intakes/{id}/submit / scope facility-intakes:write / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByFacilityIdIntakesByIdSubmit(args: { facilityId: string; id: string; body?: unknown }): Promise<unknown>;
    /** 受付を別の事業所へ回す
     * POST /api/facilities/{facilityId}/intakes/{id}/transfer / scope facility-intakes:write / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByFacilityIdIntakesByIdTransfer(args: { facilityId: string; id: string; body?: unknown }): Promise<unknown>;
    /** 利用者化済みの受付を別の事業所へ回す
     * POST /api/facilities/{facilityId}/intakes/{id}/transfer-converted / scope facility-intakes:write / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByFacilityIdIntakesByIdTransferConverted(args: { facilityId: string; id: string; body?: unknown }): Promise<unknown>;
    /** 受付フォームの事前入力値 (既存マスタから)
     * GET /api/facilities/{facilityId}/intakes/prefill / scope facility-intakes:read / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 400 (2026-09-27) パラメータが要る: templateId が必要です / 模擬サーバ: 無し (501) */
    getByFacilityIdIntakesPrefill(args: { facilityId: string }): Promise<unknown>;
    /** 受付をまとめて別の事業所へ回す
     * POST /api/facilities/{facilityId}/intakes/transfer-bulk / scope facility-intakes:write / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByFacilityIdIntakesTransferBulk(args: { facilityId: string; body?: unknown }): Promise<unknown>;
    /** 施設モジュール ON/OFF + 設定
     * GET /api/facilities/{facilityId}/modules / scope facility-modules:read / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getByFacilityIdModules(args: { facilityId: string }): Promise<unknown>;
    /** 更新
     * PUT /api/facilities/{facilityId}/modules / scope facility-modules:write / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putByFacilityIdModules(args: { facilityId: string; body?: unknown }): Promise<unknown>;
    /** 事業所のスプレッドシートから取り込む
     * POST /api/facilities/{facilityId}/spreadsheet-import / scope spreadsheet-import:write / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByFacilityIdSpreadsheetImport(args: { facilityId: string; body?: unknown }): Promise<unknown>;
    /** 事業所の職員一覧
     * GET /api/facilities/{facilityId}/staff / scope facility-staff:read / 認証 both / facilityId 必須 / 実測 200 (2026-09-27) 応答の項目: items, staff / 模擬サーバ: あり */
    getByFacilityIdStaff(args: { facilityId: string }): Promise<unknown>;
    /** 職員を登録
     * POST /api/facilities/{facilityId}/staff / scope facility-staff:write / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByFacilityIdStaff(args: { facilityId: string; body?: unknown }): Promise<unknown>;
    /** 職員を 1 件
     * GET /api/facilities/{facilityId}/staff/{id} / scope facility-staff:read / 認証 both / facilityId 必須 / 実測 200 (2026-09-27) 応答の項目: aliases, createdAt, createdBy, displayName, displayOrder, email, employeeId, facilityId, id, name, nameKana, normalizedNameKey … / 模擬サーバ: あり */
    getByFacilityIdStaffById(args: { facilityId: string; id: string }): Promise<unknown>;
    /** 職員を更新
     * PUT /api/facilities/{facilityId}/staff/{id} / scope facility-staff:write / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putByFacilityIdStaffById(args: { facilityId: string; id: string; body?: unknown }): Promise<unknown>;
    /** 職員を削除
     * DELETE /api/facilities/{facilityId}/staff/{id} / scope facility-staff:delete / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteByFacilityIdStaffById(args: { facilityId: string; id: string }): Promise<unknown>;
    /** 職員を退職 (無効) にする
     * POST /api/facilities/{facilityId}/staff/{id}/deactivate / scope facility-staff:write / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByFacilityIdStaffByIdDeactivate(args: { facilityId: string; id: string; body?: unknown }): Promise<unknown>;
    /** 職員を在籍に戻す
     * POST /api/facilities/{facilityId}/staff/{id}/reactivate / scope facility-staff:write / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByFacilityIdStaffByIdReactivate(args: { facilityId: string; id: string; body?: unknown }): Promise<unknown>;
    /** 既存 AppData (例: vns/visit-records) の手入力担当者名から FacilityStaff 候補を抽出 + (任意で) AppData / CareServiceActual を正準化する。 訪問記録の本文・バイタル・status は変更しない。担当者メタのみ touch。
     * POST /api/facilities/{facilityId}/staff/migrate-from-app-data-records / scope facility-staff:write / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByFacilityIdStaffMigrateFromAppDataRecords(args: { facilityId: string; body?: unknown }): Promise<unknown>;
    /** 既存 CareServiceSchedule の手入力担当者名から FacilityStaff 候補を抽出 する移行 API。VNS 既存運用からの移行 (assignedStaffName のみ → SoT 登録 + assignedStaffId 反映) のために用意。 scopes: facility-staff
     * POST /api/facilities/{facilityId}/staff/migrate-from-care-schedules / scope facility-staff:write / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByFacilityIdStaffMigrateFromCareSchedules(args: { facilityId: string; body?: unknown }): Promise<unknown>;
    /** QualifiedPerson (有資格者名簿 SoT) → FacilityStaff の一括同期 (管理画面ボタン経由。初期移行・修復用)。有資格者の facilityIds に対象 facility が含まれ、active な人を FacilityStaff に upsert する。突合は qualifiedPe
     * POST /api/facilities/{facilityId}/staff/sync-from-qualified-persons / scope facility-staff:write / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByFacilityIdStaffSyncFromQualifiedPersons(args: { facilityId: string; body?: unknown }): Promise<unknown>;
    /** 従業員 (AuthUser) の氏名 → 事業所スタッフの氏名 を一括で揃える (既存の不一致の修復用)。対象は本人と確定できる行 (userId / employeeId / 本人の有資格者 id) だけで、氏名だけが一致する行は触らない。旧姓は aliases に残す。dryRun=true (既定) は差分のみ返す
     * POST /api/facilities/{facilityId}/staff/sync-names-from-users / scope facility-staff:write / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByFacilityIdStaffSyncNamesFromUsers(args: { facilityId: string; body?: unknown }): Promise<unknown>;
    /** 事業所の利用者一覧 (マスタ + 追加項目 + 利用契約)
     * GET /api/facilities/{facilityId}/users / scope facility-users:read / 認証 both / facilityId 必須 / 実測 200 (2026-09-27) 応答の項目: count, items / 模擬サーバ: 無し (501) */
    getByFacilityIdUsers(args: { facilityId: string }): Promise<unknown>;
    /** 事業所に利用者を登録 (既存マスタの紐付け or 新規)
     * POST /api/facilities/{facilityId}/users / scope facility-users:write / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByFacilityIdUsers(args: { facilityId: string; body?: unknown }): Promise<unknown>;
    /** 事業所の利用者 (契約・追加項目) を更新
     * PUT /api/facilities/{facilityId}/users/{insuredNumber} / scope facility-users:write / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putByFacilityIdUsersByInsuredNumber(args: { facilityId: string; insuredNumber: string; body?: unknown }): Promise<unknown>;
    /** 利用者の追加項目 (事業所ごと)
     * GET /api/facilities/{facilityId}/users/{insuredNumber}/extras / scope facility-users:read / 認証 both / facilityId 必須 / 実測 200 (2026-09-27) 応答の項目: createdAt, extras, facilityId, id, insuredNumber, lastRawRow, organizationId, updatedAt / 模擬サーバ: 無し (501) */
    getByFacilityIdUsersByInsuredNumberExtras(args: { facilityId: string; insuredNumber: string }): Promise<unknown>;
    /** 利用者の追加項目を保存
     * PUT /api/facilities/{facilityId}/users/{insuredNumber}/extras / scope facility-users:write / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putByFacilityIdUsersByInsuredNumberExtras(args: { facilityId: string; insuredNumber: string; body?: unknown }): Promise<unknown>;
    /** 事業所の利用者を CSV で出力
     * GET /api/facilities/{facilityId}/users/export.csv / scope facility-users:export / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getByFacilityIdUsersExportCsv(args: { facilityId: string }): Promise<unknown>;
    /** 事業所ごとの追加項目の定義
     * GET /api/facilities/{facilityId}/users/extras-schema / scope facility-users:schema:read / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getByFacilityIdUsersExtrasSchema(args: { facilityId: string }): Promise<unknown>;
    /** 事業所ごとの追加項目の定義を保存
     * PUT /api/facilities/{facilityId}/users/extras-schema / scope facility-users:schema:write / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putByFacilityIdUsersExtrasSchema(args: { facilityId: string; body?: unknown }): Promise<unknown>;
    /** 利用者 CSV を取り込む (旧: 一発反映)
     * POST /api/facilities/{facilityId}/users/import-csv / scope facility-users:read / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByFacilityIdUsersImportCsv(args: { facilityId: string; body?: unknown }): Promise<unknown>;
    /** 利用者 CSV 取込を反映
     * POST /api/facilities/{facilityId}/users/import-csv/apply / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByFacilityIdUsersImportCsvApply(args: { facilityId: string; body?: unknown }): Promise<unknown>;
    /** 利用者 CSV 取込のプレビュー (要確認の人を出す)
     * POST /api/facilities/{facilityId}/users/import-csv/preview / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByFacilityIdUsersImportCsvPreview(args: { facilityId: string; body?: unknown }): Promise<unknown>;
    /** 直前の CSV 取込を取り消す
     * POST /api/facilities/{facilityId}/users/import-csv/undo / scope facility-users:import / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByFacilityIdUsersImportCsvUndo(args: { facilityId: string; body?: unknown }): Promise<unknown>;
    /** CSV 取込の列マッピング設定
     * GET /api/facilities/{facilityId}/users/import-mapping / scope facility-users:schema:read / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getByFacilityIdUsersImportMapping(args: { facilityId: string }): Promise<unknown>;
    /** CSV 取込の列マッピング設定を保存
     * PUT /api/facilities/{facilityId}/users/import-mapping / scope facility-users:schema:write / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putByFacilityIdUsersImportMapping(args: { facilityId: string; body?: unknown }): Promise<unknown>;
    /** 負担割合を期間付きの形へ移行 (保守)
     * POST /api/facilities/{facilityId}/users/migrate-burden-ratio / scope facility-users:schema:write / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByFacilityIdUsersMigrateBurdenRatio(args: { facilityId: string; body?: unknown }): Promise<unknown>;
    /** 週間予定の一覧
     * GET /api/facilities/{facilityId}/weekly-schedule / scope facility-modules:write / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getByFacilityIdWeeklySchedule(args: { facilityId: string }): Promise<unknown>;
    /** 週間予定を 1 週分
     * GET /api/facilities/{facilityId}/weekly-schedule/{weekStart} / scope facilities:read / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getByFacilityIdWeeklyScheduleByWeekStart(args: { facilityId: string; weekStart: string }): Promise<unknown>;
    /** 週間予定を保存
     * PUT /api/facilities/{facilityId}/weekly-schedule/{weekStart} / scope facility-modules:write / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putByFacilityIdWeeklyScheduleByWeekStart(args: { facilityId: string; weekStart: string; body?: unknown }): Promise<unknown>;
    /** 週間予定を削除
     * DELETE /api/facilities/{facilityId}/weekly-schedule/{weekStart} / scope facility-modules:write / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteByFacilityIdWeeklyScheduleByWeekStart(args: { facilityId: string; weekStart: string }): Promise<unknown>;
    /** 週間予定を確定
     * POST /api/facilities/{facilityId}/weekly-schedule/{weekStart}/finalize / scope facility-modules:write / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByFacilityIdWeeklyScheduleByWeekStartFinalize(args: { facilityId: string; weekStart: string; body?: unknown }): Promise<unknown>;
    /** 事業所を 1 件
     * GET /api/facilities/{id} / scope facilities:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: address, areaGrade, businessNumber, careplanFiling, createdAt, facilityCategoryCode, fax, id, isActive, name, nameKana, organizationId … / 模擬サーバ: 無し (501) */
    getById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 事業所を更新
     * PUT /api/facilities/{id} / scope facilities:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putById(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 事業所を削除 (?cascade=true で紐づくデータも)
     * DELETE /api/facilities/{id} / scope facilities:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 事業所の請求設定
     * GET /api/facilities/{id}/billing-settings / scope facilities:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: areaGrade, billingEnrollment, facilityId, facilityStandards, treatmentImprovementAddon / 模擬サーバ: 無し (501) */
    getByIdBillingSettings(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 事業所の請求設定を保存
     * PUT /api/facilities/{id}/billing-settings / scope facilities:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putByIdBillingSettings(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 事業所削除の影響 (消えるもの) を確認
     * POST /api/facilities/{id}/delete-preview / scope facilities:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByIdDeletePreview(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 設定の検証: ヘッダ行を実際に読み、列マッピングの解決状況を返す。 OAuth セッションが必要 (Google Sheets を読むため)。
     * GET /api/facilities/{id}/diagnose / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 503 (2026-09-27) / 模擬サーバ: 無し (501) */
    getByIdDiagnose(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 従業員一覧 (FacilityConfig.employees が設定されていれば Sheet から)
     * GET /api/facilities/{id}/employees / 認証 both / 実測 200 (2026-09-27) 応答の項目: items, reason / 模擬サーバ: 無し (501) */
    getByIdEmployees(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 事業所の住所から座標を付ける (geoSource='manual' は force なしでは 409)
     * POST /api/facilities/{id}/geocode / scope facilities:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByIdGeocode(args: { id: string; body: unknown; facilityId?: string }): Promise<unknown>;
    /** 利用者 CSV 一括インポート。CSV (UTF-8、BOM 可) のヘッダ行を見て、 「氏名」「フリガナ」など FacilityConfig.users.columns で定義された列を 利用者シートに upsert する。 body: { csv: string, hasHeader?: boolean (defa
     * POST /api/facilities/{id}/import-csv / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByIdImportCsv(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 従業員 CSV 一括インポート body: { csv: string, hasHeader?: boolean }
     * POST /api/facilities/{id}/import-employees-csv / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByIdImportEmployeesCsv(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** PDF 取込: 利用者一覧 PDF を AI 解析し、upsert プランを返す POST /:id/import-pdf?apply=false body: { pdfBase64, mimeType } apply=true の場合はそのままシートへ書き込む
     * POST /api/facilities/{id}/import-pdf / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByIdImportPdf(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 利用者フォルダのスキャン: 施設の userFolders.rootFolderId 配下を walk して `頭文字_氏名様` パターンに合致する全フォルダを利用者一覧として返す。 query: ?detect=true で各フォルダ内の careplan.json の有無も判定 (重い)。 ?root=<folde
     * GET /api/facilities/{id}/scan-users / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 503 (2026-09-27) OAuth セッションなし / 模擬サーバ: 無し (501) */
    getByIdScanUsers(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** @deprecated 利用者フォルダはシステム全体で共通のため、同期もシステム単位で 実行すべき。後継: POST /api/master-users/sync-from-folders 互換のため残しているが、UI からは外している。新規利用は推奨しない。 利用者フォルダから利用者マスタを生成・更新する。 scan
     * POST /api/facilities/{id}/sync-users-from-folders / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByIdSyncUsersFromFolders(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 事業所設定を JSON で書き出す
     * GET /api/facilities/export.json / scope facilities:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getExportJson(args?: { facilityId?: string }): Promise<unknown>;
    /** 事業所設定を JSON から取り込む (?dryRun=true で検証だけ)
     * POST /api/facilities/import.json / scope facilities:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postImportJson(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  facilityChanges: {
    /** 事業所の変更: Cloud Tasks の作業口。実行を 45 秒まで進め、残りがあれば次のタスクを積む
     * POST /api/facility-changes/_internal/run / 認証 none / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postInternalRun(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  facilityFinancials: {
    /** … 月次売上高の一覧 (admin/manager/staff)
     * GET /api/facility-financials/revenue / scope facilities:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: items / 模擬サーバ: 無し (501) */
    getRevenue(args?: { facilityId?: string }): Promise<unknown>;
    /** 事業所の月次売上を登録・更新
     * PUT /api/facility-financials/revenue/{facilityId}/{serviceMonth} / scope facilities:write / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putRevenueByFacilityIdByServiceMonth(args: { facilityId: string; serviceMonth: string; body?: unknown }): Promise<unknown>;
  };
  feedback: {
    /** … 一覧 (admin / manager)
     * GET /api/feedback / scope feedback:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    get(args?: { facilityId?: string }): Promise<unknown>;
    /** … 送信 (ログイン済みスタッフ全職種 + API token)
     * POST /api/feedback / scope feedback:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    post(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 報告に添付されたファイル (管理者)
     * GET /api/feedback/{id}/attachments/{fileId} / scope feedback:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getByIdAttachmentsByFileId(args: { id: string; fileId: string; facilityId?: string }): Promise<unknown>;
    /** 不具合報告・要望を対応済みにする
     * POST /api/feedback/{id}/resolve / scope feedback:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByIdResolve(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  filing: {
    /** PDF を解析して AI 結果 + プランを返す (まだ書き込まない) POST /analyze body: { facilityId, pdfBase64, mimeType? }
     * POST /api/filing/analyze / scope filing:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postAnalyze(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** バッチ解析: 複数 PDF を順次解析して結果を返す POST /analyze-batch body: { facilityId, files: [{ name, pdfBase64, mimeType? }], isConfidential? }
     * POST /api/filing/analyze-batch / scope filing:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postAnalyzeBatch(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ファイリング: analyze-textの登録・実行 (analyze-text)
     * POST /api/filing/analyze-text / scope filing:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postAnalyzeText(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** プランを適用 (実書込) POST /apply body: { facilityId, plans: FilingPlan[], pdfBase64, mimeType?, isConfidential? } isConfidential=true は apply-batch と同じく CPOS 機密保管へ保存する。
     * POST /api/filing/apply / scope filing:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postApply(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** バッチ適用: analyze-batch の plans をまとめて apply POST /apply-batch body: { facilityId, items: [{ name, pdfBase64, plans }], isConfidential? } isConfidential=true のとき、本文
     * POST /api/filing/apply-batch / scope filing:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postApplyBatch(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ファイリング: apply-textの登録・実行 (apply-text)
     * POST /api/filing/apply-text / scope filing:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postApplyText(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ファイリング: apply-text-rawの登録・実行 (apply-text-raw)
     * POST /api/filing/apply-text-raw / scope filing:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postApplyTextRaw(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  formTemplates: {
    /** フォームテンプレートの一覧 (用途・事業所で絞る)
     * GET /api/form-templates / scope form-templates:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: allowedServiceTypeCodes, createdAt, facilityId, fields, grid, id, isActive, name, optionSets, organizationId, purpose, updatedAt … / 模擬サーバ: 無し (501) */
    get(args?: { facilityId?: string }): Promise<unknown>;
    /** フォームテンプレートを作成
     * POST /api/form-templates / scope form-templates:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    post(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** フォームテンプレートを 1 件取得
     * GET /api/form-templates/{id} / scope form-templates:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: allowedServiceTypeCodes, createdAt, facilityId, fields, grid, id, isActive, name, optionSets, organizationId, purpose, updatedAt … / 模擬サーバ: 無し (501) */
    getById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** フォームテンプレートを更新
     * PUT /api/form-templates/{id} / scope form-templates:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putById(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** フォームテンプレートを削除
     * DELETE /api/form-templates/{id} / scope form-templates:delete / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** フォームテンプレートを複製
     * POST /api/form-templates/{id}/clone / scope form-templates:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByIdClone(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** フォームテンプレートを JSON で出力
     * GET /api/form-templates/{id}/export.json / scope form-templates:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getByIdExportJson(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** フォームテンプレートを JSON から取込 (new / replace)
     * POST /api/form-templates/import / scope form-templates:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postImport(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  health: {
    /** 生存確認
     * GET /api/health / 認証 none / 実測 200 (2026-09-27) 応答の項目: app, appEnv, revision, status, timestamp / 模擬サーバ: 無し (501) */
    get(args?: { facilityId?: string }): Promise<unknown>;
  };
  help: {
    /** 画面ヘルプに質問する (AI)
     * POST /api/help/ask / scope help:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postAsk(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  incidents: {
    /** list (facilityId/from/to/severity/status/
     * GET /api/incidents / scope incidents:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: items / 模擬サーバ: 無し (501) */
    get(args?: { facilityId?: string }): Promise<unknown>;
    /** create (native only)
     * POST /api/incidents / scope incidents:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    post(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** single record
     * GET /api/incidents/{id} / scope incidents:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** update (native only)
     * PUT /api/incidents/{id} / scope incidents:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putById(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** soft delete (native only)
     * DELETE /api/incidents/{id} / scope incidents:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteById(args: { id: string; facilityId?: string }): Promise<unknown>;
  };
  kasan: {
    /** 加算分析の元データ
     * GET /api/kasan/v1/analysis-source / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 400 (2026-09-27) パラメータが要る: facilityId が必要です / 模擬サーバ: 無し (501) */
    getV1AnalysisSource(args?: { facilityId?: string }): Promise<unknown>;
    /** 加算マネージャの起動情報
     * GET /api/kasan/v1/bootstrap / 認証 both / 実測 200 (2026-09-27) 応答の項目: connected, cpos, facilities, features, organization, user / 模擬サーバ: 無し (501) */
    getV1Bootstrap(args?: { facilityId?: string }): Promise<unknown>;
    /** 事業所の月次の加算算定状況
     * GET /api/kasan/v1/facilities/{facilityId}/monthly-status / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 400 (2026-09-27) パラメータが要る: serviceMonth は YYYY-MM 形式 / 模擬サーバ: 無し (501) */
    getV1FacilitiesByFacilityIdMonthlyStatus(args: { facilityId: string }): Promise<unknown>;
  };
  life: {
    /** 提出 CSV 用の行 (既存 /v1/exports に渡す形)
     * GET /api/life/assessment-rows / scope life:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 400 (2026-09-27) パラメータが要る: facilityId が必要です / 模擬サーバ: 無し (501) */
    getAssessmentRows(args?: { facilityId?: string }): Promise<unknown>;
    /** LIFE 評価の一覧
     * GET /api/life/assessments / scope life:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: assessments / 模擬サーバ: 無し (501) */
    getAssessments(args?: { facilityId?: string }): Promise<unknown>;
    /** LIFE 評価を登録・更新
     * PUT /api/life/assessments / scope life:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putAssessments(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** LIFE 評価を削除
     * DELETE /api/life/assessments/{id} / scope life:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteAssessmentsById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 福祉用具の ADL (ふくせん 4 択) → Barthel コードの下書き
     * POST /api/life/barthel-draft / scope life:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postBarthelDraft(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** LIFE フィードバック (取込済み) の一覧
     * GET /api/life/feedbacks / scope life:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: feedbacks / 模擬サーバ: 無し (501) */
    getFeedbacks(args?: { facilityId?: string }): Promise<unknown>;
    /** LIFE フィードバックを登録
     * PUT /api/life/feedbacks / scope life:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putFeedbacks(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** LIFE フィードバックを削除
     * DELETE /api/life/feedbacks/{id} / scope life:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteFeedbacksById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** LIFE フィードバックの元ファイル
     * GET /api/life/feedbacks/{id}/file / scope life:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getFeedbacksByIdFile(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 尺度の定義 (spec から導出。画面はここから入力欄を作る)
     * GET /api/life/meta / scope life:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: interfaceName, note, numericItems, scales / 模擬サーバ: 無し (501) */
    getMeta(args?: { facilityId?: string }): Promise<unknown>;
  };
  ltcWeb: {
    /** ============ 別紙4 閲覧 policy ============
     * GET /api/ltc-web/access-policies / scope ltc-web:settings:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getAccessPolicies(args?: { facilityId?: string }): Promise<unknown>;
    /** 別紙4 の閲覧ポリシーの初期値を投入
     * POST /api/ltc-web/access-policies/seed / scope ltc-web:settings:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postAccessPoliciesSeed(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 同意登録
     * POST /api/ltc-web/careplan/consent-register / scope ltc-web:careplan:send / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postCareplanConsentRegister(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 受領登録 (相手に届いたことを登録)
     * POST /api/ltc-web/careplan/delivery-register / scope ltc-web:careplan:send / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postCareplanDeliveryRegister(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ケアプラン連携の送受信封筒の一覧
     * GET /api/ltc-web/careplan/envelopes / scope ltc-web:careplan:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getCareplanEnvelopes(args?: { facilityId?: string }): Promise<unknown>;
    /** ============ ケアプラン連携 ============
     * POST /api/ltc-web/careplan/envelopes / scope ltc-web:careplan:send / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postCareplanEnvelopes(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 送受信封筒を 1 件取得
     * GET /api/ltc-web/careplan/envelopes/{id} / scope ltc-web:careplan:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getCareplanEnvelopesById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** ケアプランを送信
     * POST /api/ltc-web/careplan/envelopes/{id}/send / scope ltc-web:careplan:send / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postCareplanEnvelopesByIdSend(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 送信前の検証
     * POST /api/ltc-web/careplan/envelopes/{id}/validate / scope ltc-web:careplan:send / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postCareplanEnvelopesByIdValidate(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 受信一覧
     * GET /api/ltc-web/careplan/receive-list / scope ltc-web:careplan:receive / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getCareplanReceiveList(args?: { facilityId?: string }): Promise<unknown>;
    /** 受信: externalDataId を fetch して受信 envelope を作る (mock)。
     * POST /api/ltc-web/careplan/receive/{externalDataId}/fetch / scope ltc-web:careplan:receive / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postCareplanReceiveByExternalDataIdFetch(args: { externalDataId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 受信 import 確定: imported に遷移 (Care Documents draft 化は後続)。
     * POST /api/ltc-web/careplan/receive/{externalDataId}/import / scope ltc-web:careplan:import / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postCareplanReceiveByExternalDataIdImport(args: { externalDataId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 受信 import preview: 取り込まれる内容を提示 (書き込まない)。
     * POST /api/ltc-web/careplan/receive/{externalDataId}/import-preview / scope ltc-web:careplan:import / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postCareplanReceiveByExternalDataIdImportPreview(args: { externalDataId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 送信一覧
     * GET /api/ltc-web/careplan/send-list / scope ltc-web:careplan:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getCareplanSendList(args?: { facilityId?: string }): Promise<unknown>;
    /** 資格確認した利用者の一覧
     * GET /api/ltc-web/facilities/{facilityId}/user-list / scope ltc-web:eligibility:read / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getFacilitiesByFacilityIdUserList(args: { facilityId: string }): Promise<unknown>;
    /** ============ 資格確認 ============
     * POST /api/ltc-web/facilities/{facilityId}/user-list/sync / scope ltc-web:eligibility:sync / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postFacilitiesByFacilityIdUserListSync(args: { facilityId: string; body?: unknown }): Promise<unknown>;
    /** 利用者の資格情報 (kind: 認定・負担割合など) を照会して保存
     * POST /api/ltc-web/facilities/{facilityId}/users/{insuredNumber}/{kind} / scope ltc-web:eligibility:read / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postFacilitiesByFacilityIdUsersByInsuredNumberByKind(args: { facilityId: string; insuredNumber: string; kind: string; body?: unknown }): Promise<unknown>;
    /** 資格情報の差分を利用者マスタに反映
     * POST /api/ltc-web/facilities/{facilityId}/users/{insuredNumber}/apply-diff / scope ltc-web:eligibility:sync / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postFacilitiesByFacilityIdUsersByInsuredNumberApplyDiff(args: { facilityId: string; insuredNumber: string; body?: unknown }): Promise<unknown>;
    /** 資格情報と利用者マスタの差分を出す
     * POST /api/ltc-web/facilities/{facilityId}/users/{insuredNumber}/diff-master-user / scope ltc-web:eligibility:read / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postFacilitiesByFacilityIdUsersByInsuredNumberDiffMasterUser(args: { facilityId: string; insuredNumber: string; body?: unknown }): Promise<unknown>;
    /** 利用者の資格情報の照会履歴
     * GET /api/ltc-web/facilities/{facilityId}/users/{insuredNumber}/snapshots / scope ltc-web:eligibility:read / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getFacilitiesByFacilityIdUsersByInsuredNumberSnapshots(args: { facilityId: string; insuredNumber: string }): Promise<unknown>;
    /** ============ 監査ログ ============
     * GET /api/ltc-web/request-logs / scope ltc-web:audit:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getRequestLogs(args?: { facilityId?: string }): Promise<unknown>;
    /** ============ 設定 ============
     * GET /api/ltc-web/settings / scope ltc-web:settings:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getSettings(args?: { facilityId?: string }): Promise<unknown>;
    /** 事業所の LTC Web 接続設定を取得
     * GET /api/ltc-web/settings/{facilityId} / scope ltc-web:settings:read / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getSettingsByFacilityId(args: { facilityId: string }): Promise<unknown>;
    /** 事業所の LTC Web 接続設定を保存
     * PUT /api/ltc-web/settings/{facilityId} / scope ltc-web:settings:write / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putSettingsByFacilityId(args: { facilityId: string; body?: unknown }): Promise<unknown>;
    /** LTC Web 接続の状態
     * GET /api/ltc-web/settings/{facilityId}/health / scope ltc-web:settings:read / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getSettingsByFacilityIdHealth(args: { facilityId: string }): Promise<unknown>;
    /** LTC Web への接続を試す
     * POST /api/ltc-web/settings/{facilityId}/test-connection / scope ltc-web:settings:write / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postSettingsByFacilityIdTestConnection(args: { facilityId: string; body?: unknown }): Promise<unknown>;
  };
  masterUsers: {
    /** 利用者の住所から座標を付ける (geoSource='manual' は force なしでは 409)
     * POST /api/master-users/{insuredNumber}/geocode / scope master-users:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByInsuredNumberGeocode(args: { insuredNumber: string; body: unknown; facilityId?: string }): Promise<unknown>;
  };
  mcp: {
    /** MCP: サーバ発ストリームは非対応 (405)
     * GET /mcp / 認証 none / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 405 (2026-09-27) この MCP サーバはサーバ発のストリームを持ちません。POST /mcp を使ってください。 / 模擬サーバ: 無し (501) */
    get(args?: { facilityId?: string }): Promise<unknown>;
    /** MCP (Model Context Protocol) の JSON-RPC 入口
     * POST /mcp / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    post(args: { body: unknown; facilityId?: string }): Promise<unknown>;
    /** MCP: セッション終了 (状態を持たないので何もしない)
     * DELETE /mcp / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    delete(args?: { facilityId?: string }): Promise<unknown>;
  };
  migrationJobs: {
    /** 移行ジョブの一覧
     * GET /api/migration-jobs/v1 / scope migration-jobs:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1(args?: { facilityId?: string }): Promise<unknown>;
    /** 移行ジョブを作成
     * POST /api/migration-jobs/v1 / scope migration-jobs:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 1 件の進み具合
     * GET /api/migration-jobs/v1/{id} / scope migration-jobs:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1ById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 移行ジョブを取消
     * POST /api/migration-jobs/v1/{id}/cancel / scope migration-jobs:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ByIdCancel(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 移行ジョブを一時停止
     * POST /api/migration-jobs/v1/{id}/pause / scope migration-jobs:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ByIdPause(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 移行ジョブを再開
     * POST /api/migration-jobs/v1/{id}/resume / scope migration-jobs:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ByIdResume(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** **1 区切りだけ**進める。終わるまで繰り返し呼ぶ
     * POST /api/migration-jobs/v1/{id}/run / scope migration-jobs:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ByIdRun(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 扱える移行の種類
     * GET /api/migration-jobs/v1/kinds / scope migration-jobs:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1Kinds(args?: { facilityId?: string }): Promise<unknown>;
  };
  oauth: {
    /** クライアントの動的登録 (RFC 7591。公開クライアント + PKCE のみ)
     * POST /oauth/register / 認証 none / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postRegister(args: { body: unknown; facilityId?: string }): Promise<unknown>;
    /** トークンの失効 (RFC 7009)
     * POST /oauth/revoke / 認証 none / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postRevoke(args: { body: unknown; facilityId?: string }): Promise<unknown>;
    /** トークン発行 (authorization_code + PKCE / refresh_token)
     * POST /oauth/token / 認証 none / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postToken(args: { body: unknown; facilityId?: string }): Promise<unknown>;
  };
  office: {
    /** Office 文書 (docx / xlsx) を PDF などに変換
     * POST /api/office/convert / scope office:render:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postConvert(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  openapi: {
    /** 台帳の充足状況 (ルート数・未記載・機械生成のままの説明数・MCP ツール数)
     * GET /api/openapi/status / 認証 both / 応答の形あり / 模擬サーバ: 無し (501) */
    getStatus(args?: { facilityId?: string }): Promise<unknown>;
  };
  openapiJson: {
    /** OpenAPI 3.1 文書 (起動中のサーバのルートから生成)
     * GET /api/openapi.json / 認証 both / 実測 200 (2026-09-27) 応答の項目: components, info, openapi, paths, servers, tags, x-cpos-route-count, x-cpos-undocumented / 模擬サーバ: 無し (501) */
    get(args?: { facilityId?: string }): Promise<unknown>;
  };
  pdf: {
    /** HTML から PDF を生成
     * POST /api/pdf/render / scope pdf:render:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postRender(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** PDF 生成の自己診断 (所要時間と設定だけ返す)
     * GET /api/pdf/selftest / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getSelftest(args?: { facilityId?: string }): Promise<unknown>;
  };
  platform: {
    /** アプリ台帳 (アプリ間連携の入口)
     * GET /api/platform/apps / scope apps:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getApps(args?: { facilityId?: string }): Promise<unknown>;
    /** 登録アプリの情報を 1 件取得
     * GET /api/platform/apps/{appId} / scope apps:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getAppsByAppId(args: { appId: string; facilityId?: string }): Promise<unknown>;
    /** 監査ログ: アプリからの申告 (自前セッションのアプリのなりすまし開始・停止)
     * POST /api/platform/audit-events / scope audit-events:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postAuditEvents(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 給付管理の集計
     * GET /api/platform/benefits/summary / scope benefits:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getBenefitsSummary(args?: { facilityId?: string; serviceMonth?: string }): Promise<unknown>;
    /** 請求の集計 (匿名化。件数・金額)
     * GET /api/platform/claims/summary / scope claims:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getClaimsSummary(args?: { facilityId?: string; serviceMonth?: string }): Promise<unknown>;
    /** メールを送信 (Gmail 経由。App Token)
     * POST /api/platform/email/send / scope notifications:send / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postEmailSend(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 従業員 (簡易マスタ)
     * GET /api/platform/employees / scope employees:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: あり */
    getEmployees(args?: { facilityId?: string; activeOnly?: boolean }): Promise<unknown>;
    /** 退職・再入職の手続き (jinji)
     * POST /api/platform/employees/{authUserId}/employment / scope employees:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postEmployeesByAuthUserIdEmployment(args: { authUserId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 職員の人事情報 (所属・職種・役職・等級など) を書き戻す (jinji)
     * PATCH /api/platform/employees/{authUserId}/hrm / scope employees:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    patchEmployeesByAuthUserIdHrm(args: { authUserId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 居宅介護支援事業所・ケアマネの一覧
     * GET /api/platform/external-partners/care-managers / scope external-partners:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: internalCount, items / 模擬サーバ: 無し (501) */
    getExternalPartnersCareManagers(args?: { facilityId?: string }): Promise<unknown>;
    /** (VNS 互換入力)
     * POST /api/platform/external-partners/care-managers / scope external-partners:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postExternalPartnersCareManagers(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 医療機関・主治医の一覧
     * GET /api/platform/external-partners/medical-providers / scope external-partners:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: items / 模擬サーバ: 無し (501) */
    getExternalPartnersMedicalProviders(args?: { facilityId?: string }): Promise<unknown>;
    /** (VNS 互換入力)
     * POST /api/platform/external-partners/medical-providers / scope external-partners:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postExternalPartnersMedicalProviders(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 外部関係先 (医療機関・居宅介護支援事業所) の検索
     * GET /api/platform/external-partners/search / scope external-partners:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: items / 模擬サーバ: 無し (501) */
    getExternalPartnersSearch(args?: { query?: string; kind?: string; activeOnly?: boolean; facilityId?: string }): Promise<unknown>;
    /** 事業所の一覧
     * GET /api/platform/facilities / scope facilities:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: address, areaGrade, businessNumber, createdAt, facilityCategoryCode, fax, id, isActive, name, nameKana, organizationId, phone … / 模擬サーバ: あり */
    getFacilities(args?: { includeClosed?: boolean; facilityId?: string }): Promise<unknown>;
    /** 事業所の利用者一覧 (アプリ向けの簡易形)
     * GET /api/platform/facilities/{facilityId}/users / 認証 both / facilityId 必須 / 実測 200 (2026-09-27) 応答の項目: ok, users / 模擬サーバ: あり */
    getFacilitiesByFacilityIdUsers(args: { facilityId: string }): Promise<unknown>;
    /** 事業所を 1 件
     * GET /api/platform/facilities/{id} / scope facilities:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: address, areaGrade, businessNumber, createdAt, facilityCategoryCode, fax, id, isActive, name, nameKana, organizationId, phone … / 模擬サーバ: 無し (501) */
    getFacilitiesById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 利用可能事業所
     * GET /api/platform/facility-context / scope platform:pii:scan / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getFacilityContext(args?: { facilityId?: string }): Promise<unknown>;
    /** 事業所の職員一覧 (担当者列の正)
     * GET /api/platform/facility-staff / scope facility-staff:read / 認証 both / facilityId 必須 / 実測 200 (2026-09-27) 応答の項目: items, staff / 模擬サーバ: あり */
    getFacilityStaff(args: { facilityId: string; activeOnly?: boolean }): Promise<unknown>;
    /** 事業所別の利用者数 (匿名集計)
     * GET /api/platform/facility-users / scope facility-users:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: activeUserCount, careLevelDistribution, facilityId / 模擬サーバ: 無し (501) */
    getFacilityUsers(args?: { facilityId?: string }): Promise<unknown>;
    /** 月別の常勤換算
     * GET /api/platform/fte / scope fte:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: あり */
    getFte(args?: { facilityId?: string; month?: string }): Promise<unknown>;
    /** 住所→座標 (Nominatim / Google。住所はログに残さない)
     * POST /api/platform/geo/geocode / scope geo:read / 認証 both / 応答の形あり / 模擬サーバ: 無し (501) */
    postGeoGeocode(args: { body: unknown; facilityId?: string }): Promise<unknown>;
    /** 事業所の利用者のうち座標が無い人にまとめて座標を付ける (手動座標は飛ばす)
     * POST /api/platform/geo/geocode-missing / scope master-users:write / 認証 both / 応答の形あり / 模擬サーバ: 無し (501) */
    postGeoGeocodeMissing(args: { body: unknown; facilityId?: string }): Promise<unknown>;
    /** 所要時間・距離の行列 (OSRM。未設定・障害時は概算に縮退)
     * POST /api/platform/geo/travel-matrix / scope geo:read / 認証 both / 応答の形あり / 模擬サーバ: 無し (501) */
    postGeoTravelMatrix(args: { body: unknown; facilityId?: string }): Promise<unknown>;
    /** 加算マネージャ統合 export
     * GET /api/platform/kasan/export / scope kasan-export:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getKasanExport(args?: { facilityId?: string }): Promise<unknown>;
    /** 利用者情報の閲覧可否 (別紙4 の判定)
     * GET /api/platform/ltc-web/users/{insuredNumber}/access-grant / scope ltc-web:eligibility:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getLtcWebUsersByInsuredNumberAccessGrant(args: { insuredNumber: string; facilityId?: string }): Promise<unknown>;
    /** 利用者の負担割合
     * GET /api/platform/ltc-web/users/{insuredNumber}/burden-ratio / scope ltc-web:eligibility:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getLtcWebUsersByInsuredNumberBurdenRatio(args: { insuredNumber: string; facilityId?: string }): Promise<unknown>;
    /** 利用者の要介護認定情報
     * GET /api/platform/ltc-web/users/{insuredNumber}/care-certification / scope ltc-web:eligibility:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getLtcWebUsersByInsuredNumberCareCertification(args: { insuredNumber: string; facilityId?: string }): Promise<unknown>;
    /** 利用者の資格確認の要約 (認定・負担割合。事業所スコープ必須)
     * GET /api/platform/ltc-web/users/{insuredNumber}/eligibility-summary / scope ltc-web:eligibility:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getLtcWebUsersByInsuredNumberEligibilitySummary(args: { insuredNumber: string; facilityId?: string }): Promise<unknown>;
    /** 利用者マスタの一覧
     * GET /api/platform/master-users / scope master-users:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: address, birthDate, careLevel, careLevelHistory, careManagerName, careManagerOrg, certificationEndDate, certificationStartDate, createdAt, extras, furigana, furiganaKey … / 模擬サーバ: あり */
    getMasterUsers(args?: { facilityId?: string; query?: string; activeOnly?: boolean; assignedDuring?: string; includeFacilities?: boolean; careManagerUserId?: string; careManagerStaffId?: string; careManagerName?: string; limit?: number }): Promise<unknown>;
    /** 利用者マスタを 1 件
     * GET /api/platform/master-users/{insuredNumber} / scope master-users:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: address, birthDate, careLevel, careLevelHistory, careManagerName, careManagerOrg, certificationEndDate, certificationStartDate, createdAt, extras, furigana, gender … / 模擬サーバ: あり */
    getMasterUsersByInsuredNumber(args: { insuredNumber: string; facilityId?: string }): Promise<unknown>;
    /** 見出し付き
     * GET /api/platform/master-users/{insuredNumber}/face-sheet / scope master-users:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: facilityIds, hasContent, insuredNumber, items, masterUserId, name, sheet, text / 模擬サーバ: 無し (501) */
    getMasterUsersByInsuredNumberFaceSheet(args: { insuredNumber: string; facilityId?: string }): Promise<unknown>;
    /** 被保険者番号 → 表示名の対応表 (旧番号・仮番号込み)
     * GET /api/platform/master-users/name-map / scope master-users:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: items / 模擬サーバ: あり */
    getMasterUsersNameMap(args?: { facilityId?: string }): Promise<unknown>;
    /** 自分の認証情報 (誰として・どの組織で・どのスコープで呼んでいるか)
     * GET /api/platform/me / 認証 both / 実測 200 (2026-09-27) 応答の項目: authMethod, ok, organizationId, token, user / 模擬サーバ: あり */
    getMe(args?: { facilityId?: string }): Promise<unknown>;
    /** 自分が使える事業所の一覧
     * GET /api/platform/my-facilities / 認証 both / 実測 200 (2026-09-27) 応答の項目: defaultFacilityId, facilities, ok / 模擬サーバ: 無し (501) */
    getMyFacilities(args?: { facilityId?: string }): Promise<unknown>;
    /** ===================== POST /organizations (払い出し) =====================
     * POST /api/platform/organizations / scope organizations:provision / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postOrganizations(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ===================== GET /organizations/:id =====================
     * GET /api/platform/organizations/{id} / scope users:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getOrganizationsById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** ============== PUT /organizations/:id/entitlements/:product ==============
     * PUT /api/platform/organizations/{id}/entitlements/{product} / scope users:admin / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putOrganizationsByIdEntitlementsByProduct(args: { id: string; product: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ===================== POST /organizations/:id/users =====================
     * POST /api/platform/organizations/{id}/users / scope users:admin / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postOrganizationsByIdUsers(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** text → 赤字化済みテキスト
     * POST /api/platform/pii/redact / scope platform:pii:scan / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postPiiRedact(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** text → カテゴリ別件数 + 位置 (値は返さない)
     * POST /api/platform/pii/scan / scope platform:pii:scan / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postPiiScan(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 有資格者名簿
     * GET /api/platform/qualified-persons / scope qualified-persons:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: qualifiedPersons / 模擬サーバ: あり */
    getQualifiedPersons(args?: { facilityId?: string; activeOnly?: boolean }): Promise<unknown>;
    /** 営業活動の一覧 (営業先・営業者・予定日・結果)
     * GET /api/platform/sales/activities / scope sales:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: items, nextCursor / 模擬サーバ: 無し (501) */
    getSalesActivities(args?: { facilityId?: string; from?: string; to?: string; status?: string; partnerOrganizationId?: string; staffId?: string; query?: string; limit?: number; cursor?: string }): Promise<unknown>;
    /** 営業活動を登録
     * POST /api/platform/sales/activities / scope sales:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postSalesActivities(args: { body: unknown; facilityId?: string }): Promise<unknown>;
    /** 営業活動を 1 件
     * GET /api/platform/sales/activities/{id} / scope sales:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getSalesActivitiesById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 1 件更新
     * PUT /api/platform/sales/activities/{id} / scope sales:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putSalesActivitiesById(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 1 件削除
     * DELETE /api/platform/sales/activities/{id} / scope sales:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteSalesActivitiesById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 営業活動の集計 (件数・反応・営業先別・営業者別・期限超過)
     * GET /api/platform/sales/activities/summary / scope sales:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: summary, truncated / 模擬サーバ: 無し (501) */
    getSalesActivitiesSummary(args?: { facilityId?: string; from?: string; to?: string; today?: string }): Promise<unknown>;
    /** 営業パイプライン (営業先ごとの現在ステージ・次にすること・期限超過)
     * GET /api/platform/sales/pipeline / scope sales:read / 認証 both / 応答の形あり / 模擬サーバ: 無し (501) */
    getSalesPipeline(args?: { facilityId?: string; today?: string }): Promise<unknown>;
    /** 紹介元別の受付・契約実績 (月別。利用者の氏名・番号は含まない)
     * GET /api/platform/sales/referral-outcomes / scope sales:read / 認証 both / facilityId 必須 / 応答の形あり / 模擬サーバ: 無し (501) */
    getSalesReferralOutcomes(args: { facilityId: string; from?: string; to?: string }): Promise<unknown>;
    /** ===================== GET /users (管理ダッシュボード) ===================== 組織内ユーザー一覧 + その組織のエンタイトルメント。 ?organizationId= で対象組織を指定 (省略時はトークンの組織)。別組織を指定する 場合は払い出し本人 (creat
     * GET /api/platform/users / scope users:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: entitlements, nextCursor, organizationId, users / 模擬サーバ: あり */
    getUsers(args?: { facilityId?: string }): Promise<unknown>;
  };
  progressNotes: {
    /** list (facilityId/insuredNumber/
     * GET /api/progress-notes / scope progress-notes:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: items, truncated / 模擬サーバ: 無し (501) */
    get(args?: { facilityId?: string }): Promise<unknown>;
    /** create (native only)
     * POST /api/progress-notes / scope progress-notes:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    post(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** single record
     * GET /api/progress-notes/{id} / scope progress-notes:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: addenda, author, body, category, clientOpHash, clientOpId, createdAt, createdBy, facilityId, id, insuredNumber, masterUserId … / 模擬サーバ: 無し (501) */
    getById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** update (native only; see below)
     * PUT /api/progress-notes/{id} / scope progress-notes:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putById(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** soft delete (native only)
     * DELETE /api/progress-notes/{id} / scope progress-notes:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 経過記録に追記を足す (元の本文は変えない)
     * POST /api/progress-notes/{id}/addenda / scope progress-notes:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByIdAddenda(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 経過記録の添付一覧
     * GET /api/progress-notes/{id}/attachments / scope progress-notes:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: items / 模擬サーバ: 無し (501) */
    getByIdAttachments(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 経過記録にファイルを添付
     * POST /api/progress-notes/{id}/attachments / scope progress-notes:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByIdAttachments(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 添付を削除
     * DELETE /api/progress-notes/{id}/attachments/{fileId} / scope progress-notes:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteByIdAttachmentsByFileId(args: { id: string; fileId: string; facilityId?: string }): Promise<unknown>;
    /** 添付の中身
     * GET /api/progress-notes/{id}/attachments/{fileId}/content / scope progress-notes:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getByIdAttachmentsByFileIdContent(args: { id: string; fileId: string; facilityId?: string }): Promise<unknown>;
    /** 経過記録の masterUserId 補完の状況 (件数)
     * GET /api/progress-notes/backfill-master-user-id / scope progress-notes:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getBackfillMasterUserId(args?: { facilityId?: string }): Promise<unknown>;
    /** 経過記録に masterUserId を補完する
     * POST /api/progress-notes/backfill-master-user-id / scope progress-notes:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postBackfillMasterUserId(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  public: {
    /** public: 1 件取得 (feedback-attachments/:id/:fileId)
     * GET /public/feedback-attachments/{id}/{fileId} / 認証 none / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getFeedbackAttachmentsByIdByFileId(args: { id: string; fileId: string; facilityId?: string }): Promise<unknown>;
  };
  recordApp: {
    /** 記録に関する質問を AI に投げる (記録本文を材料にする)
     * POST /api/record-app/ask / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postAsk(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 添付画像の中身 (GCS から都度読み出す)
     * GET /api/record-app/attachments/{attachmentId}/content / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getAttachmentsByAttachmentIdContent(args: { attachmentId: string; facilityId?: string }): Promise<unknown>;
    /** 記録をまとめて保存 (quick-records と同じ)
     * POST /api/record-app/batch-records / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postBatchRecords(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 記録アプリの起動情報 (事業所・記録定義・機能の可否)
     * GET /api/record-app/bootstrap / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getBootstrap(args?: { facilityId?: string }): Promise<unknown>;
    /** 来所時バイタルを記録
     * POST /api/record-app/day-service/arrival-vitals / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postDayServiceArrivalVitals(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 通所の出席状況 (日付ごと)
     * GET /api/record-app/day-service/attendance / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getDayServiceAttendance(args?: { facilityId?: string }): Promise<unknown>;
    /** 水分の記録を対象者にまとめて保存
     * POST /api/record-app/day-service/batch-fluid / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postDayServiceBatchFluid(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 食事の記録を対象者にまとめて保存
     * POST /api/record-app/day-service/batch-meal / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postDayServiceBatchMeal(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** おやつの記録を対象者にまとめて保存
     * POST /api/record-app/day-service/batch-snack / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postDayServiceBatchSnack(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 記録時刻のずれ (UTC 切り出し) を直す保守処理
     * POST /api/record-app/maintenance/record-time-fix / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postMaintenanceRecordTimeFix(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 測定値の二重保存の移行状況 (件数)
     * GET /api/record-app/measurement-migration / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getMeasurementMigration(args?: { facilityId?: string }): Promise<unknown>;
    /** 測定値の二重保存を CareRecord 側へ移行する
     * POST /api/record-app/measurement-migration / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postMeasurementMigration(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 測定値 (バイタル・体重など) の一覧
     * GET /api/record-app/measurements / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getMeasurements(args?: { facilityId?: string }): Promise<unknown>;
    /** 測定値を保存
     * POST /api/record-app/measurements / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postMeasurements(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 測定値を削除
     * DELETE /api/record-app/measurements/{recordId} / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteMeasurementsByRecordId(args: { recordId: string; facilityId?: string }): Promise<unknown>;
    /** 記録をまとめて保存 (クイック記録。1 件でも配列でも)
     * POST /api/record-app/quick-records / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postQuickRecords(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 記録の利用者キー (不変 ID / 被保険者番号) の付き方を診断
     * GET /api/record-app/record-key-diagnosis / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getRecordKeyDiagnosis(args?: { facilityId?: string }): Promise<unknown>;
    /** 記録の種類 (事業所ごとの定義)
     * GET /api/record-app/record-types / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getRecordTypes(args?: { facilityId?: string }): Promise<unknown>;
    /** 記録の種類を保存
     * PUT /api/record-app/record-types / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putRecordTypes(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 記録の種類を既定に戻す
     * DELETE /api/record-app/record-types / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteRecordTypes(args?: { facilityId?: string }): Promise<unknown>;
    /** 記録の一覧 (利用者・種類・期間で絞る)
     * GET /api/record-app/records / scope care-records:read / 認証 both / 応答の形あり / 模擬サーバ: 無し (501) */
    getRecords(args?: { masterUserId?: string; insuredNumber?: string; userName?: string; filter?: string; from?: string; to?: string; limit?: number; includeVoided?: boolean; isUnclassified?: boolean; facilityId?: string }): Promise<unknown>;
    /** 記録を 1 件保存
     * POST /api/record-app/records / scope care-records:write / 認証 none / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postRecords(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** (フル編集)
     * PUT /api/record-app/records/{id} / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putRecordsById(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 記録を取消 (物理削除せず voided にする)
     * DELETE /api/record-app/records/{id} / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteRecordsById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 未分類の記録を利用者に分類する
     * POST /api/record-app/records/{id}/classify / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postRecordsByIdClassify(args: { id: string; body: unknown; facilityId?: string }): Promise<unknown>;
    /** recordTypes 更新
     * PATCH /api/record-app/records/{id}/flags / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    patchRecordsByIdFlags(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 重要度更新
     * PATCH /api/record-app/records/{id}/importance / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    patchRecordsByIdImportance(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 記録の取消を戻す (voided → draft)
     * POST /api/record-app/records/{id}/unvoid / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postRecordsByIdUnvoid(args: { id: string; body: unknown; facilityId?: string }): Promise<unknown>;
    /** 記録の添付一覧 (署名 URL は返さない)
     * GET /api/record-app/records/{recordId}/attachments / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getRecordsByRecordIdAttachments(args: { recordId: string; facilityId?: string }): Promise<unknown>;
    /** 記録に写真を添付 (base64 JSON)
     * POST /api/record-app/records/{recordId}/photos / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postRecordsByRecordIdPhotos(args: { recordId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 全件 (today/yesterday/week 等)
     * GET /api/record-app/records/all / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getRecordsAll(args?: { facilityId?: string }): Promise<unknown>;
    /** オフラインで蓄積した op をまとめて送信。1 件失敗しても全体は継続し、 各 op に { clientOpId, ok, result?, error? } を返す。
     * POST /api/record-app/records/batch-sync / scope care-records:sync / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postRecordsBatchSync(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** users + recordTypes + visitFields + configVersion
     * GET /api/record-app/records/bootstrap / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getRecordsBootstrap(args?: { facilityId?: string }): Promise<unknown>;
    /** 旧 GAS 関数名互換 dispatch
     * POST /api/record-app/records/gas-compatible/run / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postRecordsGasCompatibleRun(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** AppData に残る旧記録を CareRecord へ取り込む
     * POST /api/record-app/records/import-from-app-data / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postRecordsImportFromAppData(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** AppData → CareRecord の移行を実行
     * POST /api/record-app/records/migrate-from-app-data / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postRecordsMigrateFromAppData(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** AppData → CareRecord の移行結果を検証 (件数の突合)
     * GET /api/record-app/records/migrate-from-app-data/verify / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getRecordsMigrateFromAppDataVerify(args?: { facilityId?: string }): Promise<unknown>;
    /** 写真アップロード (base64 JSON)
     * POST /api/record-app/records/photos / scope care-records:photo:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postRecordsPhotos(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 疎通確認
     * GET /api/record-app/records/ping / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getRecordsPing(args?: { facilityId?: string }): Promise<unknown>;
    /** 記録タイプ一覧
     * GET /api/record-app/records/record-types / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getRecordsRecordTypes(args?: { facilityId?: string }): Promise<unknown>;
    /** 差分同期 (since=ISO)
     * GET /api/record-app/records/updates / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getRecordsUpdates(args?: { facilityId?: string }): Promise<unknown>;
    /** 利用者一覧 (master + assignment)
     * GET /api/record-app/records/users / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getRecordsUsers(args?: { facilityId?: string }): Promise<unknown>;
    /** 利用者の重要事項 (旧パス)
     * GET /api/record-app/records/users/{insuredNumber}/important-matters / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getRecordsUsersByInsuredNumberImportantMatters(args: { insuredNumber: string; facilityId?: string }): Promise<unknown>;
    /** 利用者の重要事項を追加 (旧パス)
     * POST /api/record-app/records/users/{insuredNumber}/important-matters / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postRecordsUsersByInsuredNumberImportantMatters(args: { insuredNumber: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 利用者の記録用プロフィール (記録画面に出す情報)
     * GET /api/record-app/records/users/{insuredNumber}/info / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getRecordsUsersByInsuredNumberInfo(args: { insuredNumber: string; facilityId?: string }): Promise<unknown>;
    /** 利用者の記録用プロフィールを保存
     * PUT /api/record-app/records/users/{insuredNumber}/info / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putRecordsUsersByInsuredNumberInfo(args: { insuredNumber: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 事業所の利用者全員の記録用プロフィール
     * GET /api/record-app/records/users/info/all / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getRecordsUsersInfoAll(args?: { facilityId?: string }): Promise<unknown>;
    /** 訪問記録テンプレート
     * GET /api/record-app/records/visit-record-fields / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getRecordsVisitRecordFields(args?: { facilityId?: string }): Promise<unknown>;
    /** 訪問記録の入力フォーム定義 (端末アプリが描画する)
     * GET /api/record-app/records/visit-record-form / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getRecordsVisitRecordForm(args?: { facilityId?: string }): Promise<unknown>;
    /** 利用者の重要事項 (アレルギー・注意点など)
     * GET /api/record-app/users/{insured}/important-matters / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getUsersByInsuredImportantMatters(args: { insured: string; facilityId?: string }): Promise<unknown>;
    /** 利用者の重要事項を追加
     * POST /api/record-app/users/{insured}/important-matters / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postUsersByInsuredImportantMatters(args: { insured: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 重要事項を非表示にする
     * PATCH /api/record-app/users/{insured}/important-matters/{matterId}/hide / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    patchUsersByInsuredImportantMattersByMatterIdHide(args: { insured: string; matterId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 訪問介護のケア項目 (事業所ごとの設定)
     * GET /api/record-app/visit-care/care-items / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getVisitCareCareItems(args?: { facilityId?: string }): Promise<unknown>;
    /** 訪問介護のケア項目を保存
     * PUT /api/record-app/visit-care/care-items / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putVisitCareCareItems(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 訪問介護のケア項目を既定に戻す
     * DELETE /api/record-app/visit-care/care-items / scope care-records:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteVisitCareCareItems(args?: { facilityId?: string }): Promise<unknown>;
    /** 訪問看護記録の一覧
     * GET /api/record-app/visit-nursing/records / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getVisitNursingRecords(args?: { facilityId?: string }): Promise<unknown>;
    /** 訪問看護記録を保存
     * POST /api/record-app/visit-nursing/records / scope care-records:write / 認証 none / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postVisitNursingRecords(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 訪問看護記録を Excel で出力
     * GET /api/record-app/visit-nursing/records/{id}/export.xlsx / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getVisitNursingRecordsByIdExportXlsx(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 訪問看護記録の印刷用 HTML
     * GET /api/record-app/visit-nursing/records/{id}/print / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getVisitNursingRecordsByIdPrint(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 訪問看護記録のテンプレート一覧
     * GET /api/record-app/visit-nursing/templates / scope care-records:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getVisitNursingTemplates(args?: { facilityId?: string }): Promise<unknown>;
  };
  recordExtractors: {
    /** リハ評価項目 (ROM・MMT・歩行・ADL など) を抽出
     * POST /api/record-extractors/rehab / scope record-extractors:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postRehab(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** Lightweight `rules` introspection endpoint. Returns the field names and labels that the server knows about (useful for client UIs to render extracted-field summ
     * GET /api/record-extractors/rules / scope record-extractors:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: ok, vitals / 模擬サーバ: 無し (501) */
    getRules(args?: { facilityId?: string }): Promise<unknown>;
    /** 記録本文を項目ごとに構造化
     * POST /api/record-extractors/structured-note / scope record-extractors:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postStructuredNote(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 記録本文の要約 (ルールベース。AI は上層で被せる)
     * POST /api/record-extractors/summary / scope record-extractors:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postSummary(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 要約の設定 (実際に使われている AI プロバイダ)
     * GET /api/record-extractors/summary/config / scope record-extractors:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: allowedModels, appliedProvider, defaultModel, defaultPromptVersion, diagnostics, knownPromptVersions, promptVersions, provider, reason / 模擬サーバ: 無し (501) */
    getSummaryConfig(args?: { facilityId?: string }): Promise<unknown>;
    /** 要約フィードバックの集計 (管理者)
     * GET /api/record-extractors/summary/feedback / scope record-extractors:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: items / 模擬サーバ: 無し (501) */
    getSummaryFeedback(args?: { facilityId?: string }): Promise<unknown>;
    /** 要約の品質フィードバックを記録
     * POST /api/record-extractors/summary/feedback / scope record-extractors:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postSummaryFeedback(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 要約機能の稼働状態 (キーの有無は真偽値のみ)
     * GET /api/record-extractors/summary/health / scope record-extractors:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: allowedModels, apiKeyPresent, appliedProvider, defaultModel, defaultPromptVersion, deprecatedModels, ok, provider, reason, warningDetails, warnings / 模擬サーバ: 無し (501) */
    getSummaryHealth(args?: { facilityId?: string }): Promise<unknown>;
    /** 固定の文で要約プロバイダが動くか確認 (管理者)
     * POST /api/record-extractors/summary/smoke-test / scope record-extractors:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postSummarySmokeTest(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 記録本文からバイタルを抽出 (ルールベース)
     * POST /api/record-extractors/vitals / scope record-extractors:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postVitals(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 複数の記録本文のバイタルを項目ごとに集計 (平均・最小・最大・件数)
     * POST /api/record-extractors/vitals/summary / scope record-extractors:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postVitalsSummary(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  reportedPlacements: {
    /** 届出上の人員配置の一覧
     * GET /api/reported-placements / scope reported-placements:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: items / 模擬サーバ: 無し (501) */
    get(args?: { facilityId?: string }): Promise<unknown>;
    /** 届出配置を登録・更新
     * POST /api/reported-placements / scope reported-placements:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    post(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 届出配置を削除 (誤登録の物理削除)
     * DELETE /api/reported-placements/{id} / scope reported-placements:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 届出配置を終了 (差し替えは終了 → 新規で履歴を残す)
     * POST /api/reported-placements/{id}/end / scope reported-placements:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByIdEnd(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 実績シフトとの乖離
     * GET /api/reported-placements/divergence / scope reported-placements:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 400 (2026-09-27) パラメータが要る: month (YYYY-MM) は必須です / 模擬サーバ: 無し (501) */
    getDivergence(args?: { facilityId?: string }): Promise<unknown>;
    /** 職種別の常勤換算サマリ
     * GET /api/reported-placements/summary / scope reported-placements:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: roles / 模擬サーバ: 無し (501) */
    getSummary(args?: { facilityId?: string }): Promise<unknown>;
  };
  robotics: {
    /** ロボット連携の契約 (能力・同意目的・作業種別・状態遷移・原則) の自己記述
     * GET /api/robotics/catalog / scope robots:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getCatalog(args?: { facilityId?: string }): Promise<unknown>;
    /** ロボット利用の同意の一覧
     * GET /api/robotics/consents / scope robot-consents:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getConsents(args?: { facilityId?: string; masterUserId?: string; insuredNumber?: string; purpose?: string; status?: string; limit?: number }): Promise<unknown>;
    /** ロボット利用の同意を記録 (職員の対話操作のみ)
     * POST /api/robotics/consents / scope robot-consents:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postConsents(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 同意を 1 件
     * GET /api/robotics/consents/{id} / scope robot-consents:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getConsentsById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 同意を撤回 (職員)
     * POST /api/robotics/consents/{id}/withdraw / scope robot-consents:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postConsentsByIdWithdraw(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 利用者の同意を確認 (ロボット用。氏名は返さない)
     * GET /api/robotics/consents/check / scope robots:act / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getConsentsCheck(args: { robotId: string; masterUserId?: string; insuredNumber?: string; purposes: string; facilityId?: string }): Promise<unknown>;
    /** ロボットが受けた同意の撤回申し出を記録 (職員へアラート)
     * POST /api/robotics/consents/withdraw-request / scope robots:act / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postConsentsWithdrawRequest(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 作業目的に必要な最小限の利用者情報 (同意がある場合のみ。保存禁止)
     * GET /api/robotics/context / scope robots:act / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getContext(args: { robotId: string; purpose: string; masterUserId?: string; insuredNumber?: string; date?: string; facilityId?: string }): Promise<unknown>;
    /** 機体が登録を申し込む (RFC 8628。QR と短いコードを受け取る)
     * POST /api/robotics/device/authorize / 認証 none / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postDeviceAuthorize(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 機体自身が登録を解除する (廃棄・引き渡し)
     * POST /api/robotics/device/deregister / 認証 none / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postDeviceDeregister(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 機体自身の登録 (許可された機能・版・環境)
     * GET /api/robotics/device/me / 認証 none / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getDeviceMe(args?: { facilityId?: string }): Promise<unknown>;
    /** 機体登録の一覧 (秘密は出さない)
     * GET /api/robotics/device/registrations / scope robots:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getDeviceRegistrations(args?: { facilityId?: string }): Promise<unknown>;
    /** 機体登録を 1 件 (許可・鍵の履歴・担当)
     * GET /api/robotics/device/registrations/{id} / scope robots:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getDeviceRegistrationsById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 登録済みのロボットを、ほかの事業所でも使えるようにする。職員の対話操作のみ
     * POST /api/robotics/device/registrations/{id}/facilities / scope robots:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postDeviceRegistrationsByIdFacilities(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ロボットを 1 つの事業所から外す (最後の事業所は外せない)。職員の対話操作のみ
     * POST /api/robotics/device/registrations/{id}/facilities/remove / scope robots:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postDeviceRegistrationsByIdFacilitiesRemove(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 機体登録の担当者を変える。職員の対話操作のみ
     * POST /api/robotics/device/registrations/{id}/manager / scope robots:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postDeviceRegistrationsByIdManager(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 機体に許可する機能を変える。職員の対話操作のみ
     * POST /api/robotics/device/registrations/{id}/permissions / scope robots:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postDeviceRegistrationsByIdPermissions(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 機体の登録を解除する (失効。次の要求から使えない)。職員の対話操作のみ
     * POST /api/robotics/device/registrations/{id}/revoke / scope robots:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postDeviceRegistrationsByIdRevoke(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 機体の鍵を交換する (今の鍵で呼び、新しい鍵の証明を本文に入れる)
     * POST /api/robotics/device/rotate-key / 認証 none / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postDeviceRotateKey(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 機体の資格情報を受け取る・更新する (device_code / refresh_token)
     * POST /api/robotics/device/token / 認証 none / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postDeviceToken(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** QR の機体登録の確認 (職員のスマートフォン画面)。職員の対話操作のみ
     * GET /api/robotics/device/verification / scope robots:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getDeviceVerification(args: { user_code: string; facilityId?: string }): Promise<unknown>;
    /** 機体の登録を承認する (機体は停止中で登録される)。職員の対話操作のみ
     * POST /api/robotics/device/verification/approve / scope robots:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postDeviceVerificationApprove(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 機体の登録を承認しない。職員の対話操作のみ
     * POST /api/robotics/device/verification/deny / scope robots:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postDeviceVerificationDeny(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ロボットの稼働ログの一覧 (新しい順)
     * GET /api/robotics/events / scope robots:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getEvents(args?: { robotId?: string; facilityId?: string; type?: string; from?: string; to?: string; limit?: number }): Promise<unknown>;
    /** ロボットの稼働ログをまとめて送る (ロボット用。安全停止は職員へアラート)
     * POST /api/robotics/events / scope robots:act / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postEvents(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 事業所の平面図 (場所と止まる位置) と、利用者がいつもいる場所 (ID だけ)
     * GET /api/robotics/floor-plan / scope robots:read / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getFloorPlan(args: { facilityId: string }): Promise<unknown>;
    /** 事業所の平面図を保存 (利用者が決められている場所は消せない: 409 place-in-use)
     * PUT /api/robotics/floor-plan / scope robots:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putFloorPlan(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 利用者がいつもいる場所 (平面図の場所・席) を決める / 外す (placeCode: null)
     * PUT /api/robotics/floor-plan/users/{masterUserId} / scope robot-tasks:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putFloorPlanUsersByMasterUserId(args: { masterUserId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 人事相談の引き継ぎを送る (ロボット用。区分と緊急度のみで相談内容は受け取らない)
     * POST /api/robotics/hr-handoffs / scope robots:act / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postHrHandoffs(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ロボットからの事故報告の下書きの一覧
     * GET /api/robotics/incident-drafts / scope robot-reports:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getIncidentDrafts(args?: { facilityId?: string; status?: string; robotId?: string; from?: string; to?: string; limit?: number }): Promise<unknown>;
    /** 事故・ヒヤリハットを報告 (ロボット用。下書きとして保存し職員へアラート)
     * POST /api/robotics/incident-drafts / scope robots:act / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postIncidentDrafts(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 事故報告の下書きを 1 件
     * GET /api/robotics/incident-drafts/{id} / scope robot-reports:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getIncidentDraftsById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 下書きから事故報告 (正本) を作る (職員の対話操作のみ)
     * POST /api/robotics/incident-drafts/{id}/convert / scope robot-reports:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postIncidentDraftsByIdConvert(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 事故報告の下書きを却下 (職員の対話操作のみ)
     * POST /api/robotics/incident-drafts/{id}/dismiss / scope robot-reports:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postIncidentDraftsByIdDismiss(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 公開済みナレッジ記事を 1 件 (ロボット用)
     * GET /api/robotics/knowledge/articles/{id} / scope robots:act / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getKnowledgeArticlesById(args: { id: string; robotId: string; facilityId?: string }): Promise<unknown>;
    /** 公開済みナレッジ記事の検索 (ロボット用。職員支援の能力が必要)
     * GET /api/robotics/knowledge/search / scope robots:act / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getKnowledgeSearch(args: { robotId: string; q?: string; category?: string; tags?: string; limit?: number; facilityId?: string }): Promise<unknown>;
    /** このロボット用トークンに紐づくロボットの一覧
     * GET /api/robotics/me / scope robots:act / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getMe(args?: { facilityId?: string }): Promise<unknown>;
    /** ロボットからの確認候補の一覧 (職員)
     * GET /api/robotics/observations / scope robot-tasks:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getObservations(args?: { facilityId?: string; masterUserId?: string; taskId?: string; reviewStatus?: string; limit?: number }): Promise<unknown>;
    /** ロボットが取得した情報を送る (確認候補。最大 50 件、clientObservationId で冪等)
     * POST /api/robotics/observations / scope robots:act / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postObservations(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ロボットが送った情報の受け取りと確認の状態 (ロボット用)
     * GET /api/robotics/observations-state / scope robots:act / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getObservationsState(args: { robotId: string; taskId?: string; facilityId?: string }): Promise<unknown>;
    /** ロボットからの確認候補を 1 件
     * GET /api/robotics/observations/{id} / scope robot-tasks:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getObservationsById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 確認候補を記録にする・直して記録にする・保留・記録にしない (職員の対話操作のみ)
     * POST /api/robotics/observations/{id}/review / scope robot-tasks:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postObservationsByIdReview(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 確認が要る点の無い確認候補をまとめて記録にする (職員の対話操作のみ)
     * POST /api/robotics/observations/review-batch / scope robot-tasks:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postObservationsReviewBatch(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ロボットの事業所の平面図と、利用者がいつもいる場所 (ロボット用。ID と場所のコードだけ。氏名は返さない)
     * GET /api/robotics/robot-floor-plans / scope robots:act / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getRobotFloorPlans(args?: { robotId?: string; facilityId?: string }): Promise<unknown>;
    /** ロボットの一覧 (最新の死活情報つき)
     * GET /api/robotics/robots / scope robots:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getRobots(args?: { facilityId?: string; status?: string; capability?: string }): Promise<unknown>;
    /** ロボットを登録 (トークンからの登録は停止状態で作られ、有効化は人が行う)
     * POST /api/robotics/robots / scope robots:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postRobots(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ロボットを 1 件
     * GET /api/robotics/robots/{id} / scope robots:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getRobotsById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** ロボットの登録内容を更新 (能力・紐づけの変更は人のみ)
     * PATCH /api/robotics/robots/{id} / scope robots:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    patchRobotsById(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ロボットを削除 (論理削除。人のみ)
     * DELETE /api/robotics/robots/{id} / scope robots:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteRobotsById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** ロボットの死活通知 (停止中なら停止指示を返す)
     * POST /api/robotics/robots/{id}/heartbeat / scope robots:act / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postRobotsByIdHeartbeat(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ロボットに適用される方針 (必要な同意・承認が要る作業・承認の有効期間)
     * GET /api/robotics/robots/{id}/policy / scope robots:act / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getRobotsByIdPolicy(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** ロボットの状態を変更 (有効化と廃止は人のみ。停止・保守はトークンでも可)
     * POST /api/robotics/robots/{id}/status / scope robots:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postRobotsByIdStatus(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ロボット相談の一覧
     * GET /api/robotics/sessions / scope robot-sessions:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getSessions(args?: { facilityId?: string; status?: string; sessionType?: string; masterUserId?: string; robotId?: string; from?: string; to?: string; limit?: number }): Promise<unknown>;
    /** ロボット相談の記録を送る (ロボット用。要約は下書き、兆候は職員へアラート)
     * POST /api/robotics/sessions / scope robots:act / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postSessions(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ロボット相談を 1 件
     * GET /api/robotics/sessions/{id} / scope robot-sessions:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getSessionsById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** ロボット相談を確認 (採用で支援経過を作成、または却下。職員の対話操作のみ)
     * POST /api/robotics/sessions/{id}/review / scope robot-sessions:review / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postSessionsByIdReview(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ロボット作業の一覧
     * GET /api/robotics/tasks / scope robot-tasks:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getTasks(args?: { facilityId?: string; date?: string; from?: string; to?: string; status?: string; taskType?: string; robotId?: string; masterUserId?: string; limit?: number }): Promise<unknown>;
    /** ロボット作業を作成 (下書き)
     * POST /api/robotics/tasks / scope robot-tasks:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postTasks(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ロボット作業を 1 件
     * GET /api/robotics/tasks/{id} / scope robot-tasks:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getTasksById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** ロボット作業を編集 (下書き・差し戻しのみ)
     * PATCH /api/robotics/tasks/{id} / scope robot-tasks:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    patchTasksById(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 作業の中止を報告 (ロボット用。職員へアラート)
     * POST /api/robotics/tasks/{id}/abort / scope robots:act / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postTasksByIdAbort(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ロボット作業を承認 (確認項目すべて済み・同意あり。職員の対話操作のみ)
     * POST /api/robotics/tasks/{id}/approve / scope robot-tasks:approve / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postTasksByIdApprove(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ロボット作業を取り消す
     * POST /api/robotics/tasks/{id}/cancel / scope robot-tasks:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postTasksByIdCancel(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 取消を受け取ったことと、そのときの状態を報告する (ロボット用)
     * POST /api/robotics/tasks/{id}/cancel-ack / scope robots:act / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postTasksByIdCancelAck(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 作業を引き受ける (ロボット用。承認の期限内のみ)
     * POST /api/robotics/tasks/{id}/claim / scope robots:act / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postTasksByIdClaim(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 作業の完了を報告 (ロボット用。結果は下書き扱い)
     * POST /api/robotics/tasks/{id}/complete / scope robots:act / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postTasksByIdComplete(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 作業の緊急停止を報告 (ロボット用。重大アラート)
     * POST /api/robotics/tasks/{id}/emergency / scope robots:act / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postTasksByIdEmergency(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 作業の失敗を報告 (ロボット用。職員へアラート)
     * POST /api/robotics/tasks/{id}/fail / scope robots:act / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postTasksByIdFail(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 作業を一時停止 (ロボット用)
     * POST /api/robotics/tasks/{id}/pause / scope robots:act / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postTasksByIdPause(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 作業の進み具合を報告 (ロボット用。状態は変えない)
     * POST /api/robotics/tasks/{id}/progress / scope robots:act / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postTasksByIdProgress(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 終了した作業から支援経過の下書きを作る (職員の対話操作のみ)
     * POST /api/robotics/tasks/{id}/record-draft / scope robot-tasks:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postTasksByIdRecordDraft(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ロボット作業を差し戻す (職員の対話操作のみ)
     * POST /api/robotics/tasks/{id}/reject / scope robot-tasks:approve / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postTasksByIdReject(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 引き受けた作業を手放す (ロボット用)
     * POST /api/robotics/tasks/{id}/release / scope robots:act / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postTasksByIdRelease(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 作業を再開 (ロボット用)
     * POST /api/robotics/tasks/{id}/resume / scope robots:act / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postTasksByIdResume(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 作業を開始 (ロボット用。同意と承認をその場で再確認)
     * POST /api/robotics/tasks/{id}/start / scope robots:act / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postTasksByIdStart(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ロボットが持っていた作業の今の状態を読み直す (再起動・応答消失の後。ロボット用)
     * GET /api/robotics/tasks/{id}/state / scope robots:act / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getTasksByIdState(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** ロボット作業を提出 (承認待ち、または承認不要なら実施可)
     * POST /api/robotics/tasks/{id}/submit / scope robot-tasks:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postTasksByIdSubmit(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ロボットが今日引き受けられる作業と実行中の作業 (ロボット用)
     * GET /api/robotics/tasks/queue / scope robots:act / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getTasksQueue(args: { robotId: string; date?: string; facilityId?: string }): Promise<unknown>;
  };
  selfInspections: {
    /** list (facilityId/from/to/category/
     * GET /api/self-inspections / scope self-inspections:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: items / 模擬サーバ: 無し (501) */
    get(args?: { facilityId?: string }): Promise<unknown>;
    /** create (native only)
     * POST /api/self-inspections / scope self-inspections:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    post(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** single record
     * GET /api/self-inspections/{id} / scope self-inspections:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** update (native only; the merged record
     * PUT /api/self-inspections/{id} / scope self-inspections:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putById(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** soft delete (native only)
     * DELETE /api/self-inspections/{id} / scope self-inspections:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteById(args: { id: string; facilityId?: string }): Promise<unknown>;
  };
  serviceCodeMaster: {
    /** サービスコードマスタ (アプリ用) の一覧
     * GET /api/service-code-master/v1 / scope service-code-master:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: items / 模擬サーバ: 無し (501) */
    getV1(args?: { facilityId?: string }): Promise<unknown>;
    /** サービスコードマスタを登録
     * POST /api/service-code-master/v1 / scope service-code-master:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** サービスコードマスタを 1 件取得
     * GET /api/service-code-master/v1/{id} / scope service-code-master:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getV1ById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** サービスコードマスタを更新
     * PUT /api/service-code-master/v1/{id} / scope service-code-master:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putV1ById(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** サービスコードマスタを削除 (管理操作)
     * DELETE /api/service-code-master/v1/{id} / scope service-code-master:delete / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteV1ById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** Bulk import (admin only). Body: { items: ServiceCodeMasterEntry[] }
     * POST /api/service-code-master/v1/import / scope service-code-master:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1Import(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  shifts: {
    /** シフト計画の一覧
     * GET /api/shifts/plans / scope shifts:read / 認証 both / facilityId 必須 / 実測 200 (2026-09-27) 応答の項目: createdAt, createdBy, facilityId, finalizedAt, finalizedBy, id, organizationId, publishedAt, revision, status, targetMonth, updatedAt / 模擬サーバ: あり */
    getPlans(args: { facilityId: string; targetMonth?: string; scope?: string }): Promise<unknown>;
    /** シフト計画を作成
     * POST /api/shifts/plans / scope shifts:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: あり (本文の形は spec/cpos-api.yaml。本物で実測) */
    postPlans(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** シフト計画を 1 件 (割当を含む)
     * GET /api/shifts/plans/{id} / scope shifts:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: assignments, conflicts, plan / 模擬サーバ: あり */
    getPlansById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 割当の置換 (1 計画分をまとめて更新) + 変更履歴。 会社全体計画では割当ごとに facilityId (配置先事業所) を指定できる。
     * PUT /api/shifts/plans/{id}/assignments / scope shifts:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: あり (本文の形は spec/cpos-api.yaml。本物で実測) */
    putPlansByIdAssignments(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** シフト計画を確定
     * POST /api/shifts/plans/{id}/finalize / scope shifts:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: あり */
    postPlansByIdFinalize(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** シフト計画の変更履歴
     * GET /api/shifts/plans/{id}/history / scope shifts:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: after, before, changedAt, changedBy, id, planId, reason / 模擬サーバ: あり */
    getPlansByIdHistory(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** シフト計画を公開 (職員に見せる)
     * POST /api/shifts/plans/{id}/publish / scope shifts:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: あり */
    postPlansByIdPublish(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 勤務希望の一覧 (月・職員)
     * GET /api/shifts/preferences / scope shifts:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: constraints, createdAt, facilityId, id, note, organizationId, preferredDays, status, submittedAt, targetMonth, unavailableDays, updatedAt … / 模擬サーバ: あり */
    getPreferences(args?: { facilityId?: string }): Promise<unknown>;
    /** 勤務希望を保存 (下書き)
     * POST /api/shifts/preferences / scope shifts:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: あり (本文の形は spec/cpos-api.yaml。本物で実測) */
    postPreferences(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 勤務希望を提出
     * POST /api/shifts/preferences/{id}/submit / scope shifts:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: あり */
    postPreferencesByIdSubmit(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 勤務区分マスタ
     * GET /api/shifts/shift-types / scope shifts:read / 認証 both / facilityId 必須 / 実測 200 (2026-09-27) 応答の項目: breakMinutes, category, code, color, createdAt, endTime, facilityId, id, isActive, name, note, organizationId … / 模擬サーバ: あり */
    getShiftTypes(args: { facilityId: string; includeInactive?: boolean }): Promise<unknown>;
    /** 勤務区分を登録
     * POST /api/shifts/shift-types / scope shifts:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: あり (本文の形は spec/cpos-api.yaml。本物で実測) */
    postShiftTypes(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 勤務区分を削除
     * DELETE /api/shifts/shift-types/{id} / scope shifts:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: あり */
    deleteShiftTypesById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 必要人員 (曜日別)
     * GET /api/shifts/staffing-requirements / scope shifts:read / 認証 both / facilityId 必須 / 実測 200 (2026-09-27) だが 0 件で項目名は未確認 (推測しない) / 模擬サーバ: あり */
    getStaffingRequirements(args: { facilityId: string; dayOfWeek?: string; includeInactive?: boolean }): Promise<unknown>;
    /** 必要人員 (曜日別) を登録
     * POST /api/shifts/staffing-requirements / scope shifts:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: あり (本文の形は spec/cpos-api.yaml。本物で実測) */
    postStaffingRequirements(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 必要人員を削除
     * DELETE /api/shifts/staffing-requirements/{id} / scope shifts:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: あり */
    deleteStaffingRequirementsById(args: { id: string; facilityId?: string }): Promise<unknown>;
  };
  sources: {
    /** 取り込んだ文書 (ソース) の一覧 (利用者・種類で絞る)
     * GET /api/sources / scope sources:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: items, nextCursor / 模擬サーバ: 無し (501) */
    get(args?: { facilityId?: string }): Promise<unknown>;
    /** 手入力のソースを作成 (なんでもボックス: 口頭・メモ・電話記録)
     * POST /api/sources / scope sources:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    post(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 項目抽出の結果
     * GET /api/sources/{sourceId}/extractions / scope sources:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: items / 模擬サーバ: 無し (501) */
    getBySourceIdExtractions(args: { sourceId: string; facilityId?: string }): Promise<unknown>;
    /** ソースから項目抽出を実行
     * POST /api/sources/{sourceId}/extractions / scope sources:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postBySourceIdExtractions(args: { sourceId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ソースの分類・関係者・発生日などを後から付ける
     * PATCH /api/sources/{sourceId}/metadata / scope sources:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    patchBySourceIdMetadata(args: { sourceId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** OCR の結果
     * GET /api/sources/{sourceId}/ocr / scope sources:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: items / 模擬サーバ: 無し (501) */
    getBySourceIdOcr(args: { sourceId: string; facilityId?: string }): Promise<unknown>;
    /** ソースの OCR を実行
     * POST /api/sources/{sourceId}/ocr / scope sources:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postBySourceIdOcr(args: { sourceId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ソースの本文テキスト (OCR / 抽出済み)
     * GET /api/sources/{sourceId}/text / scope sources:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: createdAt, sourceId, text, title / 模擬サーバ: 無し (501) */
    getBySourceIdText(args: { sourceId: string; facilityId?: string }): Promise<unknown>;
  };
  staffingStandards: {
    /** … 登録済み基準の一覧
     * GET /api/staffing-standards / scope staffing-standards:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: items / 模擬サーバ: あり */
    get(args?: { facilityId?: string }): Promise<unknown>;
    /** … 1 件取得
     * GET /api/staffing-standards/{facilityId}/{serviceTypeCode} / scope staffing-standards:read / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getByFacilityIdByServiceTypeCode(args: { facilityId: string; serviceTypeCode: string }): Promise<unknown>;
    /** … 登録・更新
     * PUT /api/staffing-standards/{facilityId}/{serviceTypeCode} / scope staffing-standards:write / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putByFacilityIdByServiceTypeCode(args: { facilityId: string; serviceTypeCode: string; body?: unknown }): Promise<unknown>;
    /** … 削除
     * DELETE /api/staffing-standards/{facilityId}/{serviceTypeCode} / scope staffing-standards:write / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteByFacilityIdByServiceTypeCode(args: { facilityId: string; serviceTypeCode: string }): Promise<unknown>;
    /** 人員配置基準の充足判定
     * GET /api/staffing-standards/{facilityId}/{serviceTypeCode}/compliance / scope staffing-standards:read / 認証 both / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getByFacilityIdByServiceTypeCodeCompliance(args: { facilityId: string; serviceTypeCode: string }): Promise<unknown>;
    /** … 制度別の基準テンプレート (法令 seed)
     * GET /api/staffing-standards/catalog / scope staffing-standards:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: entries / 模擬サーバ: 無し (501) */
    getCatalog(args?: { facilityId?: string }): Promise<unknown>;
  };
  trainings: {
    /** list (facilityId/from/to/trainingType
     * GET /api/trainings / scope trainings:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: items / 模擬サーバ: あり */
    get(args?: { facilityId?: string }): Promise<unknown>;
    /** create (native only)
     * POST /api/trainings / scope trainings:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    post(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** single record
     * GET /api/trainings/{id} / scope trainings:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** update (native only)
     * PUT /api/trainings/{id} / scope trainings:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putById(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** soft delete (native only)
     * DELETE /api/trainings/{id} / scope trainings:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteById(args: { id: string; facilityId?: string }): Promise<unknown>;
  };
  transport: {
    /** 送迎計画の一覧
     * GET /api/transport/plans / scope transport:read / 認証 both / facilityId 必須 / 実測 200 (2026-09-27) 応答の項目: createdAt, createdBy, facilityId, id, organizationId, serviceDate, source, status, summary, trips, updatedAt, versionNo / 模擬サーバ: 無し (501) */
    getPlans(args: { facilityId: string; serviceDate?: string }): Promise<unknown>;
    /** 送迎計画を作成
     * POST /api/transport/plans / scope transport:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postPlans(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 送迎計画を 1 件 (停車・乗務員を含む)
     * GET /api/transport/plans/{id} / scope transport:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: plan, stops, vehicles, warnings / 模擬サーバ: 無し (501) */
    getPlansById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 送迎計画を有効にする
     * POST /api/transport/plans/{id}/activate / scope transport:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postPlansByIdActivate(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 乗務員 (ドライバー / 添乗) の割当を「事業所ごとに」置換する。 body: { facilityId, entries: TransportCrewEntry[] } シフト管理アプリの 1 日業務分担表の保存 (清書) が書き込む。停車・便メタ (送迎アプリが PUT /stops で置換) とは所有が異なるた
     * PUT /api/transport/plans/{id}/crew / scope transport:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putPlansByIdCrew(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ドライバー・添乗者から見た当日の運行 (分担表が使う)。 送迎アプリは車両から見る / 分担表は職員から見る。データは同じ 1 つ。
     * GET /api/transport/plans/{id}/crew-view / scope transport:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: facilityId, joint, planId, runs, serviceDate, unassigned / 模擬サーバ: 無し (501) */
    getPlansByIdCrewView(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 乗降・GPS の実績を足す。同じ出来事は何度送っても 1 件 (オフライン再送)。
     * POST /api/transport/plans/{id}/events / scope transport:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postPlansByIdEvents(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 自事業所の利用者の停車だけを入れ替える (混合配送)
     * PUT /api/transport/plans/{id}/facility-stops / scope transport:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putPlansByIdFacilityStops(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 混合配送に事業所を加える。加えた事業所は自分の利用者の停車を書けるようになる。
     * POST /api/transport/plans/{id}/join / scope transport:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postPlansByIdJoin(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 送迎計画の指標 (台数・人数・所要時間)
     * GET /api/transport/plans/{id}/kpi / scope transport:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: tripCount, unassignedCount, userCount, vehicleCount, warningsCount / 模擬サーバ: 無し (501) */
    getPlansByIdKpi(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 1 停車の車両/順序変更 (manual move)。
     * POST /api/transport/plans/{id}/manual-move / scope transport:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postPlansByIdManualMove(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 実績のまとめ読み (ドライバー画面・分担表の両方が使う)。
     * GET /api/transport/plans/{id}/run / scope transport:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getPlansByIdRun(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 停車をまとめて置換 + summary 更新。body: { stops, trips?, facilityIds? } trips は便メタ (出発/到着時刻)、facilityIds は共同配送の参加事業所の更新。
     * PUT /api/transport/plans/{id}/stops / scope transport:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putPlansByIdStops(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 未割当の利用者に号車を提案する (**書き込まない**)。 本格的な経路最適化は送迎アプリが持つ。ここは定員・車いす枠・同じ住所を 守る決定論の下ごしらえで、どのアプリから呼んでも同じ答えになる。
     * GET /api/transport/plans/{id}/suggest / scope transport:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: seats, suggestions, unassigned / 模擬サーバ: 無し (501) */
    getPlansByIdSuggest(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 車両の走行記録 (出庫・帰庫のメーター)。号車ごとに 1 件。
     * PUT /api/transport/plans/{id}/vehicle-logs / scope transport:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putPlansByIdVehicleLogs(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 送迎車両の一覧
     * GET /api/transport/vehicles / scope transport:read / 認証 both / facilityId 必須 / 実測 200 (2026-09-27) 応答の項目: capacity, createdAt, facilityId, garageAddress, garageLat, garageLng, id, isActive, name, organizationId, updatedAt, wheelchairCapacity / 模擬サーバ: 無し (501) */
    getVehicles(args: { facilityId: string }): Promise<unknown>;
    /** 送迎車両を登録
     * POST /api/transport/vehicles / scope transport:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postVehicles(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 送迎車両を 1 件
     * GET /api/transport/vehicles/{id} / scope transport:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: capacity, createdAt, facilityId, garageAddress, garageLat, garageLng, id, isActive, name, organizationId, updatedAt, wheelchairCapacity / 模擬サーバ: 無し (501) */
    getVehiclesById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 送迎車両を更新
     * PUT /api/transport/vehicles/{id} / scope transport:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putVehiclesById(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 送迎車両を削除
     * DELETE /api/transport/vehicles/{id} / scope transport:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteVehiclesById(args: { id: string; facilityId?: string }): Promise<unknown>;
  };
  triggers: {
    /** 定時タスク (使わない): アプリ内のバックアップは 2026-10-29 に止めた。何も実行せず件数 0 で返す
     * POST /api/triggers/tasks/backup-due / 認証 none / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postTasksBackupDue(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 継続アセスメント: 未処理の変更を対象ごとにまとめる
     * POST /api/triggers/tasks/care-review-detect / 認証 none / 応答の形あり / 模擬サーバ: 無し (501) */
    postTasksCareReviewDetect(args: { body: unknown; facilityId?: string }): Promise<unknown>;
    /** 継続アセスメント: 時刻の来た準備処理を進め完了まで待つ
     * POST /api/triggers/tasks/care-review-due / 認証 none / 応答の形あり / 模擬サーバ: 無し (501) */
    postTasksCareReviewDue(args: { body: unknown; facilityId?: string }): Promise<unknown>;
    /** 継続アセスメント: 情報源の取りこぼしを照合する
     * POST /api/triggers/tasks/care-review-reconcile / 認証 none / 応答の形あり / 模擬サーバ: 無し (501) */
    postTasksCareReviewReconcile(args: { body: unknown; facilityId?: string }): Promise<unknown>;
    /** 定時タスク: 事業所の変更 (サテライトの統合・作成) の時刻が来た実行を始め、動いている実行を進める (件数だけ返す)
     * POST /api/triggers/tasks/facility-changes-due / 認証 none / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postTasksFacilityChangesDue(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 定時タスク: 月の固定基準の候補を事業所ごとに作る (月初の一括。件数だけ返す。採用はしない)
     * POST /api/triggers/tasks/month-baseline-candidates / 認証 none / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postTasksMonthBaselineCandidates(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 承認した評価からサービス計画の下書きを準備する
     * POST /api/triggers/tasks/service-plan-preparation-due / 認証 none / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postTasksServicePlanPreparationDue(args: { body: unknown; facilityId?: string }): Promise<unknown>;
    /** 共通取り込みの永続読み取りジョブを進める
     * POST /api/triggers/tasks/source-extraction-due / 認証 none / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postTasksSourceExtractionDue(args: { body: unknown; facilityId?: string }): Promise<unknown>;
    /** 定時タスク: 本番データのコピー (ステージングだけ) の予約・定期実行を始め、実行中のコピーを進める
     * POST /api/triggers/tasks/staging-copy-due / 認証 none / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postTasksStagingCopyDue(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  userGroups: {
    /** 利用者セット (任意のグループ) の一覧
     * GET /api/user-groups / scope user-groups:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: groups, ok / 模擬サーバ: 無し (501) */
    get(args?: { facilityId?: string }): Promise<unknown>;
    /** 利用者セットを作成
     * POST /api/user-groups / scope user-groups:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    post(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 利用者セットを 1 件取得
     * GET /api/user-groups/{id} / scope user-groups:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 利用者セットを更新
     * PATCH /api/user-groups/{id} / scope user-groups:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    patchById(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 利用者セットを削除
     * DELETE /api/user-groups/{id} / scope user-groups:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteById(args: { id: string; facilityId?: string }): Promise<unknown>;
  };
  userIdMaintenance: {
    /** 別の人の過去の番号を、いま別の人が持っているもの (番号の重なり) を一覧にする (書き込みなし)
     * GET /api/user-id-maintenance/v1/alias-collisions / scope master-users:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1AliasCollisions(args?: { facilityId?: string }): Promise<unknown>;
    /** mu の直し (付け違い・統合で取り残された記録) の下見で、誰の記録が何件直る予定かを氏名付きで返す (書き込みなし)
     * GET /api/user-id-maintenance/v1/repair-people / scope master-users:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1RepairPeople(args?: { facilityId?: string }): Promise<unknown>;
    /** 利用者が紐づいていないアプリの記録を氏名でまとめ、候補の利用者を返す (書き込みなし)
     * GET /api/user-id-maintenance/v1/unlinked-app-data / scope master-users:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1UnlinkedAppData(args?: { facilityId?: string }): Promise<unknown>;
    /** 人が選んだ利用者に記録を紐づける (封筒の insuredNumber / masterUserId だけ)
     * POST /api/user-id-maintenance/v1/unlinked-app-data/link / scope master-users:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1UnlinkedAppDataLink(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  userListImport: {
    /** 利用者一覧ファイルの列を解析 (書き込まない)
     * POST /api/user-list-import/analyze / scope user-list-import:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postAnalyze(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 利用者一覧を利用者マスタへ取込
     * POST /api/user-list-import/apply / scope user-list-import:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postApply(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 利用者一覧取込のプレビュー (書き込まない)
     * POST /api/user-list-import/preview / scope user-list-import:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postPreview(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  visitCheckins: {
    /** 訪問チェックインの一覧
     * GET /api/visit-checkins / scope visit-checkins:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: items / 模擬サーバ: 無し (501) */
    get(args?: { facilityId?: string }): Promise<unknown>;
    /** 訪問チェックインを登録 (位置・時刻)
     * POST /api/visit-checkins / scope visit-checkins:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    post(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  visitNursingInstructions: {
    /** 訪問看護指示書の一覧 (事業所・利用者・種類・有効日で絞る)
     * GET /api/visit-nursing-instructions/v1 / scope care-claim-candidates:read / 認証 both / 実測 200 (2026-09-27) 応答の項目: items / 模擬サーバ: 無し (501) */
    getV1(args?: { facilityId?: string }): Promise<unknown>;
    /** 訪問看護指示書を登録
     * POST /api/visit-nursing-instructions/v1 / scope care-claim-candidates:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 訪問看護指示書を更新
     * PUT /api/visit-nursing-instructions/v1/{id} / scope care-claim-candidates:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putV1ById(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 訪問看護指示書を削除
     * DELETE /api/visit-nursing-instructions/v1/{id} / scope care-claim-candidates:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteV1ById(args: { id: string; facilityId?: string }): Promise<unknown>;
  };
  welfareEquipment: {
    /** 利用者・種目ごとの集計 (管理帳票)
     * GET /api/welfare-equipment/aggregate / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getAggregate(args?: { facilityId?: string }): Promise<unknown>;
    /** 全国平均・上限価格を 1 件手入力
     * PUT /api/welfare-equipment/benchmarks / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putBenchmarks(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 公表の全国平均・上限価格を取込 (既定は自社マスターにある TAIS のぶんだけ)
     * POST /api/welfare-equipment/benchmarks/import / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postBenchmarksImport(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 自社マスター全体の上限超過チェック (改定月の総点検)
     * GET /api/welfare-equipment/ceiling-check / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getCeilingCheck(args?: { facilityId?: string }): Promise<unknown>;
    /** 計画書・モニタリングを登録済み様式 xlsx に差し込んで返す
     * POST /api/welfare-equipment/export / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postExport(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 導入している用具 (貸与・販売) の一覧
     * GET /api/welfare-equipment/loans / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getLoans(args?: { facilityId?: string }): Promise<unknown>;
    /** 導入用具を登録・更新
     * PUT /api/welfare-equipment/loans / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putLoans(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 導入用具の一覧 CSV (Excel でそのまま開ける)
     * GET /api/welfare-equipment/loans.csv / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getLoansCsv(args?: { facilityId?: string }): Promise<unknown>;
    /** 導入用具を削除
     * DELETE /api/welfare-equipment/loans/{id} / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteLoansById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 福祉用具の種目・様式のメタ定義 (画面が入力欄を組み立てる)
     * GET /api/welfare-equipment/meta / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getMeta(args?: { facilityId?: string }): Promise<unknown>;
    /** モニタリング期日の一覧 (期限切れ・間近)
     * GET /api/welfare-equipment/monitoring-due / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getMonitoringDue(args?: { facilityId?: string }): Promise<unknown>;
    /** モニタリング記録の一覧
     * GET /api/welfare-equipment/monitorings / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getMonitorings(args?: { facilityId?: string }): Promise<unknown>;
    /** モニタリング記録を登録・更新
     * PUT /api/welfare-equipment/monitorings / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putMonitorings(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** モニタリング記録を削除
     * DELETE /api/welfare-equipment/monitorings/{id} / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteMonitoringsById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** ニーズ分析の下書きを AI で作る
     * POST /api/welfare-equipment/needs-analysis / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postNeedsAnalysis(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具サービス計画の一覧
     * GET /api/welfare-equipment/plans / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getPlans(args?: { facilityId?: string }): Promise<unknown>;
    /** 福祉用具サービス計画を登録・更新
     * PUT /api/welfare-equipment/plans / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putPlans(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具サービス計画を 1 件取得
     * GET /api/welfare-equipment/plans/{id} / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getPlansById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 福祉用具サービス計画を削除
     * DELETE /api/welfare-equipment/plans/{id} / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deletePlansById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 確定した計画の採用品目を導入用具へ反映 (納品時。何度押しても増えない。body の idempotencyKey で再送も同じ結果)
     * POST /api/welfare-equipment/plans/{id}/apply-loans / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postPlansByIdApplyLoans(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具の上限価格チェック
     * GET /api/welfare-equipment/price-check / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getPriceCheck(args: { taisCode: string; ownPrice?: number; month?: string; productId?: string; loanId?: string; facilityId?: string }): Promise<unknown>;
    /** 福祉用具の商品一覧
     * GET /api/welfare-equipment/products / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getProducts(args?: { facilityId?: string }): Promise<unknown>;
    /** 商品マスターを 1 件登録・更新
     * PUT /api/welfare-equipment/products / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putProducts(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 商品マスターを 1 件削除
     * DELETE /api/welfare-equipment/products/{id} / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteProductsById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 自社の価格表・商品マスターを一括取込 (Excel 貼り付け / CSV。TAIS コード優先で突合)
     * POST /api/welfare-equipment/products/import / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postProductsImport(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 登録済みの様式 (xlsx) の一覧
     * GET /api/welfare-equipment/templates / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getTemplates(args?: { facilityId?: string }): Promise<unknown>;
    /** 様式 (xlsx) を登録・更新
     * PUT /api/welfare-equipment/templates / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putTemplates(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 様式を削除
     * DELETE /api/welfare-equipment/templates/{id} / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteTemplatesById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 利用者の共通評価の一覧 (読み取りのみ。本文は返さない)
     * GET /api/welfare-equipment/v2/assessments / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2Assessments(args?: { facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 共通評価を課題分析標準項目 23 項目の観測として開く (未対応の欄も返す)
     * GET /api/welfare-equipment/v2/assessments/{documentId} / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2AssessmentsByDocumentId(args: { documentId: string; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 様式の欄と標準項目の分類の対応を人が決める (推測で保存しない)
     * POST /api/welfare-equipment/v2/assessments/mappings / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2AssessmentsMappings(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 個体の一覧 (出荷可否つき)
     * GET /api/welfare-equipment/v2/assets / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2Assets(args?: { facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 個体の移動履歴
     * GET /api/welfare-equipment/v2/assets/{assetId}/movements / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2AssetsByAssetIdMovements(args: { assetId: string; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 個体の移動記録 (回収は点検待ちへ。点検待ちのまま出荷しない)
     * POST /api/welfare-equipment/v2/assets/{assetId}/movements / scope welfare-equipment:stock-manage / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2AssetsByAssetIdMovements(args: { assetId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 利用者ごとの担当者の一覧 (主担当・共同担当)
     * GET /api/welfare-equipment/v2/assignments / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2Assignments(args?: { facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 利用者 1 人の担当者を決める (無ければ作る。idempotencyKey 必須)
     * POST /api/welfare-equipment/v2/assignments / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2Assignments(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 担当者の詳細 (他事業所の行は 404)
     * GET /api/welfare-equipment/v2/assignments/{assignmentId} / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2AssignmentsByAssignmentId(args: { assignmentId: string; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 担当者をまとめて設定 (未設定のみ / 選んだ人すべて を明示)
     * POST /api/welfare-equipment/v2/assignments/bulk / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2AssignmentsBulk(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 運営確認資料のまとめ (欠落を隠さない)
     * POST /api/welfare-equipment/v2/audit-packs / scope welfare-equipment:export / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2AuditPacks(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** この CPOS が提供する福祉用具契約の版と機能一覧 (未提供は missing)
     * GET /api/welfare-equipment/v2/capabilities / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2Capabilities(args?: { facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 利用者の居宅サービス計画の一覧 (読み取りのみ。本文は返さない)
     * GET /api/welfare-equipment/v2/care-plans / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2CarePlans(args?: { facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 居宅サービス計画の第2表を行に開く (判定できない行も返す)
     * GET /api/welfare-equipment/v2/care-plans/{carePlanId} / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2CarePlansByCarePlanId(args: { carePlanId: string; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 相談案件の一覧 (事業所内、担当・状態で絞り込み)
     * GET /api/welfare-equipment/v2/cases / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2Cases(args?: { facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 相談の受付 (被保険者番号が未確定でも可。idempotencyKey 必須)
     * POST /api/welfare-equipment/v2/cases / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2Cases(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 相談案件の詳細 (他事業所の案件は 404)
     * GET /api/welfare-equipment/v2/cases/{caseId} / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2CasesByCaseId(args: { caseId: string; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 相談案件の部分更新 (送った項目だけ変更。expectedVersion で版を突合)
     * PATCH /api/welfare-equipment/v2/cases/{caseId} / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    patchV2CasesByCaseId(args: { caseId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 相談案件の担当割当 (受付済みなら状態も担当割当へ進む)
     * POST /api/welfare-equipment/v2/cases/{caseId}/assign / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2CasesByCaseIdAssign(args: { caseId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 相談案件の状態遷移 (許可された遷移のみ。終了・中止は理由が必須)
     * POST /api/welfare-equipment/v2/cases/{caseId}/transition / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2CasesByCaseIdTransition(args: { caseId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 過去資料の数値の観測 (意味は人が決めるまで未判定)
     * GET /api/welfare-equipment/v2/commercial-observations / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2CommercialObservations(args?: { facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 数値列の意味を根拠つきで決める (承認済み価格にはしない)
     * POST /api/welfare-equipment/v2/commercial-observations/{observationId}/confirm-meaning / scope welfare-equipment:price-manage / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2CommercialObservationsByObservationIdConfirmMeaning(args: { observationId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 同意の一覧
     * GET /api/welfare-equipment/v2/consents / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2Consents(args?: { facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 同意の記録 (同意時点の本文 hash が必須)
     * POST /api/welfare-equipment/v2/consents / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2Consents(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 同意の取下げ (削除せず履歴を残す。理由が必須)
     * POST /api/welfare-equipment/v2/consents/{consentId}/withdraw / scope welfare-equipment:void / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2ConsentsByConsentIdWithdraw(args: { consentId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 契約明細の実額での上限照合 (マスタ価格ではなく合意額を使う)
     * POST /api/welfare-equipment/v2/contract-price-check / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2ContractPriceCheck(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 契約の一覧 (利用者・状態・案件で絞り込み)
     * GET /api/welfare-equipment/v2/contracts / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2Contracts(args?: { facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 契約の作成 (下書き。明細の行 ID は永続)
     * POST /api/welfare-equipment/v2/contracts / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2Contracts(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 契約の詳細
     * GET /api/welfare-equipment/v2/contracts/{contractId} / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2ContractsByContractId(args: { contractId: string; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 契約の部分更新 (内容は合意前のみ。状態は下書き ↔ 内容確認済み)
     * PATCH /api/welfare-equipment/v2/contracts/{contractId} / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    patchV2ContractsByContractId(args: { contractId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 契約の合意 (内容確認済み + 有効な同意が前提)
     * POST /api/welfare-equipment/v2/contracts/{contractId}/agree / scope welfare-equipment:contract-approve / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2ContractsByContractIdAgree(args: { contractId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 契約の改訂 (正本は上書きせず、改訂 draft を作る)
     * POST /api/welfare-equipment/v2/contracts/{contractId}/amend / scope welfare-equipment:contract-approve / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2ContractsByContractIdAmend(args: { contractId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 契約の終了 (理由が必須)
     * POST /api/welfare-equipment/v2/contracts/{contractId}/end / scope welfare-equipment:contract-approve / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2ContractsByContractIdEnd(args: { contractId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 交付の一覧 (交付済みかどうかは実施記録で判定)
     * GET /api/welfare-equipment/v2/document-deliveries / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2DocumentDeliveries(args?: { facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 交付の準備 (PDF の生成は交付ではない)
     * POST /api/welfare-equipment/v2/document-deliveries / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2DocumentDeliveries(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 交付の実施記録 (失敗も履歴に残す。失敗には理由が必須)
     * POST /api/welfare-equipment/v2/document-deliveries/{deliveryId}/record-attempt / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2DocumentDeliveriesByDeliveryIdRecordAttempt(args: { deliveryId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 書類一覧 (受領原本と自社文書を分け、出力と交付も分ける)
     * GET /api/welfare-equipment/v2/documents / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2Documents(args?: { facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 書き出せる種類と件数 (公表価格は選べる適用月つき)
     * GET /api/welfare-equipment/v2/exports / scope welfare-equipment:export / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2Exports(args?: { facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 取込と同じ形での書き出し (商品マスター / 全国平均・上限 / 現用具。bundle は 3 つまとめて)
     * GET /api/welfare-equipment/v2/exports/{dataset} / scope welfare-equipment:export / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2ExportsByDataset(args: { dataset: string; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 様式へ出力した控えの履歴 (出力は交付ではない)
     * GET /api/welfare-equipment/v2/form-renders / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2FormRenders(args?: { facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 登録済みの様式 (ファイル本体は返さない)
     * GET /api/welfare-equipment/v2/form-templates / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2FormTemplates(args?: { facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 確定した記録を登録様式へ差し込む (未記入の項目を隠さない)
     * POST /api/welfare-equipment/v2/form-templates/{templateId}/render / scope welfare-equipment:export / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2FormTemplatesByTemplateIdRender(args: { templateId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 他職種連携の一覧 (緊急時は案内つき)
     * GET /api/welfare-equipment/v2/handoffs / scope welfare-equipment:handoff-receive / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2Handoffs(args?: { facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 相談の送信 (目的を超える項目は共有しない。再送は 1 件に収束)
     * POST /api/welfare-equipment/v2/handoffs / scope welfare-equipment:handoff-send / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2Handoffs(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 連携の詳細 (限定共有要旨)
     * GET /api/welfare-equipment/v2/handoffs/{handoffId} / scope welfare-equipment:handoff-receive / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2HandoffsByHandoffId(args: { handoffId: string; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 結果の返答 (必要最小限。返答は解決ではない)
     * POST /api/welfare-equipment/v2/handoffs/{handoffId}/respond / scope welfare-equipment:handoff-receive / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2HandoffsByHandoffIdRespond(args: { handoffId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 受領・引受・対応中・完了 (送信には連絡した記録が必要)
     * POST /api/welfare-equipment/v2/handoffs/{handoffId}/transition / scope welfare-equipment:handoff-receive / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2HandoffsByHandoffIdTransition(args: { handoffId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 取込の結果 (行別。エラー・要確認も隠さない)
     * GET /api/welfare-equipment/v2/imports/{importId} / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2ImportsByImportId(args: { importId: string; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 取込の適用 (人の承認後。除外は理由つきで残す)
     * POST /api/welfare-equipment/v2/imports/{importId}/apply / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2ImportsByImportIdApply(args: { importId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 公表価格取込の適用月・データ種別の申告 (推測せず人が決める)
     * POST /api/welfare-equipment/v2/imports/{importId}/benchmark-options / scope welfare-equipment:price-manage / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2ImportsByImportIdBenchmarkOptions(args: { importId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: この取込で決まらない利用者 (寄せる / 新規登録 / 取り込まない を人が選ぶための一覧)
     * GET /api/welfare-equipment/v2/imports/{importId}/persons / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2ImportsByImportIdPersons(args: { importId: string; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: この取込に無い移行行を数える (下見) / 合言葉つきで消す (保守)
     * POST /api/welfare-equipment/v2/imports/{importId}/prune-absent / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2ImportsByImportIdPruneAbsent(args: { importId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 取込の下見 (原本を残し、1 件も書き込まない)
     * POST /api/welfare-equipment/v2/imports/preview / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2ImportsPreview(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 本人 ID の付け替え (統合で消えた ID の記録を、人が指定した利用者へ。理由必須)
     * POST /api/welfare-equipment/v2/imports/reassign-person / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2ImportsReassignPerson(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 取込で登録した利用者をこの事業所の名簿 (割当) に載せ直す (保守)
     * POST /api/welfare-equipment/v2/imports/roster-repair / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2ImportsRosterRepair(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 不具合・苦情の一覧
     * GET /api/welfare-equipment/v2/issues / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2Issues(args?: { facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 不具合の登録 (観察した事実が必須。重大なら緊急案内を返す)
     * POST /api/welfare-equipment/v2/issues / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2Issues(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 不具合の担当割当
     * POST /api/welfare-equipment/v2/issues/{issueId}/assign / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2IssuesByIssueIdAssign(args: { issueId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 不具合の完了 (措置の実施 + 対応後の確認が必要)
     * POST /api/welfare-equipment/v2/issues/{issueId}/resolve / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2IssuesByIssueIdResolve(args: { issueId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 業務知識の取込結果
     * GET /api/welfare-equipment/v2/knowledge/{knowledgeImportId} / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2KnowledgeByKnowledgeImportId(args: { knowledgeImportId: string; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 業務知識の適用 (候補・観測・文例を作る。商品マスタは作らない)
     * POST /api/welfare-equipment/v2/knowledge/{knowledgeImportId}/apply / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2KnowledgeByKnowledgeImportIdApply(args: { knowledgeImportId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 実績・選定理由の原本を交換形式へ変換する (氏名は落とす。1 件も保存しない)
     * POST /api/welfare-equipment/v2/knowledge/convert / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2KnowledgeConvert(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 過去資料からの業務知識の下見 (個人を含まない交換形式)
     * POST /api/welfare-equipment/v2/knowledge/preview / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2KnowledgePreview(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 納品・交換・回収の一覧
     * GET /api/welfare-equipment/v2/logistics / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2Logistics(args?: { facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 作業の登録 (現場の確認は未記録で始まる)
     * POST /api/welfare-equipment/v2/logistics / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2Logistics(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 作業の実施記録 (finalize で確定ゲートを通り、台帳を作る)
     * POST /api/welfare-equipment/v2/logistics/{jobId}/complete / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2LogisticsByJobIdComplete(args: { jobId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 納品明細の写真を 1 枚登録 (base64 JSON。本体は GCS、明細の photos に id を足す。実施完了の後も可)
     * POST /api/welfare-equipment/v2/logistics/{jobId}/lines/{lineId}/photos / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2LogisticsByJobIdLinesByLineIdPhotos(args: { jobId: string; lineId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 納品明細の写真 1 枚 (base64 JSON)
     * GET /api/welfare-equipment/v2/logistics/{jobId}/lines/{lineId}/photos/{photoId} / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2LogisticsByJobIdLinesByLineIdPhotosByPhotoId(args: { jobId: string; lineId: string; photoId: string; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 作業の予定登録
     * POST /api/welfare-equipment/v2/logistics/{jobId}/schedule / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2LogisticsByJobIdSchedule(args: { jobId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 保守作業の一覧
     * GET /api/welfare-equipment/v2/maintenance-jobs / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2MaintenanceJobs(args?: { facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 保守作業の登録 (結果は未実施で始まる)
     * POST /api/welfare-equipment/v2/maintenance-jobs / scope welfare-equipment:stock-manage / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2MaintenanceJobs(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 点検完了と出荷可能への解放 (結果の記録が必須)
     * POST /api/welfare-equipment/v2/maintenance-jobs/{jobId}/release / scope welfare-equipment:stock-manage / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2MaintenanceJobsByJobIdRelease(args: { jobId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 状態の語彙・価格版・課金ルール版 (未確認を確認済みに丸めない)
     * GET /api/welfare-equipment/v2/meta / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2Meta(args?: { facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 移行の適用 (checkpoint 再開。要確認は未確認のまま適用しない)
     * POST /api/welfare-equipment/v2/migration/{batchId}/apply / scope welfare-equipment:migration-manage / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2MigrationByBatchIdApply(args: { batchId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 移行の照合 (金額不明が残る限り一致としない)
     * POST /api/welfare-equipment/v2/migration/{batchId}/reconcile / scope welfare-equipment:migration-manage / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2MigrationByBatchIdReconcile(args: { batchId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 移行の dry-run (行別差分。1 件も書き込まない)
     * POST /api/welfare-equipment/v2/migration/preview / scope welfare-equipment:migration-manage / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2MigrationPreview(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 事業所別 writer の状態 (未設定は legacy 既定)
     * GET /api/welfare-equipment/v2/migration/writer / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2MigrationWriter(args?: { facilityId?: string }): Promise<unknown>;
    /** writer の切替 (Release Gate を満たす場合のみ)
     * POST /api/welfare-equipment/v2/migration/writer / scope welfare-equipment:migration-manage / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2MigrationWriter(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 確認 (モニタリング) の一覧。「一部確認」を「完了」と書かない要約つき
     * GET /api/welfare-equipment/v2/monitorings / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2Monitorings(args?: { facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 実施回の作成 (設置台帳から行を起こす。初期値は未確認)
     * POST /api/welfare-equipment/v2/monitorings / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2Monitorings(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 実施回の詳細
     * GET /api/welfare-equipment/v2/monitorings/{sessionId} / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2MonitoringsBySessionId(args: { sessionId: string; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 確認結果の記入 (下書き保存。義務には触れない)
     * PATCH /api/welfare-equipment/v2/monitorings/{sessionId} / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    patchV2MonitoringsBySessionId(args: { sessionId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 確認の確定 (確認した行の義務だけを履行済みにする)
     * POST /api/welfare-equipment/v2/monitorings/{sessionId}/finalize / scope welfare-equipment:monitoring-finalize / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2MonitoringsBySessionIdFinalize(args: { sessionId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 確定した確認の改訂 (正本は上書きしない)
     * POST /api/welfare-equipment/v2/monitorings/{sessionId}/revise / scope welfare-equipment:monitoring-finalize / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2MonitoringsBySessionIdRevise(args: { sessionId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 確認の訪問予定と担当 (予定を入れても期日は動かない)
     * POST /api/welfare-equipment/v2/monitorings/{sessionId}/schedule / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2MonitoringsBySessionIdSchedule(args: { sessionId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 確認の無効化 (無効化した確認で次回期日を後ろ倒しにしない)
     * POST /api/welfare-equipment/v2/monitorings/{sessionId}/void / scope welfare-equipment:void / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2MonitoringsBySessionIdVoid(args: { sessionId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 月次実績の計算 (未確認の課金ルールでは確定させない)
     * POST /api/welfare-equipment/v2/monthly-actuals/preview / scope welfare-equipment:billing-review / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2MonthlyActualsPreview(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 月次の締め (古い計算では締めない。確定できない行があれば締めない)
     * POST /api/welfare-equipment/v2/monthly-closes/{closeId}/close / scope welfare-equipment:billing-review / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2MonthlyClosesByCloseIdClose(args: { closeId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 請求候補への連携 (業務キーに再計算版を含めない)
     * POST /api/welfare-equipment/v2/monthly-closes/{closeId}/export / scope welfare-equipment:billing-review / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2MonthlyClosesByCloseIdExport(args: { closeId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 請求候補との突合 (件数だけでなく金額まで見る)
     * POST /api/welfare-equipment/v2/monthly-closes/{closeId}/reconcile / scope welfare-equipment:billing-review / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2MonthlyClosesByCloseIdReconcile(args: { closeId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 締め直し (理由が必須。送出済みの記録は消さない)
     * POST /api/welfare-equipment/v2/monthly-closes/{closeId}/reopen / scope welfare-equipment:billing-review / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2MonthlyClosesByCloseIdReopen(args: { closeId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 確認義務の一覧 (制度期限・計画期日・臨時期限の最早で並ぶ)
     * GET /api/welfare-equipment/v2/obligations / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2Obligations(args?: { facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 確認義務の延期 (法定の初回期限は超えられない)
     * POST /api/welfare-equipment/v2/obligations/{obligationId}/reschedule / scope welfare-equipment:monitoring-finalize / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2ObligationsByObligationIdReschedule(args: { obligationId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 発注の一覧
     * GET /api/welfare-equipment/v2/orders / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2Orders(args?: { facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 発注の作成 (仕入先の回答は未回答で始まる)
     * POST /api/welfare-equipment/v2/orders / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2Orders(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 発注の確定 (承認と送信をまとめて進める。段は状態機械のまま)
     * POST /api/welfare-equipment/v2/orders/{orderId}/confirm / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2OrdersByOrderIdConfirm(args: { orderId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 発注の入庫 (直送は自社入庫しない)
     * POST /api/welfare-equipment/v2/orders/{orderId}/receive / scope welfare-equipment:stock-manage / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2OrdersByOrderIdReceive(args: { orderId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 未送信・再送待ちの連携イベント (定期処理が読む)
     * GET /api/welfare-equipment/v2/outbox / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2Outbox(args?: { facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 連携イベントの再送 (登録済みの配信先のみ。二重配信しない)
     * POST /api/welfare-equipment/v2/outbox/{eventId}/deliver / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2OutboxByEventIdDeliver(args: { eventId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 設置台帳の一覧 (同じ商品 2 個は 2 行)
     * GET /api/welfare-equipment/v2/placements / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2Placements(args?: { facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 台帳 1 行の訂正 (移行した行の設置場所・数量・期間・月額。月額は結び付いた契約行にも書く)
     * PATCH /api/welfare-equipment/v2/placements/{placementId} / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    patchV2PlacementsByPlacementId(args: { placementId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 台帳 1 行の履歴 (由来の納品と個体の移動)
     * GET /api/welfare-equipment/v2/placements/{placementId}/history / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2PlacementsByPlacementIdHistory(args: { placementId: string; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 計画書の下書きを作る (空、または過去の計画書の本文を写す。本人の識別と計画期間は写さない)
     * POST /api/welfare-equipment/v2/plans / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2Plans(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 計画書の下書き保存 (不足があっても保存でき、確定だけを止める)
     * PATCH /api/welfare-equipment/v2/plans/{documentId} / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    patchV2PlansByDocumentId(args: { documentId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 計画書の確定 (確定済みは上書きせず改訂する)
     * POST /api/welfare-equipment/v2/plans/{documentId}/approve / scope welfare-equipment:plan-approve / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2PlansByDocumentIdApprove(args: { documentId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: AI 下書きの根拠をサーバが組み立てて返す (呼び元の資料 ID は使わない)
     * GET /api/welfare-equipment/v2/plans/{documentId}/draft-context / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2PlansByDocumentIdDraftContext(args: { documentId: string; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: AI の提案を検査して預かる (許可外の欄・入力に無い根拠は理由つきで拒む)
     * POST /api/welfare-equipment/v2/plans/{documentId}/draft-jobs / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2PlansByDocumentIdDraftJobs(args: { documentId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 生成ジョブの状態と提案を読む
     * GET /api/welfare-equipment/v2/plans/{documentId}/draft-jobs/{jobId} / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2PlansByDocumentIdDraftJobsByJobId(args: { documentId: string; jobId: string; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 採用・修正した文章を下書きへ反映する (未確認・却下は入らない)
     * POST /api/welfare-equipment/v2/plans/{documentId}/draft-jobs/{jobId}/apply / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2PlansByDocumentIdDraftJobsByJobIdApply(args: { documentId: string; jobId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 提案を項目ごとに採用・修正・却下する (まとめて採用にしない)
     * POST /api/welfare-equipment/v2/plans/{documentId}/draft-jobs/{jobId}/decide / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2PlansByDocumentIdDraftJobsByJobIdDecide(args: { documentId: string; jobId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 確定済み計画書の改訂 draft を作る (元の正本は変えない)
     * POST /api/welfare-equipment/v2/plans/{documentId}/revise / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2PlansByDocumentIdRevise(args: { documentId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 計画書の本文と確定条件 (判定できない条件は unknown で返す)
     * POST /api/welfare-equipment/v2/plans/{documentId}/validate / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2PlansByDocumentIdValidate(args: { documentId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: ケアプランから福祉用具計画の下書きを起こす (確定は別操作)
     * POST /api/welfare-equipment/v2/plans/draft-from-care-plan / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2PlansDraftFromCarePlan(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 上限照合 (未取込・掲載なし・コード不明を区別した 7 状態)
     * POST /api/welfare-equipment/v2/price-check / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2PriceCheck(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 自社価格の一覧 (商品・種別・承認状態で絞り込み)
     * GET /api/welfare-equipment/v2/prices / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2Prices(args?: { facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 自社価格の登録 (下書き。承認するまで有効にならない)
     * POST /api/welfare-equipment/v2/prices / scope welfare-equipment:price-manage / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2Prices(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 自社価格の承認 (同じ期間に有効版が 2 つできる場合は拒否)
     * POST /api/welfare-equipment/v2/prices/{priceId}/approve / scope welfare-equipment:price-manage / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2PricesByPriceIdApprove(args: { priceId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 過去資料から見つかった商品候補 (商品マスタではない)
     * GET /api/welfare-equipment/v2/product-candidates / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2ProductCandidates(args?: { facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 商品候補を人が選んで商品マスタへ採用する
     * POST /api/welfare-equipment/v2/product-candidates/{candidateId}/adopt / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2ProductCandidatesByCandidateIdAdopt(args: { candidateId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 商品の一覧 (法人共通 + その事業所専用。種目・取扱状態で絞り込み)
     * GET /api/welfare-equipment/v2/products / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2Products(args?: { facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 商品の登録 (選択制の判定は unknown で始まる)
     * POST /api/welfare-equipment/v2/products / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2Products(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 商品の詳細 (コード履歴つき)
     * GET /api/welfare-equipment/v2/products/{productId} / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2ProductsByProductId(args: { productId: string; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 商品の部分更新 (送った項目だけ変更)
     * PATCH /api/welfare-equipment/v2/products/{productId} / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    patchV2ProductsByProductId(args: { productId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 商品コードの履歴 (商品 ID はコード変更で変わらない)
     * GET /api/welfare-equipment/v2/products/{productId}/code-history / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2ProductsByProductIdCodeHistory(args: { productId: string; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 商品コードの追加 (正規化できないコードは拒否。直前の期間を閉じる)
     * POST /api/welfare-equipment/v2/products/{productId}/code-history / scope welfare-equipment:price-manage / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2ProductsByProductIdCodeHistory(args: { productId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 取込実績と公表価格から、未確認の商品の保険対象を「対象」にする (保守)
     * POST /api/welfare-equipment/v2/products/eligibility-from-usage / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2ProductsEligibilityFromUsage(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 比較提案の一覧
     * GET /api/welfare-equipment/v2/proposals / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2Proposals(args?: { facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 比較提案の作成 (候補は採否未定で始まる)
     * POST /api/welfare-equipment/v2/proposals / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2Proposals(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 候補の採否 (行 ID で指定。finalize には全件の採否と理由が必要)
     * POST /api/welfare-equipment/v2/proposals/{proposalId}/select / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2ProposalsByProposalIdSelect(args: { proposalId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 販売申請の一覧 (提出可否と入金の突合つき)
     * GET /api/welfare-equipment/v2/purchase-applications / scope welfare-equipment:benefit-review / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2PurchaseApplications(args?: { facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 販売申請の作成 (試算・申請額・決定額・入金額は別物)
     * POST /api/welfare-equipment/v2/purchase-applications / scope welfare-equipment:benefit-review / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2PurchaseApplications(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 申請の状態遷移 (決定には通知の実額が必須。差戻しには理由が必須)
     * POST /api/welfare-equipment/v2/purchase-applications/{applicationId}/transition / scope welfare-equipment:benefit-review / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2PurchaseApplicationsByApplicationIdTransition(args: { applicationId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 年度上限の残額 (参考値と確定値を区別する)
     * GET /api/welfare-equipment/v2/purchase-applications/annual-cap / scope welfare-equipment:benefit-review / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2PurchaseApplicationsAnnualCap(args?: { facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 選定理由の文例 (承認済みだけが AI の候補に使える)
     * GET /api/welfare-equipment/v2/reason-templates / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2ReasonTemplates(args?: { facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 機種ごとの選定理由の雛形を手で登録する (現在の問題点 / 改善される点 / 選定理由)
     * POST /api/welfare-equipment/v2/reason-templates / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2ReasonTemplates(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 文例を承認・却下する (個人が残っていれば直すまで承認しない)
     * POST /api/welfare-equipment/v2/reason-templates/{templateId}/approve / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2ReasonTemplatesByTemplateIdApprove(args: { templateId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 経営 (金額 5 つ・粗利) / 品質の指標。算出できない値は null で返す
     * GET /api/welfare-equipment/v2/reports/{reportKey} / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2ReportsByReportKey(args: { reportKey: string; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 数量在庫の移動 (訂正には理由が必須)
     * POST /api/welfare-equipment/v2/stock/movements / scope welfare-equipment:stock-manage / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2StockMovements(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 数量在庫の引当 (出荷可能数を超えない)
     * POST /api/welfare-equipment/v2/stock/reservations / scope welfare-equipment:stock-manage / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2StockReservations(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 試用の一覧 (保険実績は作らない)
     * GET /api/welfare-equipment/v2/trials / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2Trials(args?: { facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 試用の登録 (返却期限が必須。適合は未確認で始まる)
     * POST /api/welfare-equipment/v2/trials / scope welfare-equipment:write / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2Trials(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 試用品の返却 (適合の結果が記録されるまで完了にしない)
     * POST /api/welfare-equipment/v2/trials/{trialId}/return / scope welfare-equipment:stock-manage / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2TrialsByTrialIdReturn(args: { trialId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 試用品のお届け記録
     * POST /api/welfare-equipment/v2/trials/{trialId}/start / scope welfare-equipment:stock-manage / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2TrialsByTrialIdStart(args: { trialId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 訪問予定 (設置・交換・引き上げ・点検・確認をまとめて読む)
     * GET /api/welfare-equipment/v2/visit-schedules / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2VisitSchedules(args?: { from?: string; to?: string; kind?: string; assignedTo?: string; includePerformed?: string; facilityId?: string }): Promise<unknown>;
    /** 福祉用具 v2: 今日の仕事 (誰の・何が止まっていて・次に何をするか)
     * GET /api/welfare-equipment/v2/worklist / scope welfare-equipment:read / 認証 both / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV2Worklist(args?: { facilityId?: string }): Promise<unknown>;
  };
  wellKnown: {
    /** 認可サーバのメタデータ (RFC 8414)
     * GET /.well-known/oauth-authorization-server / 認証 none / 実測 200 (2026-09-27) 応答の項目: authorization_endpoint, code_challenge_methods_supported, grant_types_supported, issuer, registration_endpoint, response_modes_supported, response_types_supported, revocation_endpoint, revocation_endpoint_auth_methods_supported, scopes_supported, service_documentation, token_endpoint … / 模擬サーバ: 無し (501) */
    getOauthAuthorizationServer(args?: { facilityId?: string }): Promise<unknown>;
    /** 保護リソース (/mcp) のメタデータ (RFC 9728)
     * GET /.well-known/oauth-protected-resource / 認証 none / 実測 200 (2026-09-27) 応答の項目: authorization_servers, bearer_methods_supported, resource, resource_documentation, scopes_supported / 模擬サーバ: 無し (501) */
    getOauthProtectedResource(args?: { facilityId?: string }): Promise<unknown>;
    /** 保護リソース (/mcp) のメタデータ (パス付き形式)
     * GET /.well-known/oauth-protected-resource/mcp / 認証 none / 実測 200 (2026-09-27) 応答の項目: authorization_servers, bearer_methods_supported, resource, resource_documentation, scopes_supported / 模擬サーバ: 無し (501) */
    getOauthProtectedResourceMcp(args?: { facilityId?: string }): Promise<unknown>;
  };
}

export interface CposApi_session {
  admin: {
    /** → diff だけ計算
     * POST /api/admin/config-bundles/diff / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postConfigBundlesDiff(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** → ConfigBundle
     * POST /api/admin/config-bundles/export / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postConfigBundlesExport(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** → apply (token + confirm 必須)
     * POST /api/admin/config-bundles/import/apply / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postConfigBundlesImportApply(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** → preview + token
     * POST /api/admin/config-bundles/import/preview / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postConfigBundlesImportPreview(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 管理: users-masterの登録・実行 (import/users-master)
     * POST /api/admin/import/users-master / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postImportUsersMaster(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  androidApp: {
    /** Android アプリ管理: device-connectの取得 (device-connect)
     * GET /api/android-app/v1/device-connect / 認証 session / 実測 200 (2026-09-27) だが 0 件で項目名は未確認 (推測しない) / 模擬サーバ: 無し (501) */
    getV1DeviceConnect(args?: { facilityId?: string }): Promise<unknown>;
    /** Android アプリ管理: exchangeの登録・実行 (device-connect/exchange)
     * POST /api/android-app/v1/device-connect/exchange / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1DeviceConnectExchange(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  apiTokens: {
    /** API トークン: 一覧
     * GET /api/api-tokens / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    get(args?: { facilityId?: string }): Promise<unknown>;
    /** body: { appId, name, scopes[], allowedFacilityIds?, expiresAt? }
     * POST /api/api-tokens / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    post(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** API トークン: 削除 (:id)
     * DELETE /api/api-tokens/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** API トークン: 失効 (:id/revoke)
     * POST /api/api-tokens/{id}/revoke / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByIdRevoke(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** API トークン: usageの取得 (:id/usage)
     * GET /api/api-tokens/{id}/usage / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getByIdUsage(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** API トークン: 発行画面のスコープ候補 (KNOWN_TOKEN_SCOPES。?appId= で <appId> の雛形を埋める)
     * GET /api/api-tokens/known-scopes / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getKnownScopes(args?: { facilityId?: string }): Promise<unknown>;
    /** API トークン: releasesの登録・実行 (releases)
     * POST /api/api-tokens/releases / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postReleases(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** API トークン: 1 件取得 (releases/:appId)
     * GET /api/api-tokens/releases/{appId} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getReleasesByAppId(args: { appId: string; facilityId?: string }): Promise<unknown>;
    /** API トークン: 削除 (releases/:appId/:versionCode)
     * DELETE /api/api-tokens/releases/{appId}/{versionCode} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteReleasesByAppIdByVersionCode(args: { appId: string; versionCode: string; facilityId?: string }): Promise<unknown>;
    /** API トークン: usage-summaryの取得 (usage-summary)
     * GET /api/api-tokens/usage-summary / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getUsageSummary(args?: { facilityId?: string }): Promise<unknown>;
  };
  appData: {
    /** AppData lifecycle listener の失敗件数と直近の失敗 (診断)
     * GET /api/app-data/lifecycle-health / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getLifecycleHealth(args?: { all?: boolean; facilityId?: string }): Promise<unknown>;
  };
  appInvocations: {
    /** 呼び出しを作成 (ui-launch / async-job / server-action)
     * POST /api/app-invocations / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    post(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 状態 + job を取得
     * GET /api/app-invocations/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** source 側がキャンセル
     * POST /api/app-invocations/{id}/cancel / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByIdCancel(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** target app が進捗を返す (HMAC 署名)
     * POST /api/app-invocations/{id}/progress / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByIdProgress(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** target app が結果を返す (HMAC 署名)
     * POST /api/app-invocations/{id}/result / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByIdResult(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 全 action 一覧 (UI のアクション選択用)
     * GET /api/app-invocations/actions / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getActions(args?: { facilityId?: string }): Promise<unknown>;
    /** 特定アプリの action
     * GET /api/app-invocations/actions/{targetAppId} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getActionsByTargetAppId(args: { targetAppId: string; facilityId?: string }): Promise<unknown>;
    /** target app が code を payload に交換
     * POST /api/app-invocations/exchange / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postExchange(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  apps: {
    /** 新規登録（draft）
     * POST /api/apps / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    post(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 編集 (PUT /api/apps/:id) 編集可能なフィールド: name / description / type / url / manifestPath / isPublic / requiredPermissions / icon / resources。 認可: - draft / rejected ステ
     * PUT /api/apps/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putById(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 登録アプリ: 削除 (:id)
     * DELETE /api/apps/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** ワークフロー遷移
     * POST /api/apps/{id}/{action} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByIdByAction(args: { id: string; action: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** — grant を追加
     * POST /api/apps/{id}/access / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByIdAccess(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 登録アプリ: 削除 (:id/access/:grantId)
     * DELETE /api/apps/{id}/access/{grantId} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteByIdAccessByGrantId(args: { id: string; grantId: string; facilityId?: string }): Promise<unknown>;
    /** アクション可否プレビュー（UI の有効/無効に使う）
     * GET /api/apps/{id}/actions / 認証 session / 実測 200 (2026-09-27) 応答の項目: actions, currentStatus / 模擬サーバ: 無し (501) */
    getByIdActions(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 登録アプリ: 診断の取得 (:id/diagnostics)
     * GET /api/apps/{id}/diagnostics / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getByIdDiagnostics(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 現行互換 /import-manifest + 推奨 alias /manifest (docs と統一)。
     * POST /api/apps/{id}/import-manifest / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByIdImportManifest(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 登録アプリ: manifestの登録・実行 (:id/manifest)
     * POST /api/apps/{id}/manifest / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByIdManifest(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 必要 API Token scopes を直す (dryRun=true で差分だけ)。manifest を取れないアプリ用
     * PUT /api/apps/{id}/scopes / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putByIdScopes(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 登録アプリ: launcherの取得 (launcher)
     * GET /api/apps/launcher / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getLauncher(args?: { facilityId?: string }): Promise<unknown>;
    /** 登録アプリ: register-from-urlの登録・実行 (register-from-url)
     * POST /api/apps/register-from-url / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postRegisterFromUrl(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  auditLogs: {
    /** 監査ログ: 一覧
     * GET /api/audit-logs / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    get(args?: { facilityId?: string }): Promise<unknown>;
  };
  auth: {
    /** なりすまし表示のいまの状態 (管理者の本物のログインだけ)
     * GET /api/auth/impersonation / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getImpersonation(args?: { facilityId?: string }): Promise<unknown>;
    /** なりすまし表示を始める・切り替える ({ userId } か { email }。管理者の本物のログインだけ)
     * POST /api/auth/impersonation / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postImpersonation(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** なりすまし表示を止める
     * DELETE /api/auth/impersonation / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteImpersonation(args?: { facilityId?: string }): Promise<unknown>;
    /** なりすまし表示の対象にできる人 (?facilityId= で絞る。管理者の本物のログインだけ)
     * GET /api/auth/impersonation/candidates / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getImpersonationCandidates(args?: { facilityId?: string }): Promise<unknown>;
  };
  authUsers: {
    /** ログインアカウント: 一覧
     * GET /api/auth-users / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    get(args?: { facilityId?: string }): Promise<unknown>;
    /** ログインアカウント: 作成
     * POST /api/auth-users / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    post(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ログインアカウント: 1 件取得 (:id)
     * GET /api/auth-users/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** ログインアカウント: 更新 (:id)
     * PUT /api/auth-users/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putById(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ログインアカウント: 削除 (:id)
     * DELETE /api/auth-users/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** ログインアカウント: メールアドレスの差し替え (super_admin のみ。ID・記録・担当はそのまま)
     * POST /api/auth-users/{id}/email / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByIdEmail(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ログインアカウント: google-accountの取得 (:id/google-account)
     * GET /api/auth-users/{id}/google-account / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getByIdGoogleAccount(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** ログインアカウント: google-accountの登録・実行 (:id/google-account)
     * POST /api/auth-users/{id}/google-account / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByIdGoogleAccount(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ログインアカウント: sheet.pdfの登録・実行 (:id/google-account/sheet.pdf)
     * POST /api/auth-users/{id}/google-account/sheet.pdf / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByIdGoogleAccountSheetPdf(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ログインアカウント: suspendの登録・実行 (:id/google-account/suspend)
     * POST /api/auth-users/{id}/google-account/suspend / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByIdGoogleAccountSuspend(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ログインアカウント: 1 件取得 (by-facility/:facilityId)
     * GET /api/auth-users/by-facility/{facilityId} / 認証 session / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getByFacilityByFacilityId(args: { facilityId: string }): Promise<unknown>;
    /** ログインアカウント: export.csvの取得 (export.csv)
     * GET /api/auth-users/export.csv / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getExportCsv(args?: { facilityId?: string }): Promise<unknown>;
    /** ログインアカウント: google-account-configの取得 (google-account-config)
     * GET /api/auth-users/google-account-config / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getGoogleAccountConfig(args?: { facilityId?: string }): Promise<unknown>;
    /** ログインアカウント: 診断の取得 (hrm/diagnostics)
     * GET /api/auth-users/hrm/diagnostics / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getHrmDiagnostics(args?: { facilityId?: string }): Promise<unknown>;
    /** ログインアカウント: import-csvの登録・実行 (import-csv)
     * POST /api/auth-users/import-csv / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postImportCsv(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ログインアカウント: login-historyの取得 (login-history)
     * GET /api/auth-users/login-history / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getLoginHistory(args?: { facilityId?: string }): Promise<unknown>;
    /** ログインアカウント: migrate-clinical-rolesの登録・実行 (migrate-clinical-roles)
     * POST /api/auth-users/migrate-clinical-roles / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postMigrateClinicalRoles(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ログインアカウント: template.csvの取得 (template.csv)
     * GET /api/auth-users/template.csv / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getTemplateCsv(args?: { facilityId?: string }): Promise<unknown>;
  };
  backup: {
    /** バックアップ: run-taskの登録・実行 (_internal/run-task)
     * POST /api/backup/_internal/run-task / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postInternalRunTask(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** バックアップ: 実行 1 件 (項目ごとの結果 sections を含む)
     * GET /api/backup/executions/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getExecutionsById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** バックアップ: downloadの取得 (executions/:id/download)
     * GET /api/backup/executions/{id}/download / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getExecutionsByIdDownload(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** バックアップ: 概要 (ファイルの中身の件数と、項目ごとの結果)
     * GET /api/backup/executions/{id}/preview / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getExecutionsByIdPreview(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** バックアップ: 復元 (executions/:id/restore)
     * POST /api/backup/executions/{id}/restore / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postExecutionsByIdRestore(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** バックアップ: recover-staleの登録・実行 (recover-stale)
     * POST /api/backup/recover-stale / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postRecoverStale(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** バックアップ: strategiesの取得 (strategies)
     * GET /api/backup/strategies / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getStrategies(args?: { facilityId?: string }): Promise<unknown>;
    /** バックアップ: strategiesの登録・実行 (strategies)
     * POST /api/backup/strategies / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postStrategies(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** バックアップ: 1 件取得 (strategies/:id)
     * GET /api/backup/strategies/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getStrategiesById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** バックアップ: 更新 (strategies/:id)
     * PUT /api/backup/strategies/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putStrategiesById(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** バックアップ: 削除 (strategies/:id)
     * DELETE /api/backup/strategies/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteStrategiesById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** バックアップ: 戦略の実行履歴 (新しい順)
     * GET /api/backup/strategies/{id}/executions / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getStrategiesByIdExecutions(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** バックアップ: 実行 (strategies/:id/run)
     * POST /api/backup/strategies/{id}/run / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postStrategiesByIdRun(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  billing: {
    /** 請求: addon-summaryの取得 (addon-summary)
     * GET /api/billing/v1/addon-summary / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getV1AddonSummary(args?: { facilityId?: string }): Promise<unknown>;
    /** 請求: check-requirementsの登録・実行 (check-requirements)
     * POST /api/billing/v1/check-requirements / scope billing:read / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1CheckRequirements(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 請求: export-profilesの取得 (export-profiles)
     * GET /api/billing/v1/export-profiles / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1ExportProfiles(args?: { facilityId?: string }): Promise<unknown>;
    /** 請求: export-profilesの登録・実行 (export-profiles)
     * POST /api/billing/v1/export-profiles / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ExportProfiles(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 請求: 削除 (export-profiles/:id)
     * DELETE /api/billing/v1/export-profiles/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteV1ExportProfilesById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** レビュー承認 (P2 §8): 正式ファイル生成の前提。承認は certified=true の profile のみ可。
     * POST /api/billing/v1/export-profiles/{id}/approve-review / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ExportProfilesByIdApproveReview(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** profile 認定 (§6): todo=0 + 出典あり (validateProfileCertifiable) なら certified=true。
     * POST /api/billing/v1/export-profiles/{id}/certify / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ExportProfilesByIdCertify(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** レイアウト (列・並び順・列名・文字コード) を読む
     * GET /api/billing/v1/export-profiles/{id}/layout / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1ExportProfilesByIdLayout(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 編集して保存する (= 認定とレビュー承認は外れる)
     * PUT /api/billing/v1/export-profiles/{id}/layout / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putV1ExportProfilesByIdLayout(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** レビュー承認の取消 (再レビューが必要になった場合)。
     * POST /api/billing/v1/export-profiles/{id}/revoke-review / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ExportProfilesByIdRevokeReview(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 事業所×提供月の明細書を転記前に自己点検する
     * POST /api/billing/v1/export-profiles/{id}/self-check / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ExportProfilesByIdSelfCheck(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** profile 認定解除 (§6): certified=false + レビュー承認も取消す。
     * POST /api/billing/v1/export-profiles/{id}/uncertify / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ExportProfilesByIdUncertify(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 請求: iryou-visit-nursing-receiptの取得 (exports/iryou-visit-nursing-receipt)
     * GET /api/billing/v1/exports/iryou-visit-nursing-receipt / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getV1ExportsIryouVisitNursingReceipt(args?: { facilityId?: string }): Promise<unknown>;
    /** 請求: kaigo-kokuhorenの取得 (exports/kaigo-kokuhoren)
     * GET /api/billing/v1/exports/kaigo-kokuhoren / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getV1ExportsKaigoKokuhoren(args?: { facilityId?: string }): Promise<unknown>;
    /** 施設基準カタログ (UI の選択肢用)。standard / exampleName / codeCount。
     * GET /api/billing/v1/facility-standards / scope billing:read / 認証 session / 実測 200 (2026-09-27) 応答の項目: items / 模擬サーバ: 無し (501) */
    getV1FacilityStandards(args?: { facilityId?: string }): Promise<unknown>;
    /** 請求: 1 件取得 (imports/:jobId)
     * GET /api/billing/v1/imports/{jobId} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getV1ImportsByJobId(args: { jobId: string; facilityId?: string }): Promise<unknown>;
    /** 請求: 確定 (imports/pdf/commit)
     * POST /api/billing/v1/imports/pdf/commit / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ImportsPdfCommit(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 請求: プレビュー (imports/pdf/preview)
     * POST /api/billing/v1/imports/pdf/preview / scope billing:read / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ImportsPdfPreview(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 請求: プレビュー (preview)
     * POST /api/billing/v1/preview / scope billing:read / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1Preview(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 正式: /api/billing/v1/preview-from-actuals
     * POST /api/billing/v1/preview-from-actuals / scope billing:read / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1PreviewFromActuals(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 後方互換 (旧 mount の名残): /api/billing/v1/preview/preview-from-actuals。 移行期間のみ許容。新規クライアントは上の正式 URL を使うこと。
     * POST /api/billing/v1/preview/preview-from-actuals / scope billing:read / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1PreviewPreviewFromActuals(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 請求: receipt-code-tablesの取得 (receipt-code-tables)
     * GET /api/billing/v1/receipt-code-tables / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getV1ReceiptCodeTables(args?: { facilityId?: string }): Promise<unknown>;
    /** 請求: receipt-code-tablesの登録・実行 (receipt-code-tables)
     * POST /api/billing/v1/receipt-code-tables / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ReceiptCodeTables(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 請求: 削除 (receipt-code-tables/:id)
     * DELETE /api/billing/v1/receipt-code-tables/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteV1ReceiptCodeTablesById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 請求: seedの登録・実行 (receipt-code-tables/seed)
     * POST /api/billing/v1/receipt-code-tables/seed / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ReceiptCodeTablesSeed(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 請求: statementsの取得 (statements)
     * GET /api/billing/v1/statements / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getV1Statements(args?: { facilityId?: string }): Promise<unknown>;
    /** 請求: statementsの登録・実行 (statements)
     * POST /api/billing/v1/statements / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1Statements(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 請求明細書を 1 件取得
     * GET /api/billing/v1/statements/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getV1StatementsById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 請求: 更新 (statements/:id)
     * PUT /api/billing/v1/statements/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putV1StatementsById(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 請求: 削除 (statements/:id)
     * DELETE /api/billing/v1/statements/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteV1StatementsById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 請求: adjudicationsの取得 (statements/:id/adjudications)
     * GET /api/billing/v1/statements/{id}/adjudications / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getV1StatementsByIdAdjudications(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 請求: adjudicationsの登録・実行 (statements/:id/adjudications)
     * POST /api/billing/v1/statements/{id}/adjudications / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1StatementsByIdAdjudications(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 請求: 削除 (statements/:id/adjudications/:adjId)
     * DELETE /api/billing/v1/statements/{id}/adjudications/{adjId} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteV1StatementsByIdAdjudicationsByAdjId(args: { id: string; adjId: string; facilityId?: string }): Promise<unknown>;
    /** 請求: allocate-receipt-numberの登録・実行 (statements/:id/allocate-receipt-number)
     * POST /api/billing/v1/statements/{id}/allocate-receipt-number / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1StatementsByIdAllocateReceiptNumber(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 請求: export-internal.csvの取得 (statements/:id/export-internal.csv)
     * GET /api/billing/v1/statements/{id}/export-internal.csv / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1StatementsByIdExportInternalCsv(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 請求: linesの取得 (statements/:id/lines)
     * GET /api/billing/v1/statements/{id}/lines / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getV1StatementsByIdLines(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 請求: linesの登録・実行 (statements/:id/lines)
     * POST /api/billing/v1/statements/{id}/lines / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1StatementsByIdLines(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 請求: 削除 (statements/:id/lines/:lineId)
     * DELETE /api/billing/v1/statements/{id}/lines/{lineId} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteV1StatementsByIdLinesByLineId(args: { id: string; lineId: string; facilityId?: string }): Promise<unknown>;
    /** 請求: lockの登録・実行 (statements/:id/lock)
     * POST /api/billing/v1/statements/{id}/lock / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1StatementsByIdLock(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 請求明細書を出力済みにする
     * POST /api/billing/v1/statements/{id}/mark-exported / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1StatementsByIdMarkExported(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 請求明細書を提出済みにする
     * POST /api/billing/v1/statements/{id}/mark-submitted / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1StatementsByIdMarkSubmitted(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 請求: supplemental-recordsの取得 (statements/:id/supplemental-records)
     * GET /api/billing/v1/statements/{id}/supplemental-records / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getV1StatementsByIdSupplementalRecords(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 請求: supplemental-recordsの登録・実行 (statements/:id/supplemental-records)
     * POST /api/billing/v1/statements/{id}/supplemental-records / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1StatementsByIdSupplementalRecords(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 請求: 削除 (statements/:id/supplemental-records/:recordId)
     * DELETE /api/billing/v1/statements/{id}/supplemental-records/{recordId} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteV1StatementsByIdSupplementalRecordsByRecordId(args: { id: string; recordId: string; facilityId?: string }): Promise<unknown>;
    /** 請求明細書のロックを解除
     * POST /api/billing/v1/statements/{id}/unlock / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1StatementsByIdUnlock(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 請求: 検証 (statements/:id/validate)
     * POST /api/billing/v1/statements/{id}/validate / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1StatementsByIdValidate(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 請求: export.csvの取得 (statements/export.csv)
     * GET /api/billing/v1/statements/export.csv / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1StatementsExportCsv(args?: { facilityId?: string }): Promise<unknown>;
    /** 請求: 検証の取得 (statements/validate)
     * GET /api/billing/v1/statements/validate / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getV1StatementsValidate(args?: { facilityId?: string }): Promise<unknown>;
  };
  careDocuments: {
    /** 事業所の帳票の棚卸し (人が入力した行) を一覧
     * GET /api/care-documents/v1/form-inventory / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1FormInventory(args?: { facilityId?: string }): Promise<unknown>;
    /** 帳票の棚卸しの行を作る (事業所 × 帳票で 1 行)
     * POST /api/care-documents/v1/form-inventory / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1FormInventory(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 帳票の棚卸しの行の内容を置き換える (前提条件つき)
     * PUT /api/care-documents/v1/form-inventory/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putV1FormInventoryById(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 帳票が事業所に当たるか (対象外か) を人が決める
     * POST /api/care-documents/v1/form-inventory/{id}/applicability / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1FormInventoryByIdApplicability(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 帳票の棚卸しの行を人が確認する
     * POST /api/care-documents/v1/form-inventory/{id}/confirm / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1FormInventoryByIdConfirm(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** アプリの様式で実際に出せることを人が確認する
     * POST /api/care-documents/v1/form-inventory/{id}/output-confirmation / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1FormInventoryByIdOutputConfirmation(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 様式と要件プロファイルから、行に書く候補を出す (保存しない)
     * GET /api/care-documents/v1/form-inventory/candidates / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1FormInventoryCandidates(args: { facilityId?: string; templateKey: string }): Promise<unknown>;
    /** 事業所の帳票ごとに、CPOS が出せるものと足りないもの ((i)〜(v)) を表示
     * GET /api/care-documents/v1/form-inventory/summary / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1FormInventorySummary(args?: { facilityId?: string }): Promise<unknown>;
  };
  careManagement: {
    /** 人のログインと現在の本人・事業所で共通取り込みを開く
     * POST /api/care-management/v2/intake-contexts / scope care-documents:write / 認証 session / facilityId 必須 / 応答の形あり / 模擬サーバ: 無し (501) */
    postV2IntakeContexts(args: { facilityId: string; serviceDomain: string; masterUserId?: string; body: unknown }): Promise<unknown>;
    /** 正式承認済みの評価版を引き継いで計画準備を起票
     * POST /api/care-management/v2/service-plan-preparations / scope care-documents:write / 認証 session / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2ServicePlanPreparations(args: { facilityId: string; serviceDomain: string; masterUserId?: string; body: unknown }): Promise<unknown>;
    /** 評価版と現計画版に対する計画変更不要の判断を保存
     * POST /api/care-management/v2/service-plan-preparations/{id}/no-change / scope care-documents:write / 認証 session / facilityId 必須 / 応答の形あり / 模擬サーバ: 無し (501) */
    postV2ServicePlanPreparationsByIdNoChange(args: { id: string; facilityId: string; serviceDomain: string; masterUserId?: string; body: unknown }): Promise<unknown>;
    /** 旧根拠を保持し次の計画準備世代を作る
     * POST /api/care-management/v2/service-plan-preparations/{id}/refresh / scope care-documents:write / 認証 session / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2ServicePlanPreparationsByIdRefresh(args: { id: string; facilityId: string; serviceDomain: string; masterUserId?: string; body: unknown }): Promise<unknown>;
    /** 指定した記録・確認済み評価の共有設定を確認
     * GET /api/care-management/v2/shares / 認証 session / facilityId 必須 / 応答の形あり / 模擬サーバ: 無し (501) */
    getV2Shares(args: { facilityId: string; masterUserId: string; serviceDomain: string; sourceKind: string; sourceId: string }): Promise<unknown>;
    /** 職員が本文・評価項目・目的・期限を指定して共有
     * POST /api/care-management/v2/shares / 認証 session / facilityId 必須 / 応答の形あり / 模擬サーバ: 無し (501) */
    postV2Shares(args: { facilityId: string; masterUserId: string; serviceDomain: string; body: unknown }): Promise<unknown>;
    /** 職員が現在の共有許可を取り消す
     * POST /api/care-management/v2/shares/{id}/revoke / 認証 session / facilityId 必須 / 応答の形あり / 模擬サーバ: 無し (501) */
    postV2SharesByIdRevoke(args: { id: string; facilityId: string; masterUserId: string; serviceDomain: string; body: unknown }): Promise<unknown>;
    /** 現在の処理版を確認して同じ資料を再試行
     * POST /api/care-management/v2/sources/extraction-jobs/{id}/retry / scope care-documents:write / 認証 session / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2SourcesExtractionJobsByIdRetry(args: { id: string; facilityId: string; serviceDomain: string; masterUserId?: string; body?: unknown }): Promise<unknown>;
    /** 外部原本・現在評価・作業評価・観察を固定根拠で比較
     * POST /api/care-management/v2/sources/receipts/{id}/comparisons / scope care-documents:write / 認証 session / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2SourcesReceiptsByIdComparisons(args: { id: string; facilityId: string; serviceDomain: string; masterUserId?: string; body: unknown }): Promise<unknown>;
    /** 比較に対する人の判断を履歴として保存
     * POST /api/care-management/v2/sources/receipts/{id}/comparisons/{comparisonId}/decisions / scope care-documents:write / 認証 session / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2SourcesReceiptsByIdComparisonsByComparisonIdDecisions(args: { id: string; comparisonId: string; facilityId: string; serviceDomain: string; masterUserId?: string; body: unknown }): Promise<unknown>;
    /** 比較の違いについてAIの説明案（下書き）を作る。結果は常に状態として返す
     * POST /api/care-management/v2/sources/receipts/{id}/comparisons/{comparisonId}/explanations / scope care-documents:write / 認証 session / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2SourcesReceiptsByIdComparisonsByComparisonIdExplanations(args: { id: string; comparisonId: string; facilityId: string; serviceDomain: string; masterUserId?: string; body?: unknown }): Promise<unknown>;
    /** 確認済み結果を保持したまま再読み取りを起票
     * POST /api/care-management/v2/sources/receipts/{id}/extractions / scope care-documents:write / 認証 session / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2SourcesReceiptsByIdExtractions(args: { id: string; facilityId: string; serviceDomain: string; masterUserId?: string; body: unknown }): Promise<unknown>;
    /** 原本からの手入力を不変の読み取り結果として保存
     * POST /api/care-management/v2/sources/receipts/{id}/manual-extractions / scope care-documents:write / 認証 session / facilityId 必須 / 応答の形あり / 模擬サーバ: 無し (501) */
    postV2SourcesReceiptsByIdManualExtractions(args: { id: string; facilityId: string; serviceDomain: string; masterUserId?: string; body: unknown }): Promise<unknown>;
    /** 確認済み項目から許可された基本情報の変更候補を作る
     * POST /api/care-management/v2/sources/receipts/{id}/profile-proposals / scope care-documents:write / 認証 session / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2SourcesReceiptsByIdProfileProposals(args: { id: string; facilityId: string; serviceDomain: string; masterUserId?: string; body: unknown }): Promise<unknown>;
    /** 職員が確認した受領ケアプランを原本の版付きで登録
     * POST /api/care-management/v2/sources/receipts/{id}/received-care-plan / scope care-documents:write / 認証 session / facilityId 必須 / 応答の形あり / 模擬サーバ: 無し (501) */
    postV2SourcesReceiptsByIdReceivedCarePlan(args: { id: string; facilityId: string; serviceDomain: string; masterUserId?: string; body: unknown }): Promise<unknown>;
    /** 未同定資料の新規登録可否と同姓同名の件数を確認
     * GET /api/care-management/v2/sources/receipts/{id}/registration / scope care-documents:read / 認証 session / facilityId 必須 / 応答の形あり / 模擬サーバ: 無し (501) */
    getV2SourcesReceiptsByIdRegistration(args: { id: string; facilityId: string; serviceDomain: string; contextId: string }): Promise<unknown>;
    /** 番号未着の利用者を既存マスタに登録し、同じ受領原本へ結び付ける
     * POST /api/care-management/v2/sources/receipts/{id}/registration / scope care-documents:write / 認証 session / facilityId 必須 / 応答の形あり / 模擬サーバ: 無し (501) */
    postV2SourcesReceiptsByIdRegistration(args: { id: string; facilityId: string; serviceDomain: string; contextId: string; body: unknown }): Promise<unknown>;
    /** 未同定資料の新規登録可否と同姓同名の件数を確認 (氏名は本文で送る)
     * POST /api/care-management/v2/sources/receipts/{id}/registration-check / scope care-documents:read / 認証 session / facilityId 必須 / 応答の形あり / 模擬サーバ: 無し (501) */
    postV2SourcesReceiptsByIdRegistrationCheck(args: { id: string; facilityId: string; serviceDomain: string; contextId: string; body: unknown }): Promise<unknown>;
    /** 複数本人の資料を原本範囲別の子受領へ分ける
     * POST /api/care-management/v2/sources/receipts/{id}/split / scope care-documents:write / 認証 session / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV2SourcesReceiptsByIdSplit(args: { id: string; facilityId: string; serviceDomain: string; masterUserId?: string; body: unknown }): Promise<unknown>;
    /** 職員が原本の範囲と対象本人を確認
     * POST /api/care-management/v2/sources/receipts/{id}/subject / scope care-documents:write / 認証 session / facilityId 必須 / 応答の形あり / 模擬サーバ: 無し (501) */
    postV2SourcesReceiptsByIdSubject(args: { id: string; facilityId: string; serviceDomain: string; masterUserId?: string; body: unknown }): Promise<unknown>;
    /** 共通受付の本人候補を氏名・ふりがな等で検索 (検索語は本文で送る)
     * POST /api/care-management/v2/subject-candidates / scope care-documents:read / 認証 session / facilityId 必須 / 応答の形あり / 模擬サーバ: 無し (501) */
    postV2SubjectCandidates(args: { facilityId: string; serviceDomain: string; masterUserId?: string; body: unknown }): Promise<unknown>;
  };
  carePlanCsv: {
    /** ケアプラン連携 CSV: applyの登録・実行 (bulk-import/apply)
     * POST /api/care-plan-csv/bulk-import/apply / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postBulkImportApply(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ケアプラン連携 CSV: batchesの取得 (bulk-import/batches)
     * GET /api/care-plan-csv/bulk-import/batches / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getBulkImportBatches(args?: { facilityId?: string }): Promise<unknown>;
    /** ケアプラン連携 CSV: 1 件取得 (bulk-import/batches/:id)
     * GET /api/care-plan-csv/bulk-import/batches/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getBulkImportBatchesById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** ケアプラン連携 CSV: errors.csvの取得 (bulk-import/batches/:id/errors.csv)
     * GET /api/care-plan-csv/bulk-import/batches/{id}/errors.csv / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getBulkImportBatchesByIdErrorsCsv(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** ケアプラン連携 CSV: filesの取得 (bulk-import/batches/:id/files)
     * GET /api/care-plan-csv/bulk-import/batches/{id}/files / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getBulkImportBatchesByIdFiles(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** ケアプラン連携 CSV: progressの取得 (bulk-import/batches/:id/progress)
     * GET /api/care-plan-csv/bulk-import/batches/{id}/progress / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getBulkImportBatchesByIdProgress(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** ケアプラン連携 CSV: warnings.csvの取得 (bulk-import/batches/:id/warnings.csv)
     * GET /api/care-plan-csv/bulk-import/batches/{id}/warnings.csv / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getBulkImportBatchesByIdWarningsCsv(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** ケアプラン連携 CSV: プレビュー (bulk-import/from-local-path/preview)
     * POST /api/care-plan-csv/bulk-import/from-local-path/preview / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postBulkImportFromLocalPathPreview(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ケアプラン連携 CSV: プレビュー (bulk-import/preview)
     * POST /api/care-plan-csv/bulk-import/preview / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postBulkImportPreview(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ケアプラン連携 CSV: uploadの登録・実行 (bulk-import/upload)
     * POST /api/care-plan-csv/bulk-import/upload / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postBulkImportUpload(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 一覧
     * GET /api/care-plan-csv/bundles / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getBundles(args?: { facilityId?: string }): Promise<unknown>;
    /** CarePlanBundle を保存
     * POST /api/care-plan-csv/bundles / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postBundles(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 1 件
     * GET /api/care-plan-csv/bundles/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getBundlesById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** ケアプラン連携 CSV: 更新 (bundles/:id)
     * PUT /api/care-plan-csv/bundles/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putBundlesById(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 1 件削除
     * DELETE /api/care-plan-csv/bundles/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteBundlesById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** VNS / 旧 client 互換 alias。正規 URL は build-csv。
     * POST /api/care-plan-csv/bundles/{id}/build / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postBundlesByIdBuild(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** CSV 生成 + validate
     * POST /api/care-plan-csv/bundles/{id}/build-csv / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postBundlesByIdBuildCsv(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ケアプラン連携 CSV: download.zipの取得 (bundles/:id/download.zip)
     * GET /api/care-plan-csv/bundles/{id}/download.zip / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getBundlesByIdDownloadZip(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** ケアプラン連携 CSV: export-to-transfer-folderの登録・実行 (bundles/:id/export-to-transfer-folder)
     * POST /api/care-plan-csv/bundles/{id}/export-to-transfer-folder / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postBundlesByIdExportToTransferFolder(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** VNS / 旧 client 互換 alias。正規 URL は download.zip。
     * GET /api/care-plan-csv/bundles/{id}/v4.zip / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getBundlesByIdV4Zip(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 既存ビルドの validate
     * POST /api/care-plan-csv/bundles/{id}/validate / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postBundlesByIdValidate(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** SourceHub から AI 抽出 (現 MVP は 501 stub)
     * POST /api/care-plan-csv/extract/preview / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postExtractPreview(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 外部 CSV を validate
     * POST /api/care-plan-csv/validate-files / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postValidateFiles(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  carePlanImport: {
    /** 開発用 (テスト時): キャッシュ強制クリア
     * POST /api/care-plan-import/cleanup / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postCleanup(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ケアプラン取込: 確定 (commit)
     * POST /api/care-plan-import/commit / scope billing:read / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postCommit(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ケアプラン取込のプレビュー
     * POST /api/care-plan-import/preview / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postPreview(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  carePlans: {
    /** ケアプラン: 一覧
     * GET /api/care-plans / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    get(args?: { facilityId?: string }): Promise<unknown>;
    /** (新規ドラフト or 既存上書き)
     * POST /api/care-plans / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    post(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ケアプラン: 1 件取得 (:id)
     * GET /api/care-plans/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** ケアプラン: 削除 (:id)
     * DELETE /api/care-plans/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** ケアプラン: 承認 (:id/approve)
     * POST /api/care-plans/{id}/approve / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByIdApprove(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ケアプラン: export-sheetの登録・実行 (:id/export-sheet)
     * POST /api/care-plans/{id}/export-sheet / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByIdExportSheet(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ケアプラン: export-v4-csvの登録・実行 (:id/export-v4-csv)
     * POST /api/care-plans/{id}/export-v4-csv / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByIdExportV4Csv(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ケアプラン: export-v4-csv.zipの取得 (:id/export-v4-csv.zip)
     * GET /api/care-plans/{id}/export-v4-csv.zip / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getByIdExportV4CsvZip(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** body: { sharedWith: string[] }
     * PUT /api/care-plans/{id}/share / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putByIdShare(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ケアプラン: bulkの登録・実行 (bulk)
     * POST /api/care-plans/bulk / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postBulk(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ケアプラン: generateの登録・実行 (generate)
     * POST /api/care-plans/generate / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postGenerate(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ケアプラン: import-from-fileの登録・実行 (import-from-file)
     * POST /api/care-plans/import-from-file / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postImportFromFile(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  careRecords: {
    /** 申し送りに載せる記録 (日付ごと)
     * GET /api/care-records/handover / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getHandover(args?: { facilityId?: string }): Promise<unknown>;
    /** 記録が抜けている利用者・日 (当日の未記録)
     * GET /api/care-records/missing / scope care-records:read / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getMissing(args?: { facilityId?: string }): Promise<unknown>;
    /** AI に質問 POST /ask body: { facilityId, question, userName?, since?, until? }
     * POST /api/care-records/v1/records/ask / scope care-records:write / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1RecordsAsk(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 記録入力をパイプラインに流す POST /process body: { facilityId, rawText, specifiedUserName?, recordTypes?, skipAi?, visitData? }
     * POST /api/care-records/v1/records/process / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1RecordsProcess(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** バイタルの集計 (期間・利用者ごと)
     * GET /api/care-records/vitals-summary / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getVitalsSummary(args?: { facilityId?: string }): Promise<unknown>;
  };
  careReminders: {
    /** リマインダー: 一覧
     * GET /api/care-reminders / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    get(args?: { facilityId?: string }): Promise<unknown>;
    /** リマインダー: dismissの登録・実行 (events/:id/dismiss)
     * POST /api/care-reminders/events/{id}/dismiss / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postEventsByIdDismiss(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** リマインダー: snoozeの登録・実行 (events/:id/snooze)
     * POST /api/care-reminders/events/{id}/snooze / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postEventsByIdSnooze(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** リマインダー: rebuildの登録・実行 (events/rebuild)
     * POST /api/care-reminders/events/rebuild / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postEventsRebuild(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** リマインダー: rulesの取得 (rules)
     * GET /api/care-reminders/rules / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getRules(args?: { facilityId?: string }): Promise<unknown>;
    /** リマインダー: rulesの登録・実行 (rules)
     * POST /api/care-reminders/rules / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postRules(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** リマインダー: 更新 (rules/:id)
     * PUT /api/care-reminders/rules/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putRulesById(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** リマインダー: disableの登録・実行 (rules/:id/disable)
     * POST /api/care-reminders/rules/{id}/disable / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postRulesByIdDisable(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** リマインダー: 更新 (rules/sync)
     * PUT /api/care-reminders/rules/sync / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putRulesSync(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** リマインダー: 今日の分の取得 (today)
     * GET /api/care-reminders/today / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getToday(args?: { facilityId?: string }): Promise<unknown>;
  };
  careSchedules: {
    /** 取消の有効日を持たない取消済みの予定に、補完するなら書く日を報告する (書き込まない)
     * GET /api/care-schedules/v1/history-backfill/dry-run / 認証 session / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1HistoryBackfillDryRun(args: { facilityId: string; from?: string; to?: string; tz?: string; limit?: number }): Promise<unknown>;
  };
  careServiceActuals: {
    /** 固定基準の候補を採用する (管理者・管理職の職員セッション専用。expectedState: candidate)
     * POST /api/care-service-actuals/v1/monthly-baselines/{id}/adopt / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1MonthlyBaselinesByIdAdopt(args: { id: string; body: unknown; facilityId?: string }): Promise<unknown>;
    /** 固定基準の候補をまとめて採用する (1 事業所、200 件まで。件ごとの結果)
     * POST /api/care-service-actuals/v1/monthly-baselines/adopt-batch / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1MonthlyBaselinesAdoptBatch(args: { body: unknown; facilityId?: string }): Promise<unknown>;
    /** 固定基準の候補を作る (1 人 × 月。現在の予定の例外なし展開を発生枠・コード・単位ごと凍結。冪等)
     * POST /api/care-service-actuals/v1/monthly-baselines/candidates / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1MonthlyBaselinesCandidates(args: { body: unknown; facilityId?: string }): Promise<unknown>;
  };
  connectors: {
    /** Google connector (Docs/Drive/Sheets) 有効化状態の自己診断
     * GET /api/connectors/google/status / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getGoogleStatus(args?: { facilityId?: string }): Promise<unknown>;
  };
  dataBrowser: {
    /** データブラウザ: CSV エクスポートの記録 (監査ログ)
     * POST /api/data-browser/exports / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postExports(args: { body: unknown; facilityId?: string }): Promise<unknown>;
    /** データブラウザ: テーブル一覧 (Firestore コレクションの列挙)
     * GET /api/data-browser/tables / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getTables(args?: { withCounts?: boolean; facilityId?: string }): Promise<unknown>;
    /** データブラウザ: テーブルの中身 (生ドキュメント)
     * GET /api/data-browser/tables/{collection}/rows / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getTablesByCollectionRows(args: { collection: string; limit?: number; cursor?: string; includeUnscoped?: boolean; facilityId?: string }): Promise<unknown>;
    /** データブラウザ: 保存ビューの一覧
     * GET /api/data-browser/views / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getViews(args?: { facilityId?: string }): Promise<unknown>;
    /** データブラウザ: 保存ビューの作成・更新
     * POST /api/data-browser/views / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postViews(args: { body: unknown; facilityId?: string }): Promise<unknown>;
    /** データブラウザ: 保存ビューの削除
     * DELETE /api/data-browser/views/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteViewsById(args: { id: string; facilityId?: string }): Promise<unknown>;
  };
  device: {
    /** デバイス API: askの登録・実行 (ask)
     * POST /api/device/ask / scope ask-ai / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postAsk(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** /bootstrap
     * GET /api/device/bootstrap / scope * / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 403 (2026-09-27) スコープ * が必要です / 模擬サーバ: 無し (501) */
    getBootstrap(args?: { facilityId?: string }): Promise<unknown>;
    /** /facilities
     * GET /api/device/facilities / scope * / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 403 (2026-09-27) スコープ * が必要です / 模擬サーバ: 無し (501) */
    getFacilities(args?: { facilityId?: string }): Promise<unknown>;
    /** 一覧 (filters: insuredNumber, today/yesterday/week, since)
     * GET /api/device/records / scope care-records:read / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 400 (2026-09-27) パラメータが要る: facilityId is required / 模擬サーバ: 無し (501) */
    getRecords(args?: { includeVoided?: boolean; facilityId?: string }): Promise<unknown>;
    /** (新規作成、AI 解析なし)
     * POST /api/device/records / scope care-records:write / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postRecords(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 音声/テキスト → AI 解析 → 保存
     * POST /api/device/records/process / scope care-records:write / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postRecordsProcess(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 差分同期 (since=ISO)
     * GET /api/device/records/updates / scope care-records:read / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 400 (2026-09-27) パラメータが要る: facilityId is required / 模擬サーバ: 無し (501) */
    getRecordsUpdates(args?: { facilityId?: string }): Promise<unknown>;
    /** /users (scope: users:read)
     * GET /api/device/users / scope users:read / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 400 (2026-09-27) パラメータが要る: facilityId is required / 模擬サーバ: 無し (501) */
    getUsers(args?: { facilityId?: string }): Promise<unknown>;
  };
  documentGovernance: {
    /** 文書ガバナンス: 1 件取得 (:documentId)
     * GET /api/document-governance/{documentId} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getByDocumentId(args: { documentId: string; facilityId?: string }): Promise<unknown>;
    /** 文書ガバナンス: 更新 (:documentId)
     * PUT /api/document-governance/{documentId} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putByDocumentId(args: { documentId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 文書ガバナンス: output-historyの取得 (:documentId/output-history)
     * GET /api/document-governance/{documentId}/output-history / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getByDocumentIdOutputHistory(args: { documentId: string; facilityId?: string }): Promise<unknown>;
  };
  documentOutputHistory: {
    /** 帳票出力履歴の一覧
     * GET /api/document-output-history / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    get(args?: { facilityId?: string }): Promise<unknown>;
    /** 帳票出力履歴を記録
     * POST /api/document-output-history / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    post(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  export: {
    /** 1 利用者 / 1 事業所ぶんを丸ごと書き出す (束)
     * GET /api/export/all / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getAll(args?: { facilityId?: string; insuredNumber?: string }): Promise<unknown>;
    /** AppData を書き出す (リソース単位、または 1 利用者ぶんをアプリ横断で)
     * GET /api/export/app-data / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getAppData(args?: { appId?: string; resource?: string; insuredNumber?: string; format?: string; facilityId?: string }): Promise<unknown>;
    /** ケアプラン連携取込の履歴を書き出す (batch / files / sets / records)
     * GET /api/export/care-plan-transfer-import / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getCarePlanTransferImport(args?: { includeFiles?: boolean; includeRecords?: boolean; facilityId?: string }): Promise<unknown>;
    /** 1 事業所の利用者を書き出す (マスタ + フェイスシート extras)
     * GET /api/export/facility-users / 認証 session / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getFacilityUsers(args: { facilityId: string; format?: string }): Promise<unknown>;
    /** 1 事業所の全データを書き出す (束)
     * GET /api/export/facility/{facilityId} / 認証 session / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getFacilityByFacilityId(args: { facilityId: string }): Promise<unknown>;
    /** 項目の変更履歴を書き出す
     * GET /api/export/field-history / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getFieldHistory(args?: { facilityId?: string; insuredNumber?: string; appId?: string }): Promise<unknown>;
    /** 利用者マスタを全件書き出す (組織全体)
     * GET /api/export/master-users / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getMasterUsers(args?: { format?: string; facilityId?: string }): Promise<unknown>;
    /** 1 利用者の全データを書き出す (束)
     * GET /api/export/patient/{insuredNumber} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getPatientByInsuredNumber(args: { insuredNumber: string; facilityId?: string }): Promise<unknown>;
    /** なんでもボックスを書き出す (取込元 + OCR 結果 + 抽出結果)
     * GET /api/export/source-hub / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getSourceHub(args?: { facilityId?: string; insuredNumber?: string }): Promise<unknown>;
  };
  exportJobs: {
    /** エクスポートジョブ: 一覧
     * GET /api/export-jobs / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    get(args?: { facilityId?: string }): Promise<unknown>;
    /** エクスポートジョブ: 作成
     * POST /api/export-jobs / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    post(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** エクスポートジョブ: 1 件取得 (:id)
     * GET /api/export-jobs/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getById(args: { id: string; facilityId?: string }): Promise<unknown>;
  };
  exports: {
    /** エクスポート (v4): 作成
     * POST /api/exports/v4 / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV4(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** エクスポート (v4): v4-bundleの登録・実行 (v4-bundle)
     * POST /api/exports/v4-bundle / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV4Bundle(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  externalPartners: {
    /** ============================== contacts ===============================
     * GET /api/external-partners/contacts / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getContacts(args?: { facilityId?: string }): Promise<unknown>;
    /** 1 件作成
     * POST /api/external-partners/contacts / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postContacts(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 1 件取得
     * GET /api/external-partners/contacts/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getContactsById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 1 件更新
     * PUT /api/external-partners/contacts/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putContactsById(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 1 件削除
     * DELETE /api/external-partners/contacts/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteContactsById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 外部関係先: export.csvの取得 (export.csv)
     * GET /api/external-partners/export.csv / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getExportCsv(args?: { facilityId?: string }): Promise<unknown>;
    /** 外部関係先: applyの登録・実行 (import-csv/apply)
     * POST /api/external-partners/import-csv/apply / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postImportCsvApply(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 外部関係先: プレビュー (import-csv/preview)
     * POST /api/external-partners/import-csv/preview / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postImportCsvPreview(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ============================ organizations ============================
     * GET /api/external-partners/organizations / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getOrganizations(args?: { facilityId?: string }): Promise<unknown>;
    /** 1 件作成
     * POST /api/external-partners/organizations / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postOrganizations(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 1 件取得
     * GET /api/external-partners/organizations/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getOrganizationsById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 1 件更新
     * PUT /api/external-partners/organizations/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putOrganizationsById(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 1 件削除 (配下担当者も削除)
     * DELETE /api/external-partners/organizations/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteOrganizationsById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** =============================== CSV =================================== 固定パスのため /:id 動的ルートとは衝突しない (organizations/contacts 配下に :id を置いているので、ここはトップレベルの固定パス)。
     * GET /api/external-partners/template.csv / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getTemplateCsv(args?: { facilityId?: string }): Promise<unknown>;
  };
  facilities: {
    /** 通所の出席状況 (日付ごと)
     * GET /api/facilities/{facilityId}/attendance / 認証 session / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getByFacilityIdAttendance(args: { facilityId: string }): Promise<unknown>;
    /** 出席を登録
     * POST /api/facilities/{facilityId}/attendance / 認証 session / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByFacilityIdAttendance(args: { facilityId: string; body?: unknown }): Promise<unknown>;
    /** 出席を更新 (時刻・欠席理由)
     * PATCH /api/facilities/{facilityId}/attendance/{id} / 認証 session / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    patchByFacilityIdAttendanceById(args: { facilityId: string; id: string; body?: unknown }): Promise<unknown>;
    /** 本体とサテライトをまとめて請求する最初の月を設定する (管理者のみ)
     * PUT /api/facilities/{id}/billing-office-grouping / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putByIdBillingOfficeGrouping(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** サテライトの設定の点検 (本体と違う事業所番号などを一覧にする。管理者のみ)
     * GET /api/facilities/satellite-link-report / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getSatelliteLinkReport(args?: { facilityId?: string }): Promise<unknown>;
  };
  facilityChanges: {
    /** 事業所の変更の一覧 (新しい順)
     * GET /api/facility-changes/v1 / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1(args?: { facilityId?: string }): Promise<unknown>;
    /** 事業所の変更 1 件
     * GET /api/facility-changes/v1/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1ById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 事業所の変更: 実行する (今すぐ / 日時を指定)
     * POST /api/facility-changes/v1/{id}/apply / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ByIdApply(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 事業所の変更: 取り消す
     * POST /api/facility-changes/v1/{id}/cancel / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ByIdCancel(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 事業所の変更: もう一度確かめる (あとの確認を今すぐ)
     * POST /api/facility-changes/v1/{id}/late-sweep / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ByIdLateSweep(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 事業所の変更: 一時停止
     * POST /api/facility-changes/v1/{id}/pause / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ByIdPause(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 事業所の変更: 選び直して下見をやり直す
     * POST /api/facility-changes/v1/{id}/preview / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ByIdPreview(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 事業所の変更: 再開
     * POST /api/facility-changes/v1/{id}/resume / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ByIdResume(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 事業所の変更: 元に戻す
     * POST /api/facility-changes/v1/{id}/undo / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ByIdUndo(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** サテライトを本体にまとめる: 変更を作って下見を始める
     * POST /api/facility-changes/v1/absorb / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1Absorb(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 事業所の変更: この機能が使えるか
     * GET /api/facility-changes/v1/feature / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1Feature(args?: { facilityId?: string }): Promise<unknown>;
  };
  facilityFinancials: {
    /** … 人件費率 (super_admin 限定)
     * GET /api/facility-financials/labor-cost-ratio / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getLaborCostRatio(args?: { facilityId?: string }): Promise<unknown>;
  };
  features: {
    /** 機能フラグの一覧
     * GET /api/features / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    get(args?: { facilityId?: string }): Promise<unknown>;
  };
  fieldHistory: {
    /** 項目履歴: 一覧
     * GET /api/field-history / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    get(args?: { facilityId?: string }): Promise<unknown>;
  };
  fieldProposals: {
    /** 一覧 (status / appId / facilityId / insuredNumber)
     * GET /api/field-proposals / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    get(args?: { facilityId?: string }): Promise<unknown>;
    /** 新規作成 (AI 抽出 / 手動)
     * POST /api/field-proposals / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    post(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 既存 oldValue を確認して反映
     * POST /api/field-proposals/{id}/approve / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByIdApprove(args: { id: string; body: unknown; facilityId?: string }): Promise<unknown>;
    /** proposedValue を上書きして反映
     * POST /api/field-proposals/{id}/edit-and-approve / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByIdEditAndApprove(args: { id: string; body: unknown; facilityId?: string }): Promise<unknown>;
    /** reviewedAt のみ更新
     * POST /api/field-proposals/{id}/reject / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByIdReject(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  groups: {
    /** グループ: 一覧
     * GET /api/groups / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    get(args?: { facilityId?: string }): Promise<unknown>;
    /** グループ: 作成
     * POST /api/groups / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    post(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** グループ: 1 件取得 (:id)
     * GET /api/groups/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** グループ: 更新 (:id)
     * PUT /api/groups/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putById(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** グループ: 削除 (:id)
     * DELETE /api/groups/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** グループ: 登録 (:id/users/:userId)
     * POST /api/groups/{id}/users/{userId} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByIdUsersByUserId(args: { id: string; userId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** グループ: 削除 (:id/users/:userId)
     * DELETE /api/groups/{id}/users/{userId} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteByIdUsersByUserId(args: { id: string; userId: string; facilityId?: string }): Promise<unknown>;
  };
  helpInquiries: {
    /** ヘルプ問い合わせ: 一覧
     * GET /api/help-inquiries / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    get(args?: { facilityId?: string }): Promise<unknown>;
    /** ヘルプ問い合わせ: 作成
     * POST /api/help-inquiries / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    post(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ヘルプ問い合わせ: answerの登録・実行 (:id/answer)
     * POST /api/help-inquiries/{id}/answer / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByIdAnswer(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ヘルプ問い合わせ: promote-to-faqの登録・実行 (:id/promote-to-faq)
     * POST /api/help-inquiries/{id}/promote-to-faq / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByIdPromoteToFaq(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  importJobs: {
    /** 取込ジョブの一覧
     * GET /api/import-jobs / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    get(args?: { facilityId?: string }): Promise<unknown>;
    /** 取込ジョブ: 1 件取得 (:id)
     * GET /api/import-jobs/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 適用: ジョブを applied に遷移する。実際の各ターゲット repo への書込は pluggable applier (後続) で行う。現状はエラー無し (ready) のみ適用可。
     * POST /api/import-jobs/{id}/apply / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByIdApply(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 取込ジョブ: 取消 (:id/cancel)
     * POST /api/import-jobs/{id}/cancel / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByIdCancel(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 取込ジョブの結果レポート
     * GET /api/import-jobs/{id}/report / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getByIdReport(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 取込ジョブのプレビュー
     * POST /api/import-jobs/preview / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postPreview(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  integrations: {
    /** → ConfigBundle
     * POST /api/integrations/google-sheets/export / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postGoogleSheetsExport(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** Google スプレッドシートから取込
     * POST /api/integrations/google-sheets/import / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postGoogleSheetsImport(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 連携設定: 状態の取得 (google-sheets/status)
     * GET /api/integrations/google-sheets/status / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getGoogleSheetsStatus(args?: { facilityId?: string }): Promise<unknown>;
  };
  knowledge: {
    /** ナレッジ: articlesの取得 (articles)
     * GET /api/knowledge/articles / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getArticles(args?: { facilityId?: string }): Promise<unknown>;
    /** ナレッジ: articlesの登録・実行 (articles)
     * POST /api/knowledge/articles / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postArticles(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ナレッジ: 更新 (articles/:id)
     * PUT /api/knowledge/articles/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putArticlesById(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ナレッジ記事を保管に移す
     * POST /api/knowledge/articles/{id}/archive / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postArticlesByIdArchive(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ナレッジ記事を公開
     * POST /api/knowledge/articles/{id}/publish / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postArticlesByIdPublish(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ナレッジ: 検索の取得 (search)
     * GET /api/knowledge/search / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getSearch(args?: { facilityId?: string }): Promise<unknown>;
  };
  legacyConfidential: {
    /** : 自分のマイドライブを対象に手動スキャン (同期実行。
     * POST /api/legacy-confidential/scan / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postScan(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 旧データ機微情報: 状態の取得 (status)
     * GET /api/legacy-confidential/status / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getStatus(args?: { facilityId?: string }): Promise<unknown>;
  };
  legacyRecords: {
    /** : 取得
     * GET /api/legacy-records/v1/facilities/{facilityId}/config / 認証 session / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getV1FacilitiesByFacilityIdConfig(args: { facilityId: string }): Promise<unknown>;
    /** : 上書き
     * PUT /api/legacy-records/v1/facilities/{facilityId}/config / 認証 session / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putV1FacilitiesByFacilityIdConfig(args: { facilityId: string; body?: unknown }): Promise<unknown>;
    /** : plan を適用
     * POST /api/legacy-records/v1/facilities/{facilityId}/config-migration/apply / 認証 session / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1FacilitiesByFacilityIdConfigMigrationApply(args: { facilityId: string; body?: unknown }): Promise<unknown>;
    /** 旧記録 (GAS): collect-from-gasの登録・実行 (facilities/:facilityId/config-migration/collect-from-gas)
     * POST /api/legacy-records/v1/facilities/{facilityId}/config-migration/collect-from-gas / 認証 session / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1FacilitiesByFacilityIdConfigMigrationCollectFromGas(args: { facilityId: string; body?: unknown }): Promise<unknown>;
    /** 旧記録 (GAS): discoverの登録・実行 (facilities/:facilityId/config-migration/discover)
     * POST /api/legacy-records/v1/facilities/{facilityId}/config-migration/discover / 認証 session / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1FacilitiesByFacilityIdConfigMigrationDiscover(args: { facilityId: string; body?: unknown }): Promise<unknown>;
    /** : CPOS 記録設定の
     * POST /api/legacy-records/v1/facilities/{facilityId}/config-migration/preview / 認証 session / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1FacilitiesByFacilityIdConfigMigrationPreview(args: { facilityId: string; body?: unknown }): Promise<unknown>;
    /** 旧記録 (GAS): アーカイブ (facilities/:facilityId/cutover/archive)
     * POST /api/legacy-records/v1/facilities/{facilityId}/cutover/archive / 認証 session / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1FacilitiesByFacilityIdCutoverArchive(args: { facilityId: string; body?: unknown }): Promise<unknown>;
    /** 旧記録 (GAS): checkの登録・実行 (facilities/:facilityId/cutover/check)
     * POST /api/legacy-records/v1/facilities/{facilityId}/cutover/check / 認証 session / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1FacilitiesByFacilityIdCutoverCheck(args: { facilityId: string; body?: unknown }): Promise<unknown>;
    /** 旧記録 (GAS): completeの登録・実行 (facilities/:facilityId/cutover/complete)
     * POST /api/legacy-records/v1/facilities/{facilityId}/cutover/complete / 認証 session / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1FacilitiesByFacilityIdCutoverComplete(args: { facilityId: string; body?: unknown }): Promise<unknown>;
    /** 旧記録 (GAS): final-syncの登録・実行 (facilities/:facilityId/cutover/final-sync)
     * POST /api/legacy-records/v1/facilities/{facilityId}/cutover/final-sync / 認証 session / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1FacilitiesByFacilityIdCutoverFinalSync(args: { facilityId: string; body?: unknown }): Promise<unknown>;
    /** 旧記録 (GAS): rollbackの登録・実行 (facilities/:facilityId/cutover/rollback)
     * POST /api/legacy-records/v1/facilities/{facilityId}/cutover/rollback / 認証 session / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1FacilitiesByFacilityIdCutoverRollback(args: { facilityId: string; body?: unknown }): Promise<unknown>;
    /** : 試行 1 シート読込 (列マッピング検証)
     * POST /api/legacy-records/v1/facilities/{facilityId}/diagnose / 認証 session / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1FacilitiesByFacilityIdDiagnose(args: { facilityId: string; body?: unknown }): Promise<unknown>;
    /** : Sheets vs DB 差分
     * GET /api/legacy-records/v1/facilities/{facilityId}/diff / 認証 session / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getV1FacilitiesByFacilityIdDiff(args: { facilityId: string }): Promise<unknown>;
    /** 旧記録 (GAS): export-legacy-sheetの取得 (facilities/:facilityId/export-legacy-sheet)
     * GET /api/legacy-records/v1/facilities/{facilityId}/export-legacy-sheet / 認証 session / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1FacilitiesByFacilityIdExportLegacySheet(args: { facilityId: string }): Promise<unknown>;
    /** : merged read facade
     * GET /api/legacy-records/v1/facilities/{facilityId}/records / 認証 session / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getV1FacilitiesByFacilityIdRecords(args: { facilityId: string }): Promise<unknown>;
    /** : 実行履歴
     * GET /api/legacy-records/v1/facilities/{facilityId}/runs / 認証 session / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getV1FacilitiesByFacilityIdRuns(args: { facilityId: string }): Promise<unknown>;
    /** : preview / apply 実行
     * POST /api/legacy-records/v1/facilities/{facilityId}/sync / 認証 session / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1FacilitiesByFacilityIdSync(args: { facilityId: string; body?: unknown }): Promise<unknown>;
    /** : 同期 warning 一覧
     * GET /api/legacy-records/v1/facilities/{facilityId}/warnings / 認証 session / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getV1FacilitiesByFacilityIdWarnings(args: { facilityId: string }): Promise<unknown>;
    /** 旧記録 (GAS): resolveの登録・実行 (facilities/:facilityId/warnings/:id/resolve)
     * POST /api/legacy-records/v1/facilities/{facilityId}/warnings/{id}/resolve / 認証 session / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1FacilitiesByFacilityIdWarningsByIdResolve(args: { facilityId: string; id: string; body?: unknown }): Promise<unknown>;
    /** : 移行モードに沿った 1 件記録作成
     * POST /api/legacy-records/v1/facilities/{facilityId}/write / 認証 session / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1FacilitiesByFacilityIdWrite(args: { facilityId: string; body?: unknown }): Promise<unknown>;
  };
  life: {
    /** 複数 CSV を zip (admin のみ)
     * POST /api/life/v1/bundles/download / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1BundlesDownload(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 複数 IF の一括検証
     * POST /api/life/v1/bundles/dry-run / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1BundlesDryRun(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** エクスポートジョブ履歴
     * GET /api/life/v1/export-jobs / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1ExportJobs(args?: { facilityId?: string }): Promise<unknown>;
    /** CSV ダウンロード (admin のみ)
     * POST /api/life/v1/exports/{interfaceName}/download / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ExportsByInterfaceNameDownload(args: { interfaceName: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 検証 + プレビュー
     * POST /api/life/v1/exports/{interfaceName}/dry-run / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ExportsByInterfaceNameDryRun(args: { interfaceName: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** インターフェース一覧
     * GET /api/life/v1/spec / 認証 session / 実測 200 (2026-09-27) 応答の項目: interfaces, relations, version / 模擬サーバ: 無し (501) */
    getV1Spec(args?: { facilityId?: string }): Promise<unknown>;
    /** 1 IF の項目仕様
     * GET /api/life/v1/spec/{interfaceName} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getV1SpecByInterfaceName(args: { interfaceName: string; facilityId?: string }): Promise<unknown>;
  };
  maintenance: {
    /** バックアップ (super_admin・本番だけ): 予定バックアップを新しいデータベース restore-YYYYMMDD に復元する (理由が要る。今のデータベースは上書きしない)
     * POST /api/maintenance/cloud-backup/v1/restores / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postCloudBackupV1Restores(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** バックアップ (super_admin): Google Cloud 側の完全なバックアップの状況 (過去の時点への復元・予定バックアップ・毎晩の書き出し・削除の保護・復元した写し) を読む
     * GET /api/maintenance/cloud-backup/v1/status / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getCloudBackupV1Status(args?: { facilityId?: string }): Promise<unknown>;
    /** 保守: テスト利用者の試験データを片付ける (super_admin 専用・既定は dry-run・要実行理由)
     * POST /api/maintenance/purge-user-test-data / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postPurgeUserTestData(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 本番データのコピー: 定期実行 (毎日・毎週、日本時間の時刻) を保存する
     * PUT /api/maintenance/staging-copy/v1/recurring / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putStagingCopyV1Recurring(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 本番データのコピー: 1 回だけの予約を足す (20 件まで)
     * POST /api/maintenance/staging-copy/v1/reservations / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postStagingCopyV1Reservations(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 本番データのコピー: 予約を取り消す
     * DELETE /api/maintenance/staging-copy/v1/reservations/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteStagingCopyV1ReservationsById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 本番データのコピー: 今すぐ始める (実行中があれば 409)
     * POST /api/maintenance/staging-copy/v1/runs / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postStagingCopyV1Runs(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 本番データのコピー: 実行中のコピーを最大 20 秒ぶん進めて状態を返す
     * POST /api/maintenance/staging-copy/v1/runs/{id}/advance / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postStagingCopyV1RunsByIdAdvance(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 本番データのコピー (ステージングだけ): 使えるか・予約・定期実行・実行中と最近のコピーを見る
     * GET /api/maintenance/staging-copy/v1/view / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getStagingCopyV1View(args?: { facilityId?: string }): Promise<unknown>;
  };
  mappingProfiles: {
    /** 取込マッピング: 一覧
     * GET /api/mapping-profiles / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    get(args?: { facilityId?: string }): Promise<unknown>;
    /** 取込マッピング: 作成
     * POST /api/mapping-profiles / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    post(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 取込マッピング: 更新 (:id)
     * PUT /api/mapping-profiles/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putById(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 取込マッピング: 削除 (:id)
     * DELETE /api/mapping-profiles/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteById(args: { id: string; facilityId?: string }): Promise<unknown>;
  };
  masterUsers: {
    /** 利用者マスタ: 一覧
     * GET /api/master-users / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    get(args?: { facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: 作成
     * POST /api/master-users / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    post(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: 1 件取得 (:insuredNumber)
     * GET /api/master-users/{insuredNumber} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getByInsuredNumber(args: { insuredNumber: string; facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: 更新 (:insuredNumber)
     * PUT /api/master-users/{insuredNumber} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putByInsuredNumber(args: { insuredNumber: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: 削除 (:insuredNumber)
     * DELETE /api/master-users/{insuredNumber} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteByInsuredNumber(args: { insuredNumber: string; facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: care-plansの取得 (:insuredNumber/care-plans)
     * GET /api/master-users/{insuredNumber}/care-plans / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getByInsuredNumberCarePlans(args: { insuredNumber: string; facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: プレビューの取得 (:insuredNumber/care-plans/preview)
     * GET /api/master-users/{insuredNumber}/care-plans/preview / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getByInsuredNumberCarePlansPreview(args: { insuredNumber: string; facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: convertの登録・実行 (:insuredNumber/careplan/convert)
     * POST /api/master-users/{insuredNumber}/careplan/convert / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByInsuredNumberCareplanConvert(args: { insuredNumber: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: viewの取得 (:insuredNumber/careplan/view)
     * GET /api/master-users/{insuredNumber}/careplan/view / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getByInsuredNumberCareplanView(args: { insuredNumber: string; facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: applyの登録・実行 (:insuredNumber/change-insured-number/apply)
     * POST /api/master-users/{insuredNumber}/change-insured-number/apply / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByInsuredNumberChangeInsuredNumberApply(args: { insuredNumber: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: プレビュー (:insuredNumber/change-insured-number/preview)
     * POST /api/master-users/{insuredNumber}/change-insured-number/preview / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByInsuredNumberChangeInsuredNumberPreview(args: { insuredNumber: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: extras-promotionの取得 (:insuredNumber/extras-promotion)
     * GET /api/master-users/{insuredNumber}/extras-promotion / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getByInsuredNumberExtrasPromotion(args: { insuredNumber: string; facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: extras-promotionの登録・実行 (:insuredNumber/extras-promotion)
     * POST /api/master-users/{insuredNumber}/extras-promotion / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByInsuredNumberExtrasPromotion(args: { insuredNumber: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: facilitiesの取得 (:insuredNumber/facilities)
     * GET /api/master-users/{insuredNumber}/facilities / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getByInsuredNumberFacilities(args: { insuredNumber: string; facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: facilitiesの登録・実行 (:insuredNumber/facilities)
     * POST /api/master-users/{insuredNumber}/facilities / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByInsuredNumberFacilities(args: { insuredNumber: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: identifier-aliasesの取得 (:insuredNumber/identifier-aliases)
     * GET /api/master-users/{insuredNumber}/identifier-aliases / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getByInsuredNumberIdentifierAliases(args: { insuredNumber: string; facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: identifier-aliasesの登録・実行 (:insuredNumber/identifier-aliases)
     * POST /api/master-users/{insuredNumber}/identifier-aliases / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByInsuredNumberIdentifierAliases(args: { insuredNumber: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: deactivateの登録・実行 (:insuredNumber/identifier-aliases/deactivate)
     * POST /api/master-users/{insuredNumber}/identifier-aliases/deactivate / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByInsuredNumberIdentifierAliasesDeactivate(args: { insuredNumber: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: important-mattersの取得 (:insuredNumber/important-matters)
     * GET /api/master-users/{insuredNumber}/important-matters / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getByInsuredNumberImportantMatters(args: { insuredNumber: string; facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: 更新 (:insuredNumber/important-matters)
     * PUT /api/master-users/{insuredNumber}/important-matters / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putByInsuredNumberImportantMatters(args: { insuredNumber: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: personal-record-entriesの取得 (:insuredNumber/personal-record-entries)
     * GET /api/master-users/{insuredNumber}/personal-record-entries / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getByInsuredNumberPersonalRecordEntries(args: { insuredNumber: string; facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: applyの登録・実行 (:masterUserId/insured-number/apply)
     * POST /api/master-users/{masterUserId}/insured-number/apply / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByMasterUserIdInsuredNumberApply(args: { masterUserId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: プレビュー (:masterUserId/insured-number/preview)
     * POST /api/master-users/{masterUserId}/insured-number/preview / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByMasterUserIdInsuredNumberPreview(args: { masterUserId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: promoteの登録・実行 (:tmpInsuredNumber/promote)
     * POST /api/master-users/{tmpInsuredNumber}/promote / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByTmpInsuredNumberPromote(args: { tmpInsuredNumber: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: assign-master-user-idsの登録・実行 (assign-master-user-ids)
     * POST /api/master-users/assign-master-user-ids / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postAssignMasterUserIds(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: 更新 (assignments/:id)
     * PUT /api/master-users/assignments/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putAssignmentsById(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: 削除 (assignments/:id)
     * DELETE /api/master-users/assignments/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteAssignmentsById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: 事業所アサインの重複整理 (同じ本人 x 同じ事業所の行を 1 件にまとめる)
     * POST /api/master-users/assignments/dedupe / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postAssignmentsDedupe(args: { body: unknown; facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: bulk-deleteの登録・実行 (bulk-delete)
     * POST /api/master-users/bulk-delete / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postBulkDelete(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: bulk-folder-reconcileの登録・実行 (bulk-folder-reconcile)
     * POST /api/master-users/bulk-folder-reconcile / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postBulkFolderReconcile(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: 1 件取得 (by-facility/:facilityId)
     * GET /api/master-users/by-facility/{facilityId} / 認証 session / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getByFacilityByFacilityId(args: { facilityId: string }): Promise<unknown>;
    /** 利用者マスタ: duplicatesの取得 (duplicates)
     * GET /api/master-users/duplicates / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getDuplicates(args?: { facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: export.csvの取得 (export.csv)
     * GET /api/master-users/export.csv / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getExportCsv(args?: { facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: import-csvの登録・実行 (import-csv)
     * POST /api/master-users/import-csv / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postImportCsv(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: import-trikea-csvの登録・実行 (import-trikea-csv)
     * POST /api/master-users/import-trikea-csv / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postImportTrikeaCsv(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: import-trikea-csv-pairの登録・実行 (import-trikea-csv-pair)
     * POST /api/master-users/import-trikea-csv-pair / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postImportTrikeaCsvPair(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: 登録の前に、同じ方らしい登録 (字体違いの名前・ふりがな・被保険者番号) を探す (likely-same)
     * POST /api/master-users/likely-same / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postLikelySame(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: 状態の取得 (master-user-id-migration/status)
     * GET /api/master-users/master-user-id-migration/status / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getMasterUserIdMigrationStatus(args?: { facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: merge-auditの取得 (merge-audit)
     * GET /api/master-users/merge-audit / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 501 (2026-09-27) 利用者統合の復旧機能は現在無効です。保守作業時のみ有効化されます / 模擬サーバ: 無し (501) */
    getMergeAudit(args?: { facilityId?: string }): Promise<unknown>;
    /** body: { from, into }
     * POST /api/master-users/merge/apply / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postMergeApply(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** body: { from, into }
     * POST /api/master-users/merge/preview / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postMergePreview(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: applyの登録・実行 (normalize-care-level/apply)
     * POST /api/master-users/normalize-care-level/apply / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postNormalizeCareLevelApply(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: プレビュー (normalize-care-level/preview)
     * POST /api/master-users/normalize-care-level/preview / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postNormalizeCareLevelPreview(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: normalize-stringsの登録・実行 (normalize-strings)
     * POST /api/master-users/normalize-strings / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postNormalizeStrings(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: orphan-identitiesの取得 (orphan-identities)
     * GET /api/master-users/orphan-identities / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getOrphanIdentities(args?: { facilityId?: string }): Promise<unknown>;
    /** body: { fromIdentifier, toMasterUserId } [P0-7]
     * POST /api/master-users/orphan-identities/attach / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postOrphanIdentitiesAttach(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: orphan-recordsの取得 (orphan-records)
     * GET /api/master-users/orphan-records / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getOrphanRecords(args?: { facilityId?: string }): Promise<unknown>;
    /** body: { from: tmp-*, to: 現行番号 } [P0-7]
     * POST /api/master-users/orphan-records/attach / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postOrphanRecordsAttach(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: applyの登録・実行 (quick-registration/apply)
     * POST /api/master-users/quick-registration/apply / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postQuickRegistrationApply(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: プレビュー (quick-registration/preview)
     * POST /api/master-users/quick-registration/preview / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postQuickRegistrationPreview(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: resultの取得 (quick-registration/result)
     * GET /api/master-users/quick-registration/result / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getQuickRegistrationResult(args?: { facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: applyの登録・実行 (retire-temp-insured-numbers/apply)
     * POST /api/master-users/retire-temp-insured-numbers/apply / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postRetireTempInsuredNumbersApply(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: プレビュー (retire-temp-insured-numbers/preview)
     * POST /api/master-users/retire-temp-insured-numbers/preview / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postRetireTempInsuredNumbersPreview(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: split-namesの登録・実行 (split-names)
     * POST /api/master-users/split-names / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postSplitNames(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: sync-from-foldersの登録・実行 (sync-from-folders)
     * POST /api/master-users/sync-from-folders / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postSyncFromFolders(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: 1 件取得 (sync-jobs/:jobId)
     * GET /api/master-users/sync-jobs/{jobId} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getSyncJobsByJobId(args: { jobId: string; facilityId?: string }): Promise<unknown>;
    /** 利用者マスタ: unresolved-refsの取得 (unresolved-refs)
     * GET /api/master-users/unresolved-refs / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 501 (2026-09-27) 利用者統合の復旧機能は現在無効です。保守作業時のみ有効化されます / 模擬サーバ: 無し (501) */
    getUnresolvedRefs(args?: { facilityId?: string }): Promise<unknown>;
  };
  notificationDeliveries: {
    /** 通知配信: 一覧
     * GET /api/notification-deliveries / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    get(args?: { facilityId?: string }): Promise<unknown>;
    /** 通知配信: retryの登録・実行 (:id/retry)
     * POST /api/notification-deliveries/{id}/retry / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByIdRetry(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  notificationRules: {
    /** 通知ルール: 一覧
     * GET /api/notification-rules / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    get(args?: { facilityId?: string }): Promise<unknown>;
    /** 通知ルール: 作成
     * POST /api/notification-rules / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    post(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 通知ルール: 更新 (:id)
     * PUT /api/notification-rules/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putById(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 通知ルール: 削除 (:id)
     * DELETE /api/notification-rules/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteById(args: { id: string; facilityId?: string }): Promise<unknown>;
  };
  notifications: {
    /** 通知: readの登録・実行 (:id/read)
     * POST /api/notifications/{id}/read / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByIdRead(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 通知: 自分の取得 (me)
     * GET /api/notifications/me / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getMe(args?: { facilityId?: string }): Promise<unknown>;
  };
  oauth: {
    /** 同意画面 (未ログインなら Google Workspace ログインへ送る)
     * GET /oauth/authorize / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 400 (2026-09-27) パラメータが要る:  / 模擬サーバ: 無し (501) */
    getAuthorize(args: { response_type: string; client_id: string; redirect_uri: string; scope?: string; state?: string; code_challenge: string; code_challenge_method: string; resource?: string; facilityId?: string }): Promise<unknown>;
    /** 同意の結果を受け、認可コードを redirect_uri へ返す
     * POST /oauth/authorize / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postAuthorize(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  onboarding: {
    /** オンボーディング: visit-nursing-userの登録・実行 (visit-nursing-user)
     * POST /api/onboarding/visit-nursing-user / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postVisitNursingUser(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  operations: {
    /** 運用診断: AI の稼働状況 (admin 限定・読み取りだけ)
     * GET /api/operations/ai-status / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getAiStatus(args?: { facilityId?: string }): Promise<unknown>;
    /** 運用診断: backup-statusの取得 (backup-status)
     * GET /api/operations/backup-status / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getBackupStatus(args?: { facilityId?: string }): Promise<unknown>;
    /** 運用診断: backup-testの登録・実行 (backup-test)
     * POST /api/operations/backup-test / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postBackupTest(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** bot Gmail 送信トークンの実地診断。実際に resolveBotAccessToken() を呼び、 トークンが取得できるか / 付与スコープに gmail.send があるか / 失敗理由を返す。 token そのものは返さない (秘匿)。メール送信が 503 になる原因切り分け用。
     * GET /api/operations/bot-gmail-status / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getBotGmailStatus(args?: { facilityId?: string }): Promise<unknown>;
    /** 運用診断: config-summaryの取得 (config-summary)
     * GET /api/operations/config-summary / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getConfigSummary(args?: { facilityId?: string }): Promise<unknown>;
    /** 運用診断: 診断の取得 (diagnostics)
     * GET /api/operations/diagnostics / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getDiagnostics(args?: { facilityId?: string }): Promise<unknown>;
    /** 運用診断: 実行 (diagnostics/run)
     * POST /api/operations/diagnostics/run / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postDiagnosticsRun(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 運用診断: サーバのメモリにしか無かったファイルの参照 (memory://) の件数 (admin 限定・読み取りだけ)
     * GET /api/operations/memory-file-refs / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getMemoryFileRefs(args?: { facilityId?: string }): Promise<unknown>;
  };
  personalAccessTokens: {
    /** Personal Access Token: 一覧
     * GET /api/personal-access-tokens / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    get(args?: { facilityId?: string }): Promise<unknown>;
    /** Personal Access Token: 作成
     * POST /api/personal-access-tokens / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    post(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** Personal Access Token: 削除 (:id)
     * DELETE /api/personal-access-tokens/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** Personal Access Token: 失効 (:id/revoke)
     * POST /api/personal-access-tokens/{id}/revoke / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByIdRevoke(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  platform: {
    /** currentUser + 事業所 + 有効設定
     * GET /api/platform/bootstrap / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getBootstrap(args?: { facilityId?: string }): Promise<unknown>;
    /** Platform: config-export: config-exportの取得 (config-export)
     * GET /api/platform/config-export / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getConfigExport(args?: { facilityId?: string }): Promise<unknown>;
    /** Platform: config-import: applyの登録・実行 (config-import/apply)
     * POST /api/platform/config-import/apply / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postConfigImportApply(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** Platform: config-import: プレビュー (config-import/preview)
     * POST /api/platform/config-import/preview / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postConfigImportPreview(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 定義一覧
     * GET /api/platform/definitions / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getDefinitions(args?: { facilityId?: string }): Promise<unknown>;
    /** 新規
     * POST /api/platform/definitions / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postDefinitions(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 単一
     * GET /api/platform/definitions/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getDefinitionsById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 更新
     * PUT /api/platform/definitions/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putDefinitionsById(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 削除
     * DELETE /api/platform/definitions/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteDefinitionsById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 有効設定 (kind 別)
     * GET /api/platform/effective-settings / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getEffectiveSettings(args?: { facilityId?: string }): Promise<unknown>;
    /** user/group 割当
     * GET /api/platform/facility-assignments / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getFacilityAssignments(args?: { facilityId?: string }): Promise<unknown>;
    /** 旧「事業所アクセス」の割当から、ユーザーの所属 (facilityIds) を埋め戻す (移行・修復用)。足すだけで所属からは何も消さない。dryRun=true (既定) は差分のみ返す
     * POST /api/platform/facility-assignments/backfill-user-facilities / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postFacilityAssignmentsBackfillUserFacilities(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** group 割当 upsert
     * POST /api/platform/facility-assignments/groups / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postFacilityAssignmentsGroups(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** Platform: facility-assignments: 削除 (facility-assignments/groups/:id)
     * DELETE /api/platform/facility-assignments/groups/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteFacilityAssignmentsGroupsById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** この人をこの事業所の所属から外す (ユーザーの facilityIds から削除 + 対応する明細も削除)
     * DELETE /api/platform/facility-assignments/membership/{userId}/{facilityId} / 認証 session / facilityId 必須 / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteFacilityAssignmentsMembershipByUserIdByFacilityId(args: { userId: string; facilityId: string }): Promise<unknown>;
    /** user 割当 upsert (ユーザーの所属 facilityIds にも書き戻す)
     * POST /api/platform/facility-assignments/users / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postFacilityAssignmentsUsers(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** Platform: facility-assignments: 削除 (facility-assignments/users/:id)
     * DELETE /api/platform/facility-assignments/users/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteFacilityAssignmentsUsersById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** — 実際に definition を upsert
     * POST /api/platform/presets/record/apply / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postPresetsRecordApply(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** — 何が作られる/更新されるかを返す
     * POST /api/platform/presets/record/preview / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postPresetsRecordPreview(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  prompts: {
    /** プロンプト: 一覧
     * GET /api/prompts / scope prompts:read / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 403 (2026-09-27) scope prompts:read / 模擬サーバ: 無し (501) */
    get(args?: { facilityId?: string }): Promise<unknown>;
    /** プロンプト: 作成
     * POST /api/prompts / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    post(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** プロンプト: 1 件取得 (:id)
     * GET /api/prompts/{id} / scope prompts:read / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** プロンプト: 更新 (:id)
     * PUT /api/prompts/{id} / scope prompts:read / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putById(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** プロンプト: 削除 (:id)
     * DELETE /api/prompts/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** body: { facilityId, content }
     * POST /api/prompts/{id}/override-for-facility / scope prompts:read / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByIdOverrideForFacility(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** プロンプト: プレビュー (:id/preview)
     * POST /api/prompts/{id}/preview / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByIdPreview(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  providers: {
    /** 一覧 (cursor pagination)
     * GET /api/providers / scope providers:read / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 403 (2026-09-27) scope providers:read / 模擬サーバ: 無し (501) */
    get(args?: { facilityId?: string }): Promise<unknown>;
    /** 1 件作成 (UI manual add)
     * POST /api/providers / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    post(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 1 件取得 (full ProviderServiceOffice)
     * GET /api/providers/{id} / scope providers:read / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 1 件更新
     * PUT /api/providers/{id} / scope providers:read / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putById(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 1 件削除
     * DELETE /api/providers/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** マスタを CSV エクスポート
     * GET /api/providers/export.csv / scope providers:read / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getExportCsv(args?: { facilityId?: string }): Promise<unknown>;
    /** CSV 取込 (upsert)
     * POST /api/providers/import-csv/apply / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postImportCsvApply(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** CSV プレビュー (DB 変更なし)
     * POST /api/providers/import-csv/preview / scope providers:read / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postImportCsvPreview(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 検索 (query / providerNumber / serviceTypeCode / activeOnly)
     * GET /api/providers/search / scope providers:read / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 403 (2026-09-27) scope providers:read / 模擬サーバ: 無し (501) */
    getSearch(args?: { facilityId?: string }): Promise<unknown>;
    /** 取込用 CSV テンプレート (UTF-8 BOM)
     * GET /api/providers/template.csv / scope providers:read / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 403 (2026-09-27) scope providers:read / 模擬サーバ: 無し (501) */
    getTemplateCsv(args?: { facilityId?: string }): Promise<unknown>;
  };
  provision: {
    /** テナント払い出し: 一覧
     * GET /api/provision/v1 / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getV1(args?: { facilityId?: string }): Promise<unknown>;
    /** テナント払い出し: 作成
     * POST /api/provision/v1 / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** テナント払い出し: 1 件取得 (:id)
     * GET /api/provision/v1/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getV1ById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** テナント払い出し: 更新 (:id)
     * PUT /api/provision/v1/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putV1ById(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** テナント払い出し: 削除 (:id)
     * DELETE /api/provision/v1/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteV1ById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** テナント払い出し: linesの取得 (:id/lines)
     * GET /api/provision/v1/{id}/lines / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getV1ByIdLines(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** テナント払い出し: linesの登録・実行 (:id/lines)
     * POST /api/provision/v1/{id}/lines / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ByIdLines(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** テナント払い出し: 削除 (:id/lines/:lineId)
     * DELETE /api/provision/v1/{id}/lines/{lineId} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteV1ByIdLinesByLineId(args: { id: string; lineId: string; facilityId?: string }): Promise<unknown>;
    /** テナント払い出し: 検証 (validate)
     * POST /api/provision/v1/validate / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1Validate(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  qualifiedPersons: {
    /** 有資格者: 一覧
     * GET /api/qualified-persons/v1 / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getV1(args?: { facilityId?: string }): Promise<unknown>;
    /** 有資格者: 作成
     * POST /api/qualified-persons/v1 / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 有資格者: 1 件取得 (:id)
     * GET /api/qualified-persons/v1/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getV1ById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 有資格者: 更新 (:id)
     * PUT /api/qualified-persons/v1/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putV1ById(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 有資格者: 削除 (:id)
     * DELETE /api/qualified-persons/v1/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteV1ById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 有資格者: export.csvの取得 (export.csv)
     * GET /api/qualified-persons/v1/export.csv / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1ExportCsv(args?: { facilityId?: string }): Promise<unknown>;
    /** 有資格者: import-csvの登録・実行 (import-csv)
     * POST /api/qualified-persons/v1/import-csv / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ImportCsv(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 有資格者: sync-from-employeesの登録・実行 (sync-from-employees)
     * POST /api/qualified-persons/v1/sync-from-employees / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1SyncFromEmployees(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  recordApp: {
    /** AI に質問 POST /ask body: { facilityId, question, userName?, since?, until? }
     * POST /api/record-app/records/ask / scope care-records:write / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postRecordsAsk(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 記録入力をパイプラインに流す POST /process body: { facilityId, rawText, specifiedUserName?, recordTypes?, skipAi?, visitData? }
     * POST /api/record-app/records/process / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postRecordsProcess(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  recordTransfer: {
    /** 記録移送: 候補の取得 (candidates)
     * GET /api/record-transfer/v1/candidates / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getV1Candidates(args?: { facilityId?: string }): Promise<unknown>;
    /** 記録移送: 1 件取得 (candidates/:id)
     * GET /api/record-transfer/v1/candidates/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getV1CandidatesById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 記録移送: 更新 (candidates/:id)
     * PUT /api/record-transfer/v1/candidates/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putV1CandidatesById(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 記録移送: 確定 (candidates/:id/commit)
     * POST /api/record-transfer/v1/candidates/{id}/commit / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1CandidatesByIdCommit(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 記録移送: 差戻し (candidates/:id/reject)
     * POST /api/record-transfer/v1/candidates/{id}/reject / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1CandidatesByIdReject(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 記録移送: プレビュー (candidates/preview)
     * POST /api/record-transfer/v1/candidates/preview / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1CandidatesPreview(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  records: {
    /** 記録: 部分更新 (:recordId)
     * PATCH /api/records/{recordId} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    patchByRecordId(args: { recordId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 記録: 削除 (:recordId)
     * DELETE /api/records/{recordId} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteByRecordId(args: { recordId: string; facilityId?: string }): Promise<unknown>;
    /** 記録: 添付の取得 (:recordId/attachments)
     * GET /api/records/{recordId}/attachments / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getByRecordIdAttachments(args: { recordId: string; facilityId?: string }): Promise<unknown>;
    /** 記録: 添付 (:recordId/attachments)
     * POST /api/records/{recordId}/attachments / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByRecordIdAttachments(args: { recordId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 記録: 削除 (:recordId/attachments/:attId)
     * DELETE /api/records/{recordId}/attachments/{attId} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteByRecordIdAttachmentsByAttId(args: { recordId: string; attId: string; facilityId?: string }): Promise<unknown>;
    /** 記録: classifyの登録・実行 (:recordId/classify)
     * POST /api/records/{recordId}/classify / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByRecordIdClassify(args: { recordId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 記録: unclassifiedの取得 (unclassified)
     * GET /api/records/unclassified / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getUnclassified(args?: { facilityId?: string }): Promise<unknown>;
  };
  recordsPipeline: {
    /** 記録に AI で質問する (パイプライン)
     * POST /api/records-pipeline/ask / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postAsk(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 申し送りの生成プレビュー
     * POST /api/records-pipeline/handover/preview / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postHandoverPreview(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 申し送りを生成して書き込む
     * POST /api/records-pipeline/handover/write / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postHandoverWrite(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 記録入力をパイプラインに流す POST /process body: { facilityId, rawText, specifiedUserName?, recordTypes?, skipAi?, visitData? }
     * POST /api/records-pipeline/process / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postProcess(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  restore: {
    /** 過去の状態から戻す: この機能が使えるか
     * GET /api/restore/v1/feature / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1Feature(args?: { facilityId?: string }): Promise<unknown>;
    /** 過去の状態から戻す: 消えた写真・添付
     * GET /api/restore/v1/files / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1Files(args?: { facilityId?: string }): Promise<unknown>;
    /** 過去の状態から戻す: 写真・添付を 1 件戻す
     * POST /api/restore/v1/files/restore / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1FilesRestore(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 過去の状態から戻す: 戻した履歴
     * GET /api/restore/v1/history / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1History(args?: { facilityId?: string }): Promise<unknown>;
    /** 過去の状態から戻す: 元に戻す
     * POST /api/restore/v1/history/{id}/undo / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1HistoryByIdUndo(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 過去の状態から戻す: 消えた・変わったものの一覧
     * GET /api/restore/v1/items / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1Items(args?: { facilityId?: string }): Promise<unknown>;
    /** 過去の状態から戻す: 比べる
     * GET /api/restore/v1/items/{kind}/{docId} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getV1ItemsByKindByDocId(args: { kind: string; docId: string; facilityId?: string }): Promise<unknown>;
    /** 過去の状態から戻す: 戻す
     * POST /api/restore/v1/items/{kind}/{docId}/restore / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ItemsByKindByDocIdRestore(args: { kind: string; docId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  robotics: {
    /** 人事相談の引き継ぎの一覧 (super_admin のみ)
     * GET /api/robotics/hr-handoffs / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getHrHandoffs(args?: { status?: string; facilityId?: string; limit?: number }): Promise<unknown>;
    /** 人事相談の引き継ぎを 1 件 (super_admin のみ)
     * GET /api/robotics/hr-handoffs/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getHrHandoffsById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 人事相談の引き継ぎを受け付ける (super_admin のみ)
     * POST /api/robotics/hr-handoffs/{id}/acknowledge / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postHrHandoffsByIdAcknowledge(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 人事相談の引き継ぎを完了にする (super_admin のみ)
     * POST /api/robotics/hr-handoffs/{id}/close / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postHrHandoffsByIdClose(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  scheduler: {
    /** スケジュールタスク: reportsの取得 (reports)
     * GET /api/scheduler/reports / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getReports(args?: { facilityId?: string }): Promise<unknown>;
    /** スケジュールタスク: reportsの登録・実行 (reports)
     * POST /api/scheduler/reports / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postReports(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** スケジュールタスク: 1 件取得 (reports/:id)
     * GET /api/scheduler/reports/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getReportsById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** スケジュールタスク: 更新 (reports/:id)
     * PUT /api/scheduler/reports/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putReportsById(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** スケジュールタスク: 削除 (reports/:id)
     * DELETE /api/scheduler/reports/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteReportsById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** スケジュールタスク: executionsの取得 (reports/:id/executions)
     * GET /api/scheduler/reports/{id}/executions / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getReportsByIdExecutions(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** スケジュールタスク: 実行 (reports/:id/run)
     * POST /api/scheduler/reports/{id}/run / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postReportsByIdRun(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** スケジュールタスク: tasksの取得 (tasks)
     * GET /api/scheduler/tasks / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getTasks(args?: { facilityId?: string }): Promise<unknown>;
    /** スケジュールタスク: tasksの登録・実行 (tasks)
     * POST /api/scheduler/tasks / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postTasks(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** スケジュールタスク: 1 件取得 (tasks/:id)
     * GET /api/scheduler/tasks/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getTasksById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** スケジュールタスク: 更新 (tasks/:id)
     * PUT /api/scheduler/tasks/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putTasksById(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** スケジュールタスク: 削除 (tasks/:id)
     * DELETE /api/scheduler/tasks/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteTasksById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** スケジュールタスク: executionsの取得 (tasks/:id/executions)
     * GET /api/scheduler/tasks/{id}/executions / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getTasksByIdExecutions(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** スケジュールタスク: 実行 (tasks/:id/run)
     * POST /api/scheduler/tasks/{id}/run / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postTasksByIdRun(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  search: {
    /** 横断検索 (ナレッジ + 各アプリが AppData に溜めたレコード)
     * GET /api/search / 認証 session / 応答の形あり / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    get(args?: { q?: string; facilityId?: string; insuredNumber?: string; from?: string; to?: string; types?: string; tags?: string; status?: string; limit?: number }): Promise<unknown>;
    /** 検索の方式と、登録されているソースの一覧
     * GET /api/search/index-status / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getIndexStatus(args?: { facilityId?: string }): Promise<unknown>;
    /** 再インデックス (ライブ検索のため現状は no-op)
     * POST /api/search/reindex / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postReindex(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  serviceActuals: {
    /** サービス実績 (旧 API) の一覧
     * GET /api/service-actuals/v1 / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getV1(args?: { facilityId?: string }): Promise<unknown>;
    /** サービス実績 (旧): generateの登録・実行 (claim-candidates/generate)
     * POST /api/service-actuals/v1/claim-candidates/generate / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ClaimCandidatesGenerate(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** サービス実績 (旧): cross-service-summaryの取得 (cross-service-summary)
     * GET /api/service-actuals/v1/cross-service-summary / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getV1CrossServiceSummary(args?: { facilityId?: string }): Promise<unknown>;
    /** サービス実績 (旧): import-pdfの登録・実行 (import-pdf)
     * POST /api/service-actuals/v1/import-pdf / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ImportPdf(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** サービス実績 (旧): importsの取得 (imports)
     * GET /api/service-actuals/v1/imports / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getV1Imports(args?: { facilityId?: string }): Promise<unknown>;
    /** サービス実績 (旧): 1 件取得 (imports/:batchId)
     * GET /api/service-actuals/v1/imports/{batchId} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getV1ImportsByBatchId(args: { batchId: string; facilityId?: string }): Promise<unknown>;
    /** サービス実績 (旧): applyの登録・実行 (imports/:batchId/apply)
     * POST /api/service-actuals/v1/imports/{batchId}/apply / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ImportsByBatchIdApply(args: { batchId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** サービス実績 (旧): 部分更新 (imports/:batchId/entries/:entryId)
     * PATCH /api/service-actuals/v1/imports/{batchId}/entries/{entryId} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    patchV1ImportsByBatchIdEntriesByEntryId(args: { batchId: string; entryId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** サービス実績 (旧): voidの登録・実行 (imports/:batchId/void)
     * POST /api/service-actuals/v1/imports/{batchId}/void / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ImportsByBatchIdVoid(args: { batchId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ?facilityId=&serviceTypeCode=&mappingStatus=&category=
     * GET /api/service-actuals/v1/item-candidates / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getV1ItemCandidates(args?: { facilityId?: string }): Promise<unknown>;
    /** 人手 mapping 確定
     * PATCH /api/service-actuals/v1/item-candidates/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    patchV1ItemCandidatesById(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** サービス実績 (旧): regenerateの登録・実行 (item-candidates/regenerate)
     * POST /api/service-actuals/v1/item-candidates/regenerate / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1ItemCandidatesRegenerate(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** サービス実績 (旧): 確定 (records-to-actuals/commit)
     * POST /api/service-actuals/v1/records-to-actuals/commit / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1RecordsToActualsCommit(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** サービス実績 (旧): プレビュー (records-to-actuals/preview)
     * POST /api/service-actuals/v1/records-to-actuals/preview / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1RecordsToActualsPreview(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 利用者のサービス実績 (旧 API)
     * GET /api/service-actuals/v1/users/{insuredNumber} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getV1UsersByInsuredNumber(args: { insuredNumber: string; facilityId?: string }): Promise<unknown>;
  };
  settings: {
    /** 設定: 一覧
     * GET /api/settings / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    get(args?: { facilityId?: string }): Promise<unknown>;
    /** 設定: 更新
     * PUT /api/settings / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    put(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 設定: api-keysの取得 (api-keys)
     * GET /api/settings/api-keys / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getApiKeys(args?: { facilityId?: string }): Promise<unknown>;
    /** 設定: 更新 (api-keys)
     * PUT /api/settings/api-keys / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putApiKeys(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  staffingFte: {
    /** 常勤換算: 一覧
     * GET /api/staffing-fte/v1 / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getV1(args?: { facilityId?: string }): Promise<unknown>;
    /** 常勤換算: 作成
     * POST /api/staffing-fte/v1 / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 常勤換算: 更新 (:id)
     * PUT /api/staffing-fte/v1/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putV1ById(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 常勤換算: 削除 (:id)
     * DELETE /api/staffing-fte/v1/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteV1ById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** 常勤換算: calculate-previewの登録・実行 (calculate-preview)
     * POST /api/staffing-fte/v1/calculate-preview / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postV1CalculatePreview(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  subjects: {
    /** 対象者フォルダ: 部分更新 (files/:fileId/tags)
     * PATCH /api/subjects/files/{fileId}/tags / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    patchFilesByFileIdTags(args: { fileId: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 対象者フォルダ: filesの取得 (master-users/:insuredNumber/files)
     * GET /api/subjects/master-users/{insuredNumber}/files / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getMasterUsersByInsuredNumberFiles(args: { insuredNumber: string; facilityId?: string }): Promise<unknown>;
    /** 対象者フォルダ: filesの登録・実行 (master-users/:insuredNumber/files)
     * POST /api/subjects/master-users/{insuredNumber}/files / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postMasterUsersByInsuredNumberFiles(args: { insuredNumber: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 対象者フォルダ: folderの取得 (master-users/:insuredNumber/folder)
     * GET /api/subjects/master-users/{insuredNumber}/folder / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getMasterUsersByInsuredNumberFolder(args: { insuredNumber: string; facilityId?: string }): Promise<unknown>;
    /** 対象者フォルダ: ensureの登録・実行 (master-users/:insuredNumber/folder/ensure)
     * POST /api/subjects/master-users/{insuredNumber}/folder/ensure / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postMasterUsersByInsuredNumberFolderEnsure(args: { insuredNumber: string; body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  systemSettings: {
    /** システム設定: 一覧
     * GET /api/system-settings / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    get(args?: { facilityId?: string }): Promise<unknown>;
    /** システム設定: care-planの取得 (care-plan)
     * GET /api/system-settings/care-plan / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getCarePlan(args?: { facilityId?: string }): Promise<unknown>;
    /** システム設定: 更新 (care-plan)
     * PUT /api/system-settings/care-plan / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putCarePlan(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** システム設定: company-ai-preambleの取得 (company-ai-preamble)
     * GET /api/system-settings/company-ai-preamble / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getCompanyAiPreamble(args?: { facilityId?: string }): Promise<unknown>;
    /** システム設定: 更新 (company-ai-preamble)
     * PUT /api/system-settings/company-ai-preamble / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putCompanyAiPreamble(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** システム設定: corporationの取得 (corporation)
     * GET /api/system-settings/corporation / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getCorporation(args?: { facilityId?: string }): Promise<unknown>;
    /** システム設定: 更新 (corporation)
     * PUT /api/system-settings/corporation / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putCorporation(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 組織の事業所アクセス設定 (crossFacilityRead: 同じ組織の他の事業所の利用者・記録の閲覧。未設定は true)
     * GET /api/system-settings/facility-access / 認証 session / 応答の形あり / 模擬サーバ: 無し (501) */
    getFacilityAccess(args?: { facilityId?: string }): Promise<unknown>;
    /** 組織の crossFacilityRead を切り替える (admin。false で所属事業所だけの閲覧に戻す、null で既定の true に戻す)
     * PUT /api/system-settings/facility-access / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putFacilityAccess(args: { body: unknown; facilityId?: string }): Promise<unknown>;
    /** システム設定: filingの取得 (filing)
     * GET /api/system-settings/filing / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getFiling(args?: { facilityId?: string }): Promise<unknown>;
    /** システム設定: 更新 (filing)
     * PUT /api/system-settings/filing / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putFiling(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 第一トラックの機能フラグ (事業所ごとの許可一覧・環境変数の値・どちらが効いているか)
     * GET /api/system-settings/first-track-flags / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getFirstTrackFlags(args?: { facilityId?: string }): Promise<unknown>;
    /** 第一トラックの機能フラグを 1 つ更新 (admin。facilityIds の配列で置き換え、null で保存値を消して環境変数に戻す)
     * PUT /api/system-settings/first-track-flags / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putFirstTrackFlags(args: { body: unknown; facilityId?: string }): Promise<unknown>;
    /** システム設定: google-workspaceの取得 (google-workspace)
     * GET /api/system-settings/google-workspace / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getGoogleWorkspace(args?: { facilityId?: string }): Promise<unknown>;
    /** システム設定: 更新 (google-workspace)
     * PUT /api/system-settings/google-workspace / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putGoogleWorkspace(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** システム設定: hrm-job-classesの取得 (hrm-job-classes)
     * GET /api/system-settings/hrm-job-classes / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getHrmJobClasses(args?: { facilityId?: string }): Promise<unknown>;
    /** システム設定: 更新 (hrm-job-classes)
     * PUT /api/system-settings/hrm-job-classes / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putHrmJobClasses(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** システム設定: important-matters-docの取得 (important-matters-doc)
     * GET /api/system-settings/important-matters-doc / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getImportantMattersDoc(args?: { facilityId?: string }): Promise<unknown>;
    /** システム設定: 更新 (important-matters-doc)
     * PUT /api/system-settings/important-matters-doc / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putImportantMattersDoc(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** システム設定: notificationsの取得 (notifications)
     * GET /api/system-settings/notifications / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getNotifications(args?: { facilityId?: string }): Promise<unknown>;
    /** システム設定: 更新 (notifications)
     * PUT /api/system-settings/notifications / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putNotifications(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** システム設定: testの登録・実行 (notifications/test)
     * POST /api/system-settings/notifications/test / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postNotificationsTest(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** システム設定: personal-docの取得 (personal-doc)
     * GET /api/system-settings/personal-doc / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getPersonalDoc(args?: { facilityId?: string }): Promise<unknown>;
    /** システム設定: 更新 (personal-doc)
     * PUT /api/system-settings/personal-doc / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putPersonalDoc(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** システム設定: record-summaryの取得 (record-summary)
     * GET /api/system-settings/record-summary / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getRecordSummary(args?: { facilityId?: string }): Promise<unknown>;
    /** システム設定: 更新 (record-summary)
     * PUT /api/system-settings/record-summary / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putRecordSummary(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** システム設定: secrets-statusの取得 (secrets-status)
     * GET /api/system-settings/secrets-status / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getSecretsStatus(args?: { facilityId?: string }): Promise<unknown>;
    /** システム設定: user-foldersの取得 (user-folders)
     * GET /api/system-settings/user-folders / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getUserFolders(args?: { facilityId?: string }): Promise<unknown>;
    /** システム設定: 更新 (user-folders)
     * PUT /api/system-settings/user-folders / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putUserFolders(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  test: {
    /** ワークフロー対応のリスト（status フィルタ対応）
     * GET /api/test/apps / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getApps(args?: { facilityId?: string }): Promise<unknown>;
    /** テスト用: apps を 1 件取得 (本番では使えない)
     * GET /api/test/apps/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getAppsById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** テスト用: backup/strategies の一覧 (本番では使えない)
     * GET /api/test/backup/strategies / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getBackupStrategies(args?: { facilityId?: string }): Promise<unknown>;
    /** テスト用: backup/strategies を 1 件取得 (本番では使えない)
     * GET /api/test/backup/strategies/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getBackupStrategiesById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** テスト用: careplans の一覧 (本番では使えない)
     * GET /api/test/careplans / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getCareplans(args?: { facilityId?: string }): Promise<unknown>;
    /** テスト用: careplans を 1 件取得 (本番では使えない)
     * GET /api/test/careplans/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getCareplansById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** テスト用: connectors の一覧 (本番では使えない)
     * GET /api/test/connectors / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getConnectors(args?: { facilityId?: string }): Promise<unknown>;
    /** テスト用: connectors を 1 件取得 (本番では使えない)
     * GET /api/test/connectors/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getConnectorsById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** テスト用: facilities の一覧 (本番では使えない)
     * GET /api/test/facilities / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getFacilities(args?: { facilityId?: string }): Promise<unknown>;
    /** テスト用: facilities を 1 件取得 (本番では使えない)
     * GET /api/test/facilities/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getFacilitiesById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** テスト用: fixtures の一覧 (本番では使えない)
     * GET /api/test/fixtures / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getFixtures(args?: { facilityId?: string }): Promise<unknown>;
    /** テスト用: fixtures/:key の一覧 (本番では使えない)
     * GET /api/test/fixtures/{key} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getFixturesByKey(args: { key: string; facilityId?: string }): Promise<unknown>;
    /** テスト用: groups の一覧 (本番では使えない)
     * GET /api/test/groups / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getGroups(args?: { facilityId?: string }): Promise<unknown>;
    /** テスト用: groups を 1 件取得 (本番では使えない)
     * GET /api/test/groups/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getGroupsById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** テスト用: health の一覧 (本番では使えない)
     * GET /api/test/health / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getHealth(args?: { facilityId?: string }): Promise<unknown>;
    /** テスト用: log の一覧 (本番では使えない)
     * GET /api/test/log / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getLog(args?: { facilityId?: string }): Promise<unknown>;
    /** テスト用: log の一覧 (本番では使えない)
     * DELETE /api/test/log / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteLog(args?: { facilityId?: string }): Promise<unknown>;
    /** テスト用: patients の一覧 (本番では使えない)
     * GET /api/test/patients / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getPatients(args?: { facilityId?: string }): Promise<unknown>;
    /** テスト用: patients を 1 件取得 (本番では使えない)
     * GET /api/test/patients/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getPatientsById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** テスト用: progressNotes の一覧 (本番では使えない)
     * GET /api/test/progressNotes / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getProgressNotes(args?: { facilityId?: string }): Promise<unknown>;
    /** テスト用: progressNotes を 1 件取得 (本番では使えない)
     * GET /api/test/progressNotes/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getProgressNotesById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** テスト用: prompts の一覧 (本番では使えない)
     * GET /api/test/prompts / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getPrompts(args?: { facilityId?: string }): Promise<unknown>;
    /** テスト用: prompts を 1 件取得 (本番では使えない)
     * GET /api/test/prompts/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getPromptsById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** テスト用: providers の一覧 (本番では使えない)
     * GET /api/test/providers / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getProviders(args?: { facilityId?: string }): Promise<unknown>;
    /** 1 件取得 (full ProviderServiceOffice)
     * GET /api/test/providers/{id} / scope providers:read / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getProvidersById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** テスト用: records の一覧 (本番では使えない)
     * GET /api/test/records / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getRecords(args?: { facilityId?: string }): Promise<unknown>;
    /** テスト用: records を 1 件取得 (本番では使えない)
     * GET /api/test/records/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getRecordsById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** テスト用: scheduler/executions の一覧 (本番では使えない)
     * GET /api/test/scheduler/executions / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getSchedulerExecutions(args?: { facilityId?: string }): Promise<unknown>;
    /** テスト用: scheduler/executions を 1 件取得 (本番では使えない)
     * GET /api/test/scheduler/executions/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getSchedulerExecutionsById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** テスト用: scheduler/tasks の一覧 (本番では使えない)
     * GET /api/test/scheduler/tasks / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getSchedulerTasks(args?: { facilityId?: string }): Promise<unknown>;
    /** テスト用: scheduler/tasks を 1 件取得 (本番では使えない)
     * GET /api/test/scheduler/tasks/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getSchedulerTasksById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** テスト用: settings の一覧 (本番では使えない)
     * GET /api/test/settings / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getSettings(args?: { facilityId?: string }): Promise<unknown>;
    /** テスト用: status の一覧 (本番では使えない)
     * GET /api/test/status / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getStatus(args?: { facilityId?: string }): Promise<unknown>;
    /** テスト用: users の一覧 (本番では使えない)
     * GET /api/test/users / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getUsers(args?: { facilityId?: string }): Promise<unknown>;
    /** テスト用: users を 1 件取得 (本番では使えない)
     * GET /api/test/users/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getUsersById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** テスト用: vitals の一覧 (本番では使えない)
     * GET /api/test/vitals / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getVitals(args?: { facilityId?: string }): Promise<unknown>;
    /** テスト用: vitals を 1 件取得 (本番では使えない)
     * GET /api/test/vitals/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getVitalsById(args: { id: string; facilityId?: string }): Promise<unknown>;
  };
  training: {
    /** 研修の出席一覧
     * GET /api/training/attendance / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getAttendance(args?: { facilityId?: string }): Promise<unknown>;
    /** 研修計画の一覧
     * GET /api/training/plans / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getPlans(args?: { facilityId?: string }): Promise<unknown>;
    /** 研修計画を登録
     * POST /api/training/plans / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postPlans(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 研修の出席を登録
     * POST /api/training/plans/{id}/attendance / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postPlansByIdAttendance(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  triggers: {
    /** トリガー: handoverの登録・実行 (handover)
     * POST /api/triggers/handover / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postHandover(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** トリガー: 登録 (tasks/:task)
     * POST /api/triggers/tasks/{task} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postTasksByTask(args: { task: string; body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  userDetail: {
    /** 利用者詳細: 一覧
     * GET /api/user-detail / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 400 (2026-09-27) パラメータが要る: facilityId is required / 模擬サーバ: 無し (501) */
    get(args?: { facilityId?: string }): Promise<unknown>;
    /** 利用者詳細: record-timelineの取得 (:insuredNumber/record-timeline)
     * GET /api/user-detail/{insuredNumber}/record-timeline / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getByInsuredNumberRecordTimeline(args: { insuredNumber: string; facilityId?: string }): Promise<unknown>;
    /** 利用者詳細: record-timelineの登録・実行 (:insuredNumber/record-timeline)
     * POST /api/user-detail/{insuredNumber}/record-timeline / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postByInsuredNumberRecordTimeline(args: { insuredNumber: string; body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  users: {
    /** ユーザー: 一覧
     * GET /api/users / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    get(args?: { facilityId?: string }): Promise<unknown>;
    /** ユーザー: 作成
     * POST /api/users / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    post(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ユーザー: 1 件取得 (:id)
     * GET /api/users/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** ユーザー: 更新 (:id)
     * PUT /api/users/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putById(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
    /** ユーザー: 削除 (:id)
     * DELETE /api/users/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    deleteById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** ユーザー: groupsの取得 (:id/groups)
     * GET /api/users/{id}/groups / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getByIdGroups(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** ユーザー: 更新 (:id/preferences)
     * PUT /api/users/{id}/preferences / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putByIdPreferences(args: { id: string; body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  visitCheckins: {
    /** 訪問チェックイン: orphansの取得 (orphans)
     * GET /api/visit-checkins/orphans / scope visit-checkins:read / 認証 session / 実測 200 (2026-09-27) 応答の項目: items / 模擬サーバ: 無し (501) */
    getOrphans(args?: { facilityId?: string }): Promise<unknown>;
    /** body: { facilityId?, from, to?, masterUserId?, dryRun? }
     * POST /api/visit-checkins/reassign / scope visit-checkins:write / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postReassign(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** 訪問チェックイン: reconcileの登録・実行 (reconcile)
     * POST /api/visit-checkins/reconcile / scope visit-checkins:write / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postReconcile(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
  };
  workspaceGovernance: {
    /** Workspace ガバナンス: diagnoseの登録・実行 (diagnose)
     * POST /api/workspace-governance/diagnose / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postDiagnose(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** Workspace ガバナンス: 1 件取得 (diagnose/:id)
     * GET /api/workspace-governance/diagnose/{id} / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 0 (2026-09-27) パス変数を埋める値が取れない / 模擬サーバ: 無し (501) */
    getDiagnoseById(args: { id: string; facilityId?: string }): Promise<unknown>;
    /** Workspace ガバナンス: export-policy.jsonの取得 (export-policy.json)
     * GET /api/workspace-governance/export-policy.json / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    getExportPolicyJson(args?: { facilityId?: string }): Promise<unknown>;
    /** Workspace ガバナンス: provisionの登録・実行 (folders/provision)
     * POST /api/workspace-governance/folders/provision / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postFoldersProvision(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** Workspace ガバナンス: import-policy.jsonの登録・実行 (import-policy.json)
     * POST /api/workspace-governance/import-policy.json / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    postImportPolicyJson(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
    /** Workspace ガバナンス: permission-driftの取得 (permission-drift)
     * GET /api/workspace-governance/permission-drift / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getPermissionDrift(args?: { facilityId?: string }): Promise<unknown>;
    /** Workspace ガバナンス: policyの取得 (policy)
     * GET /api/workspace-governance/policy / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 実測 401 (2026-09-27) 認証が必要です / 模擬サーバ: 無し (501) */
    getPolicy(args?: { facilityId?: string }): Promise<unknown>;
    /** Workspace ガバナンス: 更新 (policy)
     * PUT /api/workspace-governance/policy / 認証 session / 応答の形: 未確認 (生の JSON。項目名を推測しない) / 模擬サーバ: 無し (501) */
    putPolicy(args?: { body?: unknown; facilityId?: string }): Promise<unknown>;
  };
}

export interface CposApiGeneratedFrom { version: string | null; revision: string | null; fetchedAt: string; operations: number }
