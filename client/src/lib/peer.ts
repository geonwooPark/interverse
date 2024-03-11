import Peer from 'peerjs'

export const peer = new Peer({
  host: 'localhost',
  port: 9000,
  path: '/myapp',
})

export const getMedia = (isScreenStreaming: boolean) => {
  if (isScreenStreaming) {
    return navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: false,
    })
  } else {
    return navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    })
  }
}
