import { store } from '@store/store'
import { CookieType } from '../../../types/client'
import { ClientHandleCamera } from '../../../types/socket'
import { addPeerStream } from '@store/features/myStreamSlice'
import { MediaConnection } from 'peerjs'
import GameScene from '@games/scenes/Game'
import { me } from './peer'

export class VideoManager {
  private game: GameScene
  videoChatPlayers: Set<string> = new Set()

  constructor(game: GameScene) {
    this.game = game
  }

  // 내 카메라 상태 보내기
  sendCameraStatus({ isVideoEnabled, roomNum }: ClientHandleCamera) {
    this.game.ws.socket.emit('clientHandleCamera', {
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
    this.game.ws.socket.emit('clientCreateVideoRoom', authCookie.roomNum)
    this.game.ws.socket.emit('clientJoinVideoRoom', {
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
    this.game.ws.socket.on('serverJoinVideoRoom', (newUser) => {
      // 기존 멤버들이 신규 멤버에게 call
      const call = me.peer.call(newUser.peerId, stream, {
        metadata: {
          nickname,
          texture,
          socketId: this.game.ws.socket.id,
          isVideoEnabled: video,
        },
      })
      // 기존 멤버에서 실행
      call.once('stream', (peerStream) => {
        if (this.videoChatPlayers.has(newUser.socketId)) return
        this.videoChatPlayers.add(newUser.socketId)
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
      if (this.videoChatPlayers.has(socketId)) return
      this.videoChatPlayers.add(socketId)
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

  leaveVideoRoom(roomNum: string) {
    this.game.ws.socket.emit('clientLeaveVideoRoom', roomNum)
    this.clearOtherPeers()
  }

  clearOtherPeers() {
    this.videoChatPlayers.clear()
  }

  removeOtherPeer(socketId: string) {
    this.videoChatPlayers.delete(socketId)
  }
}
