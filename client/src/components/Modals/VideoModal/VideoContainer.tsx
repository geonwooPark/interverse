import { useEffect, useState } from 'react'
import { socket as ws } from '../../../lib/ws'
import {
  CookieType,
  CurrentStream,
  PeerStreamType,
} from '../../../../../types/client'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import VideoPlayerList from './VideoPlayerList'
import CurrentStreamScreen from './CurrentStreamScreen'
import { getMedia, peer as me } from '../../../lib/peer'
import { showVideoModal } from '../../../store/features/videoModalSlice'
import { handleStreaming } from '../../../store/features/screenStreamerSlice'

interface VideoContainerProps {
  authCookie: CookieType
}

function VideoContainer({ authCookie }: VideoContainerProps) {
  const dispatch = useAppDispatch()

  const { isScreenStreaming } = useAppSelector((state) => state.screenStreamer)
  const [peerStreams, setPeerStreams] = useState<PeerStreamType[]>([])
  const [stream, setStream] = useState<MediaStream>()
  const [currentStream, setCurrentStream] = useState<CurrentStream>()

  useEffect(() => {
    try {
      getMedia(isScreenStreaming).then((stream) => {
        setStream(stream)
        setCurrentStream({
          peerId: me.id,
          stream,
        })
        setPeerStreams((prev) => [
          ...prev,
          {
            peerId: me.id,
            nickName: authCookie.nickName,
            socketId: ws.id as string,
            stream,
            audio: true,
          },
        ])
      })
    } catch (error) {
      if (error instanceof Error) {
        alert('카메라와 마이크를 찾을 수 없거나 권한이 차단 되어있어요!')
      }
    }

    ws.on('serverCreateVideoRoom', (roomNum) => {
      console.log(`비디오 방 ${roomNum} 생성`)
    })
    ws.on('serverUpdateVideoRoomMember', (socketId: string) => {
      setPeerStreams((prev) => prev.filter((r) => r.socketId !== socketId))
    })
    ws.on('serverLeaveVideoRoom', () => {
      me.disconnect()
      dispatch(showVideoModal(false))
      dispatch(handleStreaming(false))
    })

    return () => {
      ws.off('serverCreateVideoRoom')
      ws.off('serverLeaveVideoRoom')
      ws.off('serverUpdateVideoRoomMember')
    }
  }, [])

  useEffect(() => {
    if (!me) return
    if (!stream) return

    ws.emit('clientCreateVideoRoom', authCookie.roomNum)
    ws.emit('clientJoinVideoRoom', {
      roomNum: authCookie.roomNum,
      peerId: me.id,
      nickName: authCookie.nickName,
    })

    ws.on('serverJoinVideoRoom', (user) => {
      const { peerId, nickName, socketId } = user
      // 기존 멤버들이 신규 멤버에게 call
      const call = me.call(user.peerId, stream, {
        metadata: {
          nickName: authCookie.nickName,
          socketId: ws.id,
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
            audio: true,
          },
        ])
      })
    })

    // 전화를 걸 때 발생
    me.on('call', (call) => {
      const { nickName, socketId } = call.metadata
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
            audio: true,
          },
        ])
      })
    })

    return () => {
      ws.off('serverJoinVideoRoom')
    }
  }, [me, stream])

  return (
    <div>
      <CurrentStreamScreen currentStream={currentStream} stream={stream} />
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
