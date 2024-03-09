import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import phaserGame from '../PhaserGame'
import Game from '../scenes/Game'
import Chat from '../components/Chat/Chat'
import RoomTitle from '../components/RoomTitle'
import Alert from '../components/Alert/Alert'
import { getAuthCookie } from '../utils/cookie'
import ButtonContainer from '../components/ButtonContainer'
import VideoModal from '../components/Modals/VideoModal/VideoModal'
import CreatorModal from '../components/Modals/CreatorModal/CreatorModal'
import ManualModal from '../components/Modals/ManualModal/ManualModal'

function Room() {
  const params = useParams()
  const authCookie = getAuthCookie(params.roomId as string)
  const [game, setGame] = useState<Game | null>(null)

  useEffect(() => {
    setGame(phaserGame.scene.keys.game as Game)
  }, [])

  useEffect(() => {
    if (!game) return
    if (!authCookie) return

    const joinRoom = () => {
      game.joinRoom({
        roomNum: params.roomId as string,
        authCookie,
        avatarTexture: authCookie.role === 'admin' ? 'conference' : 'bob',
      })
    }

    if (game.isCreate) {
      joinRoom()
    } else {
      phaserGame.scene.getScene('game').events.on('createGame', () => {
        joinRoom()
      })
    }

    return () => {
      phaserGame.scene.getScene('game').events.off('createGame', () => {
        joinRoom()
      })
    }
  }, [game])

  return (
    <div>
      <RoomTitle />
      <Chat authCookie={authCookie} />
      <ButtonContainer />
      <Alert />
      <CreatorModal />
      <ManualModal />
      {authCookie && <VideoModal authCookie={authCookie} />}
    </div>
  )
}

export default Room
