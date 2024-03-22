import IconSound from '../../../../svgs/IconSound.svg?react'
import { PeerStreamType } from '../../../../types/client'

interface VideoMutedButtonProps {
  setPeerStreams: React.Dispatch<React.SetStateAction<PeerStreamType[]>>
  peerId: string
  sound?: boolean
}

function VideoMutedButton({
  setPeerStreams,
  peerId,
  sound,
}: VideoMutedButtonProps) {
  const updateMuteStatus = (id: string) => {
    setPeerStreams((prev) =>
      prev.map((stream) => {
        if (stream.peerId === id) {
          return { ...stream, sound: !stream.sound }
        }
        return stream
      }),
    )
  }
  return (
    <button
      onClick={() => updateMuteStatus(peerId)}
      className="absolute right-2 top-2 hidden rounded-full bg-black/70 p-1 group-hover:block"
    >
      <IconSound
        className={`size-4 ${sound ? 'text-green-500' : 'text-red-500'}`}
      />
    </button>
  )
}

export default VideoMutedButton
