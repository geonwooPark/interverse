import LeftSide from './LeftSide'
import RightSide from './RightSide'

function MenuBar() {
  return (
    <div className="absolute top-[64px] z-10 flex w-full items-center justify-between px-6 py-4">
      <LeftSide />
      <RightSide />
    </div>
  )
}

export default MenuBar
