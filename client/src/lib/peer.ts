import Peer from 'peerjs'

export const peer = new Peer({
  host: import.meta.env.VITE_PEER,
  secure: true,
  port: 443,
})

export const getMedia = (isScreenSharing: boolean) => {
  if (isScreenSharing) {
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
