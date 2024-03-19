import { PeerStreamType } from '../../../types/client'
import VideoPlayer from './VideoPlayer'

interface CurrentStreamScreenProps {
  currentStream: PeerStreamType | null
}

function CurrentStreamScreen({ currentStream }: CurrentStreamScreenProps) {
  if (!currentStream) return
  return (
    <div className="mx-auto mb-4 h-[400px] w-[600px] overflow-hidden rounded-md">
      <VideoPlayer videoStream={currentStream} />
    </div>
  )
}

export default CurrentStreamScreen
