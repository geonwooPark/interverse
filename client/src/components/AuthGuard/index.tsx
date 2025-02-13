import {
  Navigate,
  Outlet,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom'
import { getAuthCookie } from '../../lib/cookie'

function AuthGuard() {
  const location = useLocation()
  const { pathname, search } = location
  const params = useParams()
  const [searchParams] = useSearchParams()
  const password = searchParams.get('hp') as string
  const authCookie = getAuthCookie(params.roomId as string)

  const state = {
    roomNum: params.roomId,
    password,
    path: `${pathname}/${search}`,
  }

  return authCookie ? <Outlet /> : <Navigate to={'/waiting'} state={state} />
}

export default AuthGuard
