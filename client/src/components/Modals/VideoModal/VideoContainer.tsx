import { useEffect, useState } from 'react'
import VideoPlayer from './VideoPlayer'
import { socket as ws } from '../../../lib/ws'
import { CookieType } from '../../../types/client'
import Peer from 'peerjs'

interface VideoContainerProps {
  authCookie: CookieType
}

interface PeerStreamType {
  id: string
  nickName: string
  stream: MediaStream
}

function VideoContainer({ authCookie }: VideoContainerProps) {
  const [me, setMe] = useState<Peer>()
  const [peerStreams, setPeerStreams] = useState<MediaStream[]>([])
  const [stream, setStream] = useState<MediaStream>()
  const [users, setUsers] = useState<string[]>([])

  useEffect(() => {
    // 서버 따로 만들기
    const peer = new Peer({
      host: 'localhost',
      port: 9000,
      path: '/myapp',
    })
    setMe(peer)

    try {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setStream(stream)
        })
    } catch (error) {
      console.error(error)
    }

    ws.on('createdRoom', () => {
      console.log('비디오 방 생성')
    })
    ws.on('getUsers', (users) => {
      console.log(users)
    })

    return () => {
      ws.off('createdRoom')
      ws.off('getUsers')
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
      console.log(user)
      const call = me.call(user.peerId, stream, {
        metadata: {
          nickName: user.nickName,
        },
      })
      call.on('stream', (peerStream) => {
        setPeerStreams((prev) => [...prev, peerStream])
      })
    })

    me.on('call', (call) => {
      const { nickName } = call.metadata
      console.log(nickName)
      call.answer(stream)
      call.on('stream', (peerStream) => {
        setPeerStreams((prev) => [...prev, peerStream])
      })
    })

    return () => {
      ws.off('joinedUsers')
    }
  }, [me, stream])

  useEffect(() => {
    console.log(stream)
    console.log(peerStreams)
  }, [peerStreams])

  return (
    <div>
      {stream && <VideoPlayer stream={stream} />}
      <div className="flex gap-4">
        {peerStreams.map((peerStream, i) => {
          return <VideoPlayer key={i} stream={peerStream} />
        })}
      </div>
    </div>
  )
}

export default VideoContainer
