import { useState } from 'react'
import FormProvider from '@components/Rhf/FormProvider'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import StepFlow from '@components/StepFlow'
import { useNavigate } from 'react-router-dom'
import { paths } from '@routes/paths'
import Step1 from './Step1'
import { schema } from './schema'
import Step2 from './Step2'
import { useChangePasswordMutation } from '@hooks/mutations/authMutations'

function RecoveryPage() {
  const navigate = useNavigate()

  const { mutate: changePasswordMutate } = useChangePasswordMutation()

  const methods = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const [activeStep, setActiveStep] = useState(0)

  const { handleSubmit } = methods

  const onSubmit = handleSubmit(async (data) => {
    changePasswordMutate(
      {
        email: data.email,
        newPassword: data.password,
      },
      {
        onSuccess: () => {
          navigate(paths.login)
        },
      },
    )
  })

  const onNext = () => {
    setActiveStep((prev) => prev + 1)
  }
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <h4 className="mb-4 text-center text-h4">비밀번호 재설정</h4>

      <StepFlow activeStep={activeStep} onNext={onNext}>
        <Step1 />
        <Step2 />
      </StepFlow>
    </FormProvider>
  )
}

export default RecoveryPage
