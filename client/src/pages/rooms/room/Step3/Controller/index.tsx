import UserStatus from './UserStatus'
import { useEffect, useRef, useState } from 'react'
import { useScene } from '@providers/SceneProvider'
import { AnimatePresence, motion as m } from 'motion/react'
import slideIn from '@components/Animation/motions/slideIn'
import ChatList from './Chat/ChatList'
import ChatInput from './Chat/ChatInput'

function Controller() {
  const gameScene = useScene()

  const inputRef = useRef<HTMLInputElement>(null)

  const [showChat, setShowChat] = useState(true)

  useEffect(() => {
    const onFocusChat = () => {
      setShowChat(true)
      inputRef.current?.focus()
      event?.preventDefault()
      gameScene.disableKeys()
    }

    gameScene.events.on('onFocusChat', onFocusChat)

    return () => {
      gameScene.events.off('onFocusChat', onFocusChat)
    }
  }, [])

  return (
    <div className="fixed bottom-24 z-[30] flex w-full items-center justify-center">
      <AnimatePresence>
        {showChat && (
          <m.div
            {...slideIn({ distance: 20, isFade: true }).inY}
            className="flex h-[150px] w-[380px] flex-col justify-between rounded-md bg-white/30 text-body2 shadow-md"
          >
            <ChatList />
            <ChatInput inputRef={inputRef} />
          </m.div>
        )}
      </AnimatePresence>

      <UserStatus
        showChat={showChat}
        handleChatBox={() => setShowChat((prev) => !prev)}
      />
    </div>
  )
}

export default Controller
