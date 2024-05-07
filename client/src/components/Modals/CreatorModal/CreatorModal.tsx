import { useAppSelector } from '../../../store/store'
import ModalBackdrop from '../ModalBackdrop'
import CreatorCard from './CreatorCard'

function CreatorModal() {
  const { isOpen } = useAppSelector((state) => state.creatorModal)

  if (!isOpen) return

  return (
    <ModalBackdrop>
      <div className="flex gap-5">
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
    </ModalBackdrop>
  )
}

export default CreatorModal
