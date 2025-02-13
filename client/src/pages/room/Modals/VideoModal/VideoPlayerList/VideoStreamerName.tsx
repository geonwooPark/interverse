interface VideoStreamerNameProps {
  nickName: string
}

function VideoStreamerName({ nickName }: VideoStreamerNameProps) {
  return (
    <p
      className={`absolute bottom-2 left-2 min-w-10 rounded-full bg-black/70 px-1 text-center text-xs text-white`}
    >
      {nickName}
    </p>
  )
}

export default VideoStreamerName
