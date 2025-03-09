import { RoomUser, ServerPlayerInfo } from '../../../types/socket'
import OtherPlayer from '@games/avatars/OtherPlayer'
import GameScene from '@games/scenes/Game'
import { Observable } from './Observable'

export class RoomManager extends Observable<Map<string, OtherPlayer>> {
  private game: GameScene
  otherPlayerMap = new Map<string, OtherPlayer>()

  constructor(game: GameScene) {
    super()

    this.game = game

    this.initialize()
  }

  getState(): Map<string, OtherPlayer> {
    return this.otherPlayerMap
  }

  private initialize() {
    // 서버에서 기존 방의 유저들이 새로운 유저의 정보 받기
    this.game.ws.socket.on('serverPlayerInfo', (playerInfo) => {
      this.addOtherPlayer(playerInfo)
      this.notify(this.otherPlayerMap)
    })

    // 서버에서 새로운 유저가 방에 존재하는 유저들의 정보 받기
    this.game.ws.socket.on('serverRoomMember', (users) => {
      let userList: RoomUser[] = []
      for (const user in users) {
        userList = [...userList, users[user] as unknown as RoomUser]

        if (user === this.game.ws.socket.id) continue
        this.addOtherPlayer(users[user] as unknown as ServerPlayerInfo)
      }
      this.notify(this.otherPlayerMap)
    })

    // 서버에서 방에서 나간 유저 정보 받기
    this.game.ws.socket.on('serverLeaveRoom', (socketId) => {
      console.log(socketId)
      this.removeOtherPlayer(socketId)
      this.notify(this.otherPlayerMap)
    })
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
    this.game.ws.socket.emit('clientJoinRoom', {
      roomNum,
      nickname,
      texture,
    })
  }

  /** 다른 플레이어 입장 */
  private addOtherPlayer({ nickname, texture, socketId }: ServerPlayerInfo) {
    if (!socketId) return

    const newPlayer = new OtherPlayer(this.game, 120, 180, texture, nickname)
    newPlayer.anims.play(`${texture}_stand_down`, true)
    newPlayer.setDepth(900)
    this.game.add.existing(newPlayer)

    this.game.otherPlayers.add(newPlayer)
    this.otherPlayerMap = new Map(this.otherPlayerMap).set(socketId, newPlayer)
  }

  /** 다른 플레이어 퇴장 */
  private removeOtherPlayer(socketId: string) {
    const otherPlayer = this.otherPlayerMap.get(socketId)

    if (otherPlayer) {
      this.game.otherPlayers.remove(otherPlayer, true, true)

      const newMap = new Map(this.otherPlayerMap)
      newMap.delete(socketId)
      this.otherPlayerMap = newMap
    }
  }
}
