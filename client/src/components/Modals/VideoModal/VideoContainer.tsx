import { useEffect } from 'react'
import { ws } from '../../../lib/ws'
import { peer as me } from '../../../lib/peer'
import VideoPlayerList from './VideoPlayerList/VideoPlayerList'
import CurrentStreamScreen from './CurrentStreamScreen'
import { useVideoStream } from '../../../hooks/useVideoStream'
import { MediaConnection } from 'peerjs'
import { CookieType } from '../../../types/client'

interface VideoContainerProps {
  authCookie: CookieType
}

function VideoContainer({ authCookie }: VideoContainerProps) {
  const {
    myStream,
    peerStreams,
    setPeerStreams,
    currentStream,
    setCurrentStream,
    controller,
  } = useVideoStream(authCookie)
  const { stream } = myStream

  useEffect(() => {
    if (!me) return
    if (!stream) return

    ws.socket.emit('clientCreateVideoRoom', authCookie.roomNum)
    ws.socket.emit('clientJoinVideoRoom', {
      roomNum: authCookie.roomNum,
      peerId: me.id,
      nickName: authCookie.nickName,
      texture: authCookie.texture,
      isVideoEnabled: controller.video,
    })

    ws.socket.on('serverJoinVideoRoom', (newUser) => {
      // 기존 멤버들이 신규 멤버에게 call
      const call = me.call(newUser.peerId, stream, {
        metadata: {
          nickName: authCookie.nickName,
          socketId: ws.socket.id,
          texture: authCookie.texture,
          isVideoEnabled: controller.video,
        },
      })
      // 기존 멤버에서 실행
      call.once('stream', (peerStream) => {
        setPeerStreams((prev) => [
          ...prev,
          {
            peerId: newUser.peerId,
            nickName: newUser.nickName,
            socketId: newUser.socketId,
            texture: newUser.texture,
            isVideoEnabled: newUser.isVideoEnabled,
            stream: peerStream,
            sound: true,
          },
        ])
      })
    })

    const handleIncomingCall = (call: MediaConnection) => {
      const { nickName, socketId, texture, isVideoEnabled } = call.metadata
      // 전화에 응답
      call.answer(stream)
      // 새로운 멤버에서 실행
      call.once('stream', (peerStream) => {
        setPeerStreams((prev) => [
          ...prev,
          {
            peerId: call.peer,
            nickName,
            socketId,
            texture,
            isVideoEnabled,
            stream: peerStream,
            sound: true,
          },
        ])
      })
    }

    me.on('call', handleIncomingCall)

    return () => {
      ws.socket.off('serverJoinVideoRoom')
      me.off('call', handleIncomingCall)
    }
  }, [me, stream, controller])

  if (!stream) return

  return (
    <div className="grid size-full grid-cols-[3fr,1fr] items-center xl:grid-cols-5">
      <CurrentStreamScreen currentStream={currentStream} />
      <VideoPlayerList
        myStream={myStream}
        peerStreams={peerStreams}
        setPeerStreams={setPeerStreams}
        currentStream={currentStream}
        setCurrentStream={setCurrentStream}
      />
    </div>
  )
}

export default VideoContainer
