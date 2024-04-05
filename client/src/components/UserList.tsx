import { RoomUser } from '../../../types/socket'
import { textureImage } from '../constants'

interface UserListProps {
  users: RoomUser[]
}

function UserList({ users }: UserListProps) {
  return (
    <div className="absolute left-[50%] translate-x-[-50%]">
      <ul className="hide-scroll max-h-[180px] w-[180px] overflow-x-auto overflow-y-scroll rounded-md bg-white/30 text-sm shadow-md">
        {users.map((user) => (
          <li key={user.socketId} className="flex items-center p-2">
            <div
              className={`mr-2 size-8 rounded-full border bg-[63px] ${textureImage.get(user.texture)}`}
            />
            {user.nickName}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserList
