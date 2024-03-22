import { PeerStreamType } from '../../../../types/client'
import OtherVideoStream from './OtherVideoStream'
import VideoStream from './VideoStream'

interface VideoPlayerListProps {
  myStream: PeerStreamType
  peerStreams: PeerStreamType[]
  setPeerStreams: React.Dispatch<React.SetStateAction<PeerStreamType[]>>
  currentStream: PeerStreamType | null
  setCurrentStream: React.Dispatch<React.SetStateAction<PeerStreamType | null>>
}

function VideoPlayerList({
  myStream,
  peerStreams,
  setPeerStreams,
  currentStream,
  setCurrentStream,
}: VideoPlayerListProps) {
  const changeCurrentStreamer = (peerStream: PeerStreamType) => {
    setCurrentStream(peerStream)
  }

  return (
    <div className="hide-scroll mx-auto flex size-full flex-col items-end gap-2 self-start overflow-y-scroll p-4">
      <VideoStream
        stream={myStream}
        currentStream={currentStream}
        changeCurrentStreamer={changeCurrentStreamer}
      />
      {peerStreams.map((peerStream) => (
        <OtherVideoStream
          key={peerStream.peerId}
          peerStream={peerStream}
          changeCurrentStreamer={changeCurrentStreamer}
          currentStream={currentStream}
          setPeerStreams={setPeerStreams}
        />
      ))}
    </div>
  )
}

export default VideoPlayerList
