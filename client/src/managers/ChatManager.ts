import Game from '@games/scenes/Game'
import { ServerChat } from '../../../types/socket'
import { Observable } from './Observable'

export class ChatManager extends Observable<ServerChat[]> {
  private list: ServerChat[] = []
  private game: Game

  constructor(game: Game) {
    super()
    this.game = game
  }

  getState(): ServerChat[] {
    return this.list
  }

  addChat(chat: ServerChat): void {
    this.list = [...this.list, chat]

    this.displayBubbleChat(chat)

    this.notify(this.list)
  }

  /** 플레이어의 채팅을 말풍선으로 표시  */
  displayBubbleChat(chat: ServerChat) {
    if (!chat.sender) return

    const targetPlayer = this.game.otherPlayerMap.get(chat.socketId)

    if (targetPlayer) {
      targetPlayer.updateChat(chat.message)
    } else {
      this.game.player.updateChat(chat.message)
    }
  }
}
