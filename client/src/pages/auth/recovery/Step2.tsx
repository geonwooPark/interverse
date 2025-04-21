import FadeIn from '@components/Animation/FadeIn'
import Button from '@components/Button'
import IconButton from '@components/IconButton'
import RhfTextField from '@components/Rhf/RhfTextField'
import { StepProps } from '@components/StepFlow/types'
import React, { useReducer } from 'react'

export default function Step2({ onNext }: StepProps) {
  const [showPassword, setShowPassword] = useReducer((prev) => !prev, false)

  const [showConfirmPassword, setShowConfirmPassword] = useReducer(
    (prev) => !prev,
    false,
  )

  return (
    <FadeIn>
      <div className="mb-3 flex w-full flex-1 flex-col gap-3">
        <RhfTextField
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="비밀번호"
          endIcon={
            <IconButton
              iconName={showPassword ? 'IconEyeSlash' : 'IconEye'}
              className="text-grey"
              onClick={setShowPassword}
            />
          }
        />
        <RhfTextField
          type={showConfirmPassword ? 'text' : 'password'}
          name="confirmPassword"
          placeholder="비밀번호 확인"
          endIcon={
            <IconButton
              iconName={showConfirmPassword ? 'IconEyeSlash' : 'IconEye'}
              className="text-grey"
              onClick={setShowConfirmPassword}
            />
          }
        />
      </div>

      <Button type="submit" variant="contained" size="lg" fullWidth>
        변경하기
      </Button>
    </FadeIn>
  )
}
