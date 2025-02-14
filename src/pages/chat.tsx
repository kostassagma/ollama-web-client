import AiMessage from "../components/messages/ai";
import AiMessageToResolve from "../components/messages/ai-to-resolve";
import MeMessage from "../components/messages/me";
import TextInput from "../components/text-input";
import { useChatStore } from "../lib/chatStore";


function ChatPage() {
  const { messages, resolved } = useChatStore();

  return (
    <div className="h-screen w-full overflow-hidden flex flex-row">
      <div className="h-screen bg-slate-900 p-3 px-10 text-white flex flex-col w-max">
        <h1 className="font-bold text-3xl">Ollama Web Client</h1>
        <div className="flex-1">Hello</div>
      </div>
      <div className="h-screen w-full bg-slate-800 overflow-y-scroll relative ">
        <div className="text-white w-full max-w-5xl mx-auto flex flex-col gap-2 p-5">
          {messages.map((message) => {
            if (message.role == "user") {
              return <MeMessage content={message.content} />;
            }
            if (!message.error) return <AiMessage content={message.content} />;
            return (
              <div>
                {message.role}, {message.content}
              </div>
            );
          })}
          {!resolved && <AiMessageToResolve />}
        </div>
        <TextInput /> 
      </div>
    </div>
  );
}

export default ChatPage;
