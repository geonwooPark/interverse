import { useEffect, useState } from 'react'
import { CookieType } from '../../types/client'
import Game from '../../scenes/Game'
import phaserGame from '../../PhaserGame'

interface ChatInputProps {
  authCookie: CookieType | null
  inputRef: React.RefObject<HTMLInputElement>
}

function ChatInput({ authCookie, inputRef }: ChatInputProps) {
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
    if (!authCookie) return
    if (!inputValue) {
      inputRef.current?.blur()
      game.enableKeys()
    } else {
      game.player.updateChat(inputValue, authCookie.roomNum)
      inputRef.current?.blur()
      game.enableKeys()
      setInputValue('')
    }
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

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
