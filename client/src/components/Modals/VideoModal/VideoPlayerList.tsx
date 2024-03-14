import { CurrentStream, PeerStreamType } from '../../../../../types/client'
import VideoPlayer from './VideoPlayer'
import IconSound from '../../../svgs/IconSound.svg?react'
import { peer as me } from '../../../lib/peer'

interface VideoPlayerListProps {
  peerStreams: PeerStreamType[]
  setPeerStreams: React.Dispatch<React.SetStateAction<PeerStreamType[]>>
  currentStream?: CurrentStream
  setCurrentStream: React.Dispatch<
    React.SetStateAction<CurrentStream | undefined>
  >
}

function VideoPlayerList({
  peerStreams,
  setPeerStreams,
  currentStream,
  setCurrentStream,
}: VideoPlayerListProps) {
  const changeCurrentStreamer = (peerStream: PeerStreamType) => {
    setCurrentStream({
      peerId: peerStream.peerId,
      stream: peerStream.stream,
    })
  }

  const updateMuteStatus = (id: string) => {
    const changedPeerStreams = peerStreams.map((stream) => {
      if (stream.peerId === id) {
        return { ...stream, audio: !stream.audio }
      }
      return stream
    })
    setPeerStreams(changedPeerStreams)
  }

  return (
    <div className="mx-auto flex w-full justify-center gap-4">
      {peerStreams.map((peerStream) => (
        <div key={peerStream.peerId}>
          <div
            onClick={() => changeCurrentStreamer(peerStream)}
            className={`${peerStream.peerId === currentStream?.peerId ? 'border-purple-600' : 'border-transparent'} mb-1 h-[160px] w-[240px] cursor-pointer overflow-hidden rounded-md border-2`}
          >
            <VideoPlayer stream={peerStream.stream} audio={peerStream.audio} />
          </div>
          <div className="flex items-center justify-center gap-2 text-white">
            <p className={`text-center`}>{peerStream.nickName}</p>
            {peerStream.peerId !== me.id && (
              <button onClick={() => updateMuteStatus(peerStream.peerId)}>
                <IconSound
                  className={`size-5 ${peerStream.audio ? 'text-green-500' : 'text-red-500'}`}
                />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default VideoPlayerList
