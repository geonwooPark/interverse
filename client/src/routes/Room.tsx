import Chat from '../components/Chat/Chat'
import { useEffect, useState } from 'react'
import { getAuthCookie } from '../utils/cookie'
import { useParams } from 'react-router-dom'
import RoomTitle from '../components/RoomTitle'
import ButtonContainer from '../components/ButtonContainer'
import Game from '../scenes/Game'
import Preload from '../scenes/Preload'
import { Socket, io } from 'socket.io-client'
import {
  ServerToClientEvents,
  ClientToServerEvents,
} from '../../../types/socket'
import phaserGame from '../PhaserGame'

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  'http://localhost:3000',
)

function Room() {
  const params = useParams()
  const authCookie = getAuthCookie(params.roomId as string)

  const [preload, setPreload] = useState<Preload | null>(null)

  useEffect(() => {
    if (!authCookie) return
    setPreload(phaserGame.scene.keys.preload as Preload)
  }, [])

  useEffect(() => {
    if (!authCookie) return
    if (!preload) return
    // 방을 개설 후 입장 시
    if (preload && !preload.isPreloadComplete) {
      if (authCookie) {
        // 서버에서 방에 이미 있다면 리턴시키는거 추가해야함
        socket.emit('joinRoom', params.roomId as string)
      }

      preload.startGame(authCookie?.nickName || '')

      const game = phaserGame.scene.keys.game as Game
      game.setupKeys()
    }
    // 새로고침 후 입장 시
    phaserGame.scene
      .getScene('preload')
      .events.on('isPreloadComplete', (isLoading: boolean) => {
        if (isLoading) return
        if (authCookie) {
          // 서버에서 방에 이미 있다면 리턴시키는거 추가해야함
          socket.emit('joinRoom', params.roomId as string)
        }

        preload.startGame(authCookie?.nickName || '')

        const game = phaserGame.scene.keys.game as Game
        game.setupKeys()
      })

    return () => {
      phaserGame.scene
        .getScene('preload')
        .events.off('isPreloadComplete', (isLoading: boolean) => {
          if (isLoading) return
          if (authCookie) {
            // 서버에서 방에 이미 있다면 리턴시키는거 추가해야함
            socket.emit('joinRoom', params.roomId as string)
          }

          preload.startGame(authCookie?.nickName || '')

          const game = phaserGame.scene.keys.game as Game
          game.setupKeys()
        })
    }
  }, [preload])

  return (
    <div>
      <RoomTitle />
      <Chat authCookie={authCookie} socket={socket} />
      <ButtonContainer />
    </div>
  )
}

export default Room
