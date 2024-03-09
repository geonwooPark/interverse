import { Socket } from 'socket.io'
import {
  ClientAvatarPosition,
  ClientMessage,
  ClientOtherAvatarPosition,
  ClientPlayerInfo,
  ClientToServerEvents,
  ServerToClientEvents,
} from '../../types/socket'

export const roomHandler = (
  socket: Socket<ClientToServerEvents, ServerToClientEvents>,
  io: any,
) => {
  const joinRoom = ({ roomNum }: { roomNum: string }) => {
    if (roomNum === '') return
    // 방에 입장시키기
    socket.join(roomNum)
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

  socket.on('joinRoom', joinRoom)
  socket.on('clientMsg', sendMessage)
  socket.on('clientPlayerInfo', sendPlayerInfo)
  socket.on('clientAvatarPosition', sendAvatarPosition)
  socket.on('clientOtherAvatarPosition', sendOtherAvatarPosition)
}
