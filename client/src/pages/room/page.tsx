import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import phaserGame from '../../PhaserGame'
import Game from '../../scenes/Game'
import Alert from '../../components/Alert/Alert'
import { getAuthCookie } from '../../lib/cookie'
import { useAppDispatch } from '../../store/store'
import { useGoBack } from '../../hooks/useGoBack'
import Controller from '../../components/Controller/Controller'
import { handleModal } from '../../store/features/confirmModalSlice'
import DirectMessages from '../../components/DirectMessage/DirectMessages'
import Modals from '../../components/Modals/Modals'
import { CookieType } from '../../../../types/client'
import { _createContext } from '../../utils/_createContext'
import MenuBar from '../../components/MenuBar/MenuBar'

type AuthContextState = CookieType

export const [useAuthContext, AuthProvider] = _createContext<AuthContextState>()

function RoomPage() {
  const params = useParams()
  const { roomId } = params
  const authCookie = getAuthCookie(roomId as string)
  const dispatch = useAppDispatch()
  const [game, setGame] = useState<Game | null>(null)

  useEffect(() => {
    setGame(phaserGame.scene.keys.game as Game)
  }, [])

  useEffect(() => {
    if (!game) return
    if (!authCookie) return

    const joinRoom = () => {
      game.joinRoom({
        authCookie,
      })
    }

    if (game.isCreate) {
      joinRoom()
    } else {
      phaserGame.scene.getScene('game').events.on('createGame', joinRoom)
    }

    return () => {
      phaserGame.scene.getScene('game').events.off('createGame', joinRoom)
    }
  }, [game])

  useGoBack({
    title: '나가기',
    description: '정말 종료하시겠습니까?',
    action: () => {
      window.location.replace('/')
      dispatch(handleModal())
    },
    actionLabel: '종료',
  })

  return (
    <AuthProvider value={authCookie}>
      <MenuBar />
      <Controller />
      <Alert />
      <Modals />
      <DirectMessages />
    </AuthProvider>
  )
}

export default RoomPage
