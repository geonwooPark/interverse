import React from 'react'
import { IDirectMessage } from '../../../../../../../../../types/socket'

interface MessageItemProps {
  message: IDirectMessage & { isRead: boolean }
  onClick: () => void
}

export default function MessageItem({ message, onClick }: MessageItemProps) {
  return (
    <li className="border-b">
      <button
        onClick={onClick}
        className="w-full bg-white px-4 pb-4 pt-2 text-start duration-200 hover:bg-gray-100"
      >
        <div className="pointer-events-none flex items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-body2 text-gray-400">
              {message.sender}님이 보낸 메시지
            </p>
            <p className="line-clamp-1 whitespace-pre-wrap break-words text-body2">
              {message.message}
            </p>
          </div>
          {message.isRead || (
            <span className="size-2.5 shrink-0 rounded-full bg-cyan-500" />
          )}
        </div>
      </button>
    </li>
  )
}
