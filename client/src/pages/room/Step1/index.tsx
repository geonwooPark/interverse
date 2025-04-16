import { useState } from 'react'
import { decrypt } from '@utils/crypto'
import TextField from '@components/TextField'
import { StepFlowProps } from '@components/StepFlow/types'
import Button from '@components/Button'
import { useSearchParams } from 'react-router-dom'
import withCaption from '@hocs/withCaption'
import { IconExclamation } from '@assets/svgs'

const TextFieldWithCaption = withCaption(TextField)

interface Step1Props extends Partial<StepFlowProps> {}

// 스텝1 - 방 입장 전 비밀번호 체크 + 인원 제한 체크
function Step1({ activeStep, onNext }: Step1Props) {
  const [searchParams] = useSearchParams()

  const hp = searchParams.get('hp') as string

  const decryptedPassword = decrypt(hp)

  const [value, setValue] = useState('')

  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onClick = () => {
    if (!value || decryptedPassword !== value) {
      setError('비밀번호를 확인해주세요')

      return setTimeout(() => setError(''), 3000)
    }

    onNext && onNext()
  }

  return (
    <div className="flex size-full items-center justify-center">
      <div className="w-[360px] rounded-3xl p-8 shadow-level1">
        <div className="mb-4 text-subtitle1">비밀번호를 입력해주세요</div>
        <div className="mb-6">
          <TextFieldWithCaption
            type="password"
            value={value}
            placeholder="비밀번호"
            onChange={handleChange}
            maxLength={4}
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
          disabled={value.length === 0}
          onClick={onClick}
        >
          다음
        </Button>
      </div>
    </div>
  )
}

export default Step1
