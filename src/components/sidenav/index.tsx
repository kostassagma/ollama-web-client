import { Link } from "react-router-dom";
import ChatIcon from "../../icons/chat";
import OllamaIcon from "../../icons/ollama";
import { useChatStore } from "../../lib/chatStore";
import ChatLink from "./chat-link";

export default function SideNav() {
  const { allChats } = useChatStore();

  return (
    <div className="h-screen bg-slate-900 py-3 flex flex-col gap-7 w-xs">
      <div className="flex flex-row gap-3 text-gray-200 px-5">
        <div className="my-auto">
          <OllamaIcon width={20} />
        </div>
        <h1 className=" text-3xl my-auto">Ollama</h1>
      </div>
      <div className="px-5">
        <Link
          to="/"
          className="bg-blue-500 rounded-md p-2 text-white font-semibold text-lg flex flex-row gap-2 cursor-pointer"
        >
          <ChatIcon width={20} className="my-auto" /> New Chat
        </Link>
      </div>
      <div className="flex-1 flex flex-col gap-1 overflow-y-scroll px-5">
        <p className="text-gray-400">Previous Chats</p>
        {allChats.map((e) => (
          <ChatLink id={e.id} title={e.title} key={e.id} />
        ))}
        {/* <p className="text-gray-400">Today</p>
        <p className="text-gray-400">Yesterday</p>
        <p className="text-gray-400">Last Week</p>
        <p className="text-gray-400">Older</p> */}
      </div>
    </div>
  );
}
