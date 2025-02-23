import Button from '@components/Button'

function SurveyCard() {
  const handleClick = () => {
    window.open(
      'https://forms.gle/4eHQ4eCEokt2EgfQ6',
      '_blank',
      'noopener,noreferrer',
    )
  }

  return (
    <div className="w-[480px] space-y-6 rounded-md bg-white p-6">
      <h4 className="text-xl">INTERVERSE를 평가해주세요!</h4>

      <p>
        이 설문지는 서비스 개선 목적으로 진행되고 있습니다.
        <br /> 여러분의 소중한 의견과 경험은 저희에게 매우 중요합니다.
        INTERVERSE를 사용하면서 만족했던 점, 불편했던 점을 자유롭고, 편안하게
        작성해주시면 감사하겠습니다! 🥳
      </p>

      <p className="text-sm text-gray-400">
        * 답변 결과는 프로젝트 이외의 목적으로 활용되지 않습니다.
      </p>

      <Button size="lg" variant="contained" fullWidth onClick={handleClick}>
        평가하러 가기
      </Button>
    </div>
  )
}

export default SurveyCard
