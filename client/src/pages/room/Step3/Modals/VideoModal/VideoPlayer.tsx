import { useEffect, useRef } from 'react'

interface VideoPlayerProps {
  track: MediaStreamTrack
}

function VideoPlayer({ track }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!videoRef.current || !track) return

    const stream = new MediaStream([track])
    videoRef.current.srcObject = stream
    videoRef.current.muted = false
    videoRef.current.autoplay = true
    videoRef.current.playsInline = true
  }, [track])

  return (
    <video
      ref={videoRef}
      autoPlay
      className="h-[240px] w-[360px] bg-black object-cover"
    />
  )
}

export default VideoPlayer
