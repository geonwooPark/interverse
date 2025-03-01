import { useEffect, useState } from 'react'
import StepFlow from '../../components/StepFlow'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import ConfirmModal from '../../components/ConfirmModal'
import { useBlockGoBack } from '../../hooks/useBlockGoBack'
import useModals from '../../hooks/useModals'
import GameManager from '@managers/GameManager'

/**
 * 웨이팅 화면
 */
function WaitingPage() {
  const game = GameManager.getInstance()

  const { modals, addModal, removeModal } = useModals()

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

  // 뒤로가기 막기
  useBlockGoBack(() =>
    addModal(
      <ConfirmModal
        title="나가기"
        description="정말 종료하시겠습니까?"
        actionLabel="종료"
        onClose={removeModal}
        onSubmit={() => window.location.replace('/')}
      />,
    ),
  )

  return (
    <>
      <StepFlow activeStep={step} onNext={onNext}>
        <Step1 />
        <Step2 />
        <Step3 />
      </StepFlow>

      {modals}
    </>
  )
}

export default WaitingPage
