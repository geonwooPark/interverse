import React from 'react'
import CreatorItem from './CreatorItem'

function CreatorCard() {
  return (
    <div className="flex gap-5">
      <CreatorItem
        image="avatar_2.png"
        name="강경서"
        job="Frontend"
        email="kks_big@naver.com"
        link="https://github.com/kangkyeongseo"
      />
      <CreatorItem
        image="avatar_1.png"
        name="박건우"
        job="Frontend"
        email="white0581@naver.com"
        link="https://github.com/geonwooPark"
      />
    </div>
  )
}

export default CreatorCard
