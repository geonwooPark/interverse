import { closeCreatorModal } from '../../../store/features/creatorModalSlice'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import CreatorCard from './CreatorCard'

function CreatorModal() {
  const { isOpen } = useAppSelector((state) => state.creatorModal)
  const dispatch = useAppDispatch()

  const onClick = () => {
    dispatch(closeCreatorModal())
  }

  if (!isOpen) return

  return (
    <div
      onClick={onClick}
      className="fixed inset-0 z-[100] flex h-screen w-screen items-center justify-center bg-black/70  font-neodgm"
    >
      <div onClick={(e) => e.stopPropagation()} className="flex gap-5">
        <CreatorCard
          image="avatar_2.png"
          name="강경서"
          job="Frontend"
          email="kks_big@naver.com"
          link="https://github.com/kangkyeongseo"
        />
        <CreatorCard
          image="avatar_1.png"
          name="박건우"
          job="Frontend"
          email="white0581@naver.com"
          link="https://github.com/geonwooPark"
        />
      </div>
    </div>
  )
}

export default CreatorModal
