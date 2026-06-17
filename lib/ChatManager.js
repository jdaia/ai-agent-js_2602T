import { initMessage, addMessage, getMessages } from "../db/messages.js";
import { client, DEFAULT_MODEL } from "./openai.js";

export class ChatManager {
  constructor(systemPrompt) {
    this.systemPrompt = systemPrompt;
  }

  async init() {
    await initMessage(this.systemPrompt);
  }

  async chat(userText) {
    await addMessage(userText);

    const response = await client.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: getMessages(),
    });

    const content = response.choices[0].message.content;
    await addMessage(content, "assistant");
    return content;
  }
}
