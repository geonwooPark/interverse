import { Navigate, Outlet } from 'react-router-dom'
import { getCookie } from '../../lib/cookie'

function PrivateRoute() {
  const hostCookie = getCookie('interverse_host')

  return hostCookie ? <Outlet /> : <Navigate to={'/create-room'} />
}

export default PrivateRoute
