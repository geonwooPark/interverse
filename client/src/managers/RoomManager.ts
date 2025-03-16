import { IJoinRoom, IRoomUserDto } from '../../../types/socket'
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
    // 새로 입장한 유저
    this.game.ws.socket.on('serverPlayerInfo', (player) => {
      this.addOtherPlayer(player)
      this.notify(this.otherPlayerMap)
    })

    // 기존 방에 들어와 있던 유저들
    this.game.ws.socket.on('serverRoomMember', (users) => {
      for (const user of users) {
        if (user.socketId === this.game.ws.socket.id) continue
        this.addOtherPlayer(user)
      }
      this.notify(this.otherPlayerMap)
    })

    // 방에서 퇴장한 유저
    this.game.ws.socket.on('serverLeaveRoom', (socketId) => {
      this.removeOtherPlayer(socketId)
      this.notify(this.otherPlayerMap)
    })
  }

  /** 방 참여하기 */
  joinRoom({ roomNum, nickname, texture, x, y }: IJoinRoom) {
    this.game.ws.socket.emit('clientJoinRoom', {
      roomNum,
      nickname,
      texture,
      x,
      y,
    })
  }

  // 다른 플레이어 입장
  private addOtherPlayer({ x, y, texture, nickname, socketId }: IRoomUserDto) {
    if (!socketId) return

    const newPlayer = new OtherPlayer(
      this.game,
      x,
      y,
      texture,
      nickname,
      undefined,
      socketId,
    )
    newPlayer.anims.play(`${texture}`, true)
    newPlayer.setDepth(900)
    this.game.add.existing(newPlayer)

    this.game.otherPlayers.add(newPlayer)
    this.otherPlayerMap = new Map(this.otherPlayerMap).set(socketId, newPlayer)
  }

  // 다른 플레이어 퇴장
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
