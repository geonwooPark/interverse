import { PropsWithChildren } from 'react'

function ModalBackdrop({ children }: PropsWithChildren) {
  return (
    <div className="fixed inset-0 flex h-screen w-screen items-center justify-center bg-black/70 font-neodgm">
      {children}
    </div>
  )
}

export default ModalBackdrop
