import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { setCookie } from '../../lib/cookie'
import { encrypt } from '../../lib/crypto'
import Characters from './Characters'
import TextField from '../../components/TextField'
import Button from '../../components/Button'

function CreateRoomPage() {
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

    const hostCookie = {
      roomNum,
      role: 'host',
      nickName,
      path: `/${roomNum}?title=${encodedTitle}&hp=${hashedPassword}`,
      texture: 'conference',
    }

    setCookie('interverse_host', JSON.stringify(hostCookie), {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    })

    navigate(hostCookie.path)
  }

  return (
    <>
      {/* 생성 폼 */}
      <div className="relative z-10 w-[480px] rounded-3xl bg-gray-300 p-8">
        <div className="flex flex-col items-center justify-between p-2">
          <form onSubmit={onSubmit} className="space-y-4 text-center">
            <div className="text-lg">
              쉽고 빠르게 즐기는 메타버스, Interverse
            </div>

            <TextField
              type="text"
              name="title"
              value={title}
              placeholder="방 제목"
              onChange={handleChange}
            />
            <TextField
              type="password"
              name="password"
              value={password}
              placeholder="방 비밀번호"
              onChange={handleChange}
              maxLength={4}
            />
            <TextField
              type="text"
              name="nickName"
              value={nickName}
              placeholder="닉네임"
              onChange={handleChange}
            />
            <Button size="lg" variant="contained" fullWidth>
              방 개설하기
            </Button>
          </form>
        </div>

        {/* 캐릭터 */}
        <Characters />
      </div>
    </>
  )
}

export default CreateRoomPage
