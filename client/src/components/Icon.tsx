import React from 'react'
import * as SvgIcon from '@assets/svgs'

export interface IconProps {
  iconName: keyof typeof SvgIcon
  className?: string
}

export default function Icon({ iconName, className }: IconProps) {
  const Element = SvgIcon[iconName]

  return Element ? <Element className={className} /> : null
}
