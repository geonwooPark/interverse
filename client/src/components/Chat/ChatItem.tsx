import { useEffect, useRef } from 'react'
import { ChatItemType } from '../../types/client'

interface ChatItemProps {
  chatItem: ChatItemType
}
function ChatItem({ chatItem }: ChatItemProps) {
  const scrollRef = useRef<HTMLLIElement | null>(null)

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatItem])

  return (
    <li ref={scrollRef} className="flex w-full gap-2">
      <span className={`font-bold ${chatItem.nickName ? 'block' : 'hidden'}`}>
        {chatItem.nickName}
      </span>
      <span
        className={`flex w-fit ${chatItem.nickName ? 'text-black' : 'font-bold text-purple-600'}`}
      >
        {chatItem.message}
      </span>
    </li>
  )
}

export default ChatItem
