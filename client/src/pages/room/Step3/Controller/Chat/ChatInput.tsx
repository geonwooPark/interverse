import { useState } from 'react'
import Game from '@games/scenes/Game'
import { useAuthCookie } from '@providers/AuthProvider'
import GameSingleton from '../../../../../PhaserGame'

interface ChatInputProps {
  inputRef: React.RefObject<HTMLInputElement>
}

function ChatInput({ inputRef }: ChatInputProps) {
  const authCookie = useAuthCookie()

  const game = GameSingleton.getInstance()

  const gameScene = game.scene.getScene('game') as Game

  const [inputValue, setInputValue] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event
    setInputValue(value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!authCookie) return
    if (!inputValue) {
      inputRef.current?.blur()
      gameScene.enableKeys()
    } else {
      gameScene.player.updateChat(inputValue, authCookie.roomNum)
      inputRef.current?.blur()
      gameScene.enableKeys()
      setInputValue('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="채팅을 입력해주세요"
        autoComplete="off"
        className="w-full bg-transparent px-4 py-2 outline-none placeholder:text-black"
        ref={inputRef}
        value={inputValue}
        onChange={handleChange}
      />
    </form>
  )
}

export default ChatInput
