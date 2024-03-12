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

export const seated: Record<string, string[]> = {}

io.on(
  'connection',
  (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
    // 방 관리
    roomHandler(socket, io)
    videoRoomHandler(socket, io)

    const checkChairId = ({
      roomNum,
      chairId,
    }: {
      roomNum: string
      chairId: string
    }) => {
      if (!seated[roomNum]) seated[roomNum] = []
      seated[roomNum].push(chairId)
      console.log(seated)
      socket.broadcast.to(roomNum).emit('serverChairId', chairId)
    }

    const 앉았다일어나기 = ({
      roomNum,
      chairId,
    }: {
      roomNum: string
      chairId: string
    }) => {
      seated[roomNum] = seated[roomNum].filter((r) => r !== chairId)
      socket.broadcast.to(roomNum).emit('serverStandUp', chairId)
      console.log(seated)
    }

    socket.on('clientChairId', checkChairId)
    socket.on('clientStandUp', 앉았다일어나기)

    // 연결 끊어질 시
    socket.on('disconnecting', () => {
      const rooms = Array.from(socket.rooms)
      if (rooms.length === 1) return
      if (rooms.length === 2) {
        io.to(rooms[1]).emit('leaveRoom', socket.id)
      }
      if (rooms.length === 3) {
        io.to(rooms[1]).emit('leaveRoom', socket.id)
        io.to(rooms[1]).emit('updateVideoRoom', socket.id)

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
