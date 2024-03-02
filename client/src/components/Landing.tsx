import { useNavigate } from 'react-router-dom'
import { getCookie } from '../utils/cookie'

function Landing() {
  const navigate = useNavigate()
  const adminCookie = getCookie('interverse_admin')

  return (
    <div className="grid w-[720px] grid-cols-2 gap-4 rounded-3xl bg-gray-300 p-8">
      <div className="aspect-square rounded-2xl bg-black">
        gif 이미지 들어가는곳
      </div>
      <div className="flex flex-col items-center justify-between p-2">
        <div>쉽고 재밌는 메타버스, Interverse</div>
        <div className="space-y-4 text-center text-sm">
          <span>로그인 없이 이용해보세요!</span>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed odit
            expedita qui dolore ratione officia reiciendis ducimus laudantium.
            Obcaecati sint reprehenderit ratione libero natus, eveniet
            blanditiis quia a placeat molestias.
          </p>
        </div>
        <button
          onClick={() => navigate(adminCookie ? '/my-room' : '/enter')}
          className="h-[50px] w-full rounded-md bg-purple-600 text-white duration-200 hover:bg-purple-700"
        >
          시작하기
        </button>
      </div>
    </div>
  )
}

export default Landing
