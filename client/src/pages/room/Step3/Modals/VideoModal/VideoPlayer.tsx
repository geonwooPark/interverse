import { useEffect, useRef } from 'react'
import { PeerStreamType } from '../../../../../../../types/client'
import { textureMap } from '@constants/index'

interface VideoPlayerProps {
  videoStream: PeerStreamType
}

function VideoPlayer({ videoStream }: VideoPlayerProps) {
  const { stream, isVideoEnabled, sound, texture } = videoStream
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!videoRef.current || !stream) return
    videoRef.current.srcObject = stream
    videoRef.current.muted = !sound
  }, [stream, sound])

  return (
    <div className="relative size-full">
      {isVideoEnabled || (
        <div className="absolute left-[50%] top-[50%] flex size-full translate-x-[-50%] translate-y-[-50%] items-center justify-center bg-white">
          <div
            className={`scale-120 h-[48px] w-[32px] bg-[64px] ${textureMap[texture]}`}
          />
        </div>
      )}
      <video ref={videoRef} autoPlay className="size-full object-cover" />
    </div>
  )
}

export default VideoPlayer
