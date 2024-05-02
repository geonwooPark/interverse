import { RoomUser } from '../../../../types/socket'
import { textureImage } from '../../constants'
import { ws } from '../../lib/ws'
import IconMessage from '../../svgs/IconMessage.svg?react'

interface UserListItemProps {
  user: RoomUser
  sendDM: (nickName: string, id: string) => void
}

function UserListItem({ user, sendDM }: UserListItemProps) {
  return (
    <li key={user.socketId} className="flex items-center justify-between p-2">
      <div className="flex items-center">
        <div
          className={`mr-2 size-8 rounded-full border bg-[63px] ${textureImage.get(user.texture)}`}
        />
        {user.nickName}
      </div>
      {user.socketId !== ws.socket.id && (
        <IconMessage
          className="size-5"
          onClick={() => sendDM(user.nickName, user.socketId)}
        />
      )}
    </li>
  )
}

export default UserListItem
