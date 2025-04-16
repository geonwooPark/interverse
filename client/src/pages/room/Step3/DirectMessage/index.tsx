import Button from '@components/Button'
import { IDirectMessage } from '../../../../../../types/socket'
import { useAuthCookie } from '@providers/AuthProvider'
import { useScene } from '@providers/SceneProvider'
import { useState } from 'react'

interface DMProps {
  dm: IDirectMessage
}

function DirectMessage({ dm }: DMProps) {
  const authCookie = useAuthCookie()

  const gameScene = useScene()

  const player = gameScene.player

  const DMManager = gameScene.dm

  const [text, setText] = useState('')

  const onClose = (id: string) => {
    DMManager.removeDM(id)
  }

  const onSubmit = (dm: IDirectMessage) => {
    if (!authCookie) return
    if (!dm.socketId) return

    DMManager.sendDM({
      id: Math.random().toString(),
      message: text,
      roomNum: authCookie.roomNum,
      sender: player.nickname.text,
      receiverId: dm.socketId,
    })

    onClose(dm.id)
  }

  return (
    <div
      className={`absolute left-[50%] top-[50%] z-[500] h-auto w-[480px] translate-x-[-50%] translate-y-[-50%] rounded-md border-2 bg-white`}
    >
      {/* 헤더 */}
      <div className="px-4 py-3 body1">{dm.sender}님의 메시지</div>

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
        <Button size="md" variant="ghost" onClick={() => onClose(dm.id)}>
          닫기
        </Button>
        <Button size="md" variant="contained" onClick={() => onSubmit(dm)}>
          답장
        </Button>
      </div>
    </div>
  )
}

export default DirectMessage
