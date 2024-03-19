export interface ChatItemType {
  message: string
  senderId?: string
  nickName: string
  roomNum: string
}

export interface CookieType {
  roomNum: string
  role: 'host' | 'guest'
  nickName: string
  path: string
  texture: string
}

export interface DisplayOtherPlayerChatType {
  message: string
  socketId: string
}

export interface PeerStreamType {
  peerId: string
  socketId: string
  nickName: string
  stream: MediaStream
  video: boolean
  audio: boolean
  texture: string
}

export interface CurrentStream {
  peerId: string
  stream: MediaStream
  texture: string
  video: boolean
}
