import { useMemo, useState } from 'react'
import UserList from './UserList'
import IconUsers from '../svgs/IconUsers.svg?react'
import { useAppSelector } from '../store/store'

function ConnectedUserList() {
  const users = useAppSelector((state) => state.users)

  const userCount = useMemo(() => Object.keys(users).length, [users])

  const [showUserList, setShowUserList] = useState(false)

  const onUserListClick = () => {
    setShowUserList((prev) => !prev)
  }

  return (
    <div className="relative font-neodgm">
      <button
        onClick={onUserListClick}
        className="mb-4 flex items-center justify-center rounded-md bg-black/70 px-3 py-2 text-white duration-200 hover:bg-black/90"
      >
        <IconUsers className="mr-1 size-5" />
        <span>{userCount}</span>
      </button>
      {showUserList && <UserList users={users} />}
    </div>
  )
}

export default ConnectedUserList
