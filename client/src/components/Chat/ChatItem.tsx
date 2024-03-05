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
    <li ref={scrollRef} className="flex w-full space-x-2.5">
      <span className="font-bold">{chatItem.nickName}</span>
      <span className="flex w-fit">{chatItem.message}</span>
    </li>
  )
}

export default ChatItem
