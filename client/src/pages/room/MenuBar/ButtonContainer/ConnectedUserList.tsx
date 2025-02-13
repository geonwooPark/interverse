import { useMemo, useState } from 'react'
import UserList from './UserList'
import { useAppSelector } from '../../../store/store'
import { CookieType } from '../../../../../types/client'
import DirectMessageComposer from '../../DirectMessage/DirectMessageComposer'
import { IconUsers } from '../../../../svgs'

interface ConnectedUserListProps {
  authCookie: CookieType | null
}

function ConnectedUserList({ authCookie }: ConnectedUserListProps) {
  const users = useAppSelector((state) => state.users)
  const { receiver } = useAppSelector((state) => state.directMessage)

  const userCount = useMemo(() => Object.keys(users).length, [users])

  const [showUserList, setShowUserList] = useState(true)

  const onUserListClick = () => {
    setShowUserList((prev) => !prev)
  }

  return (
    <div className="relative font-neodgm">
      <button
        tabIndex={-1}
        onClick={onUserListClick}
        className="mb-4 flex items-center justify-center rounded-md bg-black/70 px-3 py-2 text-white duration-200 hover:bg-black/90"
      >
        <IconUsers className="mr-1 size-5" />
        <span>{userCount}</span>
      </button>
      {showUserList && <UserList users={users} />}
      <DirectMessageComposer authCookie={authCookie} receiver={receiver} />
    </div>
  )
}

export default ConnectedUserList
