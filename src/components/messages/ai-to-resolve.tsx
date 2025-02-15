// import { useMemo } from "react";
import CpuIcon from "../../icons/cpu";
import { useChatStore } from "../../lib/chatStore";
// import seperateThink from "../../lib/seperateThink";
import MarkDownRender from "../markdown";
import { useEffect, useState } from "react";
import ollama from "ollama/browser";

export default function AiMessageToResolve(props: {
  scrollToBottomFallback: () => void;
}) {
  const [think, setThink] = useState("");
  const [answer, setAnswer] = useState("");
  const { messages, addMessage, setResolved } = useChatStore();

  useEffect(() => {
    let isMounted = true;
    (async () => {
      let fullAnswer = "";
      let thinking = true;
      const response = await ollama.chat({
        model: "deepseek-r1:8b",
        //@ts-ignore
        messages: messages,
        stream: true,
      });
      for await (const part of response) {
        if (!isMounted) return;
        // console.log(part.message.content);
        if (part.message.content == "<think>") {
          thinking = true;
        } else if (part.message.content == "</think>") {
          thinking = false;
        } else if (thinking) {
          setThink((think) => think + part.message.content);
        } else {
          setAnswer((answer) => answer + part.message.content);
        }

        fullAnswer += part.message.content;
        props.scrollToBottomFallback();
      }
      addMessage(fullAnswer, "assistant");
      setResolved(true);
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="rounded-4xl text-xl py-4 px-6 mr-auto flex flex-row gap-3">
      <div className="rounded-full bg-slate-900 p-3 mb-auto">
        <CpuIcon width={22} />
      </div>
      <div className="pt-3 flex gap-2 flex-col">
        <div className="border-[1.5px] border-slate-300 border-dashed rounded-xl p-3 italic font-thin text-smd text-slate-300 relative w-full">
          <div className="absolute -top-[20px] left-3 bg-slate-800 px-1">
            Thinking:
          </div>
          <MarkDownRender>{think}</MarkDownRender>
        </div>
        <MarkDownRender>{answer}</MarkDownRender>
      </div>
    </div>
  );
}
