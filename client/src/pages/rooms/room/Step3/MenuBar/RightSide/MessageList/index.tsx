import React, { useState, useSyncExternalStore } from 'react'
import { AnimatePresence, motion as m } from 'motion/react'
import { useScene } from '@providers/SceneProvider'
import MessageItem from './MessageItem'
import Trigger from './Trigger'
import { useModal } from '@providers/ModalProvider'
import MessageModal from './MessageModal'
import slide from '@components/Animation/motions/slide'

export default function MessageList() {
  const { addModal, removeModal } = useModal()

  const gameScene = useScene()

  const DMManager = gameScene.dm

  const messagelist = useSyncExternalStore(
    (callback) => DMManager.subscribe(() => callback()),
    () => DMManager.getState(),
  )

  const [isOpen, setIsOpen] = useState(false)

  const hasNewAlarm = messagelist?.some((r) => !r.isRead)

  const onClose = () => {
    setIsOpen((prev) => !prev)
  }

  const readDM = (dm: any) => {
    DMManager.readDM(dm.id)
    addModal(<MessageModal dm={dm} onClose={removeModal} />)
  }

  const readAllDM = () => {
    DMManager.readAllDM()
  }

  return (
    <div className="relative">
      {isOpen && (
        <div onClick={onClose} className="fixed inset-0 z-[5] size-full" />
      )}

      <Trigger onClick={onClose} hasNewAlarm={hasNewAlarm} />

      <AnimatePresence>
        {isOpen && (
          <m.div
            {...slide({ distance: -20, isFade: true }).inY}
            className="absolute right-0 z-[6] mt-4 flex h-[400px] w-[320px] flex-col overflow-hidden rounded-md bg-white shadow-level2"
          >
            <div className="flex h-12 justify-end border-b px-3">
              <button
                disabled={!hasNewAlarm}
                onClick={readAllDM}
                className={`${hasNewAlarm ? 'text-cyan-500' : 'text-gray-200'} text-subtitle2`}
              >
                전체 읽음
              </button>
            </div>

            {messagelist.length > 0 ? (
              <ul className="hide-scroll size-full overflow-y-scroll">
                {messagelist?.map((message) => (
                  <MessageItem
                    key={message.id}
                    message={message}
                    onClick={() => readDM(message)}
                  />
                ))}
              </ul>
            ) : (
              <div className="flex h-full items-center justify-center pb-12">
                <p className="text-subtitle2 text-gray-400">
                  전송된 메시지가 없습니다.
                </p>
              </div>
            )}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}
