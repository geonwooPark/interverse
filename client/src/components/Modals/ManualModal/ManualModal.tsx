import { closeManualModal } from '../../../store/features/manualModalDisplaySlice'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import ManualCard from './ManualCard'

function ManualModal() {
  const { isOpen } = useAppSelector((state) => state.manualModalDisplay)
  const dispatch = useAppDispatch()

  const onClick = () => {
    dispatch(closeManualModal())
  }

  if (!isOpen) return

  return (
    <div
      onClick={onClick}
      className="font-neodgm fixed inset-0 z-[100] flex h-screen w-screen items-center justify-center bg-black/70"
    >
      <div onClick={(e) => e.stopPropagation()}>
        <ManualCard />
      </div>
    </div>
  )
}

export default ManualModal
