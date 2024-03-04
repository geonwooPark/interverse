import { CookieType } from '../client/src/utils/cookie'

interface MessageData {
  msg: string
  sender: string
  roomNum: string
}

interface JoinMember {
  roomNum: string
  authCookie: CookieType
}

interface NewMember {
  roomNum: string
  role: 'admin' | 'user'
  nickName: string
  path: string
  member: string
}

export interface ServerToClientEvents {
  serverMsg: (data: MessageData) => void
  roomMember: (members: string[]) => void
  newMember: ({ roomNum, role, path, nickName, member }: NewMember) => void
}

export interface ClientToServerEvents {
  clientMsg: (data: MessageData) => void
  joinRoom: ({ roomNum, nickName }: JoinMember) => void
}
