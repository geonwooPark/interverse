import { useLayoutEffect } from 'react'
import Alert from './Alert'
import Controller from './Controller'
import DirectMessages from './DirectMessage/DirectMessages'
import MenuBar from './MenuBar'
import { useAuthCookie } from '@providers/AuthProvider'
import GameScene from '@games/scenes/Game'
import Modals from './Modals/Modals'
import GameManager from '@managers/GameManager'

export default function Step3() {
  const authCookie = useAuthCookie()

  const game = GameManager.getInstance()

  const gameScene = game.scene.getScene('game') as GameScene

  // 게임 입장
  useLayoutEffect(() => {
    if (!authCookie) return

    gameScene.joinRoom(authCookie.roomNum)
  }, [])

  return (
    <>
      <MenuBar />
      <Controller />
      <Alert />
      {/* <DirectMessages /> */}
      <Modals />
    </>
  )
}
