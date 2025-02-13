import { useState } from 'react'
import { getCookie } from '../../lib/cookie'
import Step1 from './Step1'
import Step2 from './Step2'
import StepFlow from '../../components/StepFlow'

function WaitingRoomPage() {
  const hostCookie = getCookie('interverse_host')

  const [step, setStep] = useState(0)

  const onNext = () => {
    setStep((prev) => prev + 1)
  }

  return (
    <div className="flex size-full items-center justify-center">
      <div className="w-[360px] space-y-8 rounded-3xl bg-gray-300 p-8">
        <StepFlow activeStep={step} onNext={onNext}>
          <Step1 />
          <Step2 />
        </StepFlow>
      </div>
    </div>
  )
}

export default WaitingRoomPage
