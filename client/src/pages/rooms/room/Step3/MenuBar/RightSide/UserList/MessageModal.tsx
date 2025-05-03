import React, { useState } from 'react'
import { useScene } from '@providers/SceneProvider'
import { useMeQuery } from '@hooks/queries/authQueries'
import { useParams } from 'react-router-dom'
import Button from '@components/Button'
import fade from '@components/Animation/motions/fade'
import { motion as m } from 'motion/react'

interface MessageModalProps {
  onClose: () => void
  id: string
}

export default function MessageModal({
  onClose,
  id: receiverId,
}: MessageModalProps) {
  const { data: me } = useMeQuery()

  const { id: roomId } = useParams()

  const gameScene = useScene()

  const player = gameScene.player

  const DMManager = gameScene.dm

  const [text, setText] = useState('')

  const onSubmit = () => {
    if (!me?.user) return
    if (!roomId) return

    const id = Math.random().toString()

    DMManager.sendDM({
      id,
      message: text,
      roomNum: roomId,
      sender: player.nickname.text,
      receiverId,
    })

    onClose()
  }

  return (
    <div className="fixed inset-0 z-[500] h-screen w-screen">
      {/* Dim */}
      <div onClick={onClose} className="size-full bg-black/70" />
      {/* Modal */}
      <m.div
        {...fade().fadeIn}
        className={`absolute left-[50%] top-[50%] size-full h-fit w-[480px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white`}
      >
        {/* 헤더 */}
        <div className="body1 px-4 py-3">메시지</div>

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
      </m.div>
    </div>
  )
}
