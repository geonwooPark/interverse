import { ClientChairId } from '../../../types/socket'
import GameScene from '@games/scenes/Game'

export class ChairManager {
  private game: GameScene
  list: Set<string> = new Set()

  constructor(game: GameScene) {
    this.game = game

    this.initialize()
  }

  private initialize() {
    // 방에 입장했을 때 이미 누군가 앉아있는 의자들
    this.game.ws.socket.on('serverOccupiedChairs', (chairs) => {
      if (!chairs) return

      this.list = new Set([...chairs])
    })

    // 서버에서 이미 누군가 앉은 의자 목록 받기
    this.game.ws.socket.on('serverChairId', (chairId: string) => {
      if (this.list.has(chairId)) {
        this.list.delete(chairId)
      } else {
        this.list.add(chairId)
      }
    })
  }

  sendChairId({ roomNum, chairId }: ClientChairId) {
    this.game.ws.socket.emit('clientChairId', { roomNum, chairId })
  }
}
