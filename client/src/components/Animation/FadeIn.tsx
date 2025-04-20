'use client'

import React, { PropsWithChildren } from 'react'
import { motion as m } from 'motion/react'
import slideIn from './motions/slideIn'

export default function FadeIn({ children }: PropsWithChildren) {
  return (
    <m.div {...slideIn({ isFade: true }).inY} className="size-full">
      {children}
    </m.div>
  )
}
