import { useNavigate } from 'react-router-dom'
import gifImage from '/gif/interverse.gif'
import Button from '@components/Button'
import Logo from '@components/Logo'
import { paths } from '@routes/paths'
import TextField from '@components/TextField'
import withCaption from '@hocs/withCaption'
import { IconExclamation } from '@assets/svgs'
import { useState } from 'react'
import { schema } from './schema'

const TextFieldWithCaption = withCaption(TextField)

function SignUpPage() {
  const navigate = useNavigate()

  const [value, setValue] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [error, setError] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value: inputValue } = e.target

    const newValues = {
      ...value,
      [name]: inputValue,
    }

    setValue(newValues)

    if (inputValue.trim() === '') {
      setError((prev) => ({
        ...prev,
        [name]: '',
      }))
      return
    }

    try {
      await schema.validate(newValues, { abortEarly: false })

      setError((prev) => ({
        ...prev,
        [name]: '',
      }))
    } catch (err: any) {
      const fieldError = err.inner?.find((e: any) => e.path === name)
      setError((prev) => ({
        ...prev,
        [name]: fieldError?.message || '',
      }))
    }
  }

  return (
    <div className="flex flex-col items-center">
      {/* 로고 */}
      <Logo width={240} />

      <div className="grid w-[720px] grid-cols-2 gap-4 rounded-3xl p-8 shadow-level1">
        {/* 영상 */}
        <div className="aspect-square overflow-hidden rounded-2xl">
          <img src={gifImage} alt="GIF" className="size-full object-cover" />
        </div>

        {/* 인트로 */}
        <div className="flex flex-col items-center justify-center px-2 text-center">
          <form className="flex w-full flex-1 flex-col gap-3">
            <TextFieldWithCaption
              type="email"
              name="email"
              value={value.email}
              placeholder="이메일"
              onChange={onChange}
              autoComplete="off"
              caption={
                error.email && (
                  <div className="ml-2 mt-[0.5] flex items-center gap-1 text-red-600">
                    <IconExclamation className="size-4" />
                    <p className="text-caption">{error.email}</p>
                  </div>
                )
              }
            />
            <TextFieldWithCaption
              type="password"
              name="password"
              value={value.password}
              placeholder="비밀번호"
              onChange={onChange}
              autoComplete="off"
              caption={
                error.password && (
                  <div className="ml-2 mt-[0.5] flex items-center gap-1 text-red-600">
                    <IconExclamation className="size-4" />
                    <p className="text-caption">{error.password}</p>
                  </div>
                )
              }
            />
            <TextFieldWithCaption
              type="password"
              name="confirmPassword"
              value={value.confirmPassword}
              placeholder="비밀번호 확인"
              onChange={onChange}
              autoComplete="off"
              caption={
                error.confirmPassword && (
                  <div className="ml-2 mt-[0.5] flex items-center gap-1 text-red-600">
                    <IconExclamation className="size-4" />
                    <p className="text-caption">{error.confirmPassword}</p>
                  </div>
                )
              }
            />
          </form>

          <div className="w-full space-y-4">
            <Button
              size="md"
              variant="contained"
              fullWidth
              onClick={() => navigate(paths.signUp)}
            >
              회원가입
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
