interface ServerMessage {
  message: string
  nickName: string
  roomNum: string
  senderId: string
  newPlayerId?: string
}

interface ClientMessage {
  message: string
  nickName: string
  roomNum: string
  senderId: string
  newPlayerId?: string
}

interface ClientJoinRoom {
  roomNum: string
  authCookie: {
    roomNum: string
    role: 'host' | 'guest'
    nickName: string
    path: string
    texture: string
  }
}

interface ServerPlayerInfo {
  x: number
  y: number
  nickName: string
  texture: string
  roomNum: string
  socketId: string
}

interface ClientPlayerInfo {
  x: number
  y: number
  nickName: string
  texture: string
  roomNum: string
}

interface ServerAvatarPosition {
  x: number
  y: number
  socketId: string
  animation: any
}

interface ClientAvatarPosition {
  x: number
  y: number
  roomNum: string
  animation: any
}

interface ServerOtherAvatarPosition {
  x: number
  y: number
  nickName: string
  texture: string
  roomNum: string
  newPlayerId: string
  socketId: string
}

interface ClientOtherAvatarPosition {
  x: number
  y: number
  nickName: string
  texture: string
  animation: string
  roomNum: string
  newPlayerId: string
}

interface IUser {
  peerId: string
  socketId: string
  nickName: string
}

interface ClientJoinVideoRoom {
  roomNum: string
  peerId: string
  nickName: string
}

interface ServerJoinVideoRoom {
  socketId: string
  peerId: string
  nickName: string
}

export interface ServerToClientEvents {
  leaveRoom: (sockerId: string) => void
  serverMsg: (message: ServerMessage) => void
  roomMember: (members: string[]) => void
  serverPlayerInfo: ({
    x,
    y,
    nickName,
    texture,
    roomNum,
    socketId,
  }: ServerPlayerInfo) => void
  serverAvatarPosition: ({
    x,
    y,
    animation,
    socketId,
  }: ServerAvatarPosition) => void
  serverOtherAvatarPosition: ({
    x,
    y,
    nickName,
    texture,
    roomNum,
    socketId,
    newPlayerId,
  }: ServerOtherAvatarPosition) => void
  serverJoinVideoRoom: ({
    peerId,
    socketId,
    nickName,
  }: ServerJoinVideoRoom) => void
  createVideoRoom: (roomNum: string) => void
  leaveVideoRoom: () => void
  updateVideoRoom: (socketId: string) => void
  serverChairId: (chairId: string) => void
  serverSeatedList: (seated: string[]) => void
  serverStandUp: (chairId: string) => void
}

export interface ClientToServerEvents {
  joinRoom: ({ roomNum }: ClientJoinRoom) => void
  clientMsg: (message: ClientMessage) => void
  clientPlayerInfo: ({
    x,
    y,
    nickName,
    texture,
    roomNum,
  }: ClientPlayerInfo) => void
  clientAvatarPosition: ({
    x,
    y,
    roomNum,
    animation,
  }: ClientAvatarPosition) => void
  clientOtherAvatarPosition: ({
    x,
    y,
    nickName,
    texture,
    behavior,
    roomNum,
    newPlayerId,
  }: ClientOtherAvatarPosition) => void
  clientJoinVideoRoom: ({
    roomNum,
    peerId,
    nickName,
  }: ClientJoinVideoRoom) => void
  createVideoRoom: (roomNum: string) => void
  leaveVideoRoom: () => void
  clientChairId: ({
    roomNum,
    chairId,
  }: {
    roomNum: string
    chairId: string
  }) => void
  clientStandUp: ({
    roomNum,
    chairId,
  }: {
    roomNum: string
    chairId: string
  }) => void
}
