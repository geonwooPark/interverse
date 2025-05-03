import React from 'react'
import Icon, { IconProps } from './Icon'
import { cn } from '@utils/cn'

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
      className={`flex size-10 items-center justify-center rounded-md duration-200 hover:bg-gray-100`}
      {...props}
    >
      <Icon iconName={iconName} className={cn('size-6', className)} />
    </button>
  )
}
