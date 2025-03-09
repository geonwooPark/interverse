import { io, Socket } from 'socket.io-client'
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../../../types/socket'

export class SocketManager {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>

  constructor() {
    this.socket = io(import.meta.env.VITE_BACKEND, {
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

    // 서버에서 DM 받기
    // this.socket.on('serverDirectMessage', (messageData) =>
    //   store.dispatch(addDM({ id: Math.random(), ...messageData })),
    // )
  }

  disconnect() {
    this.socket.disconnect()
  }
}
