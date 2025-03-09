import Game from '@games/scenes/Game'
import { Chat, ServerChat } from '../../../types/socket'
import { Observable } from './Observable'
import GameScene from '@games/scenes/Game'

export class ChatManager extends Observable<ServerChat[]> {
  private game: GameScene
  private list: ServerChat[] = []

  constructor(game: Game) {
    super()

    this.game = game

    this.initialize()
  }

  private initialize() {
    // 서버에서 메시지 받기
    this.game.ws.socket.on('serverChat', (serverChat) => {
      this.receiveChat(serverChat)
    })
  }

  getState(): ServerChat[] {
    return this.list
  }

  // 메시지 수신
  receiveChat(chat: ServerChat): void {
    this.list = [...this.list, chat]

    this.displayBubbleChat(chat)

    this.notify(this.list)
  }

  // 메시지 송신
  sendMessage(clientChat: Chat) {
    this.game.ws.socket.emit('clientChat', clientChat)
  }

  /** 플레이어의 채팅을 말풍선으로 표시  */
  displayBubbleChat(chat: ServerChat) {
    if (!chat.sender) return

    const targetPlayer = this.game.room.otherPlayerMap.get(chat.socketId)

    if (targetPlayer) {
      targetPlayer.updateChat(chat.message)
    } else {
      this.game.player.updateChat(chat.message)
    }
  }
}
