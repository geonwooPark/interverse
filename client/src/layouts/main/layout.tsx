import { PropsWithChildren } from 'react'

export default function RoomLayout({ children }: PropsWithChildren) {
  return (
    <div className="fixed inset-0 flex h-screen w-screen items-center justify-center">
      {children}
    </div>
  )
}
