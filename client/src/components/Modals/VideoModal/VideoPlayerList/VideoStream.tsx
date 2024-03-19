import { PeerStreamType } from '../../../../types/client'
import VideoPlayer from '../VideoPlayer'

interface MyVideoStreamProps {
  stream: PeerStreamType
  currentStream: PeerStreamType | null
  changeCurrentStreamer: (peerStream: PeerStreamType) => void
}

function VideoStream({
  stream,
  currentStream,
  changeCurrentStreamer,
}: MyVideoStreamProps) {
  return (
    <div
      onClick={() => changeCurrentStreamer(stream)}
      className={`${stream.peerId === currentStream?.peerId ? 'border-purple-600' : 'border-transparent'} mb-1 h-[160px] w-[240px] cursor-pointer overflow-hidden rounded-md border-2`}
    >
      <VideoPlayer videoStream={stream} />
    </div>
  )
}

export default VideoStream
