import { useNavigate } from 'react-router-dom'
import { getCookie } from '../lib/cookie'
import gifImage from '/gif/interverse.gif'
import Button from '../components/Button'
import Logo from '../components/Logo'

function LandingPage() {
  const navigate = useNavigate()

  const hostCookie = getCookie('interverse_host')

  return (
    <div className="flex flex-col items-center">
      {/* 로고 */}
      <Logo width={240} />

      <div className="grid w-[720px] grid-cols-2 gap-4 rounded-3xl bg-gray-300 p-8">
        {/* 영상 */}
        <div className="aspect-square overflow-hidden rounded-2xl bg-black ">
          <img src={gifImage} alt="GIF" className="size-full object-cover" />
        </div>

        {/* 인트로 */}
        <div className="flex flex-col items-center justify-center gap-8 p-2 text-center">
          <div className="flex flex-col justify-between">
            <h4 className="mb-2 text-lg">쉽고 빠르게 즐기는, Interverse</h4>
            <p className="text-sm">로그인 없이 지금 바로</p>
            <p className="text-sm">Interverse 공간을 체험해보세요!</p>
          </div>

          <div className="space-y-2">
            <img src={'/images/avatars.png'} alt="landing-image" width={265} />

            <Button
              size="lg"
              variant="contained"
              fullWidth
              onClick={() => navigate(hostCookie ? '/waiting' : '/create')}
            >
              시작하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
