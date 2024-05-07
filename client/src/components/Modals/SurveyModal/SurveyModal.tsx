import { useAppDispatch, useAppSelector } from '../../../store/store'
import { handleSurveyModal } from '../../../store/features/surveyModalSlice'
import SurveyCard from './SurveyCard'

function SurveyModal() {
  const { isOpen } = useAppSelector((state) => state.surveyModal)
  const dispatch = useAppDispatch()

  const onClick = () => {
    dispatch(handleSurveyModal())
  }

  if (!isOpen) return

  return (
    <div
      onClick={onClick}
      className="font-neodgm fixed inset-0 z-[100] flex h-screen w-screen items-center justify-center bg-black/70"
    >
      <div onClick={(e) => e.stopPropagation()}>
        <SurveyCard />
      </div>
    </div>
  )
}

export default SurveyModal
