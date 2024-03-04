export interface ChatItemType {
  message: string
  sender: string
  roomNum: string
}

export interface CookieType {
  roomNum: string
  role: 'admin' | 'user'
  nickName: string
  path: string
}
