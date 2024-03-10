import { useEffect, useRef } from 'react'

function VideoPlayer({ stream }: { stream: MediaStream }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!videoRef.current || !stream) return
    videoRef.current.srcObject = stream
  }, [stream])

  return (
    <video ref={videoRef} autoPlay muted className="size-full object-cover" />
  )
}

export default VideoPlayer
