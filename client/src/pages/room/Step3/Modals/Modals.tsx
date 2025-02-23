import { ReactNode } from 'react'
import ModalBackdrop from './ModalBackdrop'
import { useAppSelector } from '@store/store'
import CreatorCard from './CreatorModal'
import ManualCard from './ManualModal'
import SurveyCard from './SurveyModal'
import VideoCard from './VideoModal/VideoCard'
import { createPortal } from 'react-dom'

function Modals() {
  const { isOpen, type } = useAppSelector((state) => state.modals)

  let content: ReactNode
  switch (type) {
    case 'creator':
      content = <CreatorCard />
      break
    case 'manual':
      content = <ManualCard />
      break
    case 'survey':
      content = <SurveyCard />
      break
    // case 'video':
    //   content = <VideoCard />
    //   break
    default:
      content = null
  }

  if (!isOpen) return null

  return createPortal(
    <ModalBackdrop>{content}</ModalBackdrop>,
    document.getElementById('modals') as HTMLElement,
  )
}

export default Modals
