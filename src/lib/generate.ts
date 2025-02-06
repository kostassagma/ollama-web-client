import ollama from "ollama/browser";

export default async function generate(prompt: string): Promise<string> {
  const response = await ollama.chat({
    model: "deepseek-r1:8b",
    messages: [{ role: "user", content: prompt }],
  });

  return response.message.content;
}
