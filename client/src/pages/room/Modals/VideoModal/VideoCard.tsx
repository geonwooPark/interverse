import { useEffect } from 'react'
import { ws } from '../../../lib/ws'
import { me } from '../../../lib/peer'
import VideoPlayerList from './VideoPlayerList/VideoPlayerList'
import CurrentStreamScreen from './CurrentStreamScreen'
import { useVideoStream } from '../../../hooks/useVideoStream'
import { MediaConnection } from 'peerjs'
import { useAuthContext } from '../../../routes/Room'

function VideoCard() {
  const authCookie = useAuthContext()
  const { myStream, peerStreams, currentStream, controller } =
    useVideoStream(authCookie)
  const { stream } = myStream

  useEffect(() => {
    if (!me.peer) return
    if (!stream) return

    const handleIncomingCall = (call: MediaConnection) => {
      ws.answerIncomingCall({ call, stream })
    }

    ws.joinVideoRoom({ authCookie, video: controller.video })
    ws.callToOtherPlayer({ authCookie, stream, video: controller.video })
    me.peer.on('call', handleIncomingCall)

    return () => {
      ws.socket.off('serverJoinVideoRoom')
      me.peer.off('call', handleIncomingCall)
    }
  }, [me.peer, stream, controller])

  return (
    <div className="grid size-full grid-cols-[3fr,1fr] items-center xl:grid-cols-5">
      <CurrentStreamScreen
        currentStream={currentStream.stream ? currentStream : myStream}
      />
      <VideoPlayerList
        myStream={myStream}
        peerStreams={peerStreams}
        currentStream={currentStream}
      />
    </div>
  )
}

export default VideoCard
