import { IconSound } from '../../../../../svgs'
import { updatePeerStreamSound } from '../../../../store/features/myStreamSlice'
import { useAppDispatch } from '../../../../store/store'

interface VideoMutedButtonProps {
  peerId: string
  sound?: boolean
}

function VideoMutedButton({ peerId, sound }: VideoMutedButtonProps) {
  const dispatch = useAppDispatch()
  const updateMuteStatus = () => {
    dispatch(updatePeerStreamSound(peerId))
  }

  return (
    <button
      onClick={updateMuteStatus}
      className="absolute right-2 top-2 hidden rounded-full bg-black/70 p-1 group-hover:block"
    >
      <IconSound
        className={`size-4 ${sound ? 'text-green-500' : 'text-red-500'}`}
      />
    </button>
  )
}

export default VideoMutedButton
