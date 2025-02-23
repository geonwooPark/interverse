import { useLayoutEffect } from 'react'
import Alert from './Alert/Alert'
import Controller from './Controller'
import DirectMessages from './DirectMessage/DirectMessages'
import MenuBar from './MenuBar'
import { useAuthCookie } from '@providers/AuthProvider'
import GameSingleton from '../../../PhaserGame'
import Game from '@games/scenes/Game'
import Modals from './Modals/Modals'

export default function Step3() {
  const authCookie = useAuthCookie()

  const game = GameSingleton.getInstance()

  const gameScene = game.scene.getScene('game') as Game

  // 게임 입장
  useLayoutEffect(() => {
    if (!authCookie) return

    gameScene.initialize(authCookie.roomNum)
  }, [])

  return (
    <>
      <MenuBar />
      <Controller />
      {/* 
      <Alert />
      <DirectMessages /> */}
      <Modals />
    </>
  )
}
