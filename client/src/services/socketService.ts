import { io, Socket } from 'socket.io-client'
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../../../types/socket'

class SocketService {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>

  constructor() {
    this.socket = io(import.meta.env.VITE_SOCKET_SERVER, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    })

    this.initialize()
  }

  private initialize() {
    this.socket.on('disconnect', () => {
      console.warn('🔴 서버와의 연결이 끊어졌습니다. 재연결 시도 중...')
    })

    this.socket.on('connect', () => {
      console.log('🟢 서버에 연결되었습니다.')
    })
  }

  disconnect() {
    this.socket.disconnect()
  }
}

export const socketService = new SocketService()
