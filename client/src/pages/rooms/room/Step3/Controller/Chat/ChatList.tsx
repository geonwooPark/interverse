import ChatItem from './ChatItem'
import { useSyncExternalStore } from 'react'
import { useScene } from '@providers/SceneProvider'

function ChatList() {
  const gameScene = useScene()

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
