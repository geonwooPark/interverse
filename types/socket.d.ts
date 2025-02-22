export interface ServerMessage {
  message: string
  nickname: string
  roomNum: string
  senderId: string
  newPlayerId?: string
}

export interface ClientMessage {
  message: string
  nickname: string
  roomNum: string
  senderId: string
  newPlayerId?: string
}

export interface ClientJoinRoom {
  roomNum: string
  nickname: string
  texture: string
}

export interface ServerPlayerInfo {
  nickname: string
  texture: string
  roomNum: string
  socketId: string
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

export interface ClientJoinVideoRoom {
  roomNum: string
  peerId: string
  nickname: string
  texture: string
  isVideoEnabled: boolean
}

export interface ServerJoinVideoRoom {
  socketId: string
  peerId: string
  nickname: string
  texture: string
  isVideoEnabled: boolean
}

export interface ClientChairId {
  roomNum: string
  chairId: string
}

export interface RoomUser {
  nickname: string
  texture: string
  roomNum: string
  socketId: string
}

export interface VideoRoomUser {
  peerId: string
  socketId: string
  nickname: string
}

export interface ClientHandleCamera {
  isVideoEnabled: boolean
  roomNum: string
}

export interface ServerHandleCamera {
  socketId: string
  isVideoEnabled: boolean
}

export interface ClientDirectMessage {
  message: string
  sender: string
  senderId: string
  receiver: string
  receiverId: string
}

export interface ServerDirectMessage {
  message: string
  sender: string
  senderId: string
}

export interface ServerToClientEvents {
  serverLeaveRoom: (sockerId: string) => void
  serverMsg: (message: ServerMessage) => void
  serverPlayerInfo: ({
    nickname,
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
  serverJoinVideoRoom: ({
    peerId,
    socketId,
    nickname,
    texture,
    isVideoEnabled,
  }: ServerJoinVideoRoom) => void
  serverLeaveVideoRoom: () => void
  serverUpdateVideoRoomMember: (socketId: string) => void
  serverOccupiedChairs: (chairs: string[]) => void
  serverChairId: (chairId: string) => void
  serverRoomMember: (rooms: Record<string, Record<string, RoomUser>>) => void
  serverHandleCamera: ({ socketId, isVideoEnabled }: ServerHandleCamera) => void
  serverDirectMessage: ({ message, senderId }: ServerDirectMessage) => void
}

export interface ClientToServerEvents {
  clientJoinRoom: ({ authCookie }: ClientJoinRoom) => void
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
    nickname,
    texture,
    isVideoEnabled,
  }: ClientJoinVideoRoom) => void
  clientCreateVideoRoom: (roomNum: string) => void
  clientLeaveVideoRoom: (roomNum: string) => void
  clientChairId: ({ roomNum, chairId }: ClientChairId) => void
  clientHandleCamera: ({ isVideoEnabled, roomNum }: ClientHandleCamera) => void
  clientDirectMessage: ({
    message,
    sender,
    senderId,
    receiver,
    receiverId,
  }: ClientDirectMessage) => void
}
