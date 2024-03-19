import { useEffect } from 'react'
import { peer as me } from '../../../lib/peer'
import VideoPlayerList from './VideoPlayerList'
import CurrentStreamScreen from './CurrentStreamScreen'
import { useVideoStream } from '../../../hooks/useVideoStream'
import { MediaConnection } from 'peerjs'
import { CookieType } from '../../../types/client'
import { ws } from '../../../lib/ws'

interface VideoContainerProps {
  authCookie: CookieType
}

function VideoContainer({ authCookie }: VideoContainerProps) {
  const {
    stream,
    peerStreams,
    setPeerStreams,
    currentStream,
    setCurrentStream,
    isJoined,
    setIsJoined,
    controller,
  } = useVideoStream(authCookie)

  useEffect(() => {
    if (isJoined) return
    ws.socket.emit('clientCreateVideoRoom', authCookie.roomNum)
    ws.socket.emit('clientJoinVideoRoom', {
      roomNum: authCookie.roomNum,
      peerId: me.id,
      nickName: authCookie.nickName,
      texture: authCookie.texture,
      video: controller.video,
    })
    setIsJoined(true)
  }, [isJoined])

  useEffect(() => {
    if (!me) return
    if (!stream) return

    ws.socket.on('serverJoinVideoRoom', (user) => {
      const { peerId, nickName, socketId, texture, video } = user

      // 기존 멤버들이 신규 멤버에게 call
      const call = me.call(user.peerId, stream, {
        metadata: {
          nickName: authCookie.nickName,
          socketId: ws.socket.id,
          texture: authCookie.texture,
          video: controller.video,
        },
      })
      // 기존 멤버에서 실행
      call.once('stream', (peerStream) => {
        setPeerStreams((prev) => [
          ...prev,
          {
            peerId,
            nickName,
            socketId,
            stream: peerStream,
            video,
            audio: true,
            texture,
          },
        ])
      })
    })

    const handleIncomingCall = (call: MediaConnection) => {
      const { nickName, socketId, texture, video } = call.metadata
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
            stream: peerStream,
            video,
            audio: true,
            texture,
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

  return (
    <div>
      {stream && (
        <CurrentStreamScreen currentStream={currentStream} stream={stream} />
      )}
      <VideoPlayerList
        peerStreams={peerStreams}
        setPeerStreams={setPeerStreams}
        currentStream={currentStream}
        setCurrentStream={setCurrentStream}
      />
    </div>
  )
}

export default VideoContainer
