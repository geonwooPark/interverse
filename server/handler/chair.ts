import { Socket } from 'socket.io'
import { occupiedChairs } from '..'

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

interface ClientChairId {
  roomNum: string
  chairId: string
}

interface ServerToClientEvents {
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
}

interface ClientToServerEvents {
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

export const chairHandler = (
  socket: Socket<ClientToServerEvents, ServerToClientEvents>,
  io: any,
) => {
  const sendChairId = ({ roomNum, chairId }: ClientChairId) => {
    if (!occupiedChairs[roomNum]) occupiedChairs[roomNum] = new Map()

    if (occupiedChairs[roomNum].has(socket.id)) {
      occupiedChairs[roomNum].delete(socket.id)
    } else {
      occupiedChairs[roomNum].set(socket.id, chairId)
    }

    socket.broadcast.to(roomNum).emit('serverChairId', chairId)

    socket.on('disconnect', () => {
      leaveChair(roomNum)
    })
  }

  const leaveChair = (roomNum: string) => {
    io.to(roomNum).emit('serverChairId', occupiedChairs[roomNum].get(socket.id))
    occupiedChairs[roomNum].delete(socket.id)
  }

  socket.on('clientChairId', sendChairId)
}
