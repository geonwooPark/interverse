import { Socket, io } from 'socket.io-client'
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../../../types/socket'
import {
  JoinRoomType,
  SendAvatarPositionType,
  SendMessageType,
  SendPlayerInfoToNewPlayerType,
  SendPlayerInfoType,
} from '../types/game'
import phaserGame from '../PhaserGame'
import Game from '../scenes/Game'
import { store } from '../store/store'
import { addMessage } from '../store/features/chatListSlice'

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  'http://localhost:3000',
)

export const joinRoom = ({ roomNum, authCookie }: JoinRoomType) => {
  // 서버로 방 번호와 쿠키 전달
  socket.emit('joinRoom', {
    roomNum,
    authCookie,
  })
  // 서버에서 방에서 나간 유저 정보 받기
  socket.on('leaveRoom', (sockerId) => {
    const game = phaserGame.scene.keys.game as Game
    game.removeOtherPlayer(sockerId)
  })
}

export const sendPlayerInfo = ({
  x,
  y,
  nickName,
  texture,
  roomNum,
}: SendPlayerInfoType) => {
  // 서버로 나의 아바타 정보 전달
  socket.emit('sendPlayerInfo', {
    x,
    y,
    nickName,
    texture,
    roomNum,
  })
  // 서버에서 새로운 유저 정보 받기
  socket.on('receivePlayerInfo', (playerInfo) => {
    const game = phaserGame.scene.keys.game as Game
    game.addOtherPlayer(playerInfo)
  })

  // 서버에서 입장 메시지 받기
  socket.on('serverMsg', (messageData) => {
    const game = phaserGame.scene.keys.game as Game
    store.dispatch(addMessage(messageData))
    game.displayOtherPlayerChat({
      message: messageData.message,
      socketId: messageData.senderId,
    })

    // 새로운 유저 입장 시 실행되는 함수
    game.player.sendPlayerInfoToNewPlayer({
      roomNum: messageData.roomNum,
      newPlayerId: messageData.newPlayerId || '',
    })
  })
}

export const sendPlayerInfoToNewPlayer = ({
  x,
  y,
  nickName,
  texture,
  roomNum,
  newPlayerId,
}: SendPlayerInfoToNewPlayerType) => {
  // 새로운 유저에게 나의 정보 전달
  socket.emit('sendPlayerInfoToNewPlayer', {
    x,
    y,
    nickName,
    texture,
    roomNum,
    newPlayerId,
  })

  // 서버에서 방에 있던 기존 유저 정보 받기
  socket.on('receivePlayerInfoFromExistingPlayer', (playerInfo) => {
    const game = phaserGame.scene.keys.game as Game
    game.addOtherPlayer(playerInfo)
  })
}

export const sendMessage = ({
  message,
  senderId,
  nickName,
  roomNum,
}: SendMessageType) => {
  // 서버로 메시지 보내기
  socket.emit('clientMsg', {
    message,
    senderId: '',
    nickName,
    roomNum,
  })
}

export const sendAvatarPosition = ({
  x,
  y,
  socketId,
  roomNum,
  animation,
}: SendAvatarPositionType) => {
  // 서버로 실시간 나의 위치 정보 보내기
  socket.emit('sendAvatarPosition', {
    x,
    y,
    socketId,
    roomNum,
    animation,
  })

  // 서버로부터 다른 모든 유저들 위치 정보 받기
  socket.on('receiveAvatarPosition', (avatarPosition) => {
    const game = phaserGame.scene.keys.game as Game
    game.updateOtherPlayer({
      x: avatarPosition.x,
      y: avatarPosition.y,
      socketId: avatarPosition.socketId as string,
      animation: avatarPosition.animation,
    })
  })
}
