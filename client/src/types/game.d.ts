import { CookieType } from './client'

interface JoinRoomType {
  roomNum: string
  authCookie: CookieType
}

interface SendMessageType {
  message: string
  senderId?: string
  nickName: string
  roomNum: string
}

interface SendPlayerInfoType {
  x: number
  y: number
  nickName: string
  texture: string
  roomNum: string
}

interface AddOtherPlayerType {
  x: number
  y: number
  nickName: string
  texture: string
  socketId?: string
}

interface UpdateOtherPlayerType {
  x: number
  y: number
  socketId: string
  animation: any
}

interface SendAvatarPositionType {
  x: number
  y: number
  socketId: string
  animation: any
  roomNum: string
}

interface SendPlayerInfoToNewPlayerType {
  x: number
  y: number
  nickName: string
  texture: string
  roomNum: string
  newPlayerId: string
}
