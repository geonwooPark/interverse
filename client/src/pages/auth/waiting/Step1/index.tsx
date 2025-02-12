import { useState } from 'react'
import { decrypt } from '../../../../lib/crypto'
import { useLocation } from 'react-router-dom'
import TextField from '../../../../components/TextField'
import { StepFlowProps } from '../../../../components/StepFlow/types'

interface Step1Props extends Partial<StepFlowProps> {}

function Step1({ activeStep, onNext }: Step1Props) {
  // const location = useLocation()

  // const { password } = location.state

  // const decryptedPassword = decrypt(password)

  const [value, setValue] = useState('')

  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onClick = () => {
    // if (!value || decryptedPassword !== value) {
    //   setError('비밀번호를 확인해주세요')
    //   return setTimeout(() => setError(''), 3000)
    // }
    // navigate(`/room`)
    onNext && onNext()
  }

  return (
    <div className="space-y-4">
      <div className="title mb-4">비밀번호를 입력해주세요</div>

      <TextField
        type="password"
        value={value}
        placeholder="비밀번호"
        onChange={handleChange}
        maxLength={4}
        error={error}
      />

      <button onClick={onClick} className="primary-button">
        다음
      </button>
    </div>
  )
}

export default Step1
