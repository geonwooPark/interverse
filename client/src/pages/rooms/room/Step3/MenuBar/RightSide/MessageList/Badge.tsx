import { cn } from '@utils/cn'
import React from 'react'

interface BadgeProps {
  className?: string
}

export default function Badge({ className }: BadgeProps) {
  return (
    <span className={cn('relative flex size-2.5', className)}>
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-500 opacity-75"></span>
      <span className="relative inline-flex size-2.5 rounded-full bg-red-600"></span>
    </span>
  )
}
