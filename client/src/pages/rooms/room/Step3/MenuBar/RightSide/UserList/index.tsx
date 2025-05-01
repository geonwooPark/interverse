import { useState, useSyncExternalStore } from 'react'
import UserListItem from './UserListItem'
import { AnimatePresence, motion as m } from 'motion/react'
import { useScene } from '@providers/SceneProvider'
import { TEXTURE_MAP } from '@constants/index'
import DMCreateModal from '@components/DMCreateModal'
import { ToolTip } from 'ventileco-ui'
import { useModal } from '@providers/ModalProvider'
import Icon from '@components/Icon'
import slideIn from '@components/Animation/motions/slideIn'

function UserList() {
  const { addModal, removeModal } = useModal()

  const gameScene = useScene()

  const roomManager = gameScene.room

  const userlist = useSyncExternalStore(
    (callback) => roomManager.subscribe(() => callback()),
    () => roomManager.getState(),
  )

  const [isOpen, setIsOpen] = useState(false)

  const toogleUserList = () => {
    setIsOpen((prev) => !prev)
  }

  const handleDMModal = (id: string) => {
    addModal(<DMCreateModal id={id} onClose={removeModal} />)
  }

  return (
    <div className="relative">
      <ToolTip direction="bottom" enterDelay={1000}>
        <ToolTip.Trigger>
          <button
            tabIndex={-1}
            onClick={toogleUserList}
            className="flex items-center justify-center rounded-md bg-black/70 px-3 py-2 text-white duration-200 hover:bg-black/90"
          >
            <Icon
              iconName="IconUsers"
              className="pointer-events-none mr-1 size-5"
            />
            <span className="pointer-events-none">{userlist.size + 1}</span>
          </button>
        </ToolTip.Trigger>
        <ToolTip.Content>
          <div className="rounded bg-white px-2 py-1 text-caption">
            참여인원
          </div>
          <ToolTip.Triangle className="size-2.5 bg-white" />
        </ToolTip.Content>
      </ToolTip>

      <AnimatePresence>
        {isOpen && (
          <m.ul
            {...slideIn({ distance: -20, isFade: true }).inY}
            className="hide-scroll absolute right-0 mt-4 max-h-[180px] w-[200px] overflow-x-auto overflow-y-scroll rounded-md bg-white text-body2 shadow-md"
          >
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
          </m.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export default UserList
