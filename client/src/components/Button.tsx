import { cva } from 'class-variance-authority'
import { cn } from '../utils/cn'
import React, { InputHTMLAttributes, PropsWithChildren } from 'react'

interface ButtonProps
  extends Omit<InputHTMLAttributes<HTMLButtonElement>, 'size'> {
  type?: 'submit' | 'button'
  size: 'sm' | 'md' | 'lg'
  variant: 'contained' | 'outlined' | 'ghost'
  fullWidth?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const ButtonVariants = cva(
  `disabled:bg-grey flex w-full items-center justify-center rounded-[8px] transition-all duration-200 disabled:cursor-not-allowed`,
  {
    variants: {
      size: {
        sm: 'h-[36px] px-4 text-xs font-medium',
        md: 'h-[40px] px-6 text-sm font-medium',
        lg: 'h-[50px] px-8 text-base font-bold',
      },
      variant: {
        contained:
          'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50 hover:bg-cyan-400',
        outlined: 'border-2 border-cyan-500 text-cyan-500',
        ghost: 'border-2',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      fullWidth: false,
    },
  },
)

function Button({
  children,
  size,
  variant,
  fullWidth,
  leftIcon,
  rightIcon,
  type = 'button',
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      type={type}
      {...props}
      className={cn(ButtonVariants({ size, variant, fullWidth }))}
    >
      {leftIcon}
      <span>{children}</span>
      {rightIcon}
    </button>
  )
}

export default Button
