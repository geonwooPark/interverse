import { createPortal } from 'react-dom'
import { useSyncExternalStore } from 'react'
import { useScene } from '@providers/SceneProvider'
import DirectMessage from './index'

function DMList() {
  const gameScene = useScene()

  const DMManager = gameScene.dm

  const dmList = useSyncExternalStore(
    (callback) => DMManager.subscribe(() => callback()),
    () => DMManager.getState(),
  )

  return createPortal(
    dmList?.map((dm) => <DirectMessage key={dm.id} dm={dm} />),
    document.getElementById('dm') as HTMLElement,
  )
}

export default DMList
