import { useEffect, useState } from 'react'
import Step1 from './Step1'
import Step2 from './Step2'
import StepFlow from '../../components/StepFlow'
import GameSingleton from '../../PhaserGame'

/**
 * 웨이팅 화면
 */
function WaitingPage() {
  const [step, setStep] = useState(0)

  const onNext = () => {
    setStep((prev) => prev + 1)
  }

  useEffect(() => {
    const game = GameSingleton.getInstance()

    // 필요한 에셋 프리로드
    game.scene.start('Preload')
  }, [])

  return (
    <StepFlow activeStep={step} onNext={onNext}>
      <Step1 />
      <Step2 />
    </StepFlow>
  )
}

export default WaitingPage
