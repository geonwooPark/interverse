import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { setCookie } from '../utils/cookie'
import { encrypt } from '../utils/crypto'
import phaserGame from '../PhaserGame'
import Preload from '../scenes/Preload'

function Enter() {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    title: '',
    password: '',
    nickName: '',
  })
  const { title, password, nickName } = values

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e
    setValues({ ...values, [name]: value })
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!title || !password || !nickName) return

    const roomNum = nanoid(8)
    const hashedPassword = encodeURIComponent(encrypt(password))
    // 방장 쿠키 설정 (24시간)
    const adminCookie = {
      roomNum,
      role: 'admin',
      nickName,
      path: `/${roomNum}?title=${title}&hp=${hashedPassword}`,
    }

    setCookie('interverse_admin', JSON.stringify(adminCookie), {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    })
    navigate(`/test/${roomNum}?title=${title}&?hp=${hashedPassword}`)
  }

  return (
    <div className="grid w-[720px] grid-cols-2 gap-4 rounded-3xl bg-gray-300 p-8">
      <div className="aspect-square rounded-2xl bg-black">
        gif 이미지 들어가는곳
      </div>
      <div className="flex flex-col items-center justify-between p-2">
        <form onSubmit={onSubmit} className="space-y-4 text-center">
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
            placeholder="방 비밀번호"
            className="w-full rounded-md border bg-gray-100 px-4 py-2 text-xl outline-none"
            onChange={handleChange}
            maxLength={4}
          />
          <input
            type="text"
            name="nickName"
            value={nickName}
            placeholder="닉네임"
            className="w-full rounded-md border bg-gray-100 px-4 py-2 text-xl outline-none"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="h-[50px] w-full rounded-md bg-purple-600 text-white duration-200 hover:bg-purple-700"
          >
            방 개설하기
          </button>
        </form>
      </div>
    </div>
  )
}

export default Enter
