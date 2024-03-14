import { useEffect, useRef } from 'react'

interface VideoPlayerProps {
  stream: MediaStream
  audio?: boolean
}

function VideoPlayer({ stream, audio }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!videoRef.current || !stream) return
    videoRef.current.srcObject = stream
    videoRef.current.muted = !audio
  }, [stream, audio])

  return <video ref={videoRef} autoPlay className="size-full object-cover" />
}

export default VideoPlayer
