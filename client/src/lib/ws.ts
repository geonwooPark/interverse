import { Socket, io } from 'socket.io-client'
import phaserGame from '../PhaserGame'
import Game from '../scenes/Game'
import { store } from '../store/store'
import { addMessage } from '../store/features/chatListSlice'
import {
  ClientAvatarPosition,
  ClientChairId,
  ClientJoinRoom,
  ClientMessage,
  ClientPlayerInfo,
  ClientToServerEvents,
  ServerToClientEvents,
} from '../types/socket'
import { AddOtherPlayerType } from '../types/client'

interface WS {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>
  game: Game | null
  occupiedChairs: string[]
  joinRoom: ({ roomNum, authCookie }: ClientJoinRoom) => void
  sendPlayerInfo: ({
    x,
    y,
    nickName,
    texture,
    roomNum,
  }: ClientPlayerInfo) => void
  sendMessage: ({ message, nickName, senderId, roomNum }: ClientMessage) => void
  sendAvatarPosition: ({
    x,
    y,
    roomNum,
    animation,
  }: ClientAvatarPosition) => void
  sendChairId: ({ roomNum, chairId }: ClientChairId) => void
  receiveChairId: () => void
}

export const ws: WS = {
  // socket: io(`https://server-interverse-team94.koyeb.app`),
  socket: io('http://localhost:3000'),
  game: null,
  occupiedChairs: [],

  joinRoom: ({ roomNum, authCookie }) => {
    ws.game = phaserGame.scene.keys.game as Game

    // 서버로 방 번호와 쿠키 전달
    ws.socket.emit('clientJoinRoom', {
      roomNum,
      authCookie,
    })
    // 방에 입장했을 때 이미 누군가 앉아있는 의자들
    ws.socket.on('serverOccupiedChairs', (chairs) => {
      if (!chairs) return
      ws.occupiedChairs = [...chairs]
    })
    // 서버에서 방에서 나간 유저 정보 받기
    ws.socket.on('serverLeaveRoom', (socketId) => {
      if (!ws.game) return
      ws.game.removeOtherPlayer(socketId)
    })
  },

  sendPlayerInfo: ({ x, y, nickName, texture, animation, roomNum }) => {
    // 서버로 나의 아바타 정보 전달
    ws.socket.emit('clientPlayerInfo', {
      x,
      y,
      nickName,
      texture,
      animation,
      roomNum,
    })
    // 서버에서 기존 방의 유저들이 새로운 유저의 정보 받기
    ws.socket.on('serverPlayerInfo', (playerInfo) => {
      if (!ws.game) return
      ws.game.addOtherPlayer(playerInfo)
    })
    // 서버에서 새로운 유저가 방에 존재하는 유저들의 정보 받기
    ws.socket.on('serverRoomMember', (users) => {
      if (!ws.game) return
      for (const user in users) {
        ws.game.addOtherPlayer(users[user] as unknown as AddOtherPlayerType)
      }
    })

    // 서버에서 입장 메시지 받기
    ws.socket.on('serverMsg', (messageData) => {
      if (!ws.game) return
      store.dispatch(addMessage(messageData))
      ws.game.displayOtherPlayerChat({
        message: messageData.message,
        socketId: messageData.senderId,
      })
    })
  },

  sendMessage: ({ message, nickName, senderId, roomNum }) => {
    ws.socket.emit('clientMsg', {
      message,
      senderId,
      nickName,
      roomNum,
    })
  },

  sendAvatarPosition: ({ x, y, roomNum, animation }) => {
    // 서버로 실시간 나의 위치 정보 보내기
    ws.socket.emit('clientAvatarPosition', {
      x,
      y,
      roomNum,
      animation,
    })
    // 서버로부터 다른 모든 유저들 위치 정보 받기
    ws.socket.on('serverAvatarPosition', (avatarPosition) => {
      if (!ws.game) return
      ws.game.updateOtherPlayer(avatarPosition)
    })
  },

  sendChairId: ({ roomNum, chairId }) => {
    ws.socket.emit('clientChairId', { roomNum, chairId })
  },

  receiveChairId: () => {
    ws.socket.on('serverChairId', (chairId: string) => {
      ws.occupiedChairs.includes(chairId)
        ? (ws.occupiedChairs = ws.occupiedChairs.filter((r) => r !== chairId))
        : ws.occupiedChairs.push(chairId)
    })
  },
}
