import { useState } from 'react'
import { decrypt } from '../../lib/crypto'
import { useLocation, useNavigate } from 'react-router-dom'

function PasswordPage() {
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
      setError('비밀번호를 확인해주세요')

      return setTimeout(() => setError(''), 3000)
    }
    navigate(`/nickname`, {
      state: location.state,
    })
  }

  return (
    <div className="fixed inset-0 flex h-screen w-screen items-center justify-center bg-black/70 font-neodgm">
      <div className="h-fit w-[300px] rounded-md bg-white p-4">
        <div className="title mb-4">비밀번호를 입력해주세요</div>
        <input
          type="password"
          name="password"
          value={value}
          placeholder="비밀번호"
          autoComplete="off"
          className="input mb-2"
          onChange={handleChange}
          maxLength={4}
        />
        {error && (
          <p className="description mb-2 flex items-center text-red-600">
            <span className="mr-1">{error}</span>
            <span className="translate-y-[2px] text-lg">🥲</span>
          </p>
        )}
        <button onClick={onClick} className="primary-button">
          다음
        </button>
      </div>
    </div>
  )
}

export default PasswordPage
