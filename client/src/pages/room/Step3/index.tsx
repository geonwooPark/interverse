import { useLayoutEffect } from 'react'
import Alert from './Alert'
import Controller from './Controller'
import MenuBar from './MenuBar'
import { useAuthCookie } from '@providers/AuthProvider'
import Modals from './Modals/Modals'
import { useScene } from '@providers/SceneProvider'
import DMList from './DirectMessage/DMList'

export default function Step3() {
  const authCookie = useAuthCookie()

  const gameScene = useScene()

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
      <DMList />
      <Modals />
    </>
  )
}
