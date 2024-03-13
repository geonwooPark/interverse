import { Socket } from 'socket.io'
import {
  ClientChairId,
  ClientToServerEvents,
  ServerToClientEvents,
} from '../../types/socket'
import { occupiedChairs } from '..'

export const chairHandler = (
  socket: Socket<ClientToServerEvents, ServerToClientEvents>,
  io: any,
) => {
  const sendChairId = ({ roomNum, chairId }: ClientChairId) => {
    if (!occupiedChairs[roomNum]) occupiedChairs[roomNum] = new Map()

    if (occupiedChairs[roomNum].has(socket.id)) {
      occupiedChairs[roomNum].delete(socket.id)
    } else {
      occupiedChairs[roomNum].set(socket.id, chairId)
    }

    socket.broadcast.to(roomNum).emit('serverChairId', chairId)

    socket.on('disconnect', () => {
      leaveChair(roomNum)
    })
  }

  const leaveChair = (roomNum: string) => {
    io.to(roomNum).emit('serverChairId', occupiedChairs[roomNum].get(socket.id))
    occupiedChairs[roomNum].delete(socket.id)
  }

  socket.on('clientChairId', sendChairId)
}
