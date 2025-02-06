import ollama from "ollama/browser";
import {MessageType} from "./chatStore"

export default async function generate(messages: MessageType[]): Promise<string> {
  const response = await ollama.chat({
    model: "deepseek-r1:8b",
    messages: messages,
  });
  console.log(response);

  return response.message.content;
}
