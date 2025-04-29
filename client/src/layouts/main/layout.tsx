import Container from '@components/Container'
import { PropsWithChildren } from 'react'
import Header from './Header'

export default function RoomLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />

      <main className="h-full pb-[80px] pt-[64px]">
        <Container className="max-w-[1440px] px-10 desktop:px-20">
          {children}
        </Container>
      </main>
    </>
  )
}
