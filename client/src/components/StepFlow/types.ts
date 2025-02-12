export interface StepFlowProps {
  activeStep: number
  onNext: () => void
}

export type StepProps = Partial<Omit<StepFlowProps, 'activeStep'>>
