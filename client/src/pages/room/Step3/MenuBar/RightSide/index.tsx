import { IconLink, IconOff } from '@assets/svgs'
import ConfirmModal from '@components/ConfirmModal'
import useModals from '@hooks/useModals'
import UserList from './UserList'

function RightSide() {
  const { modals, addModal, removeModal } = useModals()

  const onLinkClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    ;(event.target as HTMLButtonElement).blur()
    navigator.clipboard.writeText(window.location.href)

    addModal(
      <ConfirmModal
        title="복사 완료"
        description="정말 종료하시겠습니까?"
        onClose={removeModal}
        onSubmit={() => {
          window.location.replace('/')
        }}
      />,
    )
  }

  const onOffClick = () => {
    addModal(
      <ConfirmModal
        title="나가기"
        description="정말 종료하시겠습니까?"
        onClose={removeModal}
        onSubmit={() => {
          window.location.replace('/')
        }}
      />,
    )
  }

  return (
    <div className="flex gap-3">
      <UserList />

      <button
        tabIndex={-1}
        onClick={onLinkClick}
        className="flex size-[40px] items-center justify-center rounded-full bg-purple-600 text-white duration-200 hover:bg-purple-700"
      >
        <IconLink className="size-5" />
      </button>

      <button
        tabIndex={-1}
        onClick={onOffClick}
        className="flex size-[40px] items-center justify-center rounded-full bg-white text-red-600"
      >
        <IconOff className="size-5" />
      </button>

      {modals}
    </div>
  )
}

export default RightSide
