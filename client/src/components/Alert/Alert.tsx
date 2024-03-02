import React from 'react'
import { useAppSelector } from '../../store/store'

function Alert() {
  const { content, isAlert } = useAppSelector((state) => state.alert)

  if (!isAlert) return null

  return (
    <div className="fixed top-4 flex w-full justify-center">
      <div className="w-[500px] rounded-full bg-white px-4 py-2 text-center shadow-md">
        <span className="font-neodgm text-lg">✨ {content} ✨</span>
      </div>
    </div>
  )
}

export default Alert
