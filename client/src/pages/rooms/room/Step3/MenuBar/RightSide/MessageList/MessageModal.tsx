import Button from '@components/Button'
import { useScene } from '@providers/SceneProvider'
import { useState } from 'react'
import { useMeQuery } from '@hooks/queries/authQueries'
import { useParams } from 'react-router-dom'
import { IDirectMessage } from '../../../../../../../../../types/socket'
import { motion as m } from 'motion/react'
import fade from '@components/Animation/motions/fade'

interface DMProps {
  dm: IDirectMessage
  onClose: () => void
}

function MessageModal({ dm, onClose }: DMProps) {
  const { data: me } = useMeQuery()

  const { id: roomId } = useParams()

  const gameScene = useScene()

  const player = gameScene.player

  const DMManager = gameScene.dm

  const [text, setText] = useState('')

  const onSubmit = (dm: IDirectMessage) => {
    if (!me?.user) return
    if (!roomId) return
    if (!dm.socketId) return

    DMManager.sendDM({
      id: Math.random().toString(),
      message: text,
      roomNum: roomId,
      sender: player.nickname.text,
      receiverId: dm.socketId,
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
        <div className="body1 px-4 py-3">{dm.sender}님의 메시지</div>

        {/* 바디 */}
        <div className="px-4">
          <p className="mb-4 h-[160px] overflow-y-scroll break-all rounded-md border p-2 text-body2">
            {dm.message}
          </p>

          <div className="h-[160px]">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="메세지를 입력하세요."
              className="size-full resize-none rounded-md border p-2 outline-none"
            />
          </div>
        </div>

        {/*  푸터 */}
        <div className="flex gap-2 px-4 py-3">
          <Button size="md" variant="ghost" onClick={onClose}>
            닫기
          </Button>
          <Button size="md" variant="contained" onClick={() => onSubmit(dm)}>
            답장
          </Button>
        </div>
      </m.div>
    </div>
  )
}

export default MessageModal
