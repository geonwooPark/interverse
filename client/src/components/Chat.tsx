import React, { useState } from 'react'
import Game from '../scenes/Game'
import phaserGame from '../PhaserGame'

function Chat() {
  const game = phaserGame.scene.keys.game as Game
  const [chats, setChats] = useState<{ nickname: string; content: string }[]>(
    [],
  )
  const [nickname, setNickname] = useState('김철수')
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
      setChats((pre) => [...pre, { nickname, content: inputValue }])
    }
    setInputValue('')
  }
  return (
    <div className="fixed bottom-5 flex w-full justify-center">
      <div className="flex h-[150px] w-[380px] flex-col justify-between rounded-md bg-[rgba(255,255,255,0.3)] text-sm shadow-md">
        <ul className="hide-scroll overflow-y-auto p-3">
          {chats.map((chat, i) => (
            <li key={i} className="space-x-2">
              <span className="font-bold">{chat.nickname}</span>
              <span>{chat.content}</span>
            </li>
          ))}
        </ul>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="채팅을 입력해 주세요"
            className="w-full  bg-transparent px-3 py-2 outline-none placeholder:text-black"
            value={inputValue}
            onChange={handleChange}
          />
        </form>
      </div>
    </div>
  )
}

export default Chat
