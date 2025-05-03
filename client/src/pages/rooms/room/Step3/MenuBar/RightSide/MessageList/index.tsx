import React, { useState, useSyncExternalStore } from 'react'
import { AnimatePresence, motion as m } from 'motion/react'
import slideIn from '@components/Animation/motions/slideIn'
import { useScene } from '@providers/SceneProvider'
import MessageItem from './MessageItem'
import Trigger from './Trigger'

export default function MessageList() {
  const gameScene = useScene()

  const DMManager = gameScene.dm

  const messagelist = useSyncExternalStore(
    (callback) => DMManager.subscribe(() => callback()),
    () => DMManager.getState(),
  )

  const [isOpen, setIsOpen] = useState(false)

  const onClick = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <div className="relative">
      <Trigger onClick={onClick} hasNewAlarm={messagelist.length > 0} />

      <AnimatePresence>
        {isOpen && (
          <m.div
            {...slideIn({ distance: -20, isFade: true }).inY}
            className="absolute right-0 mt-4 h-[400px] w-[320px] overflow-hidden rounded-md bg-white shadow-level2"
          >
            <div className="flex justify-end px-3 py-4">
              <button className="text-body2 font-semibold text-cyan-500">
                전체 읽음
              </button>
            </div>

            <ul className="hide-scroll size-full overflow-y-scroll">
              {messagelist?.map((message) => (
                <MessageItem key={message.id} message={message} />
              ))}
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}
