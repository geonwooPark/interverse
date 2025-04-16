import React from 'react'

interface LogoProps {
  width: number
  className?: string
}

export default function Logo({ width, className }: LogoProps) {
  return (
    <div className={className}>
      <img src="/images/logo.png" alt="logo" width={width} />
    </div>
  )
}
