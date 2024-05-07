import { useAppSelector } from '../../../store/store'
import { CookieType } from '../../../../../types/client'
import VideoContainer from './VideoContainer'
import ModalBackdrop from '../ModalBackdrop'

interface VideoModalProps {
  authCookie: CookieType
}

function VideoModal({ authCookie }: VideoModalProps) {
  const { isOpen } = useAppSelector((state) => state.videoModal)

  if (!isOpen) return

  return (
    <ModalBackdrop>
      <VideoContainer authCookie={authCookie} />
    </ModalBackdrop>
  )
}

export default VideoModal
