import { toOpenAITool } from "../utils/func-tool.js";
import { currentTimeTool } from "./current_time.js";
import { youbikeTool } from "./youbike.js";

const toolList = [currentTimeTool, youbikeTool];

export const tools = toolList.map(toOpenAITool);

export const toolHandlers = Object.fromEntries(
  toolList.map((t) => [t.name, t.fn]),
);
