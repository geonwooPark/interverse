import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import Button from '@components/Button'
import FadeIn from '@components/Animation/FadeIn'
import useTimer from '@hooks/useTimer'
import TextField from '@components/TextField'
import { Link } from 'react-router-dom'
import RhfTextField from '@components/Rhf/RhfTextField'
import Icon from '@components/Icon'
import { StepProps } from '@components/StepFlow/types'
import {
  useCheckIdMutation,
  useCheckVerificationCode,
  useSendVerificationEmailMutation,
} from '@hooks/mutations/authMutations'

export default function Step1({ onNext }: StepProps) {
  const {
    trigger,
    getValues,
    formState: { errors },
  } = useFormContext()

  const { mutate: checkIdMutate } = useCheckIdMutation()

  const { mutate: sendVerificationEmailMutate } =
    useSendVerificationEmailMutation()

  const { mutate: checkVerificationCodeMutate } = useCheckVerificationCode()

  const { timer, isTimerActive, canResend, activeTimer } = useTimer()

  const [code, setCode] = useState('')

  const goNext = async () => {
    if (!onNext) return

    const isEmailValid = await trigger('email')
    if (isEmailValid) {
      const email = getValues('email')

      checkVerificationCodeMutate(
        {
          email,
          code: Number(code),
        },
        {
          onSuccess() {
            onNext()
          },
        },
      )
    }
  }

  const onVerifyClick = async () => {
    const isEmailValid = await trigger('email')

    if (isEmailValid) {
      const email = getValues('email')

      checkIdMutate(email, {
        onSuccess: () => {
          sendVerificationEmailMutate(email, {
            onSuccess: () => activeTimer(),
          })
        },
      })
    }
  }

  const onResendClick = () => {
    activeTimer()
    onVerifyClick()
  }

  return (
    <FadeIn>
      <div className="mb-6">
        <div className="mb-3 flex items-start gap-2">
          <RhfTextField name="email" placeholder="이메일" />
          <Button
            type="button"
            size="lg"
            variant="outlined"
            disabled={!canResend}
            onClick={onVerifyClick}
            className="w-[96px] px-2"
          >
            인증하기
          </Button>
        </div>
        {isTimerActive && (
          <div>
            <TextField
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="인증번호"
              endIcon={timer}
              className="mb-2 w-full"
            />
            <div className="flex gap-1 px-3 py-2 text-caption">
              <p>인증번호가 전송되지 않으셨나요? </p>
              <button
                className="cursor-pointer font-semibold text-primary-dark"
                onClick={onResendClick}
              >
                다시 전송하기
              </button>
            </div>
          </div>
        )}
      </div>

      <Button
        type="button"
        variant="contained"
        size="lg"
        fullWidth
        className="mb-4"
        onClick={goNext}
      >
        다음
      </Button>

      <div className="flex justify-center text-caption">
        <Link to={'/login'} className="flex items-center gap-1">
          <Icon iconName="IconChevronLeft" className="size-3" />
          로그인 페이지로 돌아가기
        </Link>
      </div>
    </FadeIn>
  )
}
