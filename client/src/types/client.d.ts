export interface ChatItemType {
  message: string
  senderId?: string
  nickName: string
  roomNum: string
}

export interface CookieType {
  roomNum: string
  role: 'admin' | 'user'
  nickName: string
  path: string
  texture: string
}

export interface AddOtherPlayerType {
  x: number
  y: number
  nickName: string
  texture: string
  animation?: string
  socketId?: string
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
}

export interface CurrentStream {
  peerId: string
  stream: MediaStream
}
