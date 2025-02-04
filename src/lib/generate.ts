export default async function generate(prompt: string): Promise<string> {
  try {
    const res = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek-r1:8b",
        prompt,
        stream: false,
      }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    console.log("JSON response:", data);
    return data.response;
  } catch (error) {
    console.error("Error generating response:", error);

    throw error;
  }
}
