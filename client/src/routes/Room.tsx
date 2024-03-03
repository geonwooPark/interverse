import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Socket, io } from 'socket.io-client'
import phaserGame from '../PhaserGame'
import Game from '../scenes/Game'
import Preload from '../scenes/Preload'
import Chat from '../components/Chat/Chat'
import RoomTitle from '../components/RoomTitle'
import Alert from '../components/Alert/Alert'
import { getAuthCookie } from '../utils/cookie'
import {
  ServerToClientEvents,
  ClientToServerEvents,
} from '../../../types/socket'
import ButtonContainer from '../components/ButtonContainer'

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  'http://localhost:3000',
)

function Room() {
  const params = useParams()
  const authCookie = getAuthCookie(params.roomId as string)

  const [preload, setPreload] = useState<Preload | null>(null)
  const [users, setUsers] = useState<string[]>([])

  const [isGameStart, setIsGameStart] = useState(false)

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
        socket.emit('joinRoom', {
          roomNum: params.roomId as string,
          nickName: authCookie.nickName,
        })
      }

      preload.startGame(authCookie?.nickName || '')

      const game = phaserGame.scene.keys.game as Game
      game.setupKeys()
      setIsGameStart(true)
    }
    // 새로고침 후 입장 시
    phaserGame.scene
      .getScene('preload')
      .events.on('isPreloadComplete', (isLoading: boolean) => {
        if (isLoading) return
        if (authCookie) {
          socket.emit('joinRoom', {
            roomNum: params.roomId as string,
            nickName: authCookie.nickName,
          })
        }

        preload.startGame(authCookie?.nickName || '')

        const game = phaserGame.scene.keys.game as Game
        game.setupKeys()
        setIsGameStart(true)
      })

    return () => {
      phaserGame.scene
        .getScene('preload')
        .events.off('isPreloadComplete', (isLoading: boolean) => {
          if (isLoading) return
          if (authCookie) {
            socket.emit('joinRoom', {
              roomNum: params.roomId as string,
              nickName: authCookie.nickName,
            })
          }

          preload.startGame(authCookie?.nickName || '')

          const game = phaserGame.scene.keys.game as Game
          game.setupKeys()
          setIsGameStart(true)
        })
    }
  }, [preload])

  useEffect(() => {
    socket.on('roomMember', (members) => {
      console.log('roomMember :' + members)
      // otherPlayer에 기존 방의 멤버들을 추가해줘
      setUsers((pre) => [...pre, ...members])
    })

    socket.on('newMember', (member) => {
      console.log('newMember :' + member)
      // otherPlayer에 새로운 멤버를 추가해줘
      setUsers((pre) => [...pre, member])
    })
  }, [socket])

  useEffect(() => {
    if (!isGameStart) return
    if (users.length === 0) return
    const game = phaserGame.scene.keys.game as Game
    game.addOtherPlayer()
  }, [isGameStart, users])

  return (
    <div>
      <RoomTitle />
      <Chat authCookie={authCookie} socket={socket} />
      <ButtonContainer />
      <Alert />
    </div>
  )
}

export default Room
