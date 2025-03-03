import { useState } from 'react'
import GameScene from '@games/scenes/Game'
import { useAuthCookie } from '@providers/AuthProvider'
import GameManager from '@managers/GameManager'
import { useAppSelector } from '@store/store'

interface ChatInputProps {
  inputRef: React.RefObject<HTMLInputElement>
}

function ChatInput({ inputRef }: ChatInputProps) {
  const authCookie = useAuthCookie()

  const { nickname } = useAppSelector((state) => state.avartar)

  const game = GameManager.getInstance()

  const gameScene = game.scene.getScene('game') as GameScene

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
      const id = Math.random().toString()

      gameScene.player.ws.sendMessage({
        id,
        message: inputValue,
        roomNum: authCookie.roomNum,
        sender: nickname,
      })

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
