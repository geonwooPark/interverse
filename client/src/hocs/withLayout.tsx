import React, { ComponentType, ReactNode } from 'react'
import withSuspense from './withSuspense'

export default function withLayout<T extends JSX.IntrinsicAttributes>(
  Layout: ComponentType<{ children: ReactNode }>,
  Component: ComponentType<T>,
) {
  const WrappedComponent = (props: T) => (
    <Layout>
      <Component {...props} />
    </Layout>
  )

  WrappedComponent.displayName = `withLayout(${Component.displayName || Component.name || 'Component'})`

  return WrappedComponent
}

export const withSuspenseLayout = <T extends JSX.IntrinsicAttributes>(
  Layout: ComponentType<{ children: ReactNode }>,
  Component: ComponentType<T>,
) => withSuspense(withLayout(Layout, Component))
