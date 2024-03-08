interface MessageData {
  message: string
  nickName: string
  roomNum: string
  senderId: string
  newPlayerId?: string
}

interface JoinMember {
  roomNum: string
  authCookie: {
    roomNum: string
    role: 'admin' | 'user'
    nickName: string
    path: string
  }
}

interface NewMember {
  roomNum: string
  role: 'admin' | 'user'
  nickName: string
  path: string
  member: string
}

interface PlayerInfo {
  x: number
  y: number
  nickName: string
  texture: string
  roomNum: string
  socketId?: string
}

interface PlayerPosition {
  x: number
  y: number
  socketId: string
  roomNum: string
  animation: any
}

interface PlayerInfoFromExistingPlayerToNewPlayer {
  x: number
  y: number
  nickName: string
  texture: string
  roomNum: string
  socketId?: string
  newPlayerId: string
}

interface IUser {
  peerId: string
  socketId: string
  nickName: string
}

export interface ServerToClientEvents {
  serverMsg: (data: MessageData) => void
  leaveRoom: (sockerId: string) => void
  roomMember: (members: string[]) => void
  receivePlayerInfo: ({
    x,
    y,
    nickName,
    texture,
    roomNum,
    socketId,
  }: PlayerInfo) => void
  receiveAvatarPosition: ({ x, y, roomNum, socketId }: PlayerPosition) => void
  receivePlayerInfoFromExistingPlayer: ({
    x,
    y,
    nickName,
    texture,
    roomNum,
    socketId,
    newPlayerId,
  }: PlayerInfoFromExistingPlayerToNewPlayer) => void
  getUsers: ({
    socketId,
    members,
  }: {
    socketId: string
    members: Record<string, IUser>
  }) => void
  joinedUsers: ({
    peerId,
    socketId,
    nickName,
  }: {
    peerId: string
    socketId: string
    nickName: string
  }) => void
  createVideoRoom: (roomNum: string) => void
  leaveVideoRoom: (peerId: string) => void
}

export interface ClientToServerEvents {
  clientMsg: (data: MessageData) => void
  joinRoom: ({ roomNum }: JoinMember) => void
  sendPlayerInfo: ({ x, y, nickName, texture, roomNum }: PlayerInfo) => void
  sendAvatarPosition: ({
    x,
    y,
    socketId,
    roomNum,
    animation,
  }: PlayerPosition) => void
  sendPlayerInfoToNewPlayer: ({
    x,
    y,
    nickName,
    texture,
    roomNum,
    newPlayerId,
  }: PlayerInfoFromExistingPlayerToNewPlayer) => void
  joinVideoRoom: ({
    roomNum,
    peerId,
    nickName,
  }: {
    roomNum: string
    peerId: string
    nickName: string
  }) => void
  createVideoRoom: (roomNum: string) => void
  leaveVideoRoom: () => void
}
