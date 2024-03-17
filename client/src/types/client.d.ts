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

export interface AddOtherPlayerType {
  nickName: string
  texture: string
  animation: string
  socketId: string
  roomNum: string
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
  audio: boolean
}

export interface CurrentStream {
  peerId: string
  stream: MediaStream
}
