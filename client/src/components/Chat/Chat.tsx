import ChatList from './ChatList'
import { useAppSelector } from '../../store/store'
import { CookieType } from '../../types/client'
import ChatInput from './ChatInput'

interface ChatProps {
  authCookie: CookieType | null
  inputRef: React.RefObject<HTMLInputElement>
}

function Chat({ authCookie, inputRef }: ChatProps) {
  const chatList = useAppSelector((state) => state.chatList)

  return (
    <div className="flex h-[150px] w-[380px] flex-col justify-between rounded-md bg-white/30 text-sm shadow-md">
      <ChatList chatList={chatList} />
      <ChatInput authCookie={authCookie} inputRef={inputRef} />
    </div>
  )
}

export default Chat
