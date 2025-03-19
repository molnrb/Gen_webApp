import useChatState from '../state/ChatStore'
import {
  TrashIcon,
  DocumentDuplicateIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline'
import { ContextMenuItem } from '../ui/context-menu/ContextMenuItem'
import { ContextMenu } from '../ui/context-menu/ContextMenu'
import clsx from 'clsx'

type ChatHistoryItemProps = {
  id: string;
  title: string;
  isActive: boolean;
};

export function ChatHistoryItem(props: ChatHistoryItemProps) {
  const setCurrentChatId = useChatState((state) => state.setCurrentChatId)
  const deleteChat = useChatState((state) => state.deleteChat)

  return (
    <div
      className={clsx(
        'flex truncate cursor-pointer items-center justify-between p-2 text-sm',
        { 'rounded-md bg-zinc-300 dark:bg-zinc-900': props.isActive }
      )}
      onClick={() => setCurrentChatId(props.id)}
    >
      <span className="truncate">{props.title}</span>
      <ContextMenu
        trigger={
          <EllipsisVerticalIcon className="h-4 w-4 ml-4" />
        }
      >
        <ContextMenuItem onClick={() => deleteChat(props.id)}>
          <TrashIcon className="h-4 w-4 text-red-400" /> delete
        </ContextMenuItem>
        <ContextMenuItem>
          <DocumentDuplicateIcon className="h-4 w-4 text-green-600" /> duplicate
        </ContextMenuItem>
      </ContextMenu>
    </div>
  )
}