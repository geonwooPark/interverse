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
  title: string
  path: string
  createAt: Date
}

export interface DisplayOtherPlayerChatType {
  message: string
  socketId: string
}

export interface PeerStreamType {
  peerId: string
  socketId: string
  nickName: string
  stream: MediaStream | null
  isVideoEnabled: boolean
  texture: string
  sound?: boolean
  isSelected?: boolean
}

export interface TextureImageType {
  [key: string | number]: string
}

export interface ModalContentType {
  title: string
  description: string
  action: any
  actionLabel: string
}
