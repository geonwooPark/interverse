import { Navigate, Outlet, useParams, useSearchParams } from 'react-router-dom'
import { getAuthCookie } from '../../utils/cookie'

function AuthRoute() {
  const params = useParams()
  const [searchParams] = useSearchParams()
  const title = searchParams.get('title') as string
  const password = searchParams.get('hp') as string
  const authCookie = getAuthCookie(params.roomId as string)

  const state = {
    roomNum: params.roomId,
    title,
    password,
  }

  return authCookie ? <Outlet /> : <Navigate to={'/password'} state={state} />
}

export default AuthRoute
