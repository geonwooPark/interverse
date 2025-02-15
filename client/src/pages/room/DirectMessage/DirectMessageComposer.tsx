import { useAppDispatch, useAppSelector } from '../../../store/store'
import {
  changeReceiver,
  handleDirectMessageComposer,
} from '../../../store/features/directMessageSlice'
import { ws } from '../../../lib/ws'
import { useState } from 'react'
import { useAuthCookie } from '../../../providers/AuthProvider'

function DirectMessageComposer() {
  const authCookie = useAuthCookie()

  const {
    receiver: { nickName, id },
  } = useAppSelector((state) => state.directMessage)

  const { isOpen } = useAppSelector((state) => state.directMessage)

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
      <div className="mb-2 text-lg">{nickName}님에게 보내는 메시지</div>
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
