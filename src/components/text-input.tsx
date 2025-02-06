import { useState } from "react";
import { useChatStore } from "../lib/chatStore";
import SendIcon from "../icons/send";

export default function TextInput() {
  const [prompt, setPrompt] = useState("");
  const { addMessage, setResolved, setLoading } = useChatStore();

  return (
    <form
      className="p-2 fixed bottom-3 left-3 w-full flex"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addMessage(prompt, "user");
        setLoading(true);
        setResolved(false);
      }}
    >
      <div className="p-3 rounded-full text-white bg-slate-700 w-full max-w-5xl m-auto text-xl flex flex-row gap-1">
        <input
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
          type="text"
          placeholder="Message Ollama"
          className="appearance-none focus:border-0 focus:outline-none focus:shadow-outline flex-1 px-2"
        />
        <button className="m-auto p-2 rounded-full group cursor-pointer bg-slate-500 group hover:bg-slate-200 transition-all">
          <SendIcon
            width={25}
            className="text-slate-700 group-hover:rotate-[360deg] transition-all duration-300 ease-in"
          />
        </button>
      </div>
    </form>
  );
}
