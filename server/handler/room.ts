import { Socket } from 'socket.io'
import { room } from '..'
import {
  ClientAvatarPosition,
  ClientJoinRoom,
  Chat,
  ClientToServerEvents,
  ServerToClientEvents,
} from '../../types/socket'

export const roomHandler = (
  socket: Socket<ClientToServerEvents, ServerToClientEvents>,
  io: any,
) => {
  const joinRoom = ({ roomNum, nickname, texture }: ClientJoinRoom) => {
    if (!room[roomNum]) {
      room[roomNum] = {
        users: [],
        video: [],
        chair: new Set(),
      }
    }

    const newUser = {
      nickname,
      texture,
      roomNum,
      socketId: socket.id,
    }

    room[roomNum].users.push(newUser)

    // 방에 입장시키기
    socket.join(roomNum)

    // 방 입장 메시지 보내기
    io.to(roomNum).emit('serverChat', {
      id: '',
      sender: '',
      message: `${nickname}님이 입장했습니다.`,
      roomNum,
      socketId: '',
    })

    // 다른 사람들의 정보를 나에게 전송
    io.to(socket.id).emit('serverRoomMember', room[roomNum].users)

    // 나의 정보를 나를 제외한 모두에게 전송
    socket.broadcast.to(roomNum).emit('serverPlayerInfo', newUser)

    // 누군가 앉아있는 의자들 목록 알려주기
    if (room[roomNum].chair) {
      io.to(socket.id).emit(
        'serverOccupiedChairs',
        Array.from(room[roomNum].chair),
      )
    }

    socket.on('disconnect', () => {
      room[roomNum].users = room[roomNum].users.filter(
        (r) => r.socketId !== socket.id,
      )

      io.to(roomNum).emit('serverLeaveRoom', socket.id)
    })
  }

  const sendMessage = (clientChat: Chat) => {
    if (clientChat.roomNum === '') return

    io.to(clientChat.roomNum).emit('serverChat', {
      ...clientChat,
      socketId: socket.id,
    })
  }

  const sendAvatarPosition = (avatarPosition: ClientAvatarPosition) => {
    socket.broadcast.to(avatarPosition.roomNum).emit('serverAvatarPosition', {
      ...avatarPosition,
      socketId: socket.id,
    })
  }

  socket.on('clientJoinRoom', joinRoom)
  socket.on('clientChat', sendMessage)
  socket.on('clientAvatarPosition', sendAvatarPosition)
}
