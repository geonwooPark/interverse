function SurveyCard() {
  return (
    <div className="w-[420px] space-y-4 rounded-md bg-white p-6">
      <h4 className="text-lg">INTERVERSE를 평가해주세요!</h4>
      <p className="text-sm">
        이 설문지는 서비스 개선 목적으로 진행되고 있습니다. 여러분의 소중한
        의견과 경험은 저희에게 매우 중요합니다. INTERVERSE를 사용하면서 만족했던
        점, 불편했던 점을 자유롭고, 편안하게 작성해주시면 감사하겠습니다! 답변
        결과는 프로젝트 이외의 목적으로 활용되지 않습니다. 감사합니다! 🥳
      </p>
      <a
        href="https://forms.gle/4eHQ4eCEokt2EgfQ6"
        target="_blank"
        rel="noreferrer"
        className="primary-button"
      >
        <span>평가하러 가기</span>
      </a>
    </div>
  )
}

export default SurveyCard
