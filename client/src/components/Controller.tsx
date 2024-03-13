import Chat from './Chat/Chat'
import UserStatus from './UserStatus'
import { CookieType } from '../types/client'
import { useEffect, useRef, useState } from 'react'
import phaserGame from '../PhaserGame'
import Game from '../scenes/Game'

interface ControllerProps {
  authCookie: CookieType | null
}
function Controller({ authCookie }: ControllerProps) {
  const game = phaserGame.scene.keys.game as Game

  const inputRef = useRef<HTMLInputElement>(null)
  const [showChat, setShowChat] = useState(false)

  const onFocusChat = () => {
    setShowChat(true)
    inputRef.current?.focus()
    event?.preventDefault()
    game.disableKeys()
  }

  useEffect(() => {
    if (!game) return
    phaserGame.scene.getScene('game').events.on('onFocusChat', onFocusChat)
    return () => {
      phaserGame.scene.getScene('game').events.off('onFocusChat', onFocusChat)
    }
  }, [game])

  return (
    <div className="fixed bottom-5 z-[200] flex w-full flex-col items-center justify-center gap-2">
      {showChat && <Chat authCookie={authCookie} inputRef={inputRef} />}
      <UserStatus
        authCookie={authCookie}
        showChat={showChat}
        setShowChat={setShowChat}
      />
    </div>
  )
}

export default Controller
