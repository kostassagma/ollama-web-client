import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension"; // required for devtools typing

export interface MessageType {
  content: string;
  error: boolean;
  role: "user" | "system" | "assistant";
}

interface ChatType {
  messages: MessageType[];
  addMessage: (text: string, sender: MessageType["role"]) => void;
}

export const useChatStore = create<ChatType>()(
  devtools(
    persist(
      (set) => ({
        messages: [],
        addMessage: (
          content: string,
          role: MessageType["role"],
          error: boolean = false
        ) => {
          set((state) => ({
            messages: [...state.messages, { content, role, error }],
          }));
        },
      }),
      {
        name: "chat-store",
      }
    )
  )
);
