import { useNavigate } from 'react-router-dom'
import { getCookie } from '../utils/cookie'

function MyRoom() {
  const navigate = useNavigate()
  const adminCookie = getCookie('interverse_admin')

  return (
    <div className="flex w-[360px] flex-col gap-4 rounded-3xl bg-gray-300 p-8">
      <div className="aspect-square rounded-2xl bg-black">
        gif 이미지 들어가는곳
      </div>
      <button
        onClick={() => navigate(adminCookie.path)}
        className="h-[50px] w-full rounded-md bg-purple-600 text-white hover:bg-purple-700"
      >
        입장하기
      </button>
    </div>
  )
}

export default MyRoom
