import { useEffect } from 'react'
import { ws } from '../../../lib/ws'
import { me } from '../../../lib/peer'
import VideoPlayerList from './VideoPlayerList/VideoPlayerList'
import CurrentStreamScreen from './CurrentStreamScreen'
import { useVideoStream } from '../../../hooks/useVideoStream'
import { MediaConnection } from 'peerjs'
import { CookieType } from '../../../types/client'
import { useAppDispatch } from '../../../store/store'
import { addPeerStream } from '../../../store/features/myStreamSlice'

interface VideoContainerProps {
  authCookie: CookieType
}

function VideoContainer({ authCookie }: VideoContainerProps) {
  const dispatch = useAppDispatch()
  const { myStream, peerStreams, currentStream, controller } =
    useVideoStream(authCookie)
  const { stream } = myStream

  useEffect(() => {
    if (!me.peer) return
    if (!stream) return

    ws.joinVideoRoom({ authCookie, video: controller.video })
    ws.socket.on('serverJoinVideoRoom', (newUser) => {
      // 기존 멤버들이 신규 멤버에게 call
      const call = me.peer.call(newUser.peerId, stream, {
        metadata: {
          nickName: authCookie.nickName,
          socketId: ws.socket.id,
          texture: authCookie.texture,
          isVideoEnabled: controller.video,
        },
      })
      // 기존 멤버에서 실행
      call.once('stream', (peerStream) => {
        dispatch(
          addPeerStream({
            peerId: newUser.peerId,
            nickName: newUser.nickName,
            socketId: newUser.socketId,
            texture: newUser.texture,
            isVideoEnabled: newUser.isVideoEnabled,
            stream: peerStream,
            sound: true,
          }),
        )
      })
    })

    const handleIncomingCall = (call: MediaConnection) => {
      const { nickName, socketId, texture, isVideoEnabled } = call.metadata
      // 전화에 응답
      call.answer(stream)
      // 새로운 멤버에서 실행
      call.once('stream', (peerStream) => {
        dispatch(
          addPeerStream({
            peerId: call.peer,
            nickName,
            socketId,
            texture,
            isVideoEnabled,
            stream: peerStream,
            sound: true,
          }),
        )
      })
    }

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

export default VideoContainer
