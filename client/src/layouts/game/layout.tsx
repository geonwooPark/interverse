import { PropsWithChildren } from 'react'
import Header from './Header'

export default function GameLayout({ children }: PropsWithChildren) {
  return (
    <div className="fixed inset-0 z-[100]">
      <Header />

      <main className="h-[100vh] pt-[64px]">{children}</main>
    </div>
  )
}
