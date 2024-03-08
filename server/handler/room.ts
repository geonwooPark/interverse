import { Socket } from 'socket.io'
import {
  ClientToServerEvents,
  PlayerInfo,
  PlayerInfoFromExistingPlayerToNewPlayer,
  PlayerPosition,
  ServerToClientEvents,
} from '../../types/socket'

interface MessageData {
  message: string
  nickName: string
  roomNum: string
  senderId: string
  newPlayerId?: string
}

export const roomHandler = (
  socket: Socket<ClientToServerEvents, ServerToClientEvents>,
  io: any,
) => {
  const sendMessage = (data: MessageData) => {
    if (data.roomNum === '') return
    socket.to(data.roomNum).emit('serverMsg', { ...data, senderId: socket.id })
  }

  const joinRoom = ({ roomNum }: { roomNum: string }) => {
    if (roomNum === '') return
    // 방에 입장시키기
    socket.join(roomNum)
  }

  const sendPlayerInfo = (playerInfo: PlayerInfo) => {
    io.to(playerInfo.roomNum).emit('serverMsg', {
      senderId: socket.id,
      nickName: '',
      message: `${playerInfo.nickName}님이 입장했습니다.`,
      roomNum: playerInfo.roomNum,
      newPlayerId: socket.id,
    })
    socket.broadcast
      .to(playerInfo.roomNum)
      .emit('receivePlayerInfo', { ...playerInfo, socketId: socket.id })
  }

  const sendAvatarPosition = (avatarPosition: PlayerPosition) => {
    socket.broadcast.to(avatarPosition.roomNum).emit('receiveAvatarPosition', {
      ...avatarPosition,
      socketId: socket.id,
    })
  }

  const sendPlayerInfoToNewPlayer = (
    playerInfo: PlayerInfoFromExistingPlayerToNewPlayer,
  ) => {
    if (socket.id === playerInfo.newPlayerId) return
    socket
      .to(playerInfo.newPlayerId)
      .emit('receivePlayerInfoFromExistingPlayer', {
        ...playerInfo,
        socketId: socket.id,
      })
  }

  socket.on('clientMsg', sendMessage)
  socket.on('joinRoom', joinRoom)
  socket.on('sendPlayerInfo', sendPlayerInfo)
  socket.on('sendAvatarPosition', sendAvatarPosition)
  socket.on('sendPlayerInfoToNewPlayer', sendPlayerInfoToNewPlayer)
}
