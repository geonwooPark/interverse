import React from 'react'
import Button from '@components/Button'

function CreatorCard() {
  const handleClick = () => {
    window.open(
      'https://github.com/geonwooPark',
      '_blank',
      'noopener,noreferrer',
    )
  }

  return (
    <div className="flex w-[320px] flex-col items-center justify-between gap-4 rounded-md bg-white p-6">
      <div className="flex aspect-square w-[190px] items-center justify-center rounded-full bg-gray-100">
        <img src={`/images/avatar_1.png`} alt="creator" width={90} />
      </div>

      <div className="flex flex-col self-start px-2">
        <div className="flex items-end gap-1">
          <span className="text-2xl">박건우</span>
          <span className="text-sm opacity-30">|</span>
          <span className="text-sm opacity-30">프론트엔드</span>
        </div>
        <span className="text-lg">white0581@naver.com</span>
      </div>

      <div className="flex w-full flex-col gap-2">
        <Button size="lg" variant="ghost" fullWidth onClick={handleClick}>
          GITHUB
        </Button>

        <Button size="lg" variant="ghost" fullWidth onClick={handleClick}>
          이력서
        </Button>
      </div>
    </div>
  )
}

export default CreatorCard
