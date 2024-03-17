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
  ClientToServerEvents,
  ServerPlayerInfo,
  ServerToClientEvents,
} from '../types/socket'

interface WS {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>
  game: Game | null
  occupiedChairs: string[]
  joinRoom: ({ authCookie }: ClientJoinRoom) => void
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
  socket: io(import.meta.env.VITE_BACKEND),
  game: null,
  occupiedChairs: [],

  joinRoom: ({ authCookie, texture, animation }) => {
    ws.game = phaserGame.scene.keys.game as Game
    ws.game.player.setNickname(authCookie.nickName)
    ws.game.player.setAvatarTexture(authCookie.texture)
    ws.game.player.setPosition(
      authCookie.role === 'host' ? 260 : 720,
      authCookie.role === 'host' ? 520 : 170,
    )

    // 서버로 쿠키와 아바타 정보 전달
    ws.socket.emit('clientJoinRoom', { authCookie, texture, animation })
    // 서버에서 입장 메시지 받기
    ws.socket.on('serverMsg', (messageData) => {
      if (!ws.game) return
      store.dispatch(addMessage(messageData))
      ws.game.displayOtherPlayerChat({
        message: messageData.message,
        socketId: messageData.senderId,
      })
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
        ws.game.addOtherPlayer(users[user] as unknown as ServerPlayerInfo)
      }
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
