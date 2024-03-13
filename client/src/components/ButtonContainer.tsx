import { peer as me } from '../lib/peer'
import { socket } from '../lib/ws'
import {
  changeAlertContent,
  closeAlert,
  openAlert,
} from '../store/features/alertSlice'
import { changeModalContent } from '../store/features/modalContentSlice'
import { closeModal, openModal } from '../store/features/modalDisplaySlice'
import { handleStreaming } from '../store/features/screenStreamerSlice'
import { showVideoModal } from '../store/features/videoModalSlice'
import { useAppDispatch } from '../store/store'
import IconLink from '../svgs/IconLink.svg?react'
import IconOff from '../svgs/IconOff.svg?react'

function ButtonContainer() {
  const dispatch = useAppDispatch()

  const onScreenClick = () => {
    if (me.disconnected) {
      me.reconnect()
    }
    dispatch(showVideoModal(true))
    dispatch(handleStreaming(true))
  }

  const onVideoClick = () => {
    if (me.disconnected) {
      me.reconnect()
    }
    dispatch(showVideoModal(true))
  }

  const onLinkClick = () => {
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
          dispatch(closeModal())
        },
        actionLabel: '종료',
      }),
    )
    dispatch(openModal())
    socket.emit('clientLeaveRoom')
  }

  return (
    <div className="fixed right-8 top-4 flex gap-3">
      {/* <button
        onClick={onScreenClick}
        className="flex size-[50px] items-center justify-center rounded-full bg-purple-600 text-white duration-200 hover:bg-purple-700"
      >
        스크린
      </button>
      <button
        onClick={onVideoClick}
        className="flex size-[50px] items-center justify-center rounded-full bg-purple-600 text-white duration-200 hover:bg-purple-700"
      >
        비디오
      </button> */}
      <button
        onClick={onLinkClick}
        className="flex size-[40px] items-center justify-center rounded-full bg-purple-600 text-white duration-200 hover:bg-purple-700"
      >
        <IconLink className="size-5" />
      </button>
      <button
        onClick={onOffClick}
        className="flex size-[40px] items-center justify-center rounded-full bg-white text-red-600"
      >
        <IconOff className="size-5" />
      </button>
    </div>
  )
}

export default ButtonContainer
