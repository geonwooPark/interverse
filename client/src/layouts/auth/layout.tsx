import React, { PropsWithChildren } from 'react'

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="fixed inset-0 h-screen w-screen bg-[#1F3131]">
      {children}
    </div>
  )
}
