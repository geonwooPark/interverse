import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import phaserGame from '../PhaserGame'
import Game from '../scenes/Game'
import RoomTitle from '../components/RoomTitle'
import Alert from '../components/Alert/Alert'
import { getAuthCookie } from '../lib/cookie'
import ButtonContainer from '../components/ButtonContainer'
import VideoModal from '../components/Modals/VideoModal/VideoModal'
import CreatorModal from '../components/Modals/CreatorModal/CreatorModal'
import ManualModal from '../components/Modals/ManualModal/ManualModal'
import SurveyModal from '../components/Modals/SurveyModal/SurveyModal'
import { useAppDispatch } from '../store/store'
import { useGoBack } from '../hooks/useGoBack'
import Controller from '../components/Controller'
import { handleModal } from '../store/features/modalSlice'

function Room() {
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
    <div>
      <RoomTitle />
      <ButtonContainer />
      <Controller authCookie={authCookie} />
      <Alert />
      <CreatorModal />
      <ManualModal />
      <SurveyModal />
      {authCookie && <VideoModal authCookie={authCookie} />}
    </div>
  )
}

export default Room
