import { useSearchParams } from 'react-router-dom'

function RoomTitle() {
  const [searchParams] = useSearchParams()
  const title = searchParams.get('title') as string

  return (
    <div className="fixed left-6 top-4 flex max-w-[400px] items-center gap-2 truncate rounded-md bg-black/70 px-3 py-2 font-neodgm text-lg text-white">
      <span className="translate-y-[2px] text-2xl">👾</span>
      <span className="select-none truncate">{title}</span>
    </div>
  )
}

export default RoomTitle
