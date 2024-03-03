import { useEffect, useRef } from 'react'
import { ChatItemType } from './Chat'

interface ChatItemProps {
  chatItem: ChatItemType
}
function ChatItem({ chatItem }: ChatItemProps) {
  const scrollRef = useRef<HTMLLIElement | null>(null)

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatItem])

  return (
    <li ref={scrollRef} className="space-x-2.5">
      <span className="font-bold">{chatItem.sender}</span>
      <span>{chatItem.content}</span>
    </li>
  )
}

export default ChatItem
