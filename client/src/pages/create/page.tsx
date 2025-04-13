import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { encrypt } from '../../utils/crypto'
import Characters from './Characters'
import Button from '../../components/Button'
import { useRoomsAction } from '../../providers/RoomsProvider'
import { paths } from '../../routes/paths'
import { IRoom } from 'src/types'
import TextField from '@components/TextField'
import Counter from '@components/Counter'

function CreateRoomPage() {
  const navigate = useNavigate()

  const addRoom = useRoomsAction()

  const [values, setValues] = useState({
    title: '',
    password: '',
    headCount: 4,
  })

  const { title, password, headCount } = values

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

    const newRoom: IRoom = {
      roomNum,
      role: 'host',
      title,
      headCount,
      createAt: Date.now(),
    }

    addRoom(newRoom)

    // 방 생성 HTTP 요청

    // 방 생성 성공 시 리다이렉트
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
          <div className="flex items-center justify-end gap-4">
            <p className="text-sm">참여인원 </p>
            <Counter
              value={headCount}
              onChange={(value) =>
                setValues((prev) => ({ ...prev, headCount: value }))
              }
            />
          </div>
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
