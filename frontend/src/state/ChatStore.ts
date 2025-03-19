// Temporarly for demo, chat / conversations data will be handled will react-query

import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'

const STATIC_ID = uuidv4()

export interface IMessage {
    id: number;
    content: string;
    fromUser: boolean;
}

export interface IChat {
    id: string;
    title: string;
    messages: IMessage[];

    isPending: boolean;
}

type ChatState = {
    currentChatId: string | null;
    chats: IChat[];
}

type ChatActions = {
    setCurrentChatId: (id: string) => void;
    deleteChat: (id: string) => void;
    addMessage: (id: string, message: string, fromUser: boolean) => void;
    setIsPending: (id: string, value: boolean) => void;
    addChat: () => void;
    deleteAllChats: () => void;
}

type ChatStore = ChatState & ChatActions;

const INITIAL_STATE: ChatState = {
    currentChatId: STATIC_ID,
    chats: [
        {
            title: 'Untitled conversation',
            messages: [],
            id: STATIC_ID,
            isPending: false
        },
        {
            id: uuidv4(),
            isPending: false,
            title: 'Tailwind CSS',
            messages: [
                {
                    id: 1,
                    content: 'Hello, how can I help you today?',
                    fromUser: false,
                },
                {
                    id: 2,
                    content: 'I want to know the best features of Tailwind CSS. Can you help me? I want good examples.',
                    fromUser: true,
                },
                {
                    id: 3,
                    content: 'Sure, here are some of the best features of Tailwind CSS...',
                    fromUser: false,
                },
                {
                    id: 4,
                    content: "Can you provide me with an example of how to use the 'bg-blue-500' class? Its confusing for me. Can you tell me how it works behind the scenes?",
                    fromUser: true,
                },
                {
                    id: 5,
                    content: "The 'bg-blue-500' class is a utility class that sets the background color of an element to a shade of blue. The 'bg-blue-500' class is a shorthand for 'bg-blue-500'. The 'bg-blue-500' class is a utility class that sets the background color of an element to a shade of blue. The 'bg-blue-500' class is a shorthand for 'bg-blue-500'. The 'bg-blue-500' class is a utility class that sets the background color of an element to a shade of blue. The 'bg-blue-500' class is a shorthand for 'bg-blue-500'.",
                    fromUser: false,
                },
            ],
        },
        {
            id: uuidv4(),
            isPending: false,
            title: 'React Context API',
            messages: [
                {
                    id: 1,
                    content: 'Hello, how can I help you today?',
                    fromUser: false,
                },
                {
                    id: 2,
                    content: 'I want to know more about React Context API. How can I use it and what are the best practices?',
                    fromUser: true
                },
                {
                    id: 3,
                    content: 'Sure, here are some of the best practices for using React Context API...',
                    fromUser: false
                },
                {
                    id: 4,
                    content: "Can you provide me with an example of how to use the 'createContext' function? I am new to React Context API and I want to understand how it works.",
                    fromUser: true
                },
                {
                    id: 5,
                    content: "The 'createContext' function is used to create a new context object. The 'createContext' function returns an object with a 'Provider' and 'Consumer' component. The 'Provider' component is used to provide the context value to its children. The 'Consumer' component is used to consume the context value from its nearest 'Provider' ancestor. The 'createContext' function is used to create a new context object. The 'createContext' function returns an object with a 'Provider' and 'Consumer' component. The 'Provider' component is used to provide the context value to its children. The 'Consumer' component is used to consume the context value from its nearest 'Provider' ancestor.",
                    fromUser: false
                },
                {
                    id: 6,
                    content: 'What are the advantages of Context API?',
                    fromUser: true
                },
                {
                    id: 7,
                    content: "Eliminates the need to pass props down multiple levels manually. No extra dependencies, part of React itself. Useful for themes, authentication, user preferences, and localization. It's easy to implement compared to Redux or even Zustand.",
                    fromUser: false
                },
            ]
        }
    ]
}

const useChatState = create<ChatStore>((set) => ({
    ...INITIAL_STATE,
    setCurrentChatId: (id: string) => set(() => ({ currentChatId: id })),
    addChat: () => {
        set((state) => {
            const newChat: IChat = {
                id: uuidv4(),
                title: 'Untitled conversation',
                messages: [],
                isPending: false
            }
            return {
                chats: [newChat, ...state.chats],
                currentChatId: newChat.id
            }
        })
    },
    setIsPending: (id: string, value: boolean) => {
        set((state) => ({
            chats: state.chats.map((chat) =>
                chat.id === id ? { ...chat, isPending: value } : chat
            ),
        }))
    },
    deleteChat: (id: string) => set((state) => {
        const updatedChats = state.chats.filter((chat) => chat.id !== id)
        return {
            chats: updatedChats,
            currentChatId: updatedChats.length > 0 ? updatedChats[0].id : null
        }
    }),
    addMessage: (id: string, message: string, fromUser: boolean) => {
        set((state) => ({
            chats: state.chats.map(chat =>
                chat.id === id
                    ? { ...chat, messages: chat.messages.concat({ id: chat.messages.length + 1, content: message, fromUser }) }
                    : chat
            )
        }))
    },
    deleteAllChats: () => set(() => ({
        chats: [
            {
                title: 'Untitled conversation',
                messages: [],
                id: STATIC_ID,
                isPending: false
            }
        ],
        currentChatId: STATIC_ID
    }))
}))

export default useChatState