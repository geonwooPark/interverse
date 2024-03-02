import { useNavigate } from 'react-router-dom'
import { getCookie, removeCookie } from '../utils/cookie'
import { useAppDispatch } from '../store/store'
import { changeModalContent } from '../store/features/modalContentSlice'
import { closeModal, openModal } from '../store/features/modalDisplaySlice'

function MyRoom() {
  const navigate = useNavigate()
  const adminCookie = getCookie('interverse_admin')
  const dispatch = useAppDispatch()

  const onEnter = () => {
    navigate(adminCookie.path)
  }

  const onDelete = () => {
    dispatch(
      changeModalContent({
        title: '삭제하기',
        description: '정말 방을 삭제하시겠습니까?',
        action: () => {
          removeCookie('interverse_admin')
          dispatch(closeModal())
          navigate('/')
        },
        actionLabel: '삭제',
      }),
    )
    dispatch(openModal())
  }

  return (
    <div className="flex w-[360px] flex-col gap-4 rounded-3xl bg-gray-300 p-8">
      <div className="aspect-square rounded-2xl bg-black">
        gif 이미지 들어가는곳
      </div>
      <button
        onClick={onEnter}
        className="h-[50px] w-full rounded-md bg-purple-600 text-white duration-200 hover:bg-purple-700"
      >
        입장하기
      </button>
      <button
        onClick={onDelete}
        className="h-[50px] w-full rounded-md bg-white text-red-600"
      >
        제거하기
      </button>
    </div>
  )
}

export default MyRoom
