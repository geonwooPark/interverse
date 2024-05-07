import { Socket, io } from 'socket.io-client'
import phaserGame from '../PhaserGame'
import Game from '../scenes/Game'
import { store } from '../store/store'
import { addMessage } from '../store/features/chatListSlice'
import {
  ClientAvatarPosition,
  ClientChairId,
  ClientDirectMessage,
  ClientHandleCamera,
  ClientJoinRoom,
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
import { addDM } from '../store/features/directMessageModalSlice'

interface WS {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>
  game: Game | null
  otherPeers: string[]
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
  sendCameraStatus: ({ isVideoEnabled, roomNum }: ClientHandleCamera) => void
  joinVideoRoom: ({
    authCookie,
    video,
  }: {
    authCookie: CookieType
    video: boolean
  }) => void
  callToOtherPlayer: ({
    authCookie,
    stream,
    video,
  }: {
    authCookie: CookieType
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

export const ws: WS = {
  socket: io(import.meta.env.VITE_BACKEND),
  game: null,
  otherPeers: [],
  occupiedChairs: [],

  joinRoom({ authCookie, texture }) {
    this.game = phaserGame.scene.keys.game as Game
    this.game.player.setNickname(authCookie.nickName)
    this.game.player.setAvatarTexture(authCookie.texture)
    this.game.player.setPosition(
      authCookie.role === 'host' ? 260 : 720,
      authCookie.role === 'host' ? 520 : 170,
    )

    // 서버로 쿠키와 아바타 정보 전달
    this.socket.emit('clientJoinRoom', { authCookie, texture })
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
      if (!chairs) return
      this.occupiedChairs = [...chairs]
    })
    // 서버에서 방에서 나간 유저 정보 받기
    this.socket.on('serverLeaveRoom', (socketId) => {
      if (!this.game) return
      this.game.removeOtherPlayer(socketId)
      store.dispatch(deleteUser(socketId))
    })
  },

  sendMessage({ message, nickName, senderId, roomNum }) {
    this.socket.emit('clientMsg', {
      message,
      senderId,
      nickName,
      roomNum,
    })
  },

  sendAvatarPosition({ x, y, roomNum, animation }) {
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
  },

  sendChairId({ roomNum, chairId }) {
    this.socket.emit('clientChairId', { roomNum, chairId })
  },

  receiveChairId() {
    this.socket.on('serverChairId', (chairId: string) => {
      this.occupiedChairs.includes(chairId)
        ? (this.occupiedChairs = this.occupiedChairs.filter(
            (r) => r !== chairId,
          ))
        : this.occupiedChairs.push(chairId)
    })
  },

  sendCameraStatus({ isVideoEnabled, roomNum }) {
    this.socket.emit('clientHandleCamera', {
      isVideoEnabled,
      roomNum,
    })
  },

  joinVideoRoom({ authCookie, video }) {
    this.socket.emit('clientCreateVideoRoom', authCookie.roomNum)
    this.socket.emit('clientJoinVideoRoom', {
      roomNum: authCookie.roomNum,
      peerId: me.peer.id,
      nickName: authCookie.nickName,
      texture: authCookie.texture,
      isVideoEnabled: video,
    })
  },

  callToOtherPlayer({ authCookie, stream, video }) {
    this.socket.on('serverJoinVideoRoom', (newUser) => {
      // 기존 멤버들이 신규 멤버에게 call
      const call = me.peer.call(newUser.peerId, stream, {
        metadata: {
          nickName: authCookie.nickName,
          socketId: ws.socket.id,
          texture: authCookie.texture,
          isVideoEnabled: video,
        },
      })
      // 기존 멤버에서 실행
      call.once('stream', (peerStream) => {
        if (this.otherPeers.includes(newUser.socketId)) return
        this.otherPeers.push(newUser.socketId)
        store.dispatch(
          addPeerStream({
            peerId: newUser.peerId,
            nickName: newUser.nickName,
            socketId: newUser.socketId,
            texture: newUser.texture,
            isVideoEnabled: newUser.isVideoEnabled,
            stream: peerStream,
            sound: true,
          }),
        )
      })
    })
  },

  answerIncomingCall({ call, stream }) {
    const { nickName, socketId, texture, isVideoEnabled } = call.metadata
    // 전화에 응답
    call.answer(stream)
    // 새로운 멤버에서 실행
    call.once('stream', (peerStream) => {
      if (this.otherPeers.includes(socketId)) return
      this.otherPeers.push(socketId)
      store.dispatch(
        addPeerStream({
          peerId: call.peer,
          nickName,
          socketId,
          texture,
          isVideoEnabled,
          stream: peerStream,
          sound: true,
        }),
      )
    })
  },

  sendDirectMessage({ message, senderId, receiver, sender, receiverId }) {
    this.socket.emit('clientDirectMessage', {
      message,
      sender,
      senderId,
      receiver,
      receiverId,
    })
  },

  leaveVideoRoom(roomNum) {
    this.socket.emit('clientLeaveVideoRoom', roomNum)
    this.clearOtherPeers()
  },

  clearOtherPeers() {
    this.otherPeers = []
  },

  removeOtherPeer(socketId: string) {
    this.otherPeers = this.otherPeers.filter((r) => r !== socketId)
  },
}
