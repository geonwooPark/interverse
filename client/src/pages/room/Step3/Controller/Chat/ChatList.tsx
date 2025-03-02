import ChatItem from './ChatItem'
import { useSyncExternalStore } from 'react'
import GameManager from '@managers/GameManager'
import GameScene from '@games/scenes/Game'

function ChatList() {
  const game = GameManager.getInstance()

  const gameScene = game.scene.getScene('game') as GameScene

  const chatManager = gameScene.chat

  const chatlist = useSyncExternalStore(
    (callback) => chatManager.subscribe(() => callback()),
    () => chatManager.getState(),
  )

  return (
    <ul className="hide-scroll overflow-y-auto pt-2">
      {chatlist.map((chat, i) => (
        <ChatItem key={i} chatItem={chat} />
      ))}
    </ul>
  )
}

export default ChatList
