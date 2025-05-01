import { useEffect, useState } from 'react'
import StepFlow from '@components/StepFlow'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import GameManager from '@managers/GameManager'
import SceneProvider from '@providers/SceneProvider'
import GameScene from '@games/scenes/Game'
import ModalProvider from '@providers/ModalProvider'

/**
 * 룸 화면
 */
function RoomPage() {
  const game = GameManager.getInstance()

  const gameScene = game.scene.getScene('game') as GameScene

  const [step, setStep] = useState(0)

  const onNext = () => {
    setStep((prev) => prev + 1)
  }

  // 필요한 에셋 프리로드
  useEffect(() => {
    if (!game.scene.isActive('Preload')) {
      game.scene.start('Preload')
    }
  }, [])

  return (
    <SceneProvider scene={gameScene}>
      <ModalProvider>
        <StepFlow activeStep={step} onNext={onNext}>
          <Step1 />
          <Step2 />
          {/* <Step3 /> */}
        </StepFlow>
      </ModalProvider>
    </SceneProvider>
  )
}

export default RoomPage
