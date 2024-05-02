import { Socket } from 'socket.io'
import {
  ClientDirectMessage,
  ClientToServerEvents,
  ServerToClientEvents,
} from '../../types/socket'

export const directMessageHandler = (
  socket: Socket<ClientToServerEvents, ServerToClientEvents>,
  io: any,
) => {
  const sendDirectMessage = ({
    message,
    sender,
    senderId,
    receiverId,
  }: ClientDirectMessage) => {
    io.to(receiverId).emit('serverDirectMessage', { message, sender, senderId })
  }

  socket.on('clientDirectMessage', sendDirectMessage)
}
