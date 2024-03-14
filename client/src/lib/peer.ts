import Peer from 'peerjs'

export const peer = new Peer({
  host: 'localhost',
  path: '/',
  port: 9001,
})
export const getMedia = (isScreenStreaming: boolean) => {
  if (isScreenStreaming) {
    return navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true,
    })
  } else {
    return navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    })
  }
}
