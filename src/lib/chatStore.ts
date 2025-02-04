import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension"; // required for devtools typing

interface MessageType {
  text: string;
  error: boolean;
  sender: "me" | "ai";
}

interface ChatType {
  messages: MessageType[];
  addMessage: (text: string, sender: "me" | "ai") => void;
}

export const useChatStore = create<ChatType>()(
  devtools(
    persist(
      (set) => ({
        messages: [],
        addMessage: (
          text: string,
          sender: "me" | "ai",
          error: boolean = false
        ) => {
          set((state) => ({
            messages: [...state.messages, { text, sender, error }],
          }));
        },
      }),
      {
        name: "chat-store",
      }
    )
  )
);
