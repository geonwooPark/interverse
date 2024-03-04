import React, { useState } from 'react'
import Game from '../../scenes/Game'
import phaserGame from '../../PhaserGame'
import ChatList from './ChatList'
import { CookieType } from '../../utils/cookie'
import { useAppSelector } from '../../store/store'

interface ChatProps {
  authCookie: CookieType | null
}

function Chat({ authCookie }: ChatProps) {
  const game = phaserGame.scene.keys.game as Game
  const [inputValue, setInputValue] = useState('')
  const chatList = useAppSelector((state) => state.chatList)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event
    setInputValue(value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!inputValue) return
    if (!authCookie) return

    game.player.updateChat(inputValue)
    game.sendMessage({
      msg: inputValue,
      sender: authCookie.nickName,
      roomNum: authCookie.roomNum,
    })

    setInputValue('')
  }

  return (
    <div className="fixed bottom-5 flex w-full justify-center">
      <div className="flex h-[150px] w-[380px] flex-col justify-between rounded-md bg-white/30 text-sm shadow-md">
        <ChatList chatList={chatList} />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="채팅을 입력해주세요"
            autoComplete="off"
            className="w-full bg-transparent px-3 py-2 outline-none placeholder:text-black"
            value={inputValue}
            onChange={handleChange}
          />
        </form>
      </div>
    </div>
  )
}

export default Chat
