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
  resolved: boolean;
  addMessage: (text: string, sender: MessageType["role"]) => void;
  setResolved: (newValue: boolean) => void;
  loading: boolean;
  setLoading: (newValue: boolean) => void;
}

export const useChatStore = create<ChatType>()(
  devtools(
    persist(
      (set) => ({
        messages: [],
        setResolved: (newValue: boolean) => {
          set({ resolved: newValue });
        },
        resolved: true,
        addMessage: (
          content: string,
          role: MessageType["role"],
          error: boolean = false
        ) => {
          set((state) => ({
            messages: [...state.messages, { content, role, error }],
          }));
        },
        loading: false,
        setLoading: (newValue: boolean) => {
          set({ loading: newValue });
        },
      }),
      {
        name: "chat-store",
      }
    )
  )
);
