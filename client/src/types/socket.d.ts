export interface ServerMessage {
  message: string
  nickName: string
  roomNum: string
  senderId: string
  newPlayerId?: string
}

export interface ClientMessage {
  message: string
  nickName: string
  roomNum: string
  senderId: string
  newPlayerId?: string
}

export interface ClientJoinRoom {
  roomNum: string
  authCookie: {
    roomNum: string
    role: 'host' | 'guest'
    nickName: string
    path: string
    texture: string
  }
}

export interface ServerPlayerInfo {
  x: number
  y: number
  nickName: string
  texture: string
  animation: any
  roomNum: string
  socketId: string
}

export interface ClientPlayerInfo {
  x: number
  y: number
  nickName: string
  texture: string
  animation: any
  roomNum: string
}

export interface ServerAvatarPosition {
  x: number
  y: number
  socketId: string
  animation: any
}

export interface ClientAvatarPosition {
  x: number
  y: number
  roomNum: string
  animation: any
}

export interface ServerOtherAvatarPosition {
  x: number
  y: number
  nickName: string
  texture: string
  roomNum: string
  newPlayerId: string
  socketId: string
}

export interface ClientOtherAvatarPosition {
  x: number
  y: number
  nickName: string
  texture: string
  animation: string
  roomNum: string
  newPlayerId: string
}

export interface IUser {
  peerId: string
  socketId: string
  nickName: string
}

export interface ClientJoinVideoRoom {
  roomNum: string
  peerId: string
  nickName: string
}

export interface ServerJoinVideoRoom {
  socketId: string
  peerId: string
  nickName: string
}

export interface ClientChairId {
  roomNum: string
  chairId: string
}

export interface RoomUser {
  x: number
  y: number
  nickName: string
  texture: string
  animation: any
  roomNum: string
  socketId: string
}

export interface ServerToClientEvents {
  serverLeaveRoom: (sockerId: string) => void
  serverMsg: (message: ServerMessage) => void
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
  serverCreateVideoRoom: (roomNum: string) => void
  serverLeaveVideoRoom: () => void
  serverUpdateVideoRoomMember: (socketId: string) => void
  serverOccupiedChairs: (chairs: string[]) => void
  serverChairId: (chairId: string) => void
  serverRoomMember: (rooms: Record<string, Record<string, RoomUser>>) => void
}

export interface ClientToServerEvents {
  clientJoinRoom: ({ roomNum }: ClientJoinRoom) => void
  clientLeaveRoom: () => void
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
    animation,
    roomNum,
    newPlayerId,
  }: ClientOtherAvatarPosition) => void
  clientJoinVideoRoom: ({
    roomNum,
    peerId,
    nickName,
  }: ClientJoinVideoRoom) => void
  clientCreateVideoRoom: (roomNum: string) => void
  clientLeaveVideoRoom: (roomNum: string) => void
  clientChairId: ({ roomNum, chairId }: ClientChairId) => void
}
