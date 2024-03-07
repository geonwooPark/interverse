import { useEffect, useRef, useState } from 'react'
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
  console.log('렌더링')
  const [me, setMe] = useState<Peer>()
  const [stream, setStream] = useState<MediaStream>()
  const peerStreamsRef = useRef<PeerStreamType[]>([])
  const [peerStreams, setPeerStreams] = useState<MediaStream[]>([])

  useEffect(() => {
    if (!ws.id) return

    const peer = new Peer(ws.id)
    setMe(peer)

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream)
      })

    ws.emit('joinVideoRoom', {
      roomNum: authCookie.roomNum,
      nickName: authCookie.nickName,
    })
  }, [])

  useEffect(() => {
    if (!me) return
    if (!stream) return

    ws.on('joinVideoRoom', (data) => {
      const call = me.call(data.socketId, stream, {
        metadata: {
          id: data.socketId,
          nickName: authCookie.nickName,
        },
      })

      // call.on('stream', (peerStream) => {
      //   setPeerStream(peerStream)
      // })

      me.on('call', (call) => {
        const { id, nickName } = call.metadata
        console.log(`전화 건 사람 ${nickName}`)
        call.answer(stream)
        call.on('stream', (peerStream) => {
          const peerStreams: MediaStream[] = []
          if (peerStreams.includes(peerStream)) return
          peerStreams.push(peerStream)
          setPeerStreams(peerStreams)
          peerStreamsRef.current.push({ id, nickName, stream: peerStream })
        })
      })
    })
  }, [me, ws, stream])

  return (
    <div>
      {stream && <VideoPlayer stream={stream} />}
      <div className="flex gap-4">
        {peerStreams.map((peerStream, i) => {
          return (
            <div key={i}>
              <VideoPlayer stream={peerStream} />
              {/* <p className="text-white">{peerStream.nickName}</p> */}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default VideoContainer
