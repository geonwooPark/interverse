import { useAppDispatch, useAppSelector } from '../../store/store'
import {
  changeReceiver,
  handleDirectMessageComposer,
} from '../../store/features/directMessageModalSlice'
import { ws } from '../../lib/ws'
import { useState } from 'react'
import { CookieType } from '../../../../types/client'

interface DirectMessageComposerProps {
  receiver: { nickName: string; id: string }
  authCookie: CookieType | null
}

function DirectMessageComposer({
  receiver,
  authCookie,
}: DirectMessageComposerProps) {
  const { nickName, id } = receiver
  const { isOpen } = useAppSelector((state) => state.directMessageModal)
  const dispatch = useAppDispatch()

  const [message, setMessage] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { value },
    } = event
    setMessage(value)
  }

  const onClose = () => {
    dispatch(handleDirectMessageComposer())
  }

  const onSubmit = () => {
    if (!message) return

    dispatch(handleDirectMessageComposer())
    dispatch(changeReceiver({ nickName: '', id: '' }))
    ws.sendDirectMessage({
      message,
      sender: authCookie?.nickName as string,
      senderId: ws.socket.id as string,
      receiver: nickName,
      receiverId: id,
    })
  }

  if (!isOpen) return

  return (
    <div
      className={`fixed left-[50%] top-[50%] z-[200] h-auto w-[400px] translate-x-[-50%] translate-y-[-50%] rounded-md border-2 bg-white px-4 py-3 font-neodgm`}
    >
      <div className="title mb-2">{nickName}님에게 보내는 메시지</div>
      <textarea
        placeholder="메세지를 입력하세요."
        onChange={handleChange}
        className="description mb-4 h-[160px] w-full resize-none rounded-md border p-2 outline-none"
      />
      <div className="flex gap-2">
        <button onClick={onClose} className="secondary-button">
          닫기
        </button>
        <button onClick={onSubmit} className="primary-button">
          전송
        </button>
      </div>
    </div>
  )
}

export default DirectMessageComposer
