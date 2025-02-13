import { IconLink, IconOff } from '../../../../svgs'
import { useAuthContext } from '../../../routes/Room'
import {
  changeAlertContent,
  openAlert,
  closeAlert,
} from '../../../store/features/alertSlice'
import {
  changeModalContent,
  handleModal,
} from '../../../store/features/confirmModalSlice'
import { useAppDispatch } from '../../../store/store'
import ConnectedUserList from './ConnectedUserList'

function ButtonContainer() {
  const authCookie = useAuthContext()
  const dispatch = useAppDispatch()

  const onLinkClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    ;(event.target as HTMLButtonElement).blur()
    dispatch(changeAlertContent('복사 완료! 링크를 공유하여 초대하세요.'))
    dispatch(openAlert())
    navigator.clipboard.writeText(window.location.href)
    setTimeout(() => {
      dispatch(closeAlert())
    }, 5000)
  }

  const onOffClick = () => {
    dispatch(
      changeModalContent({
        title: '나가기',
        description: '정말 종료하시겠습니까?',
        action: () => {
          window.location.replace('/')
          dispatch(handleModal())
        },
        actionLabel: '종료',
      }),
    )
    dispatch(handleModal())
  }

  return (
    <div className="flex gap-3">
      <ConnectedUserList authCookie={authCookie} />
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
    </div>
  )
}

export default ButtonContainer
