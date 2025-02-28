import { useLayoutEffect } from 'react'
import Alert from './Alert'
import Controller from './Controller'
import DirectMessages from './DirectMessage/DirectMessages'
import MenuBar from './MenuBar'
import { useAuthCookie } from '@providers/AuthProvider'
import GameSingleton from '../../../PhaserGame'
import Game from '@games/scenes/Game'
import Modals from './Modals/Modals'
import { useAppSelector } from '@store/store'

export default function Step3() {
  const authCookie = useAuthCookie()

  const avartar = useAppSelector((state) => state.avartar)

  const game = GameSingleton.getInstance()

  const gameScene = game.scene.getScene('game') as Game

  // 게임 입장
  useLayoutEffect(() => {
    if (!authCookie) return

    gameScene.initialize({
      roomNum: authCookie.roomNum,
      nickname: avartar.nickname,
      texture: avartar.texture,
    })
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
