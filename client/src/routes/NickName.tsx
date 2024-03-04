import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { setCookie } from '../utils/cookie'

function NickName() {
  const navigate = useNavigate()
  const location = useLocation()
  const { roomNum, path } = location.state

  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onClick = () => {
    if (!value) return setError('닉네임을 입력해주세요')

    const userCookie = {
      roomNum,
      role: 'user',
      nickName: value,
      path,
    }

    setCookie('interverse_user', JSON.stringify(userCookie), {
      expires: new Date(Date.now() + 3 * 60 * 60 * 1000),
    })
    navigate(userCookie.path)
  }

  useEffect(() => {
    setError('')
  }, [value])

  return (
    <div className="fixed inset-0 flex h-screen w-screen items-center justify-center bg-black/70 font-neodgm">
      <div className="h-fit w-[300px] rounded-md bg-white p-4">
        <p className="mb-4">닉네임을 입력해주세요</p>
        <input
          type="text"
          name="name"
          value={value}
          placeholder="닉네임"
          autoComplete="off"
          className="mb-4 w-full rounded-md border bg-gray-100 px-4 py-2 text-xl outline-none"
          onChange={handleChange}
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
          시작하기
        </button>
      </div>
    </div>
  )
}

export default NickName
