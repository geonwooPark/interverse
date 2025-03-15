import Button from './Button'

interface InfomationModalProps {
  title: string
  description: string
  actionLabel?: string
  hasDim?: boolean
  onClose: () => void
}

function InfomationModal({
  title,
  description,
  actionLabel,
  hasDim = true,
  onClose,
}: InfomationModalProps) {
  return (
    <div className="absolute inset-0 h-screen w-screen">
      {/* Dim */}
      {hasDim && <div onClick={onClose} className="size-full bg-black/70" />}

      {/* Modal */}
      <div
        className={`absolute left-[50%] top-[50%] size-full h-fit w-[320px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white p-4`}
      >
        <div>
          <p className="text-lg">{title}</p>
        </div>

        <div className="py-5">
          <p className="whitespace-pre-line text-sm leading-[0.8]">
            {description}
          </p>
        </div>

        <div className="flex gap-2">
          <Button size="md" variant="contained" onClick={onClose}>
            {actionLabel || '확인'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default InfomationModal
