interface ManualModalProps {
  onClose: () => void
  hasDim?: boolean
}

function ManualModal({ onClose, hasDim = false }: ManualModalProps) {
  return (
    <div className="fixed inset-0 h-screen w-screen">
      {/* Dim */}
      {hasDim && <div onClick={onClose} className="size-full bg-black/70" />}

      {/* Modal */}
      <div className="absolute left-[50%] top-[50%] mx-auto flex w-[85%] max-w-[2000px] translate-x-[-50%] translate-y-[-50%] items-center justify-between ">
        <img src="/images/manual.png" />
      </div>
    </div>
  )
}

export default ManualModal
