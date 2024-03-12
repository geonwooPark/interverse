import IconCam from '../svgs/IconCam.svg?react'
import IconMic from '../svgs/IconMic.svg?react'
import IconChat from '../svgs/IconChat.svg?react'
import { CookieType } from '../types/client'

interface UserStatusProps {
  authCookie: CookieType | null
  showChat: boolean
  setShowChat: React.Dispatch<React.SetStateAction<boolean>>
}

function UserStatus({ authCookie, showChat, setShowChat }: UserStatusProps) {
  const role = authCookie?.role === 'host' ? '호스트' : '게스트'

  const onChatClick = () => {
    setShowChat((prev) => !prev)
  }
  const onCamClick = () => {}
  const onMicClick = () => {}

  return (
    <div className="font-neodgm flex h-[64px] w-[380px] items-center justify-between rounded-md bg-white/30 px-4 py-2 text-sm shadow-md">
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
          className={`flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white/40`}
        >
          <IconCam className="size-4" />
        </div>
        <div
          onClick={onMicClick}
          className={`flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white/40`}
        >
          <IconMic className="size-4" />
        </div>
      </div>
    </div>
  )
}

export default UserStatus
