import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { encrypt } from '../../utils/crypto'
import Characters from './Characters'
import TextField from '../../components/TextField'
import Button from '../../components/Button'
import { CookieType } from '../../../../types/client'
import { useRoomsAction, useRoomsState } from '../../providers/RoomsProvider'
import { paths } from '../../routes/paths'

function CreateRoomPage() {
  const navigate = useNavigate()

  const rooms = useRoomsState()

  const updateRooms = useRoomsAction()

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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!title || !password) return

    const roomNum = nanoid(8)

    const encodedTitle = encodeURIComponent(title)

    const hashedPassword = encodeURIComponent(encrypt(password))

    const cookie: CookieType = {
      roomNum,
      role: 'host',
      title,
      createAt: new Date(),
    }

    updateRooms([...rooms, cookie])

    navigate(
      `${paths.waiting}?roomNum=${roomNum}&title=${encodedTitle}&hp=${hashedPassword}`,
    )
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
            <Button type="submit" size="lg" variant="contained" fullWidth>
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
