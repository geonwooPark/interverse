import { useEffect, useState } from 'react'
import { ws } from '../lib/ws'
import { me } from '../lib/peer'
import { useAppDispatch, useAppSelector } from '../store/store'
import { showVideoModal } from '../store/features/videoModalSlice'
import {
  handleScreenSharing,
  initStream,
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

  const setMediaStream = (initStream: PeerStreamType) => {
    dispatch(setMyStream(initStream))
    setCurrentStream(initStream)
  }

  useEffect(() => {
    if (isScreenSharing) {
      me.getDisplayStream(
        setMediaStream,
        authCookie,
        controller,
        ws.socket.id as string,
      )
    } else {
      me.getUserStream(
        setMediaStream,
        authCookie,
        controller,
        ws.socket.id as string,
      )
    }
  }, [])

  useEffect(() => {
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
      me.disconnectPeerId()
      dispatch(stopStream())
      dispatch(showVideoModal(false))
      dispatch(setMyStream(initStream))
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
    controller,
  }
}
