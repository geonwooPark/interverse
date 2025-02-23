import UserStatus from './UserStatus'
import { useEffect, useRef, useState } from 'react'
import Game from '@games/scenes/Game'
import Chat from './Chat'
import GameSingleton from '../../../../PhaserGame'

function Controller() {
  const [showChat, setShowChat] = useState(true)

  const game = GameSingleton.getInstance()

  const gameScene = game.scene.getScene('game') as Game

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
