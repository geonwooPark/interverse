import Peer from 'peerjs'
import { ws } from './ws'
import { CookieType, PeerStreamType } from '../types/client'

export const peer = new Peer({
  host: import.meta.env.VITE_PEER,
  secure: true,
  port: 443,
  // host: 'localhost',
  // port: 9000,
  // path: '/myapp',
})

export const getUserStream = (
  setMediaStream: (initStream: PeerStreamType) => void,
  authCookie: CookieType,
  controller: { video: boolean; audio: boolean },
) => {
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
        peerId: peer.id,
        socketId: ws.socket.id as string,
        nickName,
        stream,
        isVideoEnabled: video,
        texture,
      }

      const videoTrack = stream.getVideoTracks()[0]
      const audioTrack = stream.getAudioTracks()[0]

      videoTrack.enabled = video
      audioTrack.enabled = audio

      setMediaStream(initStream)
    })
}

export const getDisplayStream = (
  setMediaStream: (initStream: PeerStreamType) => void,
  authCookie: CookieType,
  controller: { video: boolean; audio: boolean },
) => {
  const { video, audio } = controller
  const { nickName, texture } = authCookie

  navigator.mediaDevices
    .getUserMedia({ video: false, audio: true })
    .then((audioStream) => {
      navigator.mediaDevices
        .getDisplayMedia({ video: true, audio: false })
        .then((screenStream) => {
          const audioTracks = audioStream.getAudioTracks()
          if (audioTracks) {
            screenStream.addTrack(audioTracks[0])
          }

          const initStream = {
            peerId: peer.id,
            socketId: ws.socket.id as string,
            nickName,
            stream: screenStream,
            isVideoEnabled: video,
            texture,
          }

          const videoTrack = screenStream.getVideoTracks()[0]
          const audioTrack = audioStream.getAudioTracks()[0]

          videoTrack.enabled = video
          audioTrack.enabled = audio

          setMediaStream(initStream)
        })
    })
}
