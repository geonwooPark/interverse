interface ConfirmModalProps {
  title: string
  description: string
  actionLabel?: string
  onClose: () => void
  onSubmit: any
}

function ConfirmModal({
  title,
  description,
  actionLabel,
  onClose,
  onSubmit,
}: ConfirmModalProps) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] flex h-screen w-screen items-center justify-center bg-black/70 font-neodgm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`flex h-fit w-[300px] flex-col rounded-md bg-white p-4`}
      >
        <div className="mb-2 text-lg">{title}</div>

        <p className="mb-4 text-sm">{description}</p>

        <div className="flex gap-2">
          <button onClick={onClose} className="secondary-button">
            취소
          </button>
          <button onClick={onSubmit} className="primary-button">
            {actionLabel || '확인'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
