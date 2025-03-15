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

    // 누군가 의자에 앉는다면 아이디 받아서 리스트 업데이트
    this.game.ws.socket.on('serverChairId', (chairId: string) => {
      if (this.list.has(chairId)) {
        this.list.delete(chairId)
      } else {
        this.list.add(chairId)
      }
    })
  }

  // 의자에 앉는다면 서버로 아이디 전송
  sendChairId(chairId: string) {
    this.game.ws.socket.emit('clientChairId', {
      roomNum: this.game.roomNum,
      chairId,
    })
  }
}
