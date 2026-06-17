import { z } from "zod";
import { defineTool } from "../utils/func-tool.js";

function getCurrentTime() {
  const time = new Date().toLocaleString("zh-TW", {
    timeZone: "Asia/Taipei",
  });
  return { time };
}

export const currentTimeTool = defineTool({
  name: "get_current_time",
  description: "取得現在的台灣時間（Asia/Taipei）",
  fn: getCurrentTime,
  parameters: z.object({}),
});
