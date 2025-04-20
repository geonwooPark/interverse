import React from 'react'
import Icon, { IconProps } from './Icon'

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    IconProps {}

export default function IconButton({
  iconName,
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      className={`flex size-5 items-center justify-center ${className ?? ''}`}
      {...props}
    >
      <Icon iconName={iconName} />
    </button>
  )
}
