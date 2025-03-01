import { useNavigate } from 'react-router-dom'
import gifImage from '/gif/interverse.gif'
import Button from '../../components/Button'
import Logo from '../../components/Logo'
import { paths } from '../../routes/paths'

function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center">
      {/* 로고 */}
      <Logo width={240} />

      <div className="grid w-[720px] grid-cols-2 gap-4 rounded-3xl p-8 shadow-level1">
        {/* 영상 */}
        <div className="aspect-square overflow-hidden rounded-2xl">
          <img src={gifImage} alt="GIF" className="size-full object-cover" />
        </div>

        {/* 인트로 */}
        <div className="flex flex-col items-center justify-center gap-8 p-2 text-center">
          <div className="flex flex-col justify-between">
            <h4 className="mb-2 text-lg">간편하게 시작하는 INTERVERSE</h4>
            <p className="text-sm">회원가입 없이, 즉시</p>
            <p className="text-sm">INTERVERSE의 새로운 공간을 경험해보세요.</p>
          </div>

          <div className="w-full space-y-2">
            <div className="mx-auto w-[200px]">
              <img src={'/images/avatars.png'} alt="landing-image" />
            </div>

            <Button
              size="lg"
              variant="contained"
              fullWidth
              onClick={() => navigate(paths.create)}
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
