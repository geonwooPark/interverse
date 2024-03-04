import { Socket, io } from 'socket.io-client'
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../../../types/socket'
import { store } from '../store/store'
import { addMessage } from '../store/features/chatListSlice'
import phaserGame from '../PhaserGame'
import Game from '../scenes/Game'
import {
  JoinRoomType,
  SendAvatarPositionType,
  SendMessageType,
  SendPlayerInfoType,
} from '../types/game'

export default class SocketIO {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>
  constructor() {
    this.socket = io('http://localhost:3000')
  }

  joinRoom({ roomNum, authCookie }: JoinRoomType) {
    this.socket.emit('joinRoom', {
      roomNum,
      authCookie,
    })
  }

  sendPlayerInfo({ x, y, nickName, texture, roomNum }: SendPlayerInfoType) {
    this.socket.emit('sendPlayerInfo', {
      x,
      y,
      nickName,
      texture,
      roomNum,
    })

    this.socket.on('receivePlayerInfo', (data) => {
      const game = phaserGame.scene.keys.game as Game
      game.addOtherPlayer(data)
    })
    this.socket.on('serverMsg', (data) => {
      store.dispatch(addMessage(data))
    })
  }

  sendMessage({ message, sender, roomNum }: SendMessageType) {
    this.socket.emit('clientMsg', {
      message,
      sender,
      roomNum,
    })
  }

  sendAvatarPosition({
    x,
    y,
    socketId,
    roomNum,
    animation,
  }: SendAvatarPositionType) {
    this.socket.emit('sendAvatarPosition', {
      x,
      y,
      socketId,
      roomNum,
      animation,
    })

    this.socket.on('receiveAvatarPosition', (avatarPosition) => {
      // console.log(avatarPosition.direction)
      const game = phaserGame.scene.keys.game as Game
      game.updateOtherPlayer({
        x: avatarPosition.x,
        y: avatarPosition.y,
        socketId: avatarPosition.socketId as string,
        animation: avatarPosition.animation,
      })
    })
  }
}
