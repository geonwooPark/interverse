import React, { ReactNode } from 'react'
import ModalBackdrop from './ModalBackdrop'
import { useAppSelector } from '../../store/store'
import CreatorCard from './CreatorModal/CreatorCard'
import ManualCard from './ManualModal/ManualCard'
import SurveyCard from './SurveyModal/SurveyCard'
import VideoCard from './VideoModal/VideoCard'

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
    case 'video':
      content = <VideoCard />
      break
    default:
      content = null
  }

  return isOpen && <ModalBackdrop>{content}</ModalBackdrop>
}

export default Modals
