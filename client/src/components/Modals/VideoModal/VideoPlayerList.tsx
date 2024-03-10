import { CurrentStream, PeerStreamType } from '../../../types/client'
import VideoPlayer from './VideoPlayer'

interface VideoPlayerListProps {
  peerStreams: PeerStreamType[]
  currentStream?: CurrentStream
  setCurrentStream: React.Dispatch<
    React.SetStateAction<CurrentStream | undefined>
  >
}

function VideoPlayerList({
  peerStreams,
  currentStream,
  setCurrentStream,
}: VideoPlayerListProps) {
  const changeCurrentStreamer = (peerStream: PeerStreamType) => {
    setCurrentStream({
      peerId: peerStream.peerId,
      stream: peerStream.stream,
    })
  }

  return (
    <div className="mx-auto flex w-full justify-center gap-4">
      {peerStreams.map((peerStream, i) => (
        <div key={i}>
          <div
            onClick={() => changeCurrentStreamer(peerStream)}
            className={`${peerStream.peerId === currentStream?.peerId ? 'border-purple-600' : 'border-transparent'} mb-1 h-[160px] w-[240px] cursor-pointer overflow-hidden rounded-md border-2`}
          >
            <VideoPlayer stream={peerStream.stream} />
          </div>
          <p className="text-center text-white">{peerStream.nickName}</p>
        </div>
      ))}
    </div>
  )
}

export default VideoPlayerList
