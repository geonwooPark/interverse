import React, { PropsWithChildren } from 'react'
import { StepFlowProps } from './types'

export default function StepFlow({
  children,
  activeStep,
  onNext,
}: PropsWithChildren<StepFlowProps>) {
  const currentChild = React.Children.toArray(children)[activeStep]

  if (React.isValidElement(currentChild)) {
    return React.cloneElement(currentChild as JSX.Element, { onNext })
  }

  return currentChild
}
