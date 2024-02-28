import React, { useState } from 'react'
import Game from '../scenes/Game'
import phaserGame from '../PhaserGame'

function Chat() {
  const game = phaserGame.scene.keys.game as Game
  const [inputValue, setInputValue] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event
    setInputValue(value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (inputValue.length > 0) {
      game.player.updateChat(inputValue)
    }
    setInputValue('')
  }
  return (
    <div className="fixed bottom-0 right-0">
      <div className="w-fit">
        <ul></ul>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="chat"
            className="w-[300px] px-2 py-1 outline-none"
            value={inputValue}
            onChange={handleChange}
          />
        </form>
      </div>
    </div>
  )
}

export default Chat
