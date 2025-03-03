import UserStatus from './UserStatus'
import { useEffect, useRef, useState } from 'react'
import Chat from './Chat'
import { useScene } from '@providers/SceneProvider'

function Controller() {
  const [showChat, setShowChat] = useState(true)

  const gameScene = useScene()

  const inputRef = useRef<HTMLInputElement>(null)

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
    <div className="fixed bottom-24 flex w-full items-center justify-center">
      {showChat && <Chat inputRef={inputRef} />}
      <UserStatus showChat={showChat} setShowChat={setShowChat} />
    </div>
  )
}

export default Controller
