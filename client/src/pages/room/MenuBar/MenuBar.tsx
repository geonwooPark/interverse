import ButtonContainer from './ButtonContainer/ButtonContainer'
import RoomTitle from './RoomTitle'

function MenuBar() {
  return (
    <div className="flex items-center justify-between px-6 py-4">
      <RoomTitle />
      <ButtonContainer />
    </div>
  )
}

export default MenuBar
