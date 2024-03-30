import { setCurrentStream } from '../../../../store/features/myStreamSlice'
import { useAppDispatch } from '../../../../store/store'
import { PeerStreamType } from '../../../../types/client'
import OtherVideoStream from './OtherVideoStream'
import VideoStream from './VideoStream'

interface VideoPlayerListProps {
  myStream: PeerStreamType
  peerStreams: PeerStreamType[]
  currentStream: PeerStreamType | null
}

function VideoPlayerList({
  myStream,
  peerStreams,
  currentStream,
}: VideoPlayerListProps) {
  const dispatch = useAppDispatch()

  const changeCurrentStreamer = (peerStream: PeerStreamType) => {
    dispatch(setCurrentStream(peerStream))
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
          currentStream={currentStream}
          changeCurrentStreamer={changeCurrentStreamer}
        />
      ))}
    </div>
  )
}

export default VideoPlayerList
