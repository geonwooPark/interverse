import React, {
  ComponentType,
  ForwardedRef,
  ReactNode,
  forwardRef,
} from 'react'

interface CaptionProps {
  caption?: ReactNode
}

export default function withCaption<T extends object>(
  Component: ComponentType<T>,
) {
  const EnhancedComponent = forwardRef(
    (props: T & CaptionProps, ref: ForwardedRef<any>) => {
      const { caption, ...rest } = props

      return (
        <>
          <Component {...(rest as T)} ref={ref} />
          {caption}
        </>
      )
    },
  )

  EnhancedComponent.displayName = `WithCaption(${Component.displayName || Component.name || 'Component'})`

  return EnhancedComponent
}
