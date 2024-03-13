import { Socket } from 'socket.io'
import {
  ClientChairId,
  ClientToServerEvents,
  ServerToClientEvents,
} from '../../types/socket'
import { occupiedChairs } from '..'

export const chairHandler = (
  socket: Socket<ClientToServerEvents, ServerToClientEvents>,
) => {
  const sendChairId = ({ roomNum, chairId }: ClientChairId) => {
    if (!occupiedChairs[roomNum]) occupiedChairs[roomNum] = new Map()

    if (occupiedChairs[roomNum].has(socket.id)) {
      occupiedChairs[roomNum].delete(socket.id)
      socket.leave(`${roomNum}_chair`)
    } else {
      occupiedChairs[roomNum].set(socket.id, chairId)
      socket.join(`${roomNum}_chair`)
    }

    socket.broadcast.to(roomNum).emit('serverChairId', chairId)
  }

  socket.on('clientChairId', sendChairId)
}
