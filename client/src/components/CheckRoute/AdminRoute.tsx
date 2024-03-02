import { Navigate, Outlet } from 'react-router-dom'
import { getCookie } from '../../utils/cookie'

function AdminRoute() {
  const adminCookie = getCookie('interverse_admin')

  return adminCookie ? <Outlet /> : <Navigate to={'/create-room'} />
}

export default AdminRoute
