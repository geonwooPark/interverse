import { useAppDispatch, useAppSelector } from '../../../store/store'
import SurveyCard from './SurveyCard'
import ModalBackdrop from '../ModalBackdrop'

function SurveyModal() {
  const { isOpen } = useAppSelector((state) => state.surveyModal)

  if (!isOpen) return

  return (
    <ModalBackdrop>
      <SurveyCard />
    </ModalBackdrop>
  )
}

export default SurveyModal
