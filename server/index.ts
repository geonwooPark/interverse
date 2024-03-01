import express from 'express'
import http from 'http'
import { Server, Socket } from 'socket.io'
import cors from 'cors'
import { ClientToServerEvents, ServerToClientEvents } from '../types/socket'
import { instrument } from '@socket.io/admin-ui'

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

io.on(
  'connection',
  (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
    socket.on('clientMsg', (data) => {
      // 자신을 포함한 모든 사람에게 방송
      // io.sockets.emit('serverMsg', data)
      // 자신을 제외한 모든 사람에게 방송
      // socket.broadcast.emit('serverMsg', data)
      if (data.roomNum === '') return
      console.log(data.msg)
      io.to(data.roomNum).emit('serverMsg', data)
    })

    socket.on('joinRoom', (roomNum: string) => {
      if (roomNum === '') return
      console.log(roomNum)
      socket.join(roomNum)
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
