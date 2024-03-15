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

export const roomHandler = (
  socket: Socket<ClientToServerEvents, ServerToClientEvents>,
  io: any,
) => {
  const joinRoom = ({ roomNum }: { roomNum: string }) => {
    if (roomNum === '') return
    // 방에 입장시키기
    socket.join(roomNum)
    // 누군가 앉아있는 의자들 목록 알려주기
    if (occupiedChairs[roomNum]) {
      io.to(socket.id).emit(
        'serverOccupiedChairs',
        Array.from(occupiedChairs[roomNum]?.values()),
      )
    }

    socket.on('disconnect', () => {
      io.to(roomNum).emit('serverLeaveRoom', socket.id)
    })
  }

  const sendMessage = (message: ClientMessage) => {
    if (message.roomNum === '') return
    io.to(message.roomNum).emit('serverMsg', {
      ...message,
      senderId: socket.id,
    })
  }

  const sendPlayerInfo = (playerInfo: ClientPlayerInfo) => {
    io.to(playerInfo.roomNum).emit('serverMsg', {
      senderId: socket.id,
      nickName: '',
      message: `${playerInfo.nickName}님이 입장했습니다.`,
      roomNum: playerInfo.roomNum,
      newPlayerId: socket.id,
    })
    socket.broadcast
      .to(playerInfo.roomNum)
      .emit('serverPlayerInfo', { ...playerInfo, socketId: socket.id })
  }

  const sendAvatarPosition = (avatarPosition: ClientAvatarPosition) => {
    socket.broadcast.to(avatarPosition.roomNum).emit('serverAvatarPosition', {
      ...avatarPosition,
      socketId: socket.id,
    })
  }

  const sendOtherAvatarPosition = (playerInfo: ClientOtherAvatarPosition) => {
    if (socket.id === playerInfo.newPlayerId) return
    io.to(playerInfo.newPlayerId).emit('serverOtherAvatarPosition', {
      ...playerInfo,
      socketId: socket.id,
    })
  }

  socket.on('clientJoinRoom', joinRoom)
  socket.on('clientMsg', sendMessage)
  socket.on('clientPlayerInfo', sendPlayerInfo)
  socket.on('clientAvatarPosition', sendAvatarPosition)
  socket.on('clientOtherAvatarPosition', sendOtherAvatarPosition)
}
