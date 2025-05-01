import { useState } from 'react'
import { StepFlowProps } from '@components/StepFlow/types'
import Button from '@components/Button'
import { IconExclamation } from '@assets/svgs'
import { TextFieldWithCaption } from '@components/TextField'
import Container from '@components/Container'
import { roomsService } from '@services/roomsService'
import { useParams } from 'react-router-dom'
import { AxiosError } from 'axios'

interface Step1Props extends Partial<StepFlowProps> {}

function Step1({ activeStep, onNext }: Step1Props) {
  const { id: roomId } = useParams()

  const [password, setPassword] = useState('')

  const [error, setError] = useState('')

  const checkPassword = async () => {
    if (!roomId) return

    try {
      const res = await roomsService.checkPassword({ roomId, password })

      if (res) {
        onNext && onNext()
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.message)
      }
    }
  }

  return (
    <div className="flex size-full items-center justify-center">
      <Container className="max-w-[360px]">
        <div className="mb-4 text-subtitle1">비밀번호를 입력해주세요</div>
        <div className="mb-6">
          <TextFieldWithCaption
            type="password"
            value={password}
            placeholder="비밀번호"
            onChange={(e) => setPassword(e.target.value)}
            caption={
              error && (
                <div className="ml-2 mt-1 flex items-center gap-1 text-red-600">
                  <IconExclamation className="size-4" />
                  <p className="text-caption">{error}</p>
                </div>
              )
            }
          />
        </div>

        <Button
          size="lg"
          variant="contained"
          fullWidth
          disabled={password.length === 0}
          onClick={checkPassword}
        >
          다음
        </Button>
      </Container>
    </div>
  )
}

export default Step1
