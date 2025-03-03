import { useEffect } from 'react'
import ModalBackdrop from './ModalBackdrop'
import CreatorCard from './CreatorModal'
import ManualCard from './ManualModal'
import SurveyCard from './SurveyModal'
import VideoCard from './VideoModal/VideoCard'
import useModals from '@hooks/useModals'
import { createPortal } from 'react-dom'
import { useScene } from '@providers/SceneProvider'

function Modals() {
  const { modals, addModal, removeModal } = useModals()

  const gameScene = useScene()

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
