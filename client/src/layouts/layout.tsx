import { PropsWithChildren } from 'react'

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="fixed inset-0 flex h-screen w-screen items-center justify-center">
      {children}
    </div>
  )
}
