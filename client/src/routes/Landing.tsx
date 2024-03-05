import { useNavigate } from 'react-router-dom'
import { getCookie } from '../utils/cookie'
import gifImage from '/gif/interverse.gif'

function Landing() {
  const navigate = useNavigate()
  const adminCookie = getCookie('interverse_admin')

  return (
    <>
      <div className="mb-5">
        <img src="/images/logo.png" alt="logo" width={400} />
      </div>
      <div className="grid w-[720px] grid-cols-2 gap-4 rounded-3xl bg-gray-300 p-8">
        <div className="aspect-square overflow-hidden rounded-2xl bg-black ">
          <img src={gifImage} alt="GIF" className="size-full object-cover" />
        </div>
        <div className="flex flex-col items-center justify-center gap-8 p-2 text-center">
          <div className="flex flex-col justify-between">
            <h4 className="mb-2 text-lg">쉽고 빠르게 즐기는, Interverse</h4>
            <p className="">지금 바로 로그인 없이</p>
            <p>Interverse 공간을 체험해보세요!</p>
          </div>
          <div className="space-y-2">
            <img src={'/images/avatars.png'} alt="landing-image" width={265} />
            <button
              onClick={() =>
                navigate(adminCookie ? '/my-room' : '/create-room')
              }
              className="h-[50px] w-full rounded-md bg-purple-600 text-white duration-200 hover:bg-purple-700"
            >
              시작하기
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Landing
