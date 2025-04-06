import { useLayoutEffect } from 'react'
import Alert from './Alert'
import Controller from './Controller'
import MenuBar from './MenuBar'
import { useAuthCookie } from '@providers/AuthProvider'
import Modals from './Modals/Modals'
import { useScene } from '@providers/SceneProvider'
import DMList from './DirectMessage/DMList'
import useMediaPermissions from '@hooks/useMediaPermissions'

export default function Step3() {
  const authCookie = useAuthCookie()

  const gameScene = useScene()

  const permissions = useMediaPermissions()

  // 권한이 denied면 UI로 알리기

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
