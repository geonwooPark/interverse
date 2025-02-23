import { useEffect, useRef } from 'react'
import { ChatItemType } from '../../../../../../../types/client'

interface ChatItemProps {
  chatItem: ChatItemType
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
      {chatItem.nickname && (
        <span className={`mr-2 font-bold`}>{chatItem.nickname}</span>
      )}
      <span
        className={`${chatItem.nickname ? 'text-black' : 'font-bold text-purple-600'}`}
      >
        {chatItem.message}
      </span>
    </li>
  )
}

export default ChatItem
