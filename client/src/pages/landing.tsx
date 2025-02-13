import { useNavigate } from 'react-router-dom'
import { getCookie } from '../lib/cookie'
import gifImage from '/gif/interverse.gif'

function LandingPage() {
  const navigate = useNavigate()

  const hostCookie = getCookie('interverse_host')

  return (
    <div className="flex flex-col items-center">
      {/* 로고 */}
      <div className="mb-5">
        <img src="/images/logo.png" alt="logo" width={400} />
      </div>

      <div className="grid w-[720px] grid-cols-2 gap-4 rounded-3xl bg-gray-300 p-8">
        {/* 영상 */}
        <div className="aspect-square overflow-hidden rounded-2xl bg-black ">
          <img src={gifImage} alt="GIF" className="size-full object-cover" />
        </div>

        {/* 인트로 */}
        <div className="flex flex-col items-center justify-center gap-8 p-2 text-center">
          <div className="flex flex-col justify-between">
            <h4 className="title mb-2">쉽고 빠르게 즐기는, Interverse</h4>
            <p className="description">로그인 없이 지금 바로</p>
            <p className="description">Interverse 공간을 체험해보세요!</p>
          </div>

          <div className="space-y-2">
            <img src={'/images/avatars.png'} alt="landing-image" width={265} />
            <button
              onClick={() => navigate(hostCookie ? '/waiting' : '/create')}
              className="primary-button"
            >
              시작하기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
