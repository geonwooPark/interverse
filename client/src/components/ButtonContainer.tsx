import { useNavigate } from 'react-router-dom'
import { changeModalContent } from '../store/features/modalContentSlice'
import { closeModal, openModal } from '../store/features/modalDisplaySlice'
import { useAppDispatch } from '../store/store'
import IconLink from '../svgs/IconLink.svg?react'
import IconOff from '../svgs/IconOff.svg?react'

function ButtonContainer() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onOffClick = () => {
    dispatch(
      changeModalContent({
        title: '나가기',
        description: '정말 종료하시겠습니까?',
        action: () => {
          navigate('/')
          dispatch(closeModal())
        },
        actionLabel: '종료',
      }),
    )
    dispatch(openModal())
  }

  return (
    <div className="fixed right-8 top-4 flex gap-3">
      <button className="flex size-[50px] items-center justify-center rounded-full bg-purple-600 text-white duration-200 hover:bg-purple-700">
        <IconLink />
      </button>
      <button
        onClick={onOffClick}
        className="flex size-[50px] items-center justify-center rounded-full bg-white text-red-600"
      >
        <IconOff />
      </button>
    </div>
  )
}

export default ButtonContainer
