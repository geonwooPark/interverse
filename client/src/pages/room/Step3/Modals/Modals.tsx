import { useEffect } from 'react'
import ModalBackdrop from './ModalBackdrop'
import CreatorCard from './CreatorModal'
import ManualCard from './ManualModal'
import SurveyCard from './SurveyModal'
import VideoCard from './VideoModal/VideoCard'
import GameManager from '@managers/GameManager'
import GameScene from '@games/scenes/Game'
import useModals from '@hooks/useModals'
import { createPortal } from 'react-dom'

function Modals() {
  const { modals, addModal, removeModal } = useModals()

  const game = GameManager.getInstance()

  const gameScene = game.scene.getScene('game') as GameScene

  // 씬에 이벤트 등록
  useEffect(() => {
    gameScene.events.on('closeModal', () => removeModal())
    gameScene.events.on('openMenualModal', () => addModal(<ManualCard />))
    gameScene.events.on('openSurveyModal', () => addModal(<SurveyCard />))
    gameScene.events.on('openCreatorModal', () => addModal(<CreatorCard />))
    // gameScene.events.on('openVideoModal', () => addModal(<VideoCard />))
  }, [])

  if (modals.length === 0) return null

  return createPortal(
    <ModalBackdrop>{modals}</ModalBackdrop>,
    document.getElementById('modals') as HTMLElement,
  )
}

export default Modals
