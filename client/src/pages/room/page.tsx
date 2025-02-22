import { useEffect } from 'react'
import Alert from './Alert/Alert'
import { useBlockGoBack } from '../../hooks/useBlockGoBack'
import Controller from './Controller'
import DirectMessages from './DirectMessage/DirectMessages'
import MenuBar from './MenuBar'
import useModals from '../../hooks/useModals'
import { useAuthCookie } from '../../providers/AuthProvider'
import ConfirmModal from '../../components/ConfirmModal'
import GameSingleton from '../../PhaserGame'
import Game from '../../games/scenes/Game'

/**
 * 게임 룸 화면
 */
function RoomPage() {
  const authCookie = useAuthCookie()

  const { modals, addModal, removeModal } = useModals()

  // 게임 입장
  useEffect(() => {
    if (!authCookie) return

    const game = GameSingleton.getInstance()

    const gameScene = game.scene.getScene('game') as Game

    gameScene.initialize(authCookie.roomNum)
  }, [])

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
      <Controller />
      <Alert />
      <DirectMessages />
      {modals}
    </>
  )
}

export default RoomPage
