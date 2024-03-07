import { useEffect, useRef } from 'react'

function VideoPlayer({ stream }: { stream: MediaStream }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!videoRef.current || !stream) return
    videoRef.current.srcObject = stream
  }, [stream])

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      className="h-[160px] w-[240px] rounded-md"
    />
  )
}

export default VideoPlayer
