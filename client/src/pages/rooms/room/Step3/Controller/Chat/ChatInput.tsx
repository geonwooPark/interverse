import { useState } from 'react'
import { useAuthCookie } from '@providers/AuthProvider'
import { useScene } from '@providers/SceneProvider'

interface ChatInputProps {
  inputRef: React.RefObject<HTMLInputElement>
}

function ChatInput({ inputRef }: ChatInputProps) {
  const authCookie = useAuthCookie()

  const gameScene = useScene()

  const player = gameScene.player

  const ChatManager = gameScene.chat

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

      ChatManager.sendChat({
        id,
        message: inputValue,
        roomNum: authCookie.roomNum,
        sender: player.nickname.text,
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
