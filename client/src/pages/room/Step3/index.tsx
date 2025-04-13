import Alert from './Alert'
import Controller from './Controller'
import MenuBar from './MenuBar'
import Modals from './Modals/Modals'
import DMList from './DirectMessage/DMList'
import useMediaPermissions from '@hooks/useMediaPermissions'
import useModals from '@hooks/useModals'
import ConfirmModal from '@components/ConfirmModal'
import { useBlockGoBack } from '@hooks/useBlockGoBack'

export default function Step3() {
  const { modals, addModal, removeModal } = useModals()

  // 권한 받기
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

  // 뒤로가기 막기
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
      <DMList />
      <Modals />
      {modals}
    </>
  )
}
