export interface ChatItemType {
  message: string
  senderId?: string
  nickname: string
  roomNum: string
}

export interface CookieType {
  roomNum: string
  role: 'host' | 'guest'
  title: string
  createAt: Date
}

export interface DisplayOtherPlayerChatType {
  message: string
  socketId: string
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

export interface TextureImageType {
  [key: string | number]: string
}

export interface ModalContentType {
  title: string
  description: string
  action: any
  actionLabel: string
}
