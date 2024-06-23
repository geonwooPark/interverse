import Chat from '../Chat/Chat'
import UserStatus from './UserStatus'
import { useEffect, useRef, useState } from 'react'
import phaserGame from '../../PhaserGame'
import Game from '../../scenes/Game'
import { createPortal } from 'react-dom'

function Controller() {
  const game = phaserGame.scene.keys.game as Game

  const inputRef = useRef<HTMLInputElement>(null)

  const [showChat, setShowChat] = useState(true)

  useEffect(() => {
    if (!game) return

    const onFocusChat = () => {
      setShowChat(true)
      inputRef.current?.focus()
      event?.preventDefault()
      game.disableKeys()
    }

    phaserGame.scene.getScene('game').events.on('onFocusChat', onFocusChat)
    return () => {
      phaserGame.scene.getScene('game').events.off('onFocusChat', onFocusChat)
    }
  }, [game])

  return (
    <div className="fixed bottom-24 flex w-full items-center justify-center">
      {showChat && <Chat inputRef={inputRef} />}
      {createPortal(
        <UserStatus showChat={showChat} setShowChat={setShowChat} />,
        document.getElementById('status-bar') as HTMLElement,
      )}
    </div>
  )
}

export default Controller
