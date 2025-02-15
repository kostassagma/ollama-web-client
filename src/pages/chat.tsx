import { useParams } from "react-router-dom";
import AiMessage from "../components/messages/ai";
import AiMessageToResolve from "../components/messages/ai-to-resolve";
import MeMessage from "../components/messages/me";
import SideNav from "../components/sidenav";
import TextInput from "../components/text-input";
import { useChatStore } from "../lib/chatStore";
import { useEffect, useRef, useState } from "react";
import ArrowDown from "../icons/arrow-down";

function ChatPage() {
  const { messages, resolved, setSelected } = useChatStore();
  const [scrollToBottom, setScrollToBottom] = useState(true);
  const scrollableContainerRef = useRef<HTMLDivElement>(null);

  const { id } = useParams();

  function scrollToBottomFallback(force:boolean=false) {
    if ((scrollToBottom||force) && scrollableContainerRef.current) {
      scrollableContainerRef.current.scrollTo({
        top: scrollableContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }

  useEffect(() => {
    if (id) setSelected(id);
  }, [id]);

  useEffect(() => {
    scrollToBottomFallback();
  }, [messages]);

  useEffect(() => {
    const scrollableContainer = scrollableContainerRef.current;

    const handleScroll = (event: Event) => {
      const target = event.target as HTMLDivElement;
      setScrollToBottom(
        target.scrollTop + 100 > target.scrollHeight - target.offsetHeight
      );
    };

    if (scrollableContainer) {
      scrollableContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollableContainer) {
        scrollableContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="h-screen w-full overflow-hidden flex flex-row">
      <div className="h-screen">
        <SideNav />
      </div>
      <div
        className="h-screen w-full bg-slate-800 overflow-y-scroll relative flex flex-col"
        id="scrollableContainer"
        ref={scrollableContainerRef}
      >
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
          {!resolved && (
            <AiMessageToResolve
              scrollToBottomFallback={scrollToBottomFallback}
            />
          )}
        </div>
        {!scrollToBottom && (
          <div className="p-10 fixed bottom-16 w-full right-0 mx-auto mt-auto flex">
            <button
              onClick={(e) => {
                e.preventDefault();
                setScrollToBottom(true);
                scrollToBottomFallback(true);
              }}
              className="p-2 rounded-full group cursor-pointer bg-slate-500 group hover:bg-slate-200 transition-all w-min ml-auto"
            >
              <ArrowDown
                width={25}
                className="text-slate-700 transition-all duration-300 ease-in"
              />
            </button>
          </div>
        )}
        <TextInput />
      </div>
    </div>
  );
}

export default ChatPage;
