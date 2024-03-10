import { useEffect, useState } from 'react'
import VideoPlayer from './VideoPlayer'
import { socket as ws } from '../../../lib/ws'
import { CookieType } from '../../../types/client'
import Peer from 'peerjs'
import { useAppSelector } from '../../../store/store'

interface VideoContainerProps {
  authCookie: CookieType
}

interface PeerStreamType {
  peerId: string
  socketId: string
  nickName: string
  stream: MediaStream
}

function VideoContainer({ authCookie }: VideoContainerProps) {
  const [me, setMe] = useState<Peer>()
  const [peerStreams, setPeerStreams] = useState<PeerStreamType[]>([])
  const [stream, setStream] = useState<MediaStream>()
  const { isStreaming } = useAppSelector((state) => state.screenStreamer)

  useEffect(() => {
    // 서버 따로 만들기
    const peer = new Peer({
      host: 'localhost',
      port: 9000,
      path: '/myapp',
    })
    setMe(peer)

    if (isStreaming) {
      navigator.mediaDevices
        .getDisplayMedia({
          video: true,
          audio: false,
        })
        .then((screenStream) => {
          setStream(screenStream)
        })
    } else {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setStream(stream)
        })
    }

    ws.on('createVideoRoom', () => {
      // console.log('비디오 방 생성')
    })
    ws.on('getUsers', (users) => {
      console.log(users)
    })
    ws.on('leaveVideoRoom', (socketId: string) => {
      setPeerStreams((prev) => prev.filter((r) => r.socketId !== socketId))
    })

    return () => {
      ws.off('createVideoRoom')
      ws.off('getUsers')
      ws.off('leaveVideoRoom')
    }
  }, [])

  useEffect(() => {
    if (!me) return
    if (!stream) return

    ws.emit('createVideoRoom', authCookie.roomNum)
    ws.emit('joinVideoRoom', {
      roomNum: authCookie.roomNum,
      peerId: me.id,
      nickName: authCookie.nickName,
    })

    ws.on('joinedUsers', (user) => {
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
          },
        ])
      })
    })

    return () => {
      ws.off('joinedUsers')
    }
  }, [me, stream])

  return (
    <div>
      <div className="flex gap-4">
        {stream && (
          <div>
            <VideoPlayer stream={stream} />
            <p className="text-white">내화면</p>
          </div>
        )}
        {peerStreams.map((peerStream, i) => (
          <div key={i}>
            <VideoPlayer stream={peerStream.stream} />
            <p className="text-white">{peerStream.nickName}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default VideoContainer
