import { useState } from 'react'
import { decrypt } from '../../utils/crypto'
import { useLocation, useNavigate } from 'react-router-dom'

function Password() {
  const navigate = useNavigate()
  const location = useLocation()
  const { password } = location.state
  const decryptedPassword = decrypt(password)

  const [value, setValue] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onClick = () => {
    if (!value || decryptedPassword !== value) {
      return alert('비밀번호를 확인하세요 쫌! 😑')
    }
    navigate(`/auth/nickname`, {
      state: location.state,
    })
  }

  return (
    <div className="h-fit w-[300px] rounded-md bg-white p-4">
      <div className="mb-4">비밀번호를 입력해주세요</div>
      <input
        type="password"
        name="password"
        value={value}
        placeholder="비밀번호"
        autoComplete="off"
        className="mb-4 w-full rounded-md border bg-gray-100 px-4 py-2 text-xl outline-none"
        onChange={handleChange}
        maxLength={4}
      />
      <button
        onClick={onClick}
        className="h-[50px] w-full rounded-md bg-purple-600 text-white hover:bg-purple-700"
      >
        다음
      </button>
    </div>
  )
}

export default Password
