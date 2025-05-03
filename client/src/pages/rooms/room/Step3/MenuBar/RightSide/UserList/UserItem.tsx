import IconButton from '@components/IconButton'
import { TEXTURE_MAP } from '@constants/index'
import OtherPlayer from '@games/avatars/OtherPlayer'

interface UserItemProps {
  user: OtherPlayer
  handleMessageModal: (id: string) => void
}

function UserItem({ user, handleMessageModal }: UserItemProps) {
  return (
    <li key={user.socketId} className="flex items-center justify-between p-2">
      <div className="flex items-center">
        <div
          className={`mr-2 size-8 rounded-full border bg-[63px] ${TEXTURE_MAP[user.texture.key]}`}
        />
        <p className="line-clamp-1 whitespace-pre-wrap break-words text-body2">
          {user.nickname.text}
        </p>
      </div>

      <IconButton
        iconName="IconMessage"
        className="size-5 text-gray-600"
        onClick={() => handleMessageModal(user.socketId as string)}
      />
    </li>
  )
}

export default UserItem
