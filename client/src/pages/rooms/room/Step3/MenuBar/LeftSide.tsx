import { useSingleRoomQuery } from '@hooks/queries/roomsQueries'
import { useParams } from 'react-router-dom'

function LeftSide() {
  const { id: roomId } = useParams()

  const { data: room } = useSingleRoomQuery(roomId as string)

  return (
    <div className="body1 flex max-w-[400px] items-center gap-2 truncate rounded-md bg-black/70 px-3 py-2 font-neodgm text-white">
      <span className="translate-y-[2px] text-h6">👾</span>
      <span className="select-none truncate">{room?.title}</span>
    </div>
  )
}

export default LeftSide
