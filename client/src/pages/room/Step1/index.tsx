import { useState } from 'react'
import { decrypt } from '@utils/crypto'
import TextField from '@components/TextField'
import { StepFlowProps } from '@components/StepFlow/types'
import Button from '@components/Button'
import { useSearchParams } from 'react-router-dom'
import { useRoomsAction, useRoomsState } from '@providers/RoomsProvider'
import { CookieType } from '../../../../../types/client'

interface Step1Props extends Partial<StepFlowProps> {}

function Step1({ activeStep, onNext }: Step1Props) {
  const rooms = useRoomsState()

  const updateRooms = useRoomsAction()

  const [searchParams] = useSearchParams()

  const roomNum = searchParams.get('roomNum') as string

  const title = searchParams.get('title') as string

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

    const cookie: CookieType = {
      roomNum,
      role: 'guest',
      title,
      createAt: new Date(),
    }

    updateRooms([...rooms, cookie])

    onNext && onNext()
  }

  return (
    <div className="flex size-full items-center justify-center">
      <div className="w-[360px] rounded-3xl p-8 shadow-level1">
        <div className="mb-4 text-xl">비밀번호를 입력해주세요</div>
        <div className="mb-6">
          <TextField
            type="password"
            value={value}
            placeholder="비밀번호"
            onChange={handleChange}
            maxLength={4}
            error={error}
          />
        </div>

        <Button size="lg" variant="contained" fullWidth onClick={onClick}>
          다음
        </Button>
      </div>
    </div>
  )
}

export default Step1
