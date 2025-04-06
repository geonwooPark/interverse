import { useAppDispatch, useAppSelector } from '@store/store'
import { IconCam, IconChat, IconMic } from '@assets/svgs'
import { useAuthCookie } from '@providers/AuthProvider'
import { toggleAudio, toggleVideo } from '@store/features/userSlice'

interface UserStatusProps {
  showChat: boolean
  setShowChat: React.Dispatch<React.SetStateAction<boolean>>
}

function UserStatus({ showChat, setShowChat }: UserStatusProps) {
  const authCookie = useAuthCookie()

  const dispatch = useAppDispatch()

  const user = useAppSelector((state) => state.avartar)

  const onChatClick = () => {
    setShowChat((prev) => !prev)
  }

  const onCamClick = () => {
    dispatch(toggleVideo())
  }

  const onMicClick = () => {
    dispatch(toggleAudio())
  }

  return (
    <div className="fixed bottom-5 left-[50%] flex h-[64px] w-[380px] translate-x-[-50%] items-center justify-between rounded-md bg-white/30 px-4 py-2 font-neodgm text-sm shadow-md">
      <div className="select-none">
        <p className="text-lg">{user.nickname}</p>
        <p className="text-sm">
          {authCookie?.role === 'host' ? '호스트' : '게스트'}
        </p>
      </div>

      <div className="flex gap-2">
        <div
          onClick={onChatClick}
          className={`flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 ${showChat ? 'text-white' : 'text-white/40'}`}
        >
          <IconChat className="size-4" />
        </div>

        <div
          onClick={onCamClick}
          className={`${user.isVideoEnabled ? 'text-green-500' : 'text-red-500'} flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60`}
        >
          <IconCam className="size-4" />
        </div>

        <div
          onClick={onMicClick}
          className={`${user.isAudioEnabled ? 'text-green-500' : 'text-red-500'} flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60`}
        >
          <IconMic className="size-4" />
        </div>
      </div>
    </div>
  )
}

export default UserStatus
