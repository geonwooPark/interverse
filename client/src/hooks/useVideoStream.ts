import { useEffect, useState } from 'react'
import { getMedia, peer as me } from '../lib/peer'
import { useAppDispatch, useAppSelector } from '../store/store'
import { showVideoModal } from '../store/features/videoModalSlice'
import {
  handleScreenSharing,
  setStream,
  stopStream,
} from '../store/features/myStreamSlice'
import { CookieType, CurrentStream, PeerStreamType } from '../types/client'
import { ws } from '../lib/ws'

export const useVideoStream = (authCookie: CookieType) => {
  const dispatch = useAppDispatch()
  const { stream, controller, isScreenSharing } = useAppSelector(
    (state) => state.myStream,
  )
  const [peerStreams, setPeerStreams] = useState<PeerStreamType[]>([])
  const [currentStream, setCurrentStream] = useState<CurrentStream>()
  const [isJoined, setIsJoined] = useState(false)

  useEffect(() => {
    try {
      getMedia(isScreenSharing).then((stream) => {
        const audioTrack = stream.getAudioTracks()[0]
        const videoTrack = stream.getVideoTracks()[0]

        if (audioTrack && videoTrack) {
          audioTrack.enabled = controller.audio
          videoTrack.enabled = controller.video
        }

        dispatch(setStream(stream))
        setCurrentStream({
          peerId: me.id,
          stream,
          texture: authCookie.texture,
          video: controller.video,
        })
        setPeerStreams((prev) => [
          ...prev,
          {
            peerId: me.id,
            nickName: authCookie.nickName,
            socketId: ws.socket.id as string,
            stream,
            video: controller.video,
            audio: true,
            texture: authCookie.texture,
          },
        ])
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
            return { ...stream, video: isVideoEnabled }
          }
          return stream
        }),
      )
    })
    ws.socket.on('serverUpdateVideoRoomMember', (socketId: string) => {
      setPeerStreams((prev) => prev.filter((r) => r.socketId !== socketId))
      // if (stream) {
      //   setCurrentStream({
      //     peerId: me.id,
      //     stream,
      //     texture: authCookie.texture,
      //     video: controller.video,
      //   })
      // }
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

  return {
    stream,
    peerStreams,
    setPeerStreams,
    currentStream,
    setCurrentStream,
    isJoined,
    setIsJoined,
    controller,
  }
}
