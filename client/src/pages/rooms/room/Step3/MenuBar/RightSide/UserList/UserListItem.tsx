import { IconMessage } from '@assets/svgs'
import { TEXTURE_MAP } from '@constants/index'
import OtherPlayer from '@games/avatars/OtherPlayer'

interface UserListItemProps {
  user: OtherPlayer
  handleDMModal: (id: string) => void
}

function UserListItem({ user, handleDMModal }: UserListItemProps) {
  return (
    <li key={user.socketId} className="flex items-center justify-between p-2">
      <div className="flex items-center">
        <div
          className={`mr-2 size-8 rounded-full border bg-[63px] ${TEXTURE_MAP[user.texture.key]}`}
        />
        {user.nickname.text}
      </div>

      <IconMessage
        className="size-5"
        onClick={() => handleDMModal(user.socketId as string)}
      />
    </li>
  )
}

export default UserListItem
