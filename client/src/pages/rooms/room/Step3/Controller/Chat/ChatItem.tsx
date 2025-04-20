import { useEffect, useRef } from 'react'
import { IChat } from '../../../../../../../../types/socket'

interface ChatItemProps {
  chatItem: IChat
}

function ChatItem({ chatItem }: ChatItemProps) {
  const scrollRef = useRef<HTMLLIElement | null>(null)

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatItem])

  return (
    <li
      ref={scrollRef}
      className="inline-block w-full break-all rounded-sm px-4"
    >
      {chatItem.sender && (
        <span className={`mr-2 font-bold`}>{chatItem.sender}</span>
      )}
      <span
        className={`${chatItem.sender ? 'text-black' : 'font-bold text-purple-600'}`}
      >
        {chatItem.message}
      </span>
    </li>
  )
}

export default ChatItem
