import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { setCookie } from '../utils/cookie'
import { encrypt } from '../utils/crypto'

function CreateRoom() {
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
    const encodedTitle = encodeURIComponent(title)
    const hashedPassword = encodeURIComponent(encrypt(password))

    const adminCookie = {
      roomNum,
      role: 'admin',
      nickName,
      path: `/${roomNum}?title=${encodedTitle}&hp=${hashedPassword}`,
    }

    setCookie('interverse_admin', JSON.stringify(adminCookie), {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    })
    navigate(adminCookie.path)
  }

  return (
    <div className="relative">
      <div className="relative z-10 w-[420px] rounded-3xl bg-gray-300 p-8">
        <div className="flex flex-col items-center justify-between p-2">
          <form onSubmit={onSubmit} className="space-y-4 text-center">
            <div>쉽고 빠르게 즐기는 메타버스, Interverse</div>
            <input
              type="text"
              name="title"
              value={title}
              placeholder="방 제목"
              autoComplete="off"
              className="w-full rounded-md border bg-gray-100 px-4 py-2 text-xl outline-none"
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              value={password}
              placeholder="방 비밀번호"
              autoComplete="off"
              className="w-full rounded-md border bg-gray-100 px-4 py-2 text-xl outline-none"
              onChange={handleChange}
              maxLength={4}
            />
            <input
              type="text"
              name="nickName"
              value={nickName}
              placeholder="닉네임"
              autoComplete="off"
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
      <div className="absolute left-7 top-[-50px] flex w-full">
        <img src="/images/avatar_1.png" alt="avatar_1" />
        <img src="/images/avatar_2.png" alt="avatar_2" />
      </div>
    </div>
  )
}

export default CreateRoom
