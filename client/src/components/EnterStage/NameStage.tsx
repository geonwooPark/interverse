import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { setCookie } from '../../utils/cookie'

interface NameStageProps {
  setStage: React.Dispatch<React.SetStateAction<number>>
}

function NameStage({ setStage }: NameStageProps) {
  const params = useParams()
  const [value, setValue] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onClick = () => {
    if (!value) return alert('닉네임을 확인하세요 쫌! 😑')

    // 유저쿠키 설정 (3시간)
    const userCookie = {
      roomNum: params.roomId,
      role: 'user',
      nickName: value,
    }

    setCookie('interverse_user', JSON.stringify(userCookie), {
      expires: new Date(Date.now() + 3 * 60 * 1000),
    })
    setStage((prev) => prev + 1)
  }

  return (
    <div className="h-fit w-[300px] rounded-md bg-white p-4">
      <p className="mb-4">닉네임을 입력해주세요</p>
      <input
        type="text"
        name="name"
        value={value}
        placeholder="닉네임"
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

export default NameStage
