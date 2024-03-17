interface WS {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>
  game: Game | null
  occupiedChairs: string[]
  joinRoom: ({ authCookie }: ClientJoinRoom) => void
  sendMessage: ({ message, nickName, senderId, roomNum }: ClientMessage) => void
  sendAvatarPosition: ({
    x,
    y,
    roomNum,
    animation,
  }: ClientAvatarPosition) => void
  sendChairId: ({ roomNum, chairId }: ClientChairId) => void
  receiveChairId: () => void
}

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
  authCookie: {
    roomNum: string
    role: 'host' | 'guest'
    nickName: string
    path: string
    texture: string
  }
  texture: string
  animation: any
}

interface ServerPlayerInfo {
  nickName: string
  texture: string
  animation: any
  roomNum: string
  socketId: string
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

interface ClientChairId {
  roomNum: string
  chairId: string
}

interface JoinVideoRoomType {
  roomNum: string
  peerId: string
  nickName: string
}

interface RoomUser {
  nickName: string
  texture: string
  animation: any
  roomNum: string
  socketId: string
}

interface VideoRoomUser {
  peerId: string
  socketId: string
  nickName: string
}

export interface ServerToClientEvents {
  serverLeaveRoom: (sockerId: string) => void
  serverMsg: (message: ServerMessage) => void
  serverPlayerInfo: ({
    nickName,
    texture,
    roomNum,
    socketId,
    animation,
  }: ServerPlayerInfo) => void
  serverAvatarPosition: ({
    x,
    y,
    animation,
    socketId,
  }: ServerAvatarPosition) => void
  serverJoinVideoRoom: ({
    peerId,
    socketId,
    nickName,
  }: ServerJoinVideoRoom) => void
  serverLeaveVideoRoom: () => void
  serverUpdateVideoRoomMember: (socketId: string) => void
  serverOccupiedChairs: (chairs: string[]) => void
  serverChairId: (chairId: string) => void
  serverRoomMember: (rooms: Record<string, Record<string, RoomUser>>) => void
}

export interface ClientToServerEvents {
  clientJoinRoom: ({ authCookie }: ClientJoinRoom) => void
  clientLeaveRoom: () => void
  clientMsg: (message: ClientMessage) => void
  clientAvatarPosition: ({
    x,
    y,
    roomNum,
    animation,
  }: ClientAvatarPosition) => void
  clientJoinVideoRoom: ({
    roomNum,
    peerId,
    nickName,
  }: ClientJoinVideoRoom) => void
  clientCreateVideoRoom: (roomNum: string) => void
  clientLeaveVideoRoom: (roomNum: string) => void
  clientChairId: ({ roomNum, chairId }: ClientChairId) => void
}
