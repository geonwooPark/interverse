import Game from '@games/scenes/Game'
import { IDirectMessage } from '../../../types/socket'
import { Observable } from './Observable'
import GameScene from '@games/scenes/Game'

export class DMManager extends Observable<IDirectMessage[]> {
  private game: GameScene
  private list: (IDirectMessage & { isRead: boolean })[] = []

  constructor(game: Game) {
    super()

    this.game = game

    this.initialize()
  }

  private initialize() {
    // 서버에서 DM 받기
    this.game.ws.socket.on('serverDM', (serverChat) => {
      this.receiveDM(serverChat)
    })
  }

  getState() {
    return this.list
  }

  // DM 수신
  receiveDM(dm: IDirectMessage): void {
    this.list = [...this.list, { ...dm, isRead: false }]

    this.notify(this.list)
  }

  // DM 송신
  sendDM(dm: IDirectMessage) {
    this.game.ws.socket.emit('clientDM', dm)
  }

  // DM 제거
  removeDM(id: string) {
    this.list = this.list.filter((r) => r.id !== id)

    this.notify(this.list)
  }

  readDM(id: string) {
    this.list = this.list.map((r) => {
      if (r.id === id) {
        return { ...r, isRead: true }
      }
      return r
    })

    this.notify(this.list)
  }

  readAllDM() {
    this.list = this.list.map((r) => ({ ...r, isRead: true }))

    this.notify(this.list)
  }
}
