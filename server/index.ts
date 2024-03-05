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
      // 메시지를 나를 포함한 모든 사람에게 전송
      if (data.roomNum === '') return
      io.to(data.roomNum).emit('serverMsg', { ...data, senderId: socket.id })
    })

    socket.on('joinRoom', ({ roomNum }) => {
      if (roomNum === '') return
      // 방에 입장시키기
      socket.join(roomNum)
    })

    // 입장 메시지 보내기
    socket.on('sendPlayerInfo', (playerInfo) => {
      io.to(playerInfo.roomNum).emit('serverMsg', {
        senderId: socket.id,
        nickName: '',
        message: `${playerInfo.nickName}님이 입장했습니다.`,
        roomNum: playerInfo.roomNum,
        newPlayerId: socket.id,
      })
      // 입장한 유저 정보 나를 제외한 모든 사람에게 전송
      socket.broadcast
        .to(playerInfo.roomNum)
        .emit('receivePlayerInfo', { ...playerInfo, socketId: socket.id })
    })

    // 매순간 나를 제외한 모든 사람에게 위치 정보 전송
    socket.on('sendAvatarPosition', (avatarPosition) => {
      socket.broadcast
        .to(avatarPosition.roomNum)
        .emit('receiveAvatarPosition', {
          ...avatarPosition,
          socketId: socket.id,
        })
    })

    // 새로운 유저에게 나의 위치 정보 전송
    socket.on('sendPlayerInfoToNewPlayer', (playerInfo) => {
      if (socket.id === playerInfo.newPlayerId) return
      io.to(playerInfo.newPlayerId).emit(
        'receivePlayerInfoFromExistingPlayer',
        {
          ...playerInfo,
          socketId: socket.id,
        },
      )
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
