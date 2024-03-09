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
}

export interface AddOtherPlayerType {
  x: number
  y: number
  nickName: string
  texture: string
  socketId?: string
}

export interface DisplayOtherPlayerChatType {
  message: string
  socketId: string
}
