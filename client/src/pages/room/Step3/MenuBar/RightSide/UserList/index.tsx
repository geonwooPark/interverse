import { useState, useSyncExternalStore } from 'react'
import { IconUsers } from '@assets/svgs'
import UserListItem from './UserListItem'
import { useScene } from '@providers/SceneProvider'
import { TEXTURE_MAP } from '@constants/index'
import useModals from '@hooks/useModals'
import DMCreateModal from '@components/DMCreateModal'

function UserList() {
  const { modals, addModal, removeModal } = useModals()

  const gameScene = useScene()

  const roomManager = gameScene.room

  const userlist = useSyncExternalStore(
    (callback) => roomManager.subscribe(() => callback()),
    () => roomManager.getState(),
  )

  const [isShow, setIsShow] = useState(false)

  const toogleUserList = () => {
    setIsShow((prev) => !prev)
  }

  const handleDMModal = (id: string) => {
    addModal(<DMCreateModal id={id} onClose={removeModal} />)
  }

  return (
    <div className="relative">
      <button
        tabIndex={-1}
        onClick={toogleUserList}
        className="flex items-center justify-center rounded-md bg-black/70 px-3 py-2 text-white duration-200 hover:bg-black/90"
      >
        <IconUsers className="mr-1 size-5" />
        <span>{userlist.size + 1}</span>
      </button>

      {isShow && (
        <div className="absolute left-[50%] mt-4 translate-x-[-50%]">
          <ul className="hide-scroll max-h-[180px] w-[200px] overflow-x-auto overflow-y-scroll rounded-md bg-white/30 text-sm shadow-md">
            <li className="flex items-center justify-between p-2">
              <div className="flex items-center">
                <div
                  className={`mr-2 size-8 rounded-full border bg-[63px] ${TEXTURE_MAP[gameScene.player.texture.key]}`}
                />
                {gameScene.player.nickname.text}
              </div>
            </li>

            {Array.from(userlist).map((user) => (
              <UserListItem
                key={user[0]}
                user={user[1]}
                handleDMModal={handleDMModal}
              />
            ))}
          </ul>
        </div>
      )}

      {modals}
    </div>
  )
}

export default UserList
