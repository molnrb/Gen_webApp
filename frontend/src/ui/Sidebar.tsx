import ChatActions from '../chat/ChatActions'

type SidebarProps = {
  children: React.ReactNode;
};

export function Sidebar({ children }: SidebarProps) {
  return (
    <div className="pl-2 flex w-full sm:w-72 bg-zinc-200 flex-col h-full dark:bg-zinc-950 drop-shadow-md">
      {/* Header */}
      <ChatActions />
      {/* Content */}
      <div className="scrollbar h-full overflow-auto p-4">
        {children}
      </div>
    </div>
  )
}
