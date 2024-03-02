import { useEffect, useState } from 'react'
import { decrypt } from '../utils/crypto'
import { useLocation, useNavigate } from 'react-router-dom'

function Password() {
  const navigate = useNavigate()
  const location = useLocation()
  const { password } = location.state
  const decryptedPassword = decrypt(password)

  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onClick = () => {
    if (!value || decryptedPassword !== value) {
      return setError('비밀번호를 확인해주세요')
    }
    navigate(`/nickname`, {
      state: location.state,
    })
  }

  useEffect(() => {
    setError('')
  }, [value])

  return (
    <div className="fixed inset-0 flex h-screen w-screen items-center justify-center bg-black/70 font-neodgm">
      <div className="h-fit w-[300px] rounded-md bg-white p-4">
        <div className="mb-4">비밀번호를 입력해주세요</div>
        <input
          type="password"
          name="password"
          value={value}
          placeholder="비밀번호"
          autoComplete="off"
          className="mb-2 w-full rounded-md border bg-gray-100 px-4 py-2 text-xl outline-none"
          onChange={handleChange}
          maxLength={4}
        />
        {error && (
          <p className="mb-2 flex items-center text-sm text-red-600">
            <span className="mr-1">{error}</span>
            <span className="translate-y-[2px] text-lg">🥲</span>
          </p>
        )}
        <button
          onClick={onClick}
          className="h-[50px] w-full rounded-md bg-purple-600 text-white hover:bg-purple-700"
        >
          다음
        </button>
      </div>
    </div>
  )
}

export default Password
