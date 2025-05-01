import React from 'react'
import Button from '@components/Button'

interface CreatorModalProps {
  hasDim?: boolean
}

function CreatorModal({ hasDim }: CreatorModalProps) {
  const handleClick = () => {
    window.open(
      'https://github.com/geonwooPark',
      '_blank',
      'noopener,noreferrer',
    )
  }

  return (
    <div className="fixed inset-0 z-[100] h-screen w-screen">
      {/* Dim */}
      {hasDim && <div className="size-full bg-black/30" />}

      {/* Modal */}
      <div className="absolute left-[50%] top-[50%] flex w-[320px] translate-x-[-50%] translate-y-[-50%] flex-col items-center justify-between gap-4 rounded-md bg-white p-6">
        <div className="flex aspect-square w-[190px] items-center justify-center rounded-full bg-gray-100">
          <img src={`/images/avatar_1.png`} alt="creator" width={90} />
        </div>

        <div className="flex flex-col self-start px-2">
          <div className="flex items-end gap-1">
            <span className="text-h6">박건우</span>
            <span className="text-body2 opacity-30">|</span>
            <span className="text-body2 opacity-30">프론트엔드</span>
          </div>
          <span className="body1">white0581@naver.com</span>
        </div>

        <div className="flex w-full flex-col gap-2">
          <Button size="lg" variant="ghost" fullWidth onClick={handleClick}>
            GITHUB
          </Button>

          <Button size="lg" variant="ghost" fullWidth onClick={handleClick}>
            RESUME
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CreatorModal
