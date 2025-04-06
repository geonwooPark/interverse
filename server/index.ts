import express from 'express'
import http from 'http'
import { Server, Socket } from 'socket.io'
import cors from 'cors'
import { videoRoomHandler } from './handler/videoRoom'
import { roomHandler } from './handler/room'
import { chairHandler } from './handler/chair'
import { chatHandler } from './handler/chat'
import { playHandler } from './handler/play'
import { dmHandler } from './handler/dm'
import {
  ClientToServerEvents,
  IRoomUser,
  ServerToClientEvents,
} from '../types/socket'
import * as mediasoup from 'mediasoup'

const app = express()

app.use(cors())

const server = http.createServer(app)

const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
  cors: {
    origin: [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'https://www.interverse.kr',
    ],
    methods: ['GET', 'POST'],
    credentials: true,
  },
})

export const room: Record<
  string,
  {
    users: IRoomUser
    video: Map<
      string,
      {
        transport: mediasoup.types.WebRtcTransport
        producers?: mediasoup.types.Producer[]
        consumers?: mediasoup.types.Consumer[]
      }
    >

    chair: Set<string>
  }
> = {}

io.on(
  'connection',
  (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
    roomHandler(socket, io)
    playHandler(socket, io)
    chatHandler(socket, io)
    chairHandler(socket, io)
    dmHandler(socket, io)
    videoRoomHandler(socket, io)

    socket.on('disconnecting', () => {
      console.log('유저 연결 끊김..')
    })
  },
)

server.listen(8000, () => {
  console.log('서버 실행중...')
})
