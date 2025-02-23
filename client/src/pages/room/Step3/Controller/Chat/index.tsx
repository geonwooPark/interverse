import ChatList from './ChatList'
import ChatInput from './ChatInput'

interface ChatProps {
  inputRef: React.RefObject<HTMLInputElement>
}

function Chat({ inputRef }: ChatProps) {
  return (
    <div className="flex h-[150px] w-[380px] flex-col justify-between rounded-md bg-white/30 text-sm shadow-md">
      <ChatList />
      <ChatInput inputRef={inputRef} />
    </div>
  )
}

export default Chat
