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
import { authService } from '@services/authService'
import { AxiosError } from 'axios'

function RecoveryPage() {
  const navigate = useNavigate()

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
    try {
      const result = await authService.changePassword({
        email: data.email,
        newPassword: data.password,
      })

      if (result) {
        navigate(paths.login)
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message)
      }
    }
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
