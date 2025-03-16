import React, { useState } from 'react'
import Button from './Button'
import { useScene } from '@providers/SceneProvider'
import { useAuthCookie } from '@providers/AuthProvider'
import { useAppSelector } from '@store/store'

interface DMCreateModalProps {
  onClose: () => void
  id: string
}

export default function DMCreateModal({
  onClose,
  id: receiverId,
}: DMCreateModalProps) {
  const authCookie = useAuthCookie()

  const gameScene = useScene()

  const { nickname } = useAppSelector((state) => state.avartar)

  const DMManager = gameScene.dm

  const [text, setText] = useState('')

  const onSubmit = () => {
    if (!authCookie) return

    const id = Math.random().toString()

    DMManager.sendDM({
      id,
      message: text,
      roomNum: authCookie.roomNum,
      sender: nickname,
      receiverId,
    })

    onClose()
  }

  return (
    <div className="fixed inset-0 z-[500] h-screen w-screen">
      {/* Dim */}
      <div onClick={onClose} className="size-full bg-black/70" />

      {/* Modal */}
      <div
        className={`absolute left-[50%] top-[50%] size-full h-fit w-[480px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white`}
      >
        {/* 헤더 */}
        <div className="px-4 py-3 text-lg">다이렉트 메시지</div>

        {/* 바디 */}
        <div className="h-[160px] px-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="메세지를 입력하세요."
            className="size-full resize-none rounded-md border p-2 outline-none"
          />
        </div>

        {/* 푸터 */}
        <div className="flex gap-2 px-4 py-3">
          <Button size="md" variant="ghost" onClick={onClose}>
            취소
          </Button>
          <Button size="md" variant="contained" onClick={onSubmit}>
            전송
          </Button>
        </div>
      </div>
    </div>
  )
}
