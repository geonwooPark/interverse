import { IconCam, IconChat, IconMic } from '@assets/svgs'
import { ToolTip } from 'ventileco-ui'
import { useScene } from '@providers/SceneProvider'
import { useSyncExternalStore } from 'react'

interface UserStatusProps {
  showChat: boolean
  handleChatBox: () => void
}

function UserStatus({ showChat, handleChatBox }: UserStatusProps) {
  const gameScene = useScene()

  const player = gameScene.player

  const isEnabled = useSyncExternalStore(
    (cb) => player.subscribe(cb),
    () => player.isEnabled,
  )

  return (
    <div className="fixed bottom-5 left-[50%] flex h-[64px] w-[380px] translate-x-[-50%] items-center justify-between rounded-md bg-white/30 px-4 py-2 font-neodgm text-body2 shadow-md">
      <div className="select-none">
        <p className="body1">{player.nickname.text}</p>
        <p className="text-body2">{'임시...'}</p>
      </div>

      <div className="flex gap-2">
        <ToolTip direction="top" enterDelay={1000}>
          <ToolTip.Trigger>
            <button
              onClick={handleChatBox}
              className={`flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 ${showChat ? 'text-white' : 'text-white/40'}`}
            >
              <IconChat className="size-4" />
            </button>
          </ToolTip.Trigger>
          <ToolTip.Content>
            <div className="rounded bg-white px-2 py-1 text-caption">채팅</div>
            <ToolTip.Triangle className="size-2.5 bg-white" />
          </ToolTip.Content>
        </ToolTip>

        <ToolTip direction="top" enterDelay={1000}>
          <ToolTip.Trigger>
            <button
              onClick={() => player.toggleVideo()}
              className={`${isEnabled.video ? 'text-green-500' : 'text-red-500'} flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60`}
            >
              <IconCam className="size-4" />
            </button>
          </ToolTip.Trigger>
          <ToolTip.Content>
            <div className="rounded bg-white px-2 py-1 text-caption">
              카메라
            </div>
            <ToolTip.Triangle className="size-2.5 bg-white" />
          </ToolTip.Content>
        </ToolTip>

        <ToolTip direction="top" enterDelay={1000}>
          <ToolTip.Trigger>
            <button
              onClick={() => player.toggleAudio()}
              className={`${isEnabled.audio ? 'text-green-500' : 'text-red-500'} flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60`}
            >
              <IconMic className="size-4" />
            </button>
          </ToolTip.Trigger>
          <ToolTip.Content>
            <div className="rounded bg-white px-2 py-1 text-caption">
              마이크
            </div>
            <ToolTip.Triangle className="size-2.5 bg-white" />
          </ToolTip.Content>
        </ToolTip>
      </div>
    </div>
  )
}

export default UserStatus
