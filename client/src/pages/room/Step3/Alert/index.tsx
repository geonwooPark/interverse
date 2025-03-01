import { createPortal } from 'react-dom'
import AlertBox from './AlertBox'
import useAlert from '@hooks/useAlert'
import { useEffect } from 'react'
import GameManager from '@managers/GameManager'
import GameScene from '@games/scenes/Game'

function Alert() {
  const { isOpen, content, changeContent, openAlert, closeAlert } = useAlert()

  const game = GameManager.getInstance()

  const gameScene = game.scene.getScene('game') as GameScene

  // 씬에 이벤트 등록
  useEffect(() => {
    gameScene.events.on('changeContent', (value: string) =>
      changeContent(value),
    )
    gameScene.events.on('openAlert', () => openAlert())
    gameScene.events.on('closeAlert', () => closeAlert())
  }, [])

  if (!isOpen || !content) return null

  return createPortal(
    <AlertBox content={content} />,
    document.getElementById('alert') as HTMLElement,
  )
}

export default Alert
