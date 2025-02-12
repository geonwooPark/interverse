import React, { useState } from 'react'
import AvatarSelector from './AvatarSelector'
import TextField from '../../../../components/TextField'
import { useNavigate } from 'react-router-dom'
import { MAX_NICKNAME_LENGTH } from '../../../../constants'
import { StepFlowProps } from '../../../../components/StepFlow/types'

interface Step2Props extends Partial<StepFlowProps> {}

export default function Step2({ activeStep, onNext }: Step2Props) {
  const navigate = useNavigate()

  const [texture, setTexture] = useState(0)

  const [nickname, setNickname] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > MAX_NICKNAME_LENGTH) {
      e.target.value = e.target.value.slice(0, MAX_NICKNAME_LENGTH)
    }
    setNickname(e.target.value)
  }

  return (
    <>
      <div className="space-y-3">
        <AvatarSelector texture={texture} setTexture={setTexture} />
        <div>
          <TextField
            value={nickname}
            onChange={onChange}
            placeholder="닉네임"
            maxLength={MAX_NICKNAME_LENGTH}
          />
          <p className="ml-2 mt-1 text-xs text-gray-700">
            닉네임은 최대 {MAX_NICKNAME_LENGTH}글자까지 가능합니다.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <button className="primary-button">입장하기</button>
      </div>
    </>
  )
}
