import React from 'react'

interface AlertContentProps {
  content: string
}

function AlertContent({ content }: AlertContentProps) {
  return (
    <div className="fixed left-[50%] top-4 flex w-[500px] translate-x-[-50%] justify-center">
      <div className="flex items-center rounded-full bg-white px-4 py-2 text-center shadow-md">
        <span className="text-xl">✨</span>
        <span className="mx-2 font-neodgm text-lg">{content}</span>
        <span className="text-xl">✨</span>
      </div>
    </div>
  )
}

export default AlertContent
