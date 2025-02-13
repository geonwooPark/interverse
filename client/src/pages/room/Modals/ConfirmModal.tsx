import { handleModal } from '../../store/features/confirmModalSlice'
import { useAppDispatch, useAppSelector } from '../../store/store'

function ConfirmModal() {
  const { content, isOpen } = useAppSelector((state) => state.confirmModal)
  const { title, description, action, actionLabel } = content
  const dispatch = useAppDispatch()

  const onClick = () => {
    dispatch(handleModal())
  }

  if (!isOpen) return null

  return (
    <div
      onClick={onClick}
      className="fixed inset-0 z-[100] flex h-screen w-screen items-center justify-center bg-black/70 font-neodgm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${isOpen ? 'opacity-100' : 'opacity-0'} flex h-fit w-[300px] flex-col rounded-md bg-white p-4`}
      >
        <div className="mb-2 text-lg">{title}</div>
        <p className="mb-4 text-sm">{description}</p>
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

export default ConfirmModal
