
import useUIStateStore from '../state/UIStateStore'
import ChatActions from '../chat/ChatActions'


export default function Header() {
  const { isSidebarOpen } = useUIStateStore()
  return (
    <div className="flex justify-between drop-shadow-md">
      <div className="flex justify-center items-center">
        {!isSidebarOpen && <ChatActions />}
        <span className="text-xl ml-4">WebGenAI</span>
      </div>
    </div>
  )
}
