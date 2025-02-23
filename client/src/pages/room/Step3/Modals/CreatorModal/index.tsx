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
          <span className="opacity-30">|</span>
          <span className="opacity-30">Frontend</span>
        </div>
        <span className="text-lg">white0581@naver.com</span>
      </div>

      <Button size="lg" variant="contained" fullWidth onClick={handleClick}>
        GITHUB
      </Button>
    </div>
  )
}

export default CreatorCard
