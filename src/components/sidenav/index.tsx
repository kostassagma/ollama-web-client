import ChatIcon from "../../icons/chat";
import OllamaIcon from "../../icons/ollama";
import ChatLink from "./chat-link";

export default function SideNav() {
  return (
    <div className="h-screen bg-slate-900 py-3 flex flex-col gap-7 w-xs">
      <div className="flex flex-row gap-3 text-gray-200 px-5">
        <div className="my-auto">
          <OllamaIcon width={20} />
        </div>
        <h1 className=" text-3xl my-auto">Ollama</h1>
      </div>
      <div className="px-5">
        <button className="bg-blue-500 rounded-md p-2 text-white font-semibold text-lg flex flex-row gap-2 cursor-pointer">
          <ChatIcon width={20} className="my-auto" /> New Chat
        </button>
      </div>
      <div className="flex-1 flex flex-col gap-1 overflow-y-scroll px-5">
        <p className="text-gray-400">Today</p>
        <ChatLink />
        <ChatLink />
        <p className="text-gray-400">Yesterday</p>
        <ChatLink />
        <ChatLink />
        <ChatLink />
        <p className="text-gray-400">Last Week</p>
        <ChatLink />
        <ChatLink />
        <ChatLink />
        <ChatLink />
        <ChatLink />
        <ChatLink />
        <p className="text-gray-400">Older</p>
        <ChatLink />
        <ChatLink />
        <ChatLink />
        <ChatLink />
        <ChatLink />
        <ChatLink />
        <ChatLink />
        <ChatLink />
        <ChatLink />
      </div>
    </div>
  );
}
