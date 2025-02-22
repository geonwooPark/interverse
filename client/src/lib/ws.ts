import { io, Socket } from 'socket.io-client'
import Game from '../games/scenes/Game'
import { store } from '../store/store'
import { addMessage } from '../store/features/chatListSlice'
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
} from '../../../types/socket'
import { CookieType } from '../../../types/client'
import { me } from './peer'
import { addUser, deleteUser, setUsers } from '../store/features/usersSlice'
import { addPeerStream } from '../store/features/myStreamSlice'
import { MediaConnection } from 'peerjs'
import { addDM } from '../store/features/directMessageSlice'
import GameSingleton from '../PhaserGame'

interface ISocketIO {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>
  game: Game | null
  otherPeers: Set<string>
  // occupiedChairs: Set<string>
  roomNum: string
  nickname: string
  texture: string
  joinRoom: () => void
  sendMessage: ({ message, nickname, senderId, roomNum }: ClientMessage) => void
  sendAvatarPosition: ({
    x,
    y,
    roomNum,
    animation,
  }: ClientAvatarPosition) => void
  sendChairId: ({ roomNum, chairId }: ClientChairId) => void
  sendCameraStatus: ({ isVideoEnabled, roomNum }: ClientHandleCamera) => void
  joinVideoRoom: ({
    authCookie,
    video,
  }: {
    authCookie: CookieType
    video: boolean
  }) => void
  callToOtherPlayer: ({
    stream,
    video,
  }: {
    stream: MediaStream
    video: boolean
  }) => void
  answerIncomingCall: ({
    call,
    stream,
  }: {
    call: MediaConnection
    stream: MediaStream
  }) => void
  sendDirectMessage: ({
    message,
    sender,
    senderId,
    receiver,
    receiverId,
  }: ClientDirectMessage) => void
  leaveVideoRoom: (roomNum: string) => void
  clearOtherPeers: () => void
  removeOtherPeer: (socketId: string) => void
}

export class SocketIO implements ISocketIO {
  private static instance: SocketIO | null = null
  socket: Socket<ServerToClientEvents, ClientToServerEvents>
  game!: Game
  otherPeers: Set<string> = new Set()
  roomNum = ''
  nickname = ''
  texture = ''

  constructor() {
    this.socket = io(import.meta.env.VITE_BACKEND)
    this.game = GameSingleton.getInstance().scene.keys.game as Game
  }

  static getInstance(): SocketIO {
    if (!SocketIO.instance) {
      SocketIO.instance = new SocketIO()
    }
    return SocketIO.instance
  }

  joinRoom() {
    // 서버로 쿠키와 아바타 정보 전달
    this.socket.emit('clientJoinRoom', {
      roomNum: this.roomNum,
      nickname: this.nickname,
      texture: this.texture,
    })

    // 서버에서 입장 메시지 받기
    this.socket.on('serverMsg', (messageData) => {
      if (!this.game) return
      store.dispatch(addMessage(messageData))
      this.game.displayOtherPlayerChat({
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
  }

  sendMessage({ message, senderId }: ClientMessage) {
    this.socket.emit('clientMsg', {
      message,
      senderId,
      nickname: this.nickname,
      roomNum: this.roomNum,
    })
  }

  sendAvatarPosition({ x, y, roomNum, animation }: ClientAvatarPosition) {
    // 서버로 실시간 나의 위치 정보 보내기
    this.socket.emit('clientAvatarPosition', {
      x,
      y,
      roomNum,
      animation,
    })

    // 서버로부터 다른 모든 유저들 위치 정보 받기
    this.socket.on('serverAvatarPosition', (avatarPosition) => {
      if (!this.game) return
      this.game.updateOtherPlayer(avatarPosition)
    })
  }

  sendChairId({ chairId }: ClientChairId) {
    this.socket.emit('clientChairId', { roomNum: this.roomNum, chairId })
  }

  sendCameraStatus({ isVideoEnabled, roomNum }: ClientHandleCamera) {
    this.socket.emit('clientHandleCamera', {
      isVideoEnabled,
      roomNum,
    })
  }

  joinVideoRoom({
    authCookie,
    video,
  }: {
    authCookie: CookieType
    video: boolean
  }) {
    this.socket.emit('clientCreateVideoRoom', authCookie.roomNum)
    this.socket.emit('clientJoinVideoRoom', {
      roomNum: authCookie.roomNum,
      peerId: me.peer.id,
      nickname: this.nickname,
      texture: this.texture,
      isVideoEnabled: video,
    })
  }

  callToOtherPlayer({
    stream,
    video,
  }: {
    stream: MediaStream
    video: boolean
  }) {
    this.socket.on('serverJoinVideoRoom', (newUser) => {
      // 기존 멤버들이 신규 멤버에게 call
      const call = me.peer.call(newUser.peerId, stream, {
        metadata: {
          nickname: this.nickname,
          texture: this.texture,
          socketId: this.socket.id,
          isVideoEnabled: video,
        },
      })
      // 기존 멤버에서 실행
      call.once('stream', (peerStream) => {
        if (this.otherPeers.has(newUser.socketId)) return
        this.otherPeers.add(newUser.socketId)
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
      if (this.otherPeers.has(socketId)) return
      this.otherPeers.add(socketId)
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

  leaveVideoRoom() {
    this.socket.emit('clientLeaveVideoRoom', this.roomNum)
    this.clearOtherPeers()
  }

  clearOtherPeers() {
    this.otherPeers.clear()
  }

  removeOtherPeer(socketId: string) {
    this.otherPeers.delete(socketId)
  }
}
