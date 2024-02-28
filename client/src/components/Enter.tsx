import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Enter() {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    title: '',
    password: '',
  })
  const { title, password } = values

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e
    setValues({ ...values, [name]: value })
  }

  return (
    <div className="grid w-[720px] grid-cols-2 gap-4 rounded-3xl bg-gray-300 p-8">
      <div className="aspect-square rounded-2xl bg-black">
        gif 이미지 들어가는곳
      </div>
      <div className="flex flex-col items-center justify-between p-2">
        <div className="space-y-4 text-center">
          <div>쉽고 재밌는 메타버스, Interverse</div>
          <input
            type="text"
            name="title"
            value={title}
            placeholder="방 제목"
            className="w-full rounded-md border bg-gray-100 px-4 py-2 text-xl outline-none"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="비밀번호"
            className="w-full rounded-md border bg-gray-100 px-4 py-2 text-xl outline-none"
            onChange={handleChange}
            maxLength={4}
          />
        </div>
        <button
          onClick={() => navigate('/1')}
          className="h-[50px] w-full rounded-md bg-purple-600 text-white hover:bg-purple-700"
        >
          방 개설하기
        </button>
      </div>
    </div>
  )
}

export default Enter
