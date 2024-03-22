import { PeerStreamType } from '../../../../types/client'
import VideoStreamerName from './VideoStreamerName'
import VideoMutedButton from './VideoMutedButton'
import VideoStream from './VideoStream'

interface OtherVideoStreamProps {
  peerStream: PeerStreamType
  currentStream: PeerStreamType | null
  changeCurrentStreamer: (peerStream: PeerStreamType) => void
  setPeerStreams: React.Dispatch<React.SetStateAction<PeerStreamType[]>>
}

function OtherVideoStream({
  peerStream,
  currentStream,
  changeCurrentStreamer,
  setPeerStreams,
}: OtherVideoStreamProps) {
  return (
    <div className="group relative">
      <VideoStream
        stream={peerStream}
        currentStream={currentStream}
        changeCurrentStreamer={changeCurrentStreamer}
      />
      <VideoStreamerName nickName={peerStream.nickName} />
      <VideoMutedButton
        peerId={peerStream.peerId}
        sound={peerStream.sound}
        setPeerStreams={setPeerStreams}
      />
    </div>
  )
}

export default OtherVideoStream
