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

  const onSubmit = () => {
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
      `${paths.room}?roomNum=${roomNum}&title=${encodedTitle}&hp=${hashedPassword}`,
    )
  }

  return (
    <>
      {/* 생성 폼 */}
      <div className="relative z-10 w-[520px] rounded-3xl p-8 shadow-level1">
        <div className="mb-6 text-lg">
          방을 만들고 팀원이나 참여자를 초대해 함께하세요!
        </div>

        <form className="mb-6 space-y-3 text-center">
          <TextField
            type="text"
            name="title"
            value={title}
            placeholder="제목"
            onChange={handleChange}
          />
          <TextField
            type="password"
            name="password"
            value={password}
            placeholder="비밀번호"
            onChange={handleChange}
            maxLength={4}
          />
        </form>

        <Button
          type="submit"
          size="lg"
          variant="contained"
          fullWidth
          onClick={onSubmit}
        >
          새로운 방 만들기
        </Button>

        {/* 캐릭터 */}
        <Characters />
      </div>
    </>
  )
}

export default CreateRoomPage
