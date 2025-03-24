import { Socket } from 'socket.io'
import { ClientToServerEvents, ServerToClientEvents } from '../../types/socket'

export const videoRoomHandler = (
  socket: Socket<ClientToServerEvents, ServerToClientEvents>,
  io: any,
) => {
  const joinVideoRoom = () => {}

  const handleCamera = () => {}

  const leaveVideoRoom = () => {}

  socket.on('clientJoinVideoRoom', joinVideoRoom)
  socket.on('clientHandleCamera', handleCamera)
  socket.on('clientLeaveVideoRoom', leaveVideoRoom)
}
