import { useEffect } from 'react'
import { useScene } from '@providers/SceneProvider'
import { useModal } from '@providers/ModalProvider'
import ManualModal from './ManualModal'
import SurveyModal from './SurveyModal'
import CreatorModal from './CreatorModal'
import VideoModal from './VideoModal'

function Modals() {
  const { addModal, removeModal } = useModal()

  const gameScene = useScene()

  // 씬에 이벤트 등록
  useEffect(() => {
    gameScene.events.on('closeModal', removeModal)
    gameScene.events.on('openMenualModal', () =>
      addModal(<ManualModal hasDim />),
    )
    gameScene.events.on('openSurveyModal', () =>
      addModal(<SurveyModal hasDim />),
    )
    gameScene.events.on('openCreatorModal', () =>
      addModal(<CreatorModal hasDim />),
    )
    gameScene.events.on('openVideoModal', () => addModal(<VideoModal hasDim />))
  }, [])

  return null
}

export default Modals
