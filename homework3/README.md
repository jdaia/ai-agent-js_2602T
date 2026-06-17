# 作業 3：迷你知識庫（開發工具簡介）

## 實作說明

| 項目 | 檔案 |
|------|------|
| Embeddings（OpenAI） | 根目錄 [`lib/embeddings.js`](../lib/embeddings.js) |
| 向量資料庫（Qdrant） | 根目錄 [`lib/qdrant.js`](../lib/qdrant.js) |
| 5 筆知識內容 | [`knowledge.js`](knowledge.js) |
| 知識庫初始化 | [`init.js`](init.js) |
| 搜尋測試（3 組問法） | [`search.js`](search.js) |

知識庫主題：VS Code、Git、Docker、Postman、npm 五種開發工具的繁體中文簡介。向量模型為 `text-embedding-3-small`（1536 維），相似度為 Qdrant Cosine **score**（愈接近 1 愈相似）。

## 環境設定

1. 專案根目錄 `npm install`（需 `@qdrant/js-client-rest`；若公司 proxy 擋 npm，可改用 [GitHub Codespaces](https://github.com/kaochenlong/ai-agent-js)）。
2. 複製並編輯根目錄 `.env`（參考 `.env.example`）：
   - `OPENAI_API_KEY`：必填
   - `QDRANT_URL`：Qdrant Cloud cluster URL（建議含 `:6333`，例：`https://<id>.cloud.qdrant.io:6333`）
   - `QDRANT_API_KEY`：Cloud API Key
3. [Qdrant Cloud](https://cloud.qdrant.io/) 建立 Free cluster → API Keys → 填入上述兩項。

## 執行

在**專案根目錄**：

```bash
npm run homework3:init
npm run homework3:search
```

`init` 會重建 collection `homework3_dev_tools` 並寫入 5 筆向量。`search` 會以 3 種不同問法各查 top 3 並印出相似度。

## 驗收對照

| 項目 | 說明 |
|------|------|
| 知識庫 ≥ 5 筆 | `knowledge.js` 共 5 筆；`init` 成功即已 upsert |
| 搜尋測試 | `homework3:search` 能回傳相關工具 |
| README 含 3 查詢結果與分數 | 見下方「搜尋結果（實際執行）」 |

## 搜尋結果（實際執行）

以下為 `npm run homework3:search` 終端輸出（請在本機或 Codespaces 執行後更新；格式應含 **相似度** 數值）。

```
查詢：版本控制、commit 和 branch 要怎麼管理？
--------------------------------------------------
1. [Git] Git 分散式版本控制
   相似度：0.xxx
   摘要：Git 用來追蹤程式碼變更、建立 commit 紀錄與 branch 分支…
2. [VS Code] Visual Studio Code 程式編輯器
   相似度：0.xxx
   …
3. [npm] npm Node 套件管理
   相似度：0.xxx
   …

查詢：把應用程式包成容器來部署
--------------------------------------------------
1. [Docker] Docker 容器化平台
   相似度：0.xxx
   …

查詢：送 HTTP 請求測試 REST API
--------------------------------------------------
1. [Postman] Postman API 測試工具
   相似度：0.xxx
   …
```

預期 top1 分別為 **Git**、**Docker**、**Postman**。執行後請將終端完整輸出取代本區塊 placeholder，以符合繳交要求。
