import React from 'react'

interface AlertBoxProps {
  content: string
}

function AlertBox({ content }: AlertBoxProps) {
  return (
    <div className="fixed left-[50%] top-[80px] flex w-[500px] translate-x-[-50%] justify-center">
      <div className="flex items-center rounded-full bg-white px-4 py-2 text-center shadow-md">
        <span className="text-subtitle1">✨</span>
        <span className="body1 mx-2 font-neodgm">{content}</span>
        <span className="text-subtitle1">✨</span>
      </div>
    </div>
  )
}

export default AlertBox
