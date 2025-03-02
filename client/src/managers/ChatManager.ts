import { Chat } from '../../../types/socket'
import { Observable } from './Observable'

export class ChatManager extends Observable<Chat[]> {
  private list: Chat[] = []

  constructor() {
    super()
  }

  getState(): Chat[] {
    return this.list
  }

  addChat(chat: Chat): void {
    this.list = [...this.list, chat]
    this.notify(this.list)
  }
}
