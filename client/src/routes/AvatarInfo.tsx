import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { setCookie } from '../lib/cookie'
import AvatarSelector from '../components/AvatarSelector'
import NickNameInput from '../components/NickNameInput'

interface TextureImageType {
  [key: number]: string
}

export const textureImage: TextureImageType = {
  0: `bg-[url("/assets/character/bob.png")]`,
  1: `bg-[url("/assets/character/emma.png")]`,
} as const

const textureImageName: TextureImageType = {
  0: 'bob',
  1: 'emma',
} as const

function AvatarInfo() {
  const navigate = useNavigate()
  const location = useLocation()
  const { roomNum, path } = location.state

  const [texture, setTexture] = useState(0)
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  const onClick = () => {
    if (!value) return setError('닉네임을 입력해주세요')

    const userCookie = {
      roomNum,
      role: 'user',
      nickName: value,
      path,
      texture: textureImageName[texture],
    }

    setCookie('interverse_guest', JSON.stringify(userCookie), {
      expires: new Date(Date.now() + 3 * 60 * 60 * 1000),
    })
    navigate(userCookie.path)
  }

  useEffect(() => {
    setError('')
  }, [value])

  return (
    <div className="font-neodgm fixed inset-0 flex h-screen w-screen items-center justify-center bg-black/70">
      <div className="h-fit w-[300px] rounded-md bg-white p-4">
        <AvatarSelector texture={texture} setTexture={setTexture} />
        <NickNameInput value={value} setValue={setValue} error={error} />
        <button onClick={onClick} className="primary-button">
          시작하기
        </button>
      </div>
    </div>
  )
}

export default AvatarInfo
