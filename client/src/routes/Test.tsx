import React, { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { getCookie } from '../utils/cookie'
import ButtonContainer from '../components/ButtonContainer'
import PasswordStage from '../components/EnterStage/PasswordStage'
import NameStage from '../components/EnterStage/NameStage'
import StageContainer from '../components/EnterStage/StageContainer'

function Test() {
  const params = useParams()
  const [searchParams] = useSearchParams()
  const [stage, setStage] = useState(0)
  const hashedPassword = decodeURIComponent(searchParams.get('hp') as string)
  const adminCookie = getCookie('interverse_admin')
  const userCookie = getCookie('interverse_user')
  const role = adminCookie?.roomNum === params.roomId ? 'admin' : 'user'

  const enterStage = [
    {
      id: 101,
      elem: (
        <PasswordStage setStage={setStage} hashedPassword={hashedPassword} />
      ),
    },

    {
      id: 102,
      elem: <NameStage setStage={setStage} />,
    },
  ]

  return (
    <>
      {userCookie?.roomNum !== params.roomId &&
        adminCookie?.roomNum !== params.roomId &&
        stage < 2 && <StageContainer>{enterStage[stage].elem}</StageContainer>}
    </>
  )
}

export default Test
