import { useEffect, useRef } from 'react'
import { MessageData } from '../../../../types/socket'

interface ChatItemProps {
  chatItem: MessageData
}
function ChatItem({ chatItem }: ChatItemProps) {
  const scrollRef = useRef<HTMLLIElement | null>(null)

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatItem])

  return (
    <li ref={scrollRef} className="space-x-2.5">
      <span className="font-bold">{chatItem.sender}</span>
      <span>{chatItem.msg}</span>
    </li>
  )
}

export default ChatItem
