import { useState } from "react";
import SendIcon from "./icons/send";
import generate from "./lib/generate";
import { useChatStore } from "./lib/chatStore";
import MeMessage from "./components/messages/me";
import AiMessage from "./components/messages/ai";

function App() {
  const [prompt, setPrompt] = useState("");
  const { messages, addMessage } = useChatStore();

  return (
    <div className="h-screen w-full bg-slate-800 overflow-y-scroll pb-28">
      <div className="text-white w-full max-w-5xl mx-auto flex flex-col gap-2 p-5">
        {messages.map((message) => {
          if (message.sender == "me") {
            return <MeMessage text={message.text} />;
          }
          if (!message.error) return <AiMessage text={message.text} />;
          return (
            <div>
              {message.sender}, {message.text}
            </div>
          );
        })}
      </div>
      <form
        className="p-2 fixed bottom-3 left-3 w-full flex"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          addMessage(prompt, "me");
          generate(prompt).then((answer) => {
            addMessage(answer, "ai");
            setPrompt("");
          });
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
    </div>
  );
}

export default App;
