import { useAppSelector } from '../../../store/store'
import { socket as ws } from '../../../lib/ws'
import { CookieType } from '../../../types/client'
import VideoContainer from './VideoContainer'

interface VideoModalProps {
  authCookie: CookieType
}

function VideoModal({ authCookie }: VideoModalProps) {
  const { isOpen } = useAppSelector((state) => state.videoModal)

  const onClick = () => {
    ws.emit('clientLeaveVideoRoom', authCookie.roomNum)
  }

  if (!isOpen) return

  return (
    <div className="fixed inset-0 z-[100] flex h-screen w-screen items-center justify-center bg-black/70 font-neodgm">
      <div onClick={(e) => e.stopPropagation()}>
        <VideoContainer authCookie={authCookie} />
        <button onClick={onClick}>나가기</button>
      </div>
    </div>
  )
}

export default VideoModal
