import useChatState from '../state/ChatStore'
import { ChatMessage } from './ChatMessage'
import { ChatPendingLoader } from '../ui/Loaders'
import { useScrollToElement } from '../hooks/use-scroll-to-element'

export function Chat() {
  const chats = useChatState((state) => state.chats)
  const activeId = useChatState((state) => state.currentChatId)
  const activeChat = chats.find((chat) => chat.id === activeId)


  // Scrolls the chat view to the bottom whenever the messages in the active chat change.
  const messagesEndRef = useScrollToElement<HTMLDivElement>(activeChat?.messages)

  if (!activeChat) return null

  return (
    <div className="flex h-full flex-col gap-2 overflow-auto scrollbar lg:pl-24 lg:pr-24">
      {activeChat.messages?.length ? (
        activeChat.messages.map((message, index) => (
          <ChatMessage
            key={index}
            fromUser={message.fromUser}
            content={message.content}
          />
        ))
      ) : (
        <div className="flex h-full items-center justify-center">
          <h1 className="text-center text-xl">Welcome</h1>
        </div>
      )}
      {activeChat.isPending && <ChatPendingLoader />}
      <div ref={messagesEndRef} className="h-0" />
    </div >
  )
}