import React, { ComponentType, Suspense, ReactNode } from 'react'
import Loading from '@components/StepFlow/Loading'

export default function withSuspense<T extends object>(
  Component: ComponentType<T>,
  fallback: ReactNode = <Loading />,
): ComponentType<T> {
  return function EnhancedComponent(props: T) {
    return (
      <Suspense fallback={fallback}>
        <Component {...props} />
      </Suspense>
    )
  }
}
