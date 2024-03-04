import { MessageData } from '../../../../types/socket'
import ChatMessage from './ChatItem'

interface ChatListProps {
  chatList: MessageData[]
}

function ChatList({ chatList }: ChatListProps) {
  return (
    <ul className="hide-scroll overflow-y-auto p-3">
      {chatList.map((chatItem, i) => (
        <ChatMessage key={i} chatItem={chatItem} />
      ))}
    </ul>
  )
}

export default ChatList
