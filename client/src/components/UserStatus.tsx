import IconCam from '../svgs/IconCam.svg?react'
import IconMic from '../svgs/IconMic.svg?react'
import IconChat from '../svgs/IconChat.svg?react'
import { CookieType } from '../../../types/client'
import { useAppDispatch, useAppSelector } from '../store/store'
import {
  controlStream,
  handleAudio,
  handleVideo,
} from '../store/features/myStreamSlice'

interface UserStatusProps {
  authCookie: CookieType | null
  showChat: boolean
  setShowChat: React.Dispatch<React.SetStateAction<boolean>>
}

function UserStatus({ authCookie, showChat, setShowChat }: UserStatusProps) {
  const role = authCookie?.role === 'host' ? '호스트' : '게스트'
  const dispatch = useAppDispatch()
  const { controller } = useAppSelector((state) => state.myStream)

  const onChatClick = () => {
    setShowChat((prev) => !prev)
  }
  const onCamClick = () => {
    dispatch(controlStream('video'))
    dispatch(handleVideo())
  }
  const onMicClick = () => {
    dispatch(controlStream('audio'))
    dispatch(handleAudio())
  }

  return (
    <div className="flex h-[64px] w-[380px] items-center justify-between rounded-md bg-white/30 px-4 py-2 font-neodgm text-sm shadow-md">
      <div>
        <p className="title">{authCookie?.nickName}</p>
        <p className="description">{role}</p>
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
          className={`${controller.video ? 'text-green-500' : 'text-red-500'} flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60`}
        >
          <IconCam className="size-4" />
        </div>
        <div
          onClick={onMicClick}
          className={`${controller.audio ? 'text-green-500' : 'text-red-500'} flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60`}
        >
          <IconMic className="size-4" />
        </div>
      </div>
    </div>
  )
}

export default UserStatus
