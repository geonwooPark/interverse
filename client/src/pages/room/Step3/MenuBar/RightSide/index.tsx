import { IconLink, IconOff } from '@assets/svgs'
import ConfirmModal from '@components/ConfirmModal'
import useModals from '@hooks/useModals'
import {
  changeAlertContent,
  closeAlert,
  openAlert,
} from '@store/features/alertSlice'
import { useAppDispatch } from '@store/store'
import UserList from './UserList'

function RightSide() {
  const dispatch = useAppDispatch()

  const { modals, addModal, removeModal } = useModals()

  const onLinkClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    ;(event.target as HTMLButtonElement).blur()
    navigator.clipboard.writeText(window.location.href)

    dispatch(openAlert())
    dispatch(changeAlertContent('복사 완료! 링크를 공유하여 초대하세요.'))

    setTimeout(() => {
      dispatch(closeAlert())
    }, 5000)
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
