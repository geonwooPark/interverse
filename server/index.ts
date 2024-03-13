import express from 'express'
import http from 'http'
import { Server, Socket } from 'socket.io'
import cors from 'cors'
import { ClientToServerEvents, ServerToClientEvents } from '../types/socket'
import { instrument } from '@socket.io/admin-ui'
import { videoRoomHandler } from './handler/videoRoom'
import { roomHandler } from './handler/room'
import { chairHandler } from './handler/chair'

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

export const occupiedChairs: Record<string, Map<string, string>> = {}

io.on(
  'connection',
  (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
    roomHandler(socket, io)
    videoRoomHandler(socket, io)
    chairHandler(socket)

    socket.on('disconnecting', () => {
      const rooms = Array.from(socket.rooms)
      if (rooms.length === 1) return
      // 방에서 비정상적인 종료
      if (rooms.length === 2) {
        io.to(rooms[1]).emit('serverLeaveRoom', socket.id)
      }
      if (rooms.length === 3) {
        // 비디오룸에서 비정상적인 종료
        if (rooms[2].endsWith('video')) {
          io.to(rooms[1]).emit('serverLeaveRoom', socket.id)
          io.to(rooms[1]).emit('serverUpdateVideoRoomMember', socket.id)
          delete videoRoom[rooms[1]][socket.id]
        }
        // 의자에 앉아있다가 비정상적인 종료
        else if (rooms[2].endsWith('chair')) {
          io.to(rooms[1]).emit('serverLeaveRoom', socket.id)
          io.to(rooms[1]).emit(
            'serverChairId',
            occupiedChairs[rooms[1]].get(socket.id) as any,
          )
          occupiedChairs[rooms[1]].delete(socket.id)
        }
      }
      console.log(rooms)
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
