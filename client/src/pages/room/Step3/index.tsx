import { useLayoutEffect } from 'react'
import Alert from './Alert'
import Controller from './Controller'
import MenuBar from './MenuBar'
import { useAuthCookie } from '@providers/AuthProvider'
import Modals from './Modals/Modals'
import { useScene } from '@providers/SceneProvider'
import DMList from './DirectMessage/DMList'
import useMediaPermissions from '@hooks/useMediaPermissions'
import useModals from '@hooks/useModals'
import ConfirmModal from '@components/ConfirmModal'

export default function Step3() {
  const authCookie = useAuthCookie()

  const gameScene = useScene()

  const { modals, addModal, removeModal } = useModals()

  // 게임 입장
  useLayoutEffect(() => {
    if (!authCookie) return

    gameScene.joinRoom(authCookie.roomNum)
  }, [])

  // 권한
  useMediaPermissions({
    fallback: () =>
      addModal(
        <ConfirmModal
          title="카메라, 마이크 권한"
          description="화상 채팅 서비스를 이용하시려면 카메라 및 마이크 접근 권한이 필요합니다. 원활한 사용을 위해 접근을 허용해 주세요."
          onClose={removeModal}
          onSubmit={removeModal}
          hideLeftButton
        />,
      ),
  })

  return (
    <>
      <MenuBar />
      <Controller />
      <Alert />
      <DMList />
      <Modals />
      {modals}
    </>
  )
}
