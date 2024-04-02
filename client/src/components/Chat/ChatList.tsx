import { ChatItemType } from '../../types/client'
import ChatItem from './ChatItem'

interface ChatListProps {
  chatList: ChatItemType[]
}

function ChatList({ chatList }: ChatListProps) {
  return (
    <ul className="hide-scroll overflow-y-auto pt-2">
      {chatList.map((chatItem, i) => (
        <ChatItem key={i} chatItem={chatItem} />
      ))}
    </ul>
  )
}

export default ChatList
