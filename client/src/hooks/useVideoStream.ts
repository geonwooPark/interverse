import { useEffect } from 'react'
import { ws } from '../lib/ws'
import { me } from '../lib/peer'
import { useAppDispatch, useAppSelector } from '../store/store'
import { handleVideoModal } from '../store/features/videoModalSlice'
import {
  deletePeerStream,
  stopStream,
  updatePeerStreamVideo,
} from '../store/features/myStreamSlice'
import { CookieType } from '../../../types/client'

export const useVideoStream = (authCookie: CookieType) => {
  const dispatch = useAppDispatch()
  const { myStream, currentStream, peerStreams, controller, isScreenSharing } =
    useAppSelector((state) => state.myStream)

  useEffect(() => {
    if (isScreenSharing) {
      me.getDisplayStream(authCookie, controller, ws.socket.id as string)
    } else {
      me.getUserStream(authCookie, controller, ws.socket.id as string)
    }
  }, [])

  useEffect(() => {
    ws.socket.on('serverHandleCamera', ({ socketId, isVideoEnabled }) => {
      dispatch(updatePeerStreamVideo({ socketId, isVideoEnabled }))
    })
    ws.socket.on('serverUpdateVideoRoomMember', (socketId: string) => {
      ws.removeOtherPeer(socketId)
      dispatch(deletePeerStream(socketId))
    })
    ws.socket.on('serverLeaveVideoRoom', () => {
      dispatch(stopStream())
      dispatch(handleVideoModal())
    })

    return () => {
      ws.socket.off('serverHandleCamera')
      ws.socket.off('serverLeaveVideoRoom')
      ws.socket.off('serverUpdateVideoRoomMember')
    }
  }, [])

  return {
    myStream,
    peerStreams,
    currentStream,
    controller,
  }
}
