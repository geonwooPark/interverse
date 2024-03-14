import { useEffect, useState } from 'react'
import { getMedia, peer as me } from '../lib/peer'
import { socket as ws } from '../lib/ws'
import { useAppDispatch, useAppSelector } from '../store/store'
import {
  CookieType,
  CurrentStream,
  PeerStreamType,
} from '../../../types/client'
import { showVideoModal } from '../store/features/videoModalSlice'
import { handleStreaming } from '../store/features/screenStreamerSlice'
import { setStream } from '../store/features/myStreamSlice'

export const useVideoChat = (authCookie: CookieType) => {
  const dispatch = useAppDispatch()
  const { isScreenStreaming } = useAppSelector((state) => state.screenStreamer)
  const [peerStreams, setPeerStreams] = useState<PeerStreamType[]>([])
  const [currentStream, setCurrentStream] = useState<CurrentStream>()
  const { controller } = useAppSelector((state) => state.myStream)

  useEffect(() => {
    try {
      getMedia(isScreenStreaming).then((stream) => {
        const audioTrack = stream.getAudioTracks()[0]
        const videoTrack = stream.getVideoTracks()[0]

        audioTrack.enabled = controller.audio
        videoTrack.enabled = controller.video

        dispatch(setStream(stream))
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

  return {
    peerStreams,
    setPeerStreams,
    currentStream,
    setCurrentStream,
  }
}
