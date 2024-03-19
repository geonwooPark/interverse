interface VideoStreamerNameProps {
  nickName: string
}

function VideoStreamerName({ nickName }: VideoStreamerNameProps) {
  return <p className={`text-center text-white`}>{nickName}</p>
}

export default VideoStreamerName
