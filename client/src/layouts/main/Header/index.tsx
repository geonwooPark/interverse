import Logo from '@components/Logo'
import UserProfile from './UserProfile'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="fixed z-[100] h-[64px] w-full border-b bg-white px-6">
      <div className="flex h-full items-center justify-between">
        <Link to={'/'}>
          <Logo width={160} className="pointer-events-none" />
        </Link>

        <div className="flex items-center gap-2">
          <UserProfile />
        </div>
      </div>
    </header>
  )
}
