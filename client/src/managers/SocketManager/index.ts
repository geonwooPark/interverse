import { io, Socket } from 'socket.io-client'
import Game from '@games/scenes/Game'
import { store } from '@store/store'
import { addMessage } from '@store/features/chatListSlice'
import {
  ClientAvatarPosition,
  ClientChairId,
  ClientDirectMessage,
  ClientHandleCamera,
  ClientMessage,
  ClientToServerEvents,
  RoomUser,
  ServerPlayerInfo,
  ServerToClientEvents,
} from '../../../../types/socket'
import { CookieType } from '../../../../types/client'
import { me } from '../peer'
import { addUser, deleteUser, setUsers } from '@store/features/usersSlice'
import { addPeerStream } from '@store/features/myStreamSlice'
import { MediaConnection } from 'peerjs'
import { addDM } from '@store/features/directMessageSlice'
import { ISocketIO } from './types'
import GameManager from '@managers/GameManager'

export class SocketManager implements ISocketIO {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>
  game!: Game

  constructor() {
    this.socket = io(import.meta.env.VITE_BACKEND, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    })

    this.game = GameManager.getInstance().scene.keys.game as Game
    this.setupListeners()
  }

  private setupListeners() {
    this.socket.on('disconnect', () => {
      console.warn('🔴 서버와의 연결이 끊어졌습니다. 재연결 시도 중...')
    })

    this.socket.on('connect', () => {
      console.log('🟢 서버에 연결되었습니다.')
    })

    // 서버에서 입장 메시지 받기
    this.socket.on('serverMsg', (messageData) => {
      if (!this.game) return
      store.dispatch(addMessage(messageData))

      this.game.displayChat({
        message: messageData.message,
        socketId: messageData.senderId,
      })
    })

    // 서버에서 DM 받기
    this.socket.on('serverDirectMessage', (messageData) =>
      store.dispatch(addDM({ id: Math.random(), ...messageData })),
    )

    // 서버에서 기존 방의 유저들이 새로운 유저의 정보 받기
    this.socket.on('serverPlayerInfo', (playerInfo) => {
      if (!this.game) return
      this.game.addOtherPlayer(playerInfo)
      store.dispatch(addUser(playerInfo))
    })

    // 서버에서 새로운 유저가 방에 존재하는 유저들의 정보 받기
    this.socket.on('serverRoomMember', (users) => {
      if (!this.game) return
      let userList: RoomUser[] = []
      for (const user in users) {
        userList = [...userList, users[user] as unknown as RoomUser]

        if (user === this.socket.id) continue
        this.game.addOtherPlayer(users[user] as unknown as ServerPlayerInfo)
      }
      store.dispatch(setUsers(userList))
    })

    // 방에 입장했을 때 이미 누군가 앉아있는 의자들
    this.socket.on('serverOccupiedChairs', (chairs) => {
      if (!this.game) return
      if (!chairs) return

      this.game.occupiedChairs = new Set([...chairs])
    })

    // 서버에서 방에서 나간 유저 정보 받기
    this.socket.on('serverLeaveRoom', (socketId) => {
      if (!this.game) return
      this.game.removeOtherPlayer(socketId)
      store.dispatch(deleteUser(socketId))
    })

    // 서버에서 이미 누군가 앉은 의자 목록 받기
    this.socket.on('serverChairId', (chairId: string) => {
      if (this.game.occupiedChairs.has(chairId)) {
        this.game.occupiedChairs.delete(chairId)
      } else {
        this.game.occupiedChairs.add(chairId)
      }
    })

    // 서버로부터 다른 모든 유저들 위치 정보 받기
    this.socket.on('serverAvatarPosition', (avatarPosition) => {
      this.game.updateOtherPlayer(avatarPosition)
    })
  }

  disconnect() {
    this.socket.disconnect()
  }

  // 방 참여하기
  joinRoom({
    roomNum,
    nickname,
    texture,
  }: {
    roomNum: string
    nickname: string
    texture: string
  }) {
    this.socket.emit('clientJoinRoom', {
      roomNum,
      nickname,
      texture,
    })
  }

  // 메시지 보내기
  sendMessage({ message, roomNum }: ClientMessage) {
    this.socket.emit('clientMsg', {
      message,
      roomNum,
    })
  }

  // 실시간 나의 위치 정보 보내기
  sendAvatarPosition({ x, y, roomNum, animation }: ClientAvatarPosition) {
    this.socket.emit('clientAvatarPosition', {
      x,
      y,
      roomNum,
      animation,
    })
  }

  // 내가 앉은 의자 아이디 보내기
  sendChairId({ roomNum, chairId }: ClientChairId) {
    this.socket.emit('clientChairId', { roomNum, chairId })
  }

  // 내 카메라 상태 보내기
  sendCameraStatus({ isVideoEnabled, roomNum }: ClientHandleCamera) {
    this.socket.emit('clientHandleCamera', {
      isVideoEnabled,
      roomNum,
    })
  }

  joinVideoRoom({
    authCookie,
    video,
    nickname,
    texture,
  }: {
    authCookie: CookieType
    video: boolean
    nickname: string
    texture: string
  }) {
    this.socket.emit('clientCreateVideoRoom', authCookie.roomNum)
    this.socket.emit('clientJoinVideoRoom', {
      roomNum: authCookie.roomNum,
      peerId: me.peer.id,
      nickname,
      texture,
      isVideoEnabled: video,
    })
  }

  callToOtherPlayer({
    stream,
    video,
    nickname,
    texture,
  }: {
    stream: MediaStream
    video: boolean
    nickname: string
    texture: string
  }) {
    this.socket.on('serverJoinVideoRoom', (newUser) => {
      // 기존 멤버들이 신규 멤버에게 call
      const call = me.peer.call(newUser.peerId, stream, {
        metadata: {
          nickname,
          texture,
          socketId: this.socket.id,
          isVideoEnabled: video,
        },
      })
      // 기존 멤버에서 실행
      call.once('stream', (peerStream) => {
        if (this.game.videoChatPlayers.has(newUser.socketId)) return
        this.game.videoChatPlayers.add(newUser.socketId)
        store.dispatch(
          addPeerStream({
            peerId: newUser.peerId,
            nickname: newUser.nickname,
            socketId: newUser.socketId,
            texture: newUser.texture,
            isVideoEnabled: newUser.isVideoEnabled,
            stream: peerStream,
            sound: true,
          }),
        )
      })
    })
  }

  answerIncomingCall({
    call,
    stream,
  }: {
    call: MediaConnection
    stream: MediaStream
  }) {
    const { nickname, socketId, texture, isVideoEnabled } = call.metadata
    // 전화에 응답
    call.answer(stream)
    // 새로운 멤버에서 실행
    call.once('stream', (peerStream) => {
      if (this.game.videoChatPlayers.has(socketId)) return
      this.game.videoChatPlayers.add(socketId)
      store.dispatch(
        addPeerStream({
          peerId: call.peer,
          nickname,
          socketId,
          texture,
          isVideoEnabled,
          stream: peerStream,
          sound: true,
        }),
      )
    })
  }

  sendDirectMessage({
    message,
    senderId,
    receiver,
    sender,
    receiverId,
  }: ClientDirectMessage) {
    this.socket.emit('clientDirectMessage', {
      message,
      sender,
      senderId,
      receiver,
      receiverId,
    })
  }

  leaveVideoRoom(roomNum: string) {
    this.socket.emit('clientLeaveVideoRoom', roomNum)
    this.clearOtherPeers()
  }

  clearOtherPeers() {
    this.game.videoChatPlayers.clear()
  }

  removeOtherPeer(socketId: string) {
    this.game.videoChatPlayers.delete(socketId)
  }
}
