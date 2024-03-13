import React, { useEffect, useState } from 'react'
import Game from '../../scenes/Game'
import phaserGame from '../../PhaserGame'
import ChatList from './ChatList'
import { useAppSelector } from '../../store/store'
import { CookieType } from '../../types/client'

interface ChatProps {
  authCookie: CookieType | null
  inputRef: React.RefObject<HTMLInputElement>
}

function Chat({ authCookie, inputRef }: ChatProps) {
  const game = phaserGame.scene.keys.game as Game
  const chatList = useAppSelector((state) => state.chatList)

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
    <div className="flex h-[150px] w-[380px] flex-col justify-between rounded-md bg-white/30 text-sm shadow-md">
      <ChatList chatList={chatList} />
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
    </div>
  )
}

export default Chat
