'use client'

import React, { PropsWithChildren } from 'react'
import { motion as m } from 'motion/react'
import slide from './motions/slide'

export default function FadeIn({ children }: PropsWithChildren) {
  return (
    <m.div {...slide({ isFade: true }).inY} className="size-full">
      {children}
    </m.div>
  )
}
