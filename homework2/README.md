# 作業 2：Function Calling 單位換算

## 實作說明

| 項目 | 檔案 |
|------|------|
| 單位換算工具（JSON Schema + 實作） | [`tools/convert_unit.js`](tools/convert_unit.js) |
| 工具註冊 | [`tools/registry.js`](tools/registry.js) |
| 聊天管理 | 根目錄 [`lib/ChatManager.js`](../lib/ChatManager.js)、[`db/messages.js`](../db/messages.js) |
| 主程式 | [`main.js`](main.js) |

支援換算：攝氏 ↔ 華氏、公里 ↔ 英里、公斤 ↔ 磅。不支援的組合回傳 `{ error: "..." }`。

## 執行

在專案根目錄設定 `.env` 的 `OPENAI_API_KEY` 後：

```bash
npm run homework2
```

## 驗收自測（至少 3 組）

| 輸入 | 預期約略結果 |
|------|----------------|
| `25 度 C 是華氏幾度？` | 77°F |
| `10 公里等於幾英里？` | 6.214 mile |
| `70 公斤是幾磅？` | 154.323 lb |

請截圖終端對話作為「AI 正確帶入參數呼叫工具」的證明；`.history/` 內亦可看到含 `tool_calls` 的 assistant 訊息。

不支援範例：`1 英吋是幾公分？` → 工具回傳 error，助理應說明無法換算。
