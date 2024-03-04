import { Socket, io } from 'socket.io-client'
import {
  ClientToServerEvents,
  JoinMember,
  MessageData,
  PlayerInfo,
  ServerToClientEvents,
} from '../../../types/socket'
import { store } from '../store/store'
import { addMessage } from '../store/features/chatListSlice'

export default class SocketIO {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>
  constructor() {
    this.socket = io('http://localhost:3000')
  }

  joinRoom({ roomNum, authCookie }: JoinMember) {
    this.socket.emit('joinRoom', {
      roomNum,
      authCookie,
    })
    this.socket.on('roomMember', (members) => {
      console.log('roomMember :' + members)
      // otherPlayer에 기존 방의 멤버들을 추가해줘
      // setUsers((pre) => [...pre, ...members])
    })
    this.socket.on('newMember', (member) => {
      console.log('newMember :' + member)
      // otherPlayer에 새로운 멤버를 추가해줘
      // setUsers((pre) => [...pre, member])
    })
  }

  sendPlayerInfo({ x, y, nickName, texture }: PlayerInfo) {
    this.socket.emit('sendPlayerInfo', {
      x,
      y,
      nickName,
      texture,
    })
  }

  sendMessage({ msg, sender, roomNum }: MessageData) {
    this.socket.emit('clientMsg', {
      msg,
      sender,
      roomNum,
    })

    this.socket.off('serverMsg')
    this.socket.on('serverMsg', (data) => {
      store.dispatch(addMessage(data))
    })
  }
}
