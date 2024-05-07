import { RoomUser } from '../../../../types/socket'
import {
  changeReceiver,
  handleDirectMessageComposer,
} from '../../store/features/directMessageSlice'
import { useAppDispatch } from '../../store/store'
import UserListItem from './UserListItem'

interface UserListProps {
  users: RoomUser[]
}

function UserList({ users }: UserListProps) {
  const dispatch = useAppDispatch()

  const sendDM = (nickName: string, id: string) => {
    dispatch(handleDirectMessageComposer())
    dispatch(changeReceiver({ nickName, id }))
  }

  return (
    <div className="absolute left-[50%] translate-x-[-50%]">
      <ul className="hide-scroll max-h-[180px] w-[200px] overflow-x-auto overflow-y-scroll rounded-md bg-white/30 text-sm shadow-md">
        {users.map((user) => (
          <UserListItem key={user.socketId} user={user} sendDM={sendDM} />
        ))}
      </ul>
    </div>
  )
}

export default UserList
