import { useState } from 'react'
import { schema } from './schema'
import FormProvider from '@components/Rhf/FormProvider'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import StepFlow from '@components/StepFlow'
import Step1 from './Step1'
import Step2 from './Step2'
import { authService } from '@services/authService'
import { useNavigate } from 'react-router-dom'

function SignUpPage() {
  const navigate = useNavigate()

  const methods = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      nickname: '',
    },
  })

  const [activeStep, setActiveStep] = useState(0)

  const { handleSubmit } = methods

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await authService.signup(data)

      if (res.data) {
        navigate('/login')
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    }
  })

  const onNext = () => {
    setActiveStep((prev) => prev + 1)
  }
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <h4 className="mb-4 text-center text-h4">회원가입</h4>

      <StepFlow activeStep={activeStep} onNext={onNext}>
        <Step1 />
        <Step2 />
        {/*  <Step3 /> */}
      </StepFlow>
    </FormProvider>
  )
}

export default SignUpPage
