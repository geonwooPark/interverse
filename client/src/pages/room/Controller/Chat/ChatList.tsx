import { useAppSelector } from '../../../../store/store'
import ChatItem from './ChatItem'

function ChatList() {
  const chatList = useAppSelector((state) => state.chatList)

  return (
    <ul className="hide-scroll overflow-y-auto pt-2">
      {chatList.map((chatItem, i) => (
        <ChatItem key={i} chatItem={chatItem} />
      ))}
    </ul>
  )
}

export default ChatList
