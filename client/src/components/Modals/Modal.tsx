import { useAppDispatch, useAppSelector } from '../../store/store'
import { closeModal } from '../../store/features/modalDisplaySlice'

function Modal() {
  const { isOpen } = useAppSelector((state) => state.modalDisplay)
  const { title, description, action, actionLabel } = useAppSelector(
    (state) => state.modalContent,
  )
  const dispatch = useAppDispatch()

  const onClick = () => {
    dispatch(closeModal())
  }

  if (!isOpen) return null

  return (
    <div
      onClick={onClick}
      className="fixed inset-0 flex h-screen w-screen items-center justify-center bg-black/70 font-neodgm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${isOpen ? 'opacity-100' : 'opacity-0'} flex h-fit w-[300px] flex-col rounded-md bg-white p-4`}
      >
        <div className="mb-2 text-lg">{title}</div>
        <p className="mb-4">{description}</p>
        <div className="flex gap-2">
          <button
            onClick={onClick}
            className="h-[50px] w-full rounded-md border-2 border-purple-600 text-purple-600"
          >
            취소
          </button>
          <button
            onClick={action}
            className="h-[50px] w-full rounded-md bg-purple-600 text-white hover:bg-purple-700"
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
