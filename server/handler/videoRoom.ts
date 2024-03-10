import { Socket } from 'socket.io'
import { videoRoom } from '..'
import { ClientToServerEvents, ServerToClientEvents } from '../../types/socket'

interface JoinVideoRoomType {
  roomNum: string
  peerId: string
  nickName: string
}

export const videoRoomHandler = (
  socket: Socket<ClientToServerEvents, ServerToClientEvents>,
) => {
  const createVideoRoom = (roomNum: string) => {
    videoRoom[roomNum] = videoRoom[roomNum] || {}
    socket.emit('createVideoRoom', roomNum)
  }

  const joinVideoRoom = ({ roomNum, peerId, nickName }: JoinVideoRoomType) => {
    if (!peerId) return
    if (!videoRoom[roomNum]) videoRoom[roomNum] = {}
    if (videoRoom[roomNum][socket.id]) return

    videoRoom[roomNum][socket.id] = {
      peerId,
      socketId: socket.id,
      nickName,
    }
    socket.join(`${roomNum}_video`)

    console.log(videoRoom[roomNum])

    socket.broadcast
      .to(`${roomNum}_video`)
      .emit('joinedUsers', { peerId, socketId: socket.id, nickName })
    socket.to(`${roomNum}_video`).emit('getUsers', {
      socketId: socket.id,
      members: videoRoom[roomNum],
    })
  }

  const leaveVideoRoom = () => {
    const rooms = Array.from(socket.rooms)
    if (rooms.length === 3) {
      socket.to(rooms[1]).emit('leaveVideoRoom', socket.id)

      delete videoRoom[rooms[1]][socket.id]
    }

    console.log(videoRoom[rooms[1]])
  }

  socket.on('createVideoRoom', createVideoRoom)
  socket.on('joinVideoRoom', joinVideoRoom)
  socket.on('leaveVideoRoom', leaveVideoRoom)
}
