export interface CookieType {
  roomNum: string
  role: 'host' | 'guest'
  title: string
  createAt: Date
}

export interface PeerStreamType {
  peerId: string
  socketId: string
  nickname: string
  stream: MediaStream | null
  isVideoEnabled: boolean
  texture: string
  sound?: boolean
  isSelected?: boolean
}
