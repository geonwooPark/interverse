import express from 'express'
import http from 'http'
import { Server, Socket } from 'socket.io'
import cors from 'cors'
import { instrument } from '@socket.io/admin-ui'
import { videoRoomHandler } from './handler/videoRoom'
import { roomHandler } from './handler/room'
import { chairHandler } from './handler/chair'

interface ServerMessage {
  message: string
  nickName: string
  roomNum: string
  senderId: string
  newPlayerId?: string
}

interface ClientMessage {
  message: string
  nickName: string
  roomNum: string
  senderId: string
  newPlayerId?: string
}

interface ClientJoinRoom {
  roomNum: string
  authCookie: {
    roomNum: string
    role: 'host' | 'guest'
    nickName: string
    path: string
    texture: string
  }
}

interface ServerPlayerInfo {
  x: number
  y: number
  nickName: string
  texture: string
  roomNum: string
  socketId: string
}

interface ClientPlayerInfo {
  x: number
  y: number
  nickName: string
  texture: string
  roomNum: string
}

interface ServerAvatarPosition {
  x: number
  y: number
  socketId: string
  animation: any
}

interface ClientAvatarPosition {
  x: number
  y: number
  roomNum: string
  animation: any
}

interface ServerOtherAvatarPosition {
  x: number
  y: number
  nickName: string
  texture: string
  roomNum: string
  newPlayerId: string
  socketId: string
}

interface ClientOtherAvatarPosition {
  x: number
  y: number
  nickName: string
  texture: string
  animation: string
  roomNum: string
  newPlayerId: string
}

interface IUser {
  peerId: string
  socketId: string
  nickName: string
}

interface ClientJoinVideoRoom {
  roomNum: string
  peerId: string
  nickName: string
}

interface ServerJoinVideoRoom {
  socketId: string
  peerId: string
  nickName: string
}

interface ClientChairId {
  roomNum: string
  chairId: string
}

interface ServerToClientEvents {
  serverLeaveRoom: (sockerId: string) => void
  serverMsg: (message: ServerMessage) => void
  serverPlayerInfo: ({
    x,
    y,
    nickName,
    texture,
    roomNum,
    socketId,
  }: ServerPlayerInfo) => void
  serverAvatarPosition: ({
    x,
    y,
    animation,
    socketId,
  }: ServerAvatarPosition) => void
  serverOtherAvatarPosition: ({
    x,
    y,
    nickName,
    texture,
    roomNum,
    socketId,
    newPlayerId,
  }: ServerOtherAvatarPosition) => void
  serverJoinVideoRoom: ({
    peerId,
    socketId,
    nickName,
  }: ServerJoinVideoRoom) => void
  serverCreateVideoRoom: (roomNum: string) => void
  serverLeaveVideoRoom: () => void
  serverUpdateVideoRoomMember: (socketId: string) => void
  serverOccupiedChairs: (chairs: string[]) => void
  serverChairId: (chairId: string) => void
}

interface ClientToServerEvents {
  clientJoinRoom: ({ roomNum }: ClientJoinRoom) => void
  clientLeaveRoom: () => void
  clientMsg: (message: ClientMessage) => void
  clientPlayerInfo: ({
    x,
    y,
    nickName,
    texture,
    roomNum,
  }: ClientPlayerInfo) => void
  clientAvatarPosition: ({
    x,
    y,
    roomNum,
    animation,
  }: ClientAvatarPosition) => void
  clientOtherAvatarPosition: ({
    x,
    y,
    nickName,
    texture,
    animation,
    roomNum,
    newPlayerId,
  }: ClientOtherAvatarPosition) => void
  clientJoinVideoRoom: ({
    roomNum,
    peerId,
    nickName,
  }: ClientJoinVideoRoom) => void
  clientCreateVideoRoom: (roomNum: string) => void
  clientLeaveVideoRoom: (roomNum: string) => void
  clientChairId: ({ roomNum, chairId }: ClientChairId) => void
}

const app = express()
app.use(cors())

const server = http.createServer(app)

const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
  cors: {
    origin: [`team94-interverse.vercel.app`, 'https://admin.socket.io'],
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
