export interface IRoomUser {
  [socketId: string]: {
    nickname: string
    texture: string
    x: number
    y: number
  }
}

export interface IRoomUserDto {
  nickname: string
  texture: string
  x: number
  y: number
  socketId: string
}

export interface IChat {
  id: string
  sender: string
  message: string
  roomNum: string
  socketId?: string
}

export interface IJoinRoom {
  roomNum: string
  nickname: string
  texture: string
  x: number
  y: number
}

export interface IAvatarPosition {
  x: number
  y: number
  animation: any
  socketId?: string
  roomNum?: string
  isLast?: boolean
}

export interface IChair {
  roomNum: string
  chairId: string
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
  serverChat: (chat: ServerChat) => void
  serverPlayerInfo: (roomUser: RoomUserDto) => void
  serverAvatarPosition: ({ x, y, animation, socketId }: IAvatarPosition) => void
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
  serverRoomMember: (users: IRoomUserDto[]) => void
  serverHandleCamera: ({ socketId, isVideoEnabled }: ServerHandleCamera) => void
  serverDirectMessage: ({ message, senderId }: ServerDirectMessage) => void
}

export interface ClientToServerEvents {
  clientJoinRoom: ({ authCookie }: IJoinRoom) => void
  clientChat: (clientChat: Chat) => void
  clientAvatarPosition: ({ x, y, roomNum, animation }: IAvatarPosition) => void
  clientJoinVideoRoom: ({
    roomNum,
    peerId,
    nickname,
    texture,
    isVideoEnabled,
  }: ClientJoinVideoRoom) => void
  clientCreateVideoRoom: (roomNum: string) => void
  clientLeaveVideoRoom: (roomNum: string) => void
  clientChairId: ({ roomNum, chairId }: IChair) => void
  clientHandleCamera: ({ isVideoEnabled, roomNum }: ClientHandleCamera) => void
  clientDirectMessage: ({
    message,
    sender,
    senderId,
    receiver,
    receiverId,
  }: ClientDirectMessage) => void
}
