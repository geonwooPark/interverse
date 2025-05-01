import { useScene } from '@providers/SceneProvider'
import { useSyncExternalStore } from 'react'
import VideoPlayer from './VideoPlayer'

interface VideoModalProps {
  hasDim?: boolean
}

function VideoModal({ hasDim }: VideoModalProps) {
  const gameScene = useScene()

  const VideoManager = gameScene.video

  const trackList = useSyncExternalStore(
    (callback) => VideoManager.subscribe(() => callback()),
    () => VideoManager.getState(),
  )

  return (
    <div className="fixed inset-0 z-[100] h-screen w-screen">
      {/* Dim */}
      {hasDim && <div className="size-full bg-black/30" />}

      {/* Modal */}
      <div className="absolute left-[50%] top-[50%] size-[80%] w-[90%] translate-x-[-50%] translate-y-[-50%] overflow-hidden rounded-xl bg-black">
        <div className="flex h-full">
          {/* 메인 화면 */}
          <div className="h-full flex-[3]"></div>

          {/* 리스트 */}
          <div className="grid h-full flex-[1] grid-cols-1 gap-2 overflow-scroll p-2">
            {trackList?.map((track, i) => (
              <VideoPlayer key={i} track={track} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoModal
