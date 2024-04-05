import { Socket } from 'socket.io'
import { videoRoom } from '..'
import {
  ClientHandleCamera,
  ClientJoinVideoRoom,
  ClientToServerEvents,
  ServerToClientEvents,
} from '../../types/socket'

export const videoRoomHandler = (
  socket: Socket<ClientToServerEvents, ServerToClientEvents>,
  io: any,
) => {
  const joinVideoRoom = ({
    roomNum,
    peerId,
    nickName,
    texture,
    isVideoEnabled,
  }: ClientJoinVideoRoom) => {
    if (!peerId || !roomNum || !nickName) return
    if (!videoRoom[roomNum]) videoRoom[roomNum] = {}
    if (videoRoom[roomNum][socket.id]) return
    if (Object.keys(videoRoom[roomNum]).length >= 7) return

    videoRoom[roomNum][socket.id] = {
      peerId,
      socketId: socket.id,
      nickName,
    }
    socket.join(`${roomNum}_video`)

    socket.broadcast.to(`${roomNum}_video`).emit('serverJoinVideoRoom', {
      peerId,
      socketId: socket.id,
      nickName,
      texture,
      isVideoEnabled,
    })

    socket.on('disconnect', () => {
      leaveVideoRoom(roomNum)
    })
  }

  const handleCamera = ({ isVideoEnabled, roomNum }: ClientHandleCamera) => {
    io.to(`${roomNum}_video`).emit('serverHandleCamera', {
      socketId: socket.id,
      isVideoEnabled,
    })
  }

  const leaveVideoRoom = (roomNum: string) => {
    if (!videoRoom[roomNum]) return
    socket.broadcast.to(roomNum).emit('serverUpdateVideoRoomMember', socket.id)
    delete videoRoom[roomNum][socket.id]
    io.to(socket.id).emit('serverLeaveVideoRoom')
  }

  socket.on('clientJoinVideoRoom', joinVideoRoom)
  socket.on('clientHandleCamera', handleCamera)
  socket.on('clientLeaveVideoRoom', leaveVideoRoom)
}
