import { useState, useSyncExternalStore } from 'react'
import UserItem from './UserItem'
import { AnimatePresence, motion as m } from 'motion/react'
import { useScene } from '@providers/SceneProvider'
import { TEXTURE_MAP } from '@constants/index'
import { useModal } from '@providers/ModalProvider'
import Trigger from './Trigger'
import MessageModal from './MessageModal'
import slide from '@components/Animation/motions/slide'

function UserList() {
  const { addModal, removeModal } = useModal()

  const gameScene = useScene()

  const roomManager = gameScene.room

  const userlist = useSyncExternalStore(
    (callback) => roomManager.subscribe(() => callback()),
    () => roomManager.getState(),
  )

  const [isOpen, setIsOpen] = useState(false)

  const onClose = () => {
    setIsOpen((prev) => !prev)
  }

  const handleMessageModal = (id: string) => {
    addModal(<MessageModal id={id} onClose={removeModal} />)
  }

  return (
    <div className="relative">
      {isOpen && (
        <div onClick={onClose} className="fixed inset-0 z-[5] size-full" />
      )}

      <Trigger headCount={userlist.size + 1} onClick={onClose} />

      <AnimatePresence>
        {isOpen && (
          <m.ul
            {...slide({ distance: -20, isFade: true }).inY}
            className="hide-scroll absolute right-0 z-[6] mt-4 max-h-[180px] w-[200px] overflow-x-auto overflow-y-scroll rounded-md bg-white text-body2 shadow-md"
          >
            {/* 플레이어 */}
            <li className="flex items-center justify-between p-2">
              <div className="flex items-center">
                <div
                  className={`mr-2 size-8 rounded-full border bg-[63px] ${TEXTURE_MAP[gameScene.player.texture.key]}`}
                />
                {gameScene.player.nickname.text}
              </div>
            </li>

            {/* 타 플레이어 */}
            {Array.from(userlist).map((user) => (
              <UserItem
                key={user[0]}
                user={user[1]}
                handleMessageModal={handleMessageModal}
              />
            ))}
          </m.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export default UserList
