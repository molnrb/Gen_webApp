import useUIStateStore from '../state/UIStateStore'
import { Bars2Icon, Bars3Icon, MagnifyingGlassIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import useChatState from '../state/ChatStore'

export default function ChatActions() {

    const { isSidebarOpen, setIsSidebarOpen } = useUIStateStore()
    const addChat = useChatState((state) => state.addChat)

    return (
        <div className="flex justify-between">
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="m-3 w-6 rounded-md pl-2"
            >
                {isSidebarOpen ? (
                    <Bars2Icon className="h-6 w-6 cursor-pointer" />
                ) : (
                    <Bars3Icon className="h-6 w-6 cursor-pointer" />
                )}
            </button>
            <div className="mr-2 gap-2">
                {isSidebarOpen && (
                    <button className="m-3 w-6 rounded-md p-2">
                        <MagnifyingGlassIcon className="h-6 w-6 cursor-pointer" />
                    </button>
                )}
                <button
                    onClick={addChat}
                    className="m-3 w-6 rounded-md p-2"
                >
                    <PencilSquareIcon className="h-6 w-6 cursor-pointer" />
                </button>
            </div>
        </div>
    )
}
