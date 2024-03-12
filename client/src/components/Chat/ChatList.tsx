import { ChatItemType } from '../../types/client'
import ChatMessage from './ChatItem'

interface ChatListProps {
  chatList: ChatItemType[]
}

function ChatList({ chatList }: ChatListProps) {
  return (
    <ul className="hide-scroll w-full overflow-y-auto p-4">
      {chatList.map((chatItem, i) => (
        <ChatMessage key={i} chatItem={chatItem} />
      ))}
    </ul>
  )
}

export default ChatList
