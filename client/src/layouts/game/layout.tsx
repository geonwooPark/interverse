import { PropsWithChildren } from 'react'
import Header from './Header'

export default function GameLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />

      <main className="h-[100vh] pt-[64px]">{children}</main>
    </>
  )
}
