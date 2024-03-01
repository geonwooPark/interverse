import Chat from '../components/Chat/Chat'
import StageContainer from '../components/EnterStage/StageContainer'
import { useEffect, useState } from 'react'
import PasswordStage from '../components/EnterStage/PasswordStage'
import NameStage from '../components/EnterStage/NameStage'
import { getCookie } from '../utils/cookie'
import { useParams, useSearchParams } from 'react-router-dom'
import RoomTitle from '../components/RoomTitle'
import ButtonContainer from '../components/ButtonContainer'
import phaserGame from '../PhaserGame'
import Game from '../scenes/Game'
import Preload from '../scenes/Preload'
import { Socket, io } from 'socket.io-client'
import {
  ServerToClientEvents,
  ClientToServerEvents,
} from '../../../types/socket'

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  'http://localhost:3000',
)

function Room() {
  const params = useParams()
  const [searchParams] = useSearchParams()
  const title = searchParams.get('title') as string
  const hashedPassword = decodeURIComponent(searchParams.get('hp') as string)

  const [preload, setPreload] = useState<Preload | null>(null)
  const [stage, setStage] = useState(0)
  const adminCookie = getCookie('interverse_admin')
  const userCookie = getCookie('interverse_user')
  const role = adminCookie?.roomNum === params.roomId ? 'admin' : 'user'

  const enterStage = [
    {
      id: 101,
      elem: (
        <PasswordStage setStage={setStage} hashedPassword={hashedPassword} />
      ),
    },

    {
      id: 102,
      elem: <NameStage setStage={setStage} />,
    },
  ]

  useEffect(() => {
    setPreload(phaserGame.scene.keys.preload as Preload)
  }, [])

  useEffect(() => {
    if (!preload) return
    // 방을 개설 후 입장 시
    if (preload && !preload.isPreloadComplete) {
      if (adminCookie?.roomNum === params.roomId) {
        // 서버에서 방에 이미 있다면 리턴시키는거 추가해야함
        socket.emit('joinRoom', params.roomId as string)
      }

      if (userCookie?.roomNum === params.roomId) {
        // 서버에서 방에 이미 있다면 리턴시키는거 추가해야함
        socket.emit('joinRoom', params.roomId as string)
      }
      preload.startGame(adminCookie?.nickName || userCookie?.nickName || '')

      const game = phaserGame.scene.keys.game as Game
      game.setupKeys()
    }
    // 새로고침 후 입장 시
    phaserGame.scene
      .getScene('preload')
      .events.on('isPreloadComplete', (isLoading: boolean) => {
        if (isLoading) return
        if (adminCookie?.roomNum === params.roomId) {
          // 서버에서 방에 이미 있다면 리턴시키는거 추가해야함
          socket.emit('joinRoom', params.roomId as string)
        }

        if (userCookie?.roomNum === params.roomId) {
          // 서버에서 방에 이미 있다면 리턴시키는거 추가해야함
          socket.emit('joinRoom', params.roomId as string)
        }
        preload.startGame(adminCookie?.nickName || userCookie?.nickName || '')

        const game = phaserGame.scene.keys.game as Game
        game.setupKeys()
      })

    return () => {
      phaserGame.scene
        .getScene('preload')
        .events.off('isPreloadComplete', (isLoading: boolean) => {
          if (isLoading) return
          if (adminCookie?.roomNum === params.roomId) {
            // 서버에서 방에 이미 있다면 리턴시키는거 추가해야함
            socket.emit('joinRoom', params.roomId as string)
          }

          if (userCookie?.roomNum === params.roomId) {
            // 서버에서 방에 이미 있다면 리턴시키는거 추가해야함
            socket.emit('joinRoom', params.roomId as string)
          }
          preload.startGame(adminCookie?.nickName || userCookie?.nickName || '')

          const game = phaserGame.scene.keys.game as Game
          game.setupKeys()
        })
    }
  }, [preload])

  return (
    <div>
      <RoomTitle title={title} />
      {userCookie?.roomNum !== params.roomId &&
        adminCookie?.roomNum !== params.roomId &&
        stage < 2 && <StageContainer>{enterStage[stage].elem}</StageContainer>}
      <ButtonContainer />
      <Chat
        cookie={role === 'admin' ? adminCookie : userCookie}
        socket={socket}
      />
    </div>
  )
}

export default Room
