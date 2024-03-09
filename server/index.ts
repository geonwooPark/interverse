import express from 'express'
import http from 'http'
import { Server, Socket } from 'socket.io'
import cors from 'cors'
import { ClientToServerEvents, ServerToClientEvents } from '../types/socket'
import { instrument } from '@socket.io/admin-ui'
import { videoRoomHandler } from './handler/videoRoom'
import { roomHandler } from './handler/room'

const app = express()
app.use(cors())

const server = http.createServer(app)
const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
  cors: {
    origin: ['http://localhost:5173', 'https://admin.socket.io'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
})

export const videoRoom: Record<string, Record<string, IUser>> = {}
interface IUser {
  peerId: string
  socketId: string
  nickName: string
}

io.on(
  'connection',
  (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
    // 방 관리
    roomHandler(socket, io)
    videoRoomHandler(socket)

    // 연결 끊어질 시
    socket.on('disconnecting', () => {
      const rooms = Array.from(socket.rooms)
      if (rooms.length === 1) return
      if (rooms.length === 2) {
        io.to(rooms[1]).emit('leaveRoom', socket.id)
      }
      // ######## 새로고침 시 간헐적 에러 ########
      if (rooms.length === 3) {
        io.to(rooms[1]).emit('leaveRoom', socket.id)
        socket
          .to(`${rooms[1]}_video`)
          .emit('leaveVideoRoom', videoRoom[rooms[1]][socket.id].peerId)
        delete videoRoom[rooms[1]][socket.id]
      }
    })
  },
)

// 추후 삭제 예정 (socket admin)
instrument(io, {
  auth: false,
})

server.listen(3000, () => {
  console.log('서버 실행중..')
})
