import { useEffect, useState } from 'react'
import phaserGame from '../../PhaserGame'
import Alert from './Alert/Alert'
import { useBlockGoBack } from '../../hooks/useBlockGoBack'
import Controller from './Controller/Controller'
import DirectMessages from './DirectMessage/DirectMessages'
import MenuBar from './MenuBar'
import Game from '../../games/scenes/Game'
import useModals from '../../hooks/useModals'
import ConfirmModal from './Modals/ConfirmModal'
import { useAuthCookie } from '../../providers/AuthProvider'

function RoomPage() {
  const authCookie = useAuthCookie()

  const { modals, addModal, removeModal } = useModals()

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

  useBlockGoBack(() =>
    addModal(
      <ConfirmModal
        title="나가기"
        description="정말 종료하시겠습니까?"
        actionLabel="종료"
        onClose={removeModal}
        onSubmit={() => window.location.replace('/')}
      />,
    ),
  )

  return (
    <>
      <MenuBar />
      {/* <Controller />
      <Alert />
      <DirectMessages /> */}
      {modals}
    </>
  )
}

export default RoomPage
