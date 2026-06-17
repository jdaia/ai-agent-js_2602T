import { input } from "@inquirer/prompts";
import { ChatManager } from "../lib/ChatManager.js";
import { tools, toolHandlers } from "./tools/registry.js";

const SYSTEM_PROMPT = `你是繁體中文助理，回答清楚、簡潔。
當使用者詢問溫度、長度或重量的單位換算時，請使用 convert_unit 工具取得正確數值，再以自然語言說明結果並標示單位。
若工具回傳 error，請向使用者說明目前不支援該單位組合。`;

const manager = new ChatManager(SYSTEM_PROMPT, { tools, toolHandlers });
await manager.init();

console.log("單位換算助理已就緒。輸入 exit 結束對話。\n");

try {
  while (true) {
    const userQuestion = (
      await input({ message: "請輸入你的問題：" })
    ).trim();

    if (userQuestion === "") continue;
    if (userQuestion.toLowerCase() === "exit") {
      console.log("再見。");
      break;
    }

    const reply = await manager.chat(userQuestion);
    console.log(`\n助理：${reply}\n`);
  }
} catch (err) {
  if (err.name === "ExitPromptError") {
    console.log("\n再見。");
  } else {
    throw err;
  }
}
