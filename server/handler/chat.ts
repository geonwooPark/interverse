import { Socket } from 'socket.io'
import {
  IChat,
  ClientToServerEvents,
  ServerToClientEvents,
} from '../../types/socket'

export const chatHandler = (
  socket: Socket<ClientToServerEvents, ServerToClientEvents>,
  io: any,
) => {
  const socketId = socket.id

  const sendMessage = (clientChat: IChat) => {
    if (clientChat.roomNum === '') return

    io.to(clientChat.roomNum).emit('serverChat', {
      ...clientChat,
      socketId,
    })
  }

  socket.on('clientChat', sendMessage)
}
