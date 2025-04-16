import { useAuthCookie } from '@providers/AuthProvider'

function LeftSide() {
  const authCookie = useAuthCookie()

  return (
    <div className="flex max-w-[400px] items-center gap-2 truncate rounded-md bg-black/70 px-3 py-2 font-neodgm body1 text-white">
      <span className="translate-y-[2px] text-h6">👾</span>
      <span className="select-none truncate">{authCookie?.title}</span>
    </div>
  )
}

export default LeftSide
