# 作業 4：整合 YouBike 與時間工具

## 實作說明

| 項目 | 檔案 |
|------|------|
| YouBike 工具（行政區查詢） | [`tools/youbike.js`](tools/youbike.js) |
| 時間工具 | [`tools/current_time.js`](tools/current_time.js) |
| 工具註冊（zod → OpenAI tools） | [`tools/registry.js`](tools/registry.js) |
| zod 輔助 | [`utils/func-tool.js`](utils/func-tool.js) |
| 聊天管理 | 根目錄 [`lib/ChatManager.js`](../lib/ChatManager.js)、[`db/messages.js`](../db/messages.js) |
| 主程式 | [`main.js`](main.js) |

- YouBike 資料來源：台北市開放資料 JSON（無 API Key），以 `sarea`（行政區）篩選，**不使用經緯度／Haversine**。
- 查詢請用行政區名稱（如 `大安區`、`信義區`）；只傳「台北市」工具會提示錯誤或查無站點。

## 環境與執行

1. 在專案根目錄安裝依賴（含 `zod`）：

   ```bash
   npm install
   ```

2. 根目錄 `.env` 設定 `OPENAI_API_KEY`。

3. 啟動助理（對話紀錄寫入根目錄 `.history/`）：

   ```bash
   npm run homework4
   ```

4. 輸入 `exit` 結束。驗收單題時可每次重新執行 `npm run homework4`，以新對話檔避免歷史干擾。

## 驗收自測（3 題）

| 輸入 | 預期工具 |
|------|----------|
| `現在幾點？` | `get_current_time` |
| `信義區有 YouBike 可以借嗎？` | `get_youbike_by_district` |
| `現在幾點？大安區還有 YouBike 可以借嗎？` | 兩個工具皆呼叫，再整合回答 |

可在 `.history/*.json` 中確認 assistant 訊息的 `tool_calls` 與 `role: "tool"` 回傳內容。

### 測試 1：`現在幾點？`

```
請輸入你的問題：現在幾點？

助理：（依 get_current_time 回傳的台灣時間回答，例如：現在是 2026/6/17 下午2:30:00。）
```

### 測試 2：`信義區有 YouBike 可以借嗎？`

```
請輸入你的問題：信義區有 YouBike 可以借嗎？

助理：（列出信義區內可借車的站點名稱與可借數量；即時數字依開放資料而變。）
```

### 測試 3：`現在幾點？大安區還有 YouBike 可以借嗎？`

```
請輸入你的問題：現在幾點？大安區還有 YouBike 可以借嗎？

助理：（先說明目前時間，並摘要大安區可借 YouBike 站點。）
```

> **備註**：若於公司網路無法 `npm install` 或連線 YouBike API，請改在 [課程 Codespaces](https://github.com/kaochenlong/ai-agent-js) 或可連外網環境執行上述三題，並將實際終端輸出取代本節範例文字後繳交。
