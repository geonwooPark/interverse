import { useEffect, useRef, useState } from 'react'
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
  stream: MediaStream
}

interface PeerNameType {
  peerId: string
  nickName: string
}

function VideoContainer({ authCookie }: VideoContainerProps) {
  const [me, setMe] = useState<Peer>()
  const [peerStreams, setPeerStreams] = useState<PeerStreamType[]>([])
  const peerNameRef = useRef<PeerNameType[]>([])
  const [stream, setStream] = useState<MediaStream>()
  const [screenStream, setScreenStream] = useState<MediaStream>()
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
          setScreenStream(screenStream)
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
    ws.on('leaveVideoRoom', (peerId: string) => {
      setPeerStreams((prev) => prev.filter((r) => r.peerId !== peerId))
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
      const { peerId, nickName } = user
      const call = me.call(user.peerId, stream, {
        metadata: {
          nickName,
        },
      })
      // 기존 멤버
      call.once('stream', (peerStream) => {
        setPeerStreams((prev) => [
          ...prev,
          {
            peerId: user.peerId,
            stream: peerStream,
          },
        ])
      })
      peerNameRef.current = [...peerNameRef.current, { peerId, nickName }]
    })

    // 전화를 걸 때 발생
    me.on('call', (call) => {
      const { nickName } = call.metadata
      peerNameRef.current = [
        ...peerNameRef.current,
        { peerId: call.peer, nickName },
      ]
      call.answer(stream)
      // 새로운 멤버
      call.once('stream', (peerStream) => {
        setPeerStreams((prev) => [
          ...prev,
          {
            peerId: call.peer,
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
            <p className="text-white">{peerStream.peerId}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default VideoContainer
