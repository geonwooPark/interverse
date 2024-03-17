import { Socket } from 'socket.io'
import { occupiedChairs, rooms } from '..'
import {
  ClientAvatarPosition,
  ClientMessage,
  ClientPlayerInfo,
  ClientToServerEvents,
  ServerToClientEvents,
} from '../types/server'

export const roomHandler = (
  socket: Socket<ClientToServerEvents, ServerToClientEvents>,
  io: any,
) => {
  const joinRoom = ({ roomNum }: { roomNum: string }) => {
    if (roomNum === '') return
    if (!rooms[roomNum]) rooms[roomNum] = {}

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
      delete rooms[roomNum][socket.id]
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
    // 나의 정보를 나를 제외한 모두에게 전송
    socket.broadcast
      .to(playerInfo.roomNum)
      .emit('serverPlayerInfo', { ...playerInfo, socketId: socket.id })
    // 다른 사람들의 정보를 나에게 전송
    io.to(socket.id).emit('serverRoomMember', rooms[playerInfo.roomNum])

    rooms[playerInfo.roomNum][socket.id] = {
      ...playerInfo,
      socketId: socket.id,
    }
  }

  const sendAvatarPosition = (avatarPosition: ClientAvatarPosition) => {
    socket.broadcast.to(avatarPosition.roomNum).emit('serverAvatarPosition', {
      ...avatarPosition,
      socketId: socket.id,
    })
  }

  socket.on('clientJoinRoom', joinRoom)
  socket.on('clientMsg', sendMessage)
  socket.on('clientPlayerInfo', sendPlayerInfo)
  socket.on('clientAvatarPosition', sendAvatarPosition)
}
