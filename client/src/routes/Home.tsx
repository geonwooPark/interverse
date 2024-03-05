import { Outlet } from 'react-router-dom'

function Home() {
  return (
    <div className="font-neodgm flex h-screen w-screen flex-col items-center justify-center bg-[#1F3131] shadow-md">
      {/* <div className="mb-5">
        <img src="/images/logo.png" alt="logo" width={400} />
      </div> */}
      <Outlet />
    </div>
  )
}

export default Home
