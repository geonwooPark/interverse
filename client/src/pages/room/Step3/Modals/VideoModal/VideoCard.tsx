import { useScene } from '@providers/SceneProvider'
import { useSyncExternalStore } from 'react'
import VideoPlayer from './VideoPlayer'

function VideoCard() {
  const gameScene = useScene()

  const VideoManager = gameScene.video

  const trackList = useSyncExternalStore(
    (callback) => VideoManager.subscribe(() => callback()),
    () => VideoManager.getState(),
  )

  return (
    <div className="size-[80%] rounded-xl bg-white">
      <div id="video-container">
        {trackList.map((track, i) => (
          <VideoPlayer key={i} track={track} />
        ))}
      </div>
    </div>
  )
}

export default VideoCard
