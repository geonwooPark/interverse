import { Outlet } from 'react-router-dom'

function Home() {
  return (
    <div className="font-neodgm flex h-screen w-screen flex-col items-center justify-center bg-[#1F3131] shadow-md">
      <Outlet />
    </div>
  )
}

export default Home
