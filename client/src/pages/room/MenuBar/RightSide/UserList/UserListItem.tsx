import { textureMap } from '../../../../../constants'
import { IconMessage } from '../../../../../assets/svgs'
import { RoomUser } from '../../../../../../../types/socket'

interface UserListItemProps {
  user: RoomUser
  sendDM: (nickname: string, id: string) => void
}

function UserListItem({ user, sendDM }: UserListItemProps) {
  return (
    <li key={user.socketId} className="flex items-center justify-between p-2">
      <div className="flex items-center">
        <div
          className={`mr-2 size-8 rounded-full border bg-[63px] ${textureMap[user.texture]}`}
        />
        {user.nickname}
      </div>

      {/* {user.socketId !== ws.socket.id && (
        <IconMessage
          className="size-5"
          onClick={() => sendDM(user.nickname, user.socketId)}
        />
      )} */}
    </li>
  )
}

export default UserListItem
