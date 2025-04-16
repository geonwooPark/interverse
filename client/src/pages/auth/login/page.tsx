import { useNavigate } from 'react-router-dom'
import TextField from '@components/TextField'
import withCaption from '@hocs/withCaption'
import { IconExclamation } from '@assets/svgs'
import { useState } from 'react'
import { paths } from '@routes/paths'
import Button from '@components/Button'

const TextFieldWithCaption = withCaption(TextField)

function LoginPage() {
  const navigate = useNavigate()

  const [value, setValue] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState({
    email: '',
    password: '',
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setValue((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h4 className="mb-4 text-center text-h4">로그인</h4>

        <form className="mb-3 flex w-full flex-1 flex-col gap-3">
          <TextFieldWithCaption
            type="email"
            name="email"
            value={value.email}
            placeholder="이메일"
            onChange={onChange}
            autoComplete="off"
            caption={
              error.email && (
                <div className="ml-2 mt-1 flex items-center gap-1 text-red-600">
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
            maxLength={4}
            caption={
              error.password && (
                <div className="ml-2 mt-1 flex items-center gap-1 text-red-600">
                  <IconExclamation className="size-4" />
                  <p className="text-caption">{error.password}</p>
                </div>
              )
            }
          />
        </form>

        <div className="text-caption">
          <span className="mr-1">비밀번호를 잊어버리셨나요?</span>
          <button
            className="font-semibold text-cyan-600"
            onClick={() => navigate(paths.signUp)}
          >
            비밀번호 찾기
          </button>
        </div>
      </div>

      <div className="w-full space-y-4">
        <Button
          size="md"
          variant="contained"
          fullWidth
          onClick={() => navigate(paths.createRoom)}
        >
          로그인
        </Button>

        <div className="h-[2px] w-full bg-gray-200" />

        <div className="mt-4 text-center text-caption">
          처음 방문하셨나요?{' '}
          <button
            className="text-caption font-semibold text-cyan-600"
            onClick={() => navigate(paths.signUp)}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
