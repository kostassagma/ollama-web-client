import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension"; // required for devtools typing

export interface MessageType {
  content: string;
  error: boolean;
  role: "user" | "system" | "assistant";
}

interface CurrentChatType {
  messages: MessageType[];
  resolved: boolean;
  addMessage: (text: string, sender: MessageType["role"]) => void;
  setResolved: (newValue: boolean) => void;
  loading: boolean;
  setLoading: (newValue: boolean) => void;
}

interface AllChatsType extends CurrentChatType {
  allChats: { messages: MessageType[]; id: string }[];
  selectedId: string;
  setSelected: (id: string) => void;
}

export const useChatStore = create<AllChatsType>()(
  devtools(
    persist(
      (set) => ({
        allChats: [],
        selectedId: "",
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
            allChats: state.allChats.map((e) =>
              e.id === state.selectedId
                ? { id: e.id, messages: [...e.messages, { content, role, error }] }
                : e
            ),
          }));
        },
        loading: false,
        setLoading: (newValue: boolean) => {
          set({ loading: newValue });
        },
        setSelected: (id: string) => {
          set((state) => {
            const chatHistory = state.allChats.find((chat) => chat.id === id);
            if (chatHistory) {
              return {
                selectedId: id,
                messages: chatHistory.messages,
                resolved: true,
                loading: false,
              };
            } else {
              return {
                selectedId: id,
                messages: [],
                resolved: true,
                loading: false,
                allChats: [...state.allChats, { id: id, messages: [] }],
              };
            }
          });
        },
      }),
      {
        name: "chat-store",
      }
    )
  )
);
