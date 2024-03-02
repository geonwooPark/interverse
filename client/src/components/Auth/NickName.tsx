import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { setCookie } from '../../utils/cookie'

function NickName() {
  const navigate = useNavigate()
  const location = useLocation()
  const { roomNum, title } = location.state

  const [value, setValue] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onClick = () => {
    if (!value) return alert('닉네임을 확인하세요 쫌! 😑')

    const encodedTitle = encodeURIComponent(title)

    const userCookie = {
      roomNum,
      role: 'user',
      nickName: value,
      path: `/${roomNum}/?title=${encodedTitle}`,
    }

    setCookie('interverse_user', JSON.stringify(userCookie), {
      expires: new Date(Date.now() + 3 * 60 * 60 * 1000),
    })
    navigate(userCookie.path)
  }

  return (
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
      <button
        onClick={onClick}
        className="h-[50px] w-full rounded-md bg-purple-600 text-white hover:bg-purple-700"
      >
        시작하기
      </button>
    </div>
  )
}

export default NickName
