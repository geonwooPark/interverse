import { PeerStreamType } from '../../../types/client'
import VideoPlayer from './VideoPlayer'

interface CurrentStreamScreenProps {
  currentStream: PeerStreamType | null
}

function CurrentStreamScreen({ currentStream }: CurrentStreamScreenProps) {
  if (!currentStream) return
  return (
    <div className="mx-auto aspect-[3/2] w-[600px] shrink-0 overflow-hidden rounded-md xl:col-start-2 xl:col-end-5 xl:w-[750px]">
      <VideoPlayer videoStream={currentStream} />
    </div>
  )
}

export default CurrentStreamScreen
