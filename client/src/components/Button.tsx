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
  className?: string
}

const ButtonVariants = cva(
  `flex w-auto items-center justify-center rounded-[8px] transition-all duration-200 disabled:cursor-not-allowed disabled:border-none disabled:bg-gray-300 disabled:text-gray-400 disabled:shadow-none`,
  {
    variants: {
      size: {
        sm: 'h-[36px] px-4 text-caption font-medium',
        md: 'h-[40px] px-6 text-body2 font-medium',
        lg: 'h-[48px] px-8 text-base font-bold',
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
  className,
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      type={type}
      {...props}
      className={cn(ButtonVariants({ size, variant, fullWidth }), className)}
    >
      {leftIcon}
      <span className="pointer-events-none">{children}</span>
      {rightIcon}
    </button>
  )
}

export default Button
