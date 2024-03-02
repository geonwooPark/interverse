import { Outlet } from 'react-router-dom'

function Auth() {
  return (
    <div className="fixed inset-0 flex h-screen w-screen items-center justify-center bg-black/70 font-neodgm">
      <Outlet />
    </div>
  )
}

export default Auth
