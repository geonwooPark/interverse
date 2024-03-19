import { useEffect, useRef } from 'react'

interface TextureImageType {
  [key: string]: string
}

const textureImage: TextureImageType = {
  conference: `bg-[url("/assets/character/conference.png")]`,
  bob: `bg-[url("/assets/character/bob.png")]`,
  emma: `bg-[url("/assets/character/emma.png")]`,
} as const

interface VideoPlayerProps {
  stream: MediaStream
  audio?: boolean
  texture?: string
  video?: boolean
}

function VideoPlayer({ stream, audio, texture, video }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!videoRef.current || !stream) return
    videoRef.current.srcObject = stream
    videoRef.current.muted = !audio
  }, [stream, audio])

  return (
    <div className="relative size-full">
      {video || (
        <div className="absolute left-[50%] top-[50%] flex size-full translate-x-[-50%] translate-y-[-50%] items-center justify-center bg-white">
          <div
            className={`scale-120 h-[48px] w-[32px] bg-[64px] ${textureImage[texture as string]}`}
          />
        </div>
      )}
      <video ref={videoRef} autoPlay className="size-full object-cover" />
    </div>
  )
}

export default VideoPlayer
