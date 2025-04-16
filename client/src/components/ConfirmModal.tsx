import Button from './Button'

interface ConfirmModalProps {
  title: string
  description: string
  actionLabel?: string
  hasDim?: boolean
  onClose: () => void
  onSubmit: any
  hideLeftButton?: boolean
}

function ConfirmModal({
  title,
  description,
  actionLabel,
  hasDim = true,
  onClose,
  onSubmit,
  hideLeftButton = false,
}: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 h-screen w-screen">
      {/* Dim */}
      {hasDim && <div onClick={onClose} className="size-full bg-black/70" />}

      {/* Modal */}
      <div
        className={`absolute left-[50%] top-[50%] size-full h-fit w-[360px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white p-4`}
      >
        <div>
          <p className="body1">{title}</p>
        </div>

        <div className="py-6">
          <p className="whitespace-pre-line text-body2 leading-[1.5]">
            {description}
          </p>
        </div>

        <div className="flex gap-2">
          {hideLeftButton || (
            <Button size="md" variant="ghost" onClick={onClose}>
              취소
            </Button>
          )}
          <Button size="md" variant="contained" onClick={onSubmit}>
            {actionLabel || '확인'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
