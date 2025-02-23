import { useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@store/store'
import DirectMessageComposer from '../../../DirectMessage/DirectMessageComposer'
import { IconUsers } from '@assets/svgs'
import UserListItem from './UserListItem'
import {
  changeReceiver,
  handleDirectMessageComposer,
} from '@store/features/directMessageSlice'

function UserList() {
  const dispatch = useAppDispatch()

  const users = useAppSelector((state) => state.users)

  const userCount = useMemo(() => Object.keys(users).length, [users])

  const [showUserList, setShowUserList] = useState(true)

  const toogleUserList = () => {
    setShowUserList((prev) => !prev)
  }

  const sendDM = (nickname: string, id: string) => {
    dispatch(handleDirectMessageComposer())
    dispatch(changeReceiver({ nickname, id }))
  }

  return (
    <div className="relative">
      <button
        tabIndex={-1}
        onClick={toogleUserList}
        className="flex items-center justify-center rounded-md bg-black/70 px-3 py-2 text-white duration-200 hover:bg-black/90"
      >
        <IconUsers className="mr-1 size-5" />
        <span>{userCount}</span>
      </button>

      {showUserList && (
        <div className="absolute -bottom-14 left-[50%] translate-x-[-50%]">
          <ul className="hide-scroll max-h-[180px] w-[200px] overflow-x-auto overflow-y-scroll rounded-md bg-white/30 text-sm shadow-md">
            {users.map((user) => (
              <UserListItem key={user.socketId} user={user} sendDM={sendDM} />
            ))}
          </ul>
        </div>
      )}

      {/* <DirectMessageComposer /> */}
    </div>
  )
}

export default UserList
