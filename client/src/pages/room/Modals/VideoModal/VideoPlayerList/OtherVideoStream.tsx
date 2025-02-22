import { PeerStreamType } from '../../../../../../types/client'
import VideoStreamerName from './VideoStreamerName'
import VideoMutedButton from './VideoMutedButton'
import VideoStream from './VideoStream'

interface OtherVideoStreamProps {
  peerStream: PeerStreamType
  currentStream: PeerStreamType | null
  changeCurrentStreamer: (peerStream: PeerStreamType) => void
}

function OtherVideoStream({
  peerStream,
  currentStream,
  changeCurrentStreamer,
}: OtherVideoStreamProps) {
  return (
    <div className="group relative">
      <VideoStream
        stream={peerStream}
        currentStream={currentStream}
        changeCurrentStreamer={changeCurrentStreamer}
      />
      <VideoStreamerName nickname={peerStream.nickname} />
      <VideoMutedButton peerId={peerStream.peerId} sound={peerStream.sound} />
    </div>
  )
}

export default OtherVideoStream
