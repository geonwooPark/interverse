import React, { ComponentType, ReactNode } from 'react'

interface CaptionProps {
  caption: ReactNode
}

export default function withCaption<T extends object>(
  Component: ComponentType<T>,
) {
  return function EnhancedComponent(props: T & CaptionProps) {
    const { caption, ...rest } = props

    return (
      <>
        <Component {...(rest as T)} />
        {caption}
      </>
    )
  }
}
