import { IconCam, IconChat, IconMic } from '@assets/svgs'
import { ToolTip } from 'ventileco-ui'
import { useScene } from '@providers/SceneProvider'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { useParams } from 'react-router-dom'
import { useSingleRoomQuery } from '@hooks/queries/roomsQueries'
import { AnimatePresence, motion as m } from 'motion/react'
import ChatList from './Chat/ChatList'
import ChatInput from './Chat/ChatInput'
import slide from '@components/Animation/motions/slide'

function Controller() {
  const { id: roomId } = useParams()

  const gameScene = useScene()

  const player = gameScene.player

  const inputRef = useRef<HTMLInputElement>(null)

  const [showChat, setShowChat] = useState(true)

  const { data: room } = useSingleRoomQuery(roomId as string)

  const isEnabled = useSyncExternalStore(
    (cb) => player.subscribe(cb),
    () => player.isEnabled,
  )

  useEffect(() => {
    const onFocusChat = () => {
      setShowChat(true)
      inputRef.current?.focus()
      event?.preventDefault()
      gameScene.disableKeys()
    }

    gameScene.events.on('onFocusChat', onFocusChat)

    return () => {
      gameScene.events.off('onFocusChat', onFocusChat)
    }
  }, [])

  return (
    <div className="fixed bottom-5 left-[50%] flex h-[64px] w-[380px] translate-x-[-50%] items-center justify-between rounded-md bg-white/30 py-2 text-body2 shadow-md">
      <AnimatePresence>
        {showChat && (
          <m.div
            {...slide({ distance: 20, isFade: true }).inY}
            className="absolute top-[-158px] flex h-[150px] w-[380px] flex-col justify-between rounded-md bg-white/30 text-body2 shadow-md"
          >
            <ChatList />
            <ChatInput inputRef={inputRef} />
          </m.div>
        )}
      </AnimatePresence>

      <div className="flex w-full items-center justify-between px-4 py-2">
        <div className="select-none">
          <p className="text-subtitle1">{player.nickname.text}</p>
          <p className="text-body2">{room?.isHost ? '방장' : '게스트'}</p>
        </div>

        <div className="flex gap-2">
          <ToolTip direction="top" enterDelay={1000}>
            <ToolTip.Trigger>
              <button
                onClick={() => setShowChat((prev) => !prev)}
                className={`flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 ${showChat ? 'text-white' : 'text-white/40'}`}
              >
                <IconChat className="size-4" />
              </button>
            </ToolTip.Trigger>
            <ToolTip.Content>
              <div className="rounded bg-white px-2 py-1 text-caption">
                채팅
              </div>
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
    </div>
  )
}

export default Controller
