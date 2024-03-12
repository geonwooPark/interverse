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
      className="font-neodgm fixed inset-0 z-[100] flex h-screen w-screen items-center justify-center bg-black/70"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${isOpen ? 'opacity-100' : 'opacity-0'} flex h-fit w-[300px] flex-col rounded-md bg-white p-4`}
      >
        <div className="title mb-2">{title}</div>
        <p className="description mb-4">{description}</p>
        <div className="flex gap-2">
          <button onClick={onClick} className="secondary-button">
            취소
          </button>
          <button onClick={action} className="primary-button">
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
