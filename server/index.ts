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
      // 메시지를 보낸 사람을 포함한 모든 사람에게 전송
      if (data.roomNum === '') return
      io.to(data.roomNum).emit('serverMsg', data)
    })

    socket.on('joinRoom', ({ roomNum, authCookie }) => {
      if (roomNum === '') return
      // 기존 방의 멤버 정보를 조인한 사람에게 보내기
      const roomMember = io.sockets.adapter.rooms.get(roomNum)
      io.to(socket.id).emit(
        'roomMember',
        roomMember ? Array.from(roomMember) : [],
      )
      // 조인한 사람을 제외한 다른 멤버들에게 조인한 사람의 정보 보내기
      socket.broadcast
        .to(roomNum)
        .emit('newMember', { ...authCookie, member: socket.id })
      // 방에 입장시키기
      socket.join(roomNum)
    })

    socket.on('sendPlayerInfo', (data) => {
      console.log(data)
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
