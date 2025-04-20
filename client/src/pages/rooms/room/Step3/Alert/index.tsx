import { createPortal } from 'react-dom'
import AlertBox from './AlertBox'
import useAlert from '@hooks/useAlert'
import { useEffect } from 'react'
import { useScene } from '@providers/SceneProvider'

function Alert() {
  const { isOpen, content, changeContent, openAlert, closeAlert } = useAlert()

  const gameScene = useScene()

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
