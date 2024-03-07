import { useAppSelector } from '../../../store/store'
import VideoContainer from './VideoContainer'

function VideoModal() {
  const { isOpen, member } = useAppSelector((state) => state.videoMember)

  if (!isOpen) return

  return (
    <div className="fixed inset-0 z-[100] flex h-screen w-screen items-center justify-center bg-black/70  font-neodgm">
      <div onClick={(e) => e.stopPropagation()}>
        <VideoContainer member={member} />
      </div>
    </div>
  )
}

export default VideoModal
