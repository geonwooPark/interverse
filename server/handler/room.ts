import { Socket } from 'socket.io'
import { occupiedChairs, rooms } from '..'
import {
  ClientAvatarPosition,
  ClientJoinRoom,
  ClientMessage,
  ClientToServerEvents,
  ServerToClientEvents,
} from '../types/server'

export const roomHandler = (
  socket: Socket<ClientToServerEvents, ServerToClientEvents>,
  io: any,
) => {
  const joinRoom = ({ authCookie, texture, animation }: ClientJoinRoom) => {
    if (!authCookie) return
    const { roomNum, nickName } = authCookie
    if (!rooms[roomNum]) rooms[roomNum] = {}

    // 방에 입장시키기
    socket.join(roomNum)

    // 방 입장 메시지 보내기
    io.to(roomNum).emit('serverMsg', {
      senderId: socket.id,
      nickName: '',
      message: `${nickName}님이 입장했습니다.`,
      roomNum,
      newPlayerId: socket.id,
    })

    // 나의 아바타 정보를 나를 제외한 모두에게 전송
    socket.broadcast.to(roomNum).emit('serverPlayerInfo', {
      nickName,
      roomNum,
      texture,
      animation,
      socketId: socket.id,
    })

    // 다른 사람들의 아바타 정보를 나에게 전송
    io.to(socket.id).emit('serverRoomMember', rooms[roomNum])

    if (rooms[roomNum]) {
      rooms[roomNum][socket.id] = {
        nickName,
        texture,
        animation,
        roomNum,
        socketId: socket.id,
      }
    }

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

  const sendAvatarPosition = (avatarPosition: ClientAvatarPosition) => {
    socket.broadcast.to(avatarPosition.roomNum).emit('serverAvatarPosition', {
      ...avatarPosition,
      socketId: socket.id,
    })
  }

  socket.on('clientJoinRoom', joinRoom)
  socket.on('clientMsg', sendMessage)
  socket.on('clientAvatarPosition', sendAvatarPosition)
}
