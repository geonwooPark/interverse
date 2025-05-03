import Alert from './Alert'
import MenuBar from './MenuBar'
import Modals from './Modals'
import useMediaPermissions from '@hooks/useMediaPermissions'
import ConfirmModal from '@components/ConfirmModal'
import { useModal } from '@providers/ModalProvider'
import Controller from './Controller'

export default function Step3() {
  const { addModal, removeModal } = useModal()

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

  return (
    <>
      <MenuBar />
      <Controller />
      <Alert />
      <Modals />
    </>
  )
}
