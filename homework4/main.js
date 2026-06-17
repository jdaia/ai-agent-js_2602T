import { input } from "@inquirer/prompts";
import { ChatManager } from "../lib/ChatManager.js";
import { tools, toolHandlers } from "./tools/registry.js";

const SYSTEM_PROMPT = `你是繁體中文助理，可協助查詢「現在台灣時間」與「台北市各行政區 YouBike 可借站點」。
- 使用者問現在幾點、時間時，務必呼叫 get_current_time。
- 使用者問某區有沒有 YouBike、哪裡可以借車時，務必呼叫 get_youbike_by_district，district 請用行政區名稱（如大安區、信義區），不要只用「台北市」。
- 若同一則訊息同時問時間與 YouBike，請分別呼叫兩個工具，再整合成一段清楚回答。
- 依工具回傳的 JSON 回答；若工具回傳 error，請向使用者說明。`;

const manager = new ChatManager(SYSTEM_PROMPT, { tools, toolHandlers });
await manager.init();

console.log("YouBike 與時間助理已就緒。輸入 exit 結束對話。\n");

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
