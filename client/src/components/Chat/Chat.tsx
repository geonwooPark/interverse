import React, { useEffect, useState } from 'react'
import Game from '../../scenes/Game'
import phaserGame from '../../PhaserGame'
import {
  ServerToClientEvents,
  ClientToServerEvents,
} from '../../../../types/socket'
import ChatList from './ChatList'
import { Socket } from 'socket.io-client'

interface ChatProps {
  cookie: {
    roomNum: string
    nickName: string
    role: 'admin' | 'user'
    path?: string
  }
  socket: Socket<ServerToClientEvents, ClientToServerEvents>
}

export interface ChatItemType {
  sender: string
  content: string
}

function Chat({ cookie, socket }: ChatProps) {
  const game = phaserGame.scene.keys.game as Game
  const [inputValue, setInputValue] = useState('')
  const [chatList, setChatList] = useState<ChatItemType[]>([])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event
    setInputValue(value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!inputValue) return
    game.player.updateChat(inputValue)
    socket.emit('clientMsg', {
      msg: inputValue,
      sender: cookie.nickName,
      roomNum: cookie.roomNum,
    })
    setInputValue('')
  }

  useEffect(() => {
    socket.on('serverMsg', (data) => {
      setChatList((pre) => [...pre, { sender: data.sender, content: data.msg }])
    })
  }, [socket])

  return (
    <div className="fixed bottom-5 flex w-full justify-center">
      <div className="flex h-[150px] w-[380px] flex-col justify-between rounded-md bg-white/30 text-sm shadow-md">
        <ChatList chatList={chatList} />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="채팅을 입력해주세요"
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
