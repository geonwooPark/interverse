import { useAppSelector } from '../../../store/store'
import ModalBackdrop from '../ModalBackdrop'
import ManualCard from './ManualCard'

function ManualModal() {
  const { isOpen } = useAppSelector((state) => state.manualModal)

  if (!isOpen) return

  return (
    <ModalBackdrop>
      <ManualCard />
    </ModalBackdrop>
  )
}

export default ManualModal
