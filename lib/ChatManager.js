import {
  initMessage,
  addMessage,
  appendMessage,
  getMessages,
} from "../db/messages.js";
import { client, DEFAULT_MODEL } from "./openai.js";

export class ChatManager {
  constructor(systemPrompt, { tools, toolHandlers } = {}) {
    this.systemPrompt = systemPrompt;
    this.tools = tools ?? [];
    this.toolHandlers = toolHandlers ?? {};
  }

  async init() {
    await initMessage(this.systemPrompt);
  }

  async chat(userText) {
    const hasTools = this.tools.length > 0;

    if (hasTools) {
      await appendMessage({ role: "user", content: userText });
    } else {
      await addMessage(userText);
    }

    while (true) {
      const request = {
        model: DEFAULT_MODEL,
        messages: getMessages(),
      };
      if (hasTools) {
        request.tools = this.tools;
        request.tool_choice = "auto";
      }

      const response = await client.chat.completions.create(request);
      const message = response.choices[0].message;

      if (hasTools) {
        await appendMessage(message);
      } else {
        await addMessage(message.content, "assistant");
        return message.content;
      }

      if (!message.tool_calls?.length) {
        return message.content ?? "";
      }

      for (const toolCall of message.tool_calls) {
        const name = toolCall.function.name;
        const handler = this.toolHandlers[name];
        const args = JSON.parse(toolCall.function.arguments);
        const result = handler
          ? await handler(args)
          : { error: `未知的工具：${name}` };
        await appendMessage({
          role: "tool",
          tool_call_id: toolCall.id,
          content: JSON.stringify(result),
        });
      }
    }
  }
}
