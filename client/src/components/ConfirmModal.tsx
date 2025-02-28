import Button from './Button'

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
        <div className="text-lg">{title}</div>

        <p className="my-5 text-sm">{description}</p>

        <div className="flex gap-2">
          <Button size="md" variant="outlined" onClick={onClose}>
            취소
          </Button>
          <Button size="md" variant="contained" onClick={onSubmit}>
            {actionLabel || '확인'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
