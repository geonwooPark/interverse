import {
  DirectMessageType,
  changeReceiver,
  handleDirectMessageComposer,
  removeDM,
} from '../../store/features/directMessageSlice'
import { useAppDispatch } from '../../store/store'

interface DirectMessageProps {
  dm: DirectMessageType
}

function DirectMessage({ dm }: DirectMessageProps) {
  const dispatch = useAppDispatch()

  const onClose = () => {
    dispatch(removeDM(dm.id))
  }

  const onReply = () => {
    dispatch(changeReceiver({ nickName: dm.sender, id: dm.senderId }))
    dispatch(handleDirectMessageComposer())
    dispatch(removeDM(dm.id))
  }

  return (
    <div
      className={`absolute left-[50%] top-[50%] z-[200] h-auto w-[400px] translate-x-[-50%] translate-y-[-50%] rounded-md border-2 bg-white px-4 py-3 font-neodgm`}
    >
      <div className="mb-2 text-lg">{dm.sender}님의 메시지</div>
      <p className="mb-4 h-[160px] overflow-y-scroll break-all rounded-md border p-2 text-sm">
        {dm.message}
      </p>
      <div className="flex gap-2">
        <button onClick={onClose} className="secondary-button">
          닫기
        </button>
        <button onClick={onReply} className="primary-button">
          답장
        </button>
      </div>
    </div>
  )
}

export default DirectMessage
