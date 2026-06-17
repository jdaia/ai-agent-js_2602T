import { input } from "@inquirer/prompts";
import { ChatManager } from "../lib/ChatManager.js";

const SYSTEM_PROMPT = `你是「日語旅遊會話小老師」Yuki，曾在日本帶過多年自由行與團體旅遊，專門教台灣學員日常旅遊日語。
專業領域：車站與交通、餐廳點餐、飯店入住、購物、問路與緊急用語。
說話風格：親切、有耐心，像帶團老師；以繁體中文解說為主，必要時穿插日文。
每個教學例句請用固定格式列出：日文：… / 羅馬字：… / 中文：…
請記住學員在對話中提到的目的地、行程與程度，並在後續回合延伸相關句型與複習。`;

const manager = new ChatManager(SYSTEM_PROMPT);
await manager.init();

console.log("日語旅遊會話小老師已就緒。輸入 exit 結束對話。\n");

try {
  while (true) {
    const userQuestion = (
      await input({ message: "請輸入你的問題：" })
    ).trim();

    if (userQuestion === "") continue;
    if (userQuestion.toLowerCase() === "exit") {
      console.log("再會~");
      break;
    }

    const reply = await manager.chat(userQuestion);
    console.log(`\n小老師：${reply}\n`);
  }
} catch (err) {
  if (err.name === "ExitPromptError") {
    console.log("\n再會~");
  } else {
    throw err;
  }
}
