import { PeerStreamType } from '../../../../types/client'
import VideoPlayer from '../VideoPlayer'

interface VideoStreamProps {
  stream: PeerStreamType
  currentStream: PeerStreamType | null
  changeCurrentStreamer: (peerStream: PeerStreamType) => void
}

function VideoStream({
  stream,
  currentStream,
  changeCurrentStreamer,
}: VideoStreamProps) {
  return (
    <div
      onClick={() => changeCurrentStreamer(stream)}
      className={`${stream.peerId === currentStream?.peerId ? 'border-purple-600' : 'border-transparent'}  aspect-[3/2] w-[200px] shrink-0 cursor-pointer overflow-hidden rounded-md border-2 [&>div>video]:cursor-pointer`}
    >
      <VideoPlayer videoStream={stream} />
    </div>
  )
}

export default VideoStream
