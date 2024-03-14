import { CurrentStream } from '../../../../../types/client'
import VideoPlayer from './VideoPlayer'

interface CurrentStreamScreenProps {
  currentStream?: CurrentStream
  stream?: MediaStream
}

function CurrentStreamScreen({
  currentStream,
  stream,
}: CurrentStreamScreenProps) {
  return (
    <>
      {stream && (
        <div className="mx-auto mb-4 h-[400px] w-[600px] overflow-hidden rounded-md">
          <VideoPlayer stream={currentStream?.stream || stream} />
        </div>
      )}
    </>
  )
}

export default CurrentStreamScreen
