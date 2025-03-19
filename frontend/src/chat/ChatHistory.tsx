import useChatState from '../state/ChatStore'
import { ChatHistoryItem } from './ChatHistoryItem'

export function ChatHistory() {
  const chats = useChatState((state) => state.chats)
  const activeId = useChatState((state) => state.currentChatId)

  return (
    <div>
      {chats.map((chat) => (
        <ChatHistoryItem
          key={chat.id}
          id={chat.id}
          title={chat.title}
          isActive={chat.id === activeId}
        />
      ))}
    </div>
  )
}
