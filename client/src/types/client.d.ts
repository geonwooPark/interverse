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
