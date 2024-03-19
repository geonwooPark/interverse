import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { setCookie } from '../lib/cookie'
import AvatarSelector from '../components/AvatarSelector'
import NickNameInput from '../components/NickNameInput'
import { textureImage } from '../constants'

function AvatarInfo() {
  const navigate = useNavigate()
  const location = useLocation()
  const { roomNum, path } = location.state

  const [texture, setTexture] = useState(0)
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  const textureArr = useMemo(() => Array.from(textureImage).slice(1), [])

  const onClick = () => {
    if (!value) return setError('닉네임을 입력해주세요')

    const userCookie = {
      roomNum,
      role: 'user',
      nickName: value,
      path,
      texture: textureArr[texture][0],
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
    <div className="fixed inset-0 flex h-screen w-screen items-center justify-center bg-black/70 font-neodgm">
      <div className="h-fit w-[300px] rounded-md bg-white p-4">
        <AvatarSelector
          texture={texture}
          setTexture={setTexture}
          textureArr={textureArr}
        />
        <NickNameInput value={value} setValue={setValue} error={error} />
        <button onClick={onClick} className="primary-button">
          시작하기
        </button>
      </div>
    </div>
  )
}

export default AvatarInfo
