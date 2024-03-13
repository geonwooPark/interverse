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
    chairHandler(socket, io)

    socket.on('disconnecting', () => {
      console.log('유저 연결 끊김..')
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
