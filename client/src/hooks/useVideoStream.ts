import { useEffect, useState } from 'react'
import { ws } from '../lib/ws'
import { getMedia, peer as me } from '../lib/peer'
import { useAppDispatch, useAppSelector } from '../store/store'
import { showVideoModal } from '../store/features/videoModalSlice'
import {
  handleScreenSharing,
  setMyStream,
  stopStream,
} from '../store/features/myStreamSlice'
import { CookieType, PeerStreamType } from '../types/client'

export const useVideoStream = (authCookie: CookieType) => {
  const dispatch = useAppDispatch()
  const { myStream, controller, isScreenSharing } = useAppSelector(
    (state) => state.myStream,
  )
  const [peerStreams, setPeerStreams] = useState<PeerStreamType[]>([])
  const [currentStream, setCurrentStream] = useState<PeerStreamType | null>(
    null,
  )
  const [isJoined, setIsJoined] = useState(false)
  const { video, audio } = controller
  const { nickName, texture } = authCookie

  useEffect(() => {
    try {
      getMedia(isScreenSharing).then((stream) => {
        const initStream = {
          peerId: me.id,
          socketId: ws.socket.id as string,
          nickName,
          stream,
          isVideoEnabled: video,
          texture,
        }

        const audioTrack = stream.getAudioTracks()[0]
        const videoTrack = stream.getVideoTracks()[0]

        if (audioTrack && videoTrack) {
          audioTrack.enabled = audio
          videoTrack.enabled = video
        }

        dispatch(setMyStream(initStream), setCurrentStream(initStream))
      })
    } catch (error) {
      if (error instanceof Error) {
        alert('카메라와 마이크를 찾을 수 없거나 권한이 차단 되어있어요!')
      }
    }

    ws.socket.on('serverHandleCamera', ({ socketId, isVideoEnabled }) => {
      setPeerStreams((prev) =>
        prev.map((stream) => {
          if (stream.socketId === socketId) {
            return { ...stream, isVideoEnabled }
          }
          return stream
        }),
      )
    })
    ws.socket.on('serverUpdateVideoRoomMember', (socketId: string) => {
      setPeerStreams((prev) => prev.filter((r) => r.socketId !== socketId))
    })
    ws.socket.on('serverLeaveVideoRoom', () => {
      me.disconnect()
      setIsJoined(false)
      dispatch(stopStream())
      dispatch(showVideoModal(false))
      if (isScreenSharing) dispatch(handleScreenSharing(false))
    })

    return () => {
      ws.socket.off('serverHandleCamera')
      ws.socket.off('serverLeaveVideoRoom')
      ws.socket.off('serverUpdateVideoRoomMember')
    }
  }, [])

  useEffect(() => {
    setCurrentStream(myStream)
  }, [peerStreams])

  return {
    myStream,
    peerStreams,
    setPeerStreams,
    currentStream,
    setCurrentStream,
    isJoined,
    setIsJoined,
    controller,
  }
}
