import { PropsWithChildren } from 'react'

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="fixed inset-0 h-screen w-screen">
      <div className="flex size-full items-center justify-center">
        {children}
      </div>
    </div>
  )
}
