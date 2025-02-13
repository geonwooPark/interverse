import React from 'react'

interface LogoProps {
  width: number
}

export default function Logo({ width }: LogoProps) {
  return (
    <div className="mb-5">
      <img src="/images/logo.png" alt="logo" width={width} />
    </div>
  )
}
