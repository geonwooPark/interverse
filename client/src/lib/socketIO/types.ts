import Game from '@games/scenes/Game'
import { Socket } from 'socket.io-client'
import {
  ClientAvatarPosition,
  ClientChairId,
  ClientDirectMessage,
  ClientHandleCamera,
  ClientMessage,
  ClientToServerEvents,
  ServerToClientEvents,
} from '../../../../types/socket'
import { CookieType } from '../../../../types/client'
import { MediaConnection } from 'peerjs'

export interface ISocketIO {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>
  game: Game | null
  joinRoom: ({
    roomNum,
    nickname,
    texture,
  }: {
    roomNum: string
    nickname: string
    texture: string
  }) => void
  sendMessage: ({ message, roomNum }: ClientMessage) => void
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
    nickname,
    texture,
  }: {
    authCookie: CookieType
    video: boolean
    nickname: string
    texture: string
  }) => void
  callToOtherPlayer: ({
    stream,
    video,
    nickname,
    texture,
  }: {
    stream: MediaStream
    video: boolean
    nickname: string
    texture: string
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
