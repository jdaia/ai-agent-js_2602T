export function itemToText(item) {
  return [item.title, item.tool, item.content].join(" | ");
}

export const KNOWLEDGE_ITEMS = [
  {
    id: 1,
    tool: "VS Code",
    title: "Visual Studio Code 程式編輯器",
    content:
      "VS Code 是微軟推出的免費跨平台程式編輯器，支援語法高亮、IntelliSense 自動完成、除錯與 Git 整合。透過擴充套件可加強前端、Python 或容器開發體驗，是日常寫程式與閱讀專案常用的 IDE。",
  },
  {
    id: 2,
    tool: "Git",
    title: "Git 分散式版本控制",
    content:
      "Git 用來追蹤程式碼變更、建立 commit 紀錄與 branch 分支，並透過 merge 或 pull request 協作。常用指令包含 clone、add、commit、push、pull。搭配 GitHub 等遠端儲存庫可管理專案歷史與團隊開發。",
  },
  {
    id: 3,
    tool: "Docker",
    title: "Docker 容器化平台",
    content:
      "Docker 將應用程式與相依環境打包成映像檔（image），在容器（container）中一致執行。適合本機開發、測試與部署，減少「在我電腦上可以跑」的問題。Dockerfile 定義建置步驟，docker compose 可編排多個服務。",
  },
  {
    id: 4,
    tool: "Postman",
    title: "Postman API 測試工具",
    content:
      "Postman 用於設計、送出與檢視 HTTP 請求，測試 REST API 或 Web 服務。可儲存請求集合、設定環境變數、檢查 JSON 回應與狀態碼，並與團隊分享 API 文件，加速前後端串接驗證。",
  },
  {
    id: 5,
    tool: "npm",
    title: "npm Node 套件管理",
    content:
      "npm 是 Node.js 預設的套件管理工具，用 package.json 記錄專案依賴與 scripts。透過 npm install 安裝套件、npm run 執行腳本，並可發佈套件到 npm registry，是 JavaScript 專案建置與分享程式庫的標準方式。",
  },
];
