import { useParams } from "react-router-dom";
import AiMessage from "../components/messages/ai";
import AiMessageToResolve from "../components/messages/ai-to-resolve";
import MeMessage from "../components/messages/me";
import SideNav from "../components/sidenav";
import TextInput from "../components/text-input";
import { useChatStore } from "../lib/chatStore";
import { useEffect } from "react";

function ChatPage() {
  const { messages, resolved, setSelected } = useChatStore();

  const { id } = useParams();

  useEffect(() => {
    if (id) setSelected(id);
  }, [id]);

  return (
    <div className="h-screen w-full overflow-hidden flex flex-row">
      <div className="h-screen">
        <SideNav />
      </div>
      <div className="h-screen w-full bg-slate-800 overflow-y-scroll relative flex flex-col">
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
