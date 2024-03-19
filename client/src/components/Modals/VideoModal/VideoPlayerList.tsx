import VideoPlayer from './VideoPlayer'
import IconSound from '../../../svgs/IconSound.svg?react'
import { peer as me } from '../../../lib/peer'
import { CurrentStream, PeerStreamType } from '../../../types/client'

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
    const { peerId, stream, texture, video } = peerStream
    setCurrentStream({
      peerId,
      stream,
      texture,
      video,
    })
  }

  const updateMuteStatus = (id: string) => {
    setPeerStreams((prev) =>
      prev.map((stream) => {
        if (stream.peerId === id) {
          return { ...stream, audio: !stream.audio }
        }
        return stream
      }),
    )
  }

  return (
    <div className="mx-auto flex w-full justify-center gap-4">
      {peerStreams.map((peerStream) => (
        <div key={peerStream.peerId} className="relative">
          <div
            onClick={() => changeCurrentStreamer(peerStream)}
            className={`${peerStream.peerId === currentStream?.peerId ? 'border-purple-600' : 'border-transparent'} mb-1 h-[160px] w-[240px] cursor-pointer overflow-hidden rounded-md border-2 [&>div]:cursor-pointer`}
          >
            <VideoPlayer
              stream={peerStream.stream}
              audio={peerStream.audio}
              texture={peerStream.texture}
              video={peerStream.video}
            />
          </div>
          <p className={`text-center text-white`}>{peerStream.nickName}</p>
          {peerStream.peerId !== me.id && (
            <button
              onClick={() => updateMuteStatus(peerStream.peerId)}
              className="absolute right-2 top-2 rounded-full bg-black/70 p-1"
            >
              <IconSound
                className={`size-4 ${peerStream.audio ? 'text-green-500' : 'text-red-500'}`}
              />
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

export default VideoPlayerList
