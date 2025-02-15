import { useEffect, useState } from "react";
import SideNav from "../components/sidenav";
import { useChatStore } from "../lib/chatStore";
import SendIcon from "../icons/send";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router";

function LandingPage() {
  const [prompt, setPrompt] = useState("");
  const { addMessage, setResolved, setLoading, setSelected } = useChatStore();
  const navigate = useNavigate();

  useEffect(() => {
    setSelected("");
  }, []);

  return (
    <div className="h-screen w-full overflow-hidden flex flex-row">
      <div className="h-screen">
        <SideNav />
      </div>
      <div className="h-screen w-full bg-slate-800 overflow-y-hidden relative flex flex-col">
        <form
          className="p-2 m-auto w-full right-0 flex"
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const newId = nanoid();
            setSelected(newId);
            addMessage(prompt, "user");
            setPrompt("");
            setLoading(true);
            setResolved(false);
            return navigate(`/c/${newId}`);
          }}
        >
          <div className="text-white w-full max-w-5xl m-auto text-xl flex flex-col gap-3">
            <h2 className="text-2xl text-gray-300">
              Hello, initialize a new chat:
            </h2>
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
          </div>
        </form>
      </div>
    </div>
  );
}

export default LandingPage;
