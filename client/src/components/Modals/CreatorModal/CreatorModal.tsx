import { closeCreatorModal } from '../../../store/features/creatorModalDisplaySlice'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import CreatorCard from './CreatorCard'

function CreatorModal() {
  const { isOpen } = useAppSelector((state) => state.creatorModalDisplay)
  const dispatch = useAppDispatch()

  const onClick = () => {
    dispatch(closeCreatorModal())
  }

  if (!isOpen) return

  return (
    <div
      onClick={onClick}
      className="font-neodgm fixed inset-0 z-[100] flex h-screen w-screen items-center justify-center  bg-black/70"
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
