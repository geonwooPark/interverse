import Peer from 'peerjs'
import { CookieType } from '../../../types/client'
import { store } from '../store/store'
import {
  controlVideoStream,
  handleVideo,
  setMyStream,
} from '../store/features/myStreamSlice'

export const me = {
  peer: new Peer({
    host: import.meta.env.VITE_PEER,
    secure: true,
    port: 443,
    // host: 'localhost',
    // port: 9000,
    // path: '/myapp',
  }),

  getUserStream(
    authCookie: CookieType,
    controller: { video: boolean; audio: boolean },
    socketId: string,
  ) {
    const { video, audio } = controller
    const { nickName, texture } = authCookie

    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: {
          echoCancellation: true, // 에코 캔슬링 활성화
          noiseSuppression: true, // 노이즈 캔슬링 활성화
        },
      })
      .then((stream) => {
        const initStream = {
          peerId: this.peer.id,
          socketId,
          nickName,
          stream,
          isVideoEnabled: video,
          texture,
        }

        const videoTrack = stream.getVideoTracks()[0]
        const audioTrack = stream.getAudioTracks()[0]

        videoTrack.enabled = video
        audioTrack.enabled = audio

        store.dispatch(setMyStream(initStream))
      })
  },

  getDisplayStream(
    authCookie: CookieType,
    controller: { video: boolean; audio: boolean },
    socketId: string,
  ) {
    const { video, audio } = controller
    const { nickName, texture } = authCookie

    navigator.mediaDevices
      .getUserMedia({
        video: false,
        audio: {
          echoCancellation: true, // 에코 캔슬링 활성화
          noiseSuppression: true, // 노이즈 캔슬링 활성화
        },
      })
      .then((audioStream) => {
        navigator.mediaDevices
          .getDisplayMedia({ video: true, audio: false })
          .then((screenStream) => {
            const audioTracks = audioStream.getAudioTracks()
            if (audioTracks) {
              screenStream.addTrack(audioTracks[0])
            }

            const initStream = {
              peerId: this.peer.id,
              socketId,
              nickName,
              stream: screenStream,
              isVideoEnabled: video,
              texture,
            }

            const videoTrack = screenStream.getVideoTracks()[0]
            const audioTrack = audioStream.getAudioTracks()[0]

            videoTrack.enabled = video
            audioTrack.enabled = audio

            store.dispatch(setMyStream(initStream))
            if (!video) {
              store.dispatch(controlVideoStream())
              store.dispatch(handleVideo())
            }
          })
      })
  },

  disconnectPeerId() {
    this.peer.disconnect()
  },

  reconnectPeerId() {
    if (this.peer.disconnected) {
      this.peer.reconnect()
    }
  },
}
