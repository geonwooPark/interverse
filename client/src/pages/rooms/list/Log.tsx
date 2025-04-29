import dayjs from 'dayjs'
import React from 'react'

interface LogProps {
  log: any
}

export default function Log({ log }: LogProps) {
  return (
    <a href={`/rooms/${log.roomId._id}`}>
      <div className="pointer-events-none h-[200px] w-full rounded-lg bg-gray-400" />
      <div className="pointer-events-none mt-2">
        <p className="text-h6">{log.roomId.title}</p>
        <p className="text-caption text-gray-400">
          {dayjs(log.joinedAt).format('YYYY-MM-DD HH:mm:ss')}
        </p>
      </div>
    </a>
  )
}
