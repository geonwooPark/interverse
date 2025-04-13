import { IconLink, IconOff } from '@assets/svgs'
import ConfirmModal from '@components/ConfirmModal'
import UserList from './UserList'
import { ToolTip } from 'ventileco-ui'
import { useModal } from '@providers/ModalProvider'

function RightSide() {
  const { addModal, removeModal } = useModal()

  const onLinkClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    ;(event.target as HTMLButtonElement).blur()
    navigator.clipboard.writeText(window.location.href)

    addModal(
      <ConfirmModal
        title="복사 완료"
        description={`링크가 성공적으로 복사되었습니다. \n
        팀원이나 참여자와 공유하여 함께하세요!`}
        onClose={removeModal}
        onSubmit={removeModal}
        hideLeftButton
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
    <div className="flex items-center gap-3">
      <UserList />

      <ToolTip direction="bottom" enterDelay={1000}>
        <ToolTip.Trigger>
          <button
            tabIndex={-1}
            onClick={onLinkClick}
            className="flex size-[40px] items-center justify-center rounded-full bg-cyan-500 text-white duration-200 hover:bg-cyan-600"
          >
            <IconLink className="size-5" />
          </button>
        </ToolTip.Trigger>
        <ToolTip.Content>
          <div className="rounded bg-white px-2 py-1 text-xs">공유</div>
          <ToolTip.Triangle className="size-2.5 bg-white" />
        </ToolTip.Content>
      </ToolTip>

      <ToolTip direction="bottom" enterDelay={1000}>
        <ToolTip.Trigger>
          <button
            tabIndex={-1}
            onClick={onOffClick}
            className="flex size-[40px] items-center justify-center rounded-full bg-white text-red-600"
          >
            <IconOff className="size-5" />
          </button>
        </ToolTip.Trigger>
        <ToolTip.Content>
          <div className="rounded bg-white px-2 py-1 text-xs">종료</div>
          <ToolTip.Triangle className="size-2.5 bg-white" />
        </ToolTip.Content>
      </ToolTip>
    </div>
  )
}

export default RightSide
