import express from 'express'
import http from 'http'
import { Server, Socket } from 'socket.io'
import cors from 'cors'
import { videoRoomHandler } from './handler/videoRoom'
import { roomHandler } from './handler/room'
import { chairHandler } from './handler/chair'
import { ClientToServerEvents, ServerToClientEvents } from './types/server'

const app = express()
app.use(cors())

const server = http.createServer(app)

const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
  cors: {
    origin: [`team94-interverse.vercel.app`],
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

server.listen(3000, () => {
  console.log('서버 실행중..')
})
