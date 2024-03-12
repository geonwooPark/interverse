import { Navigate, Outlet } from 'react-router-dom'
import { getCookie } from '../../utils/cookie'

function PrivateRoute() {
  const hostCookie = getCookie('interverse_host')

  return hostCookie ? <Outlet /> : <Navigate to={'/create-room'} />
}

export default PrivateRoute
