import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@components/Button'
import TextField from '@components/TextField'
import Counter from '@components/Counter'
import { useCreateRoomMutation } from '@hooks/mutations/roomsMutation'
import { paths } from '@routes/paths'

function CreateRoomPage() {
  const navigate = useNavigate()

  const { mutate: createRoomMutate } = useCreateRoomMutation()

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

    createRoomMutate(
      {
        title,
        headCount,
        password,
      },
      {
        onSuccess: () => {
          navigate(paths.rooms.root)
        },
      },
    )
  }

  return (
    <div className="flex h-[calc(100vh-80px)] w-full items-center justify-center">
      {/* 생성 폼 */}
      <div className="relative z-10 w-[420px] rounded-3xl">
        <h4 className="mb-4 text-center text-h4">새로운 방 만들기</h4>

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
            maxLength={12}
          />
          <div className="flex items-center justify-end gap-4">
            <p className="text-body2">참여인원 </p>
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
          생성하기
        </Button>
      </div>
    </div>
  )
}

export default CreateRoomPage
