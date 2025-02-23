import { createPortal } from 'react-dom'
import DirectMessage from './DirectMessage'
import { useAppSelector } from '@store/store'

function DirectMessages() {
  const { directMessages } = useAppSelector((state) => state.directMessage)

  const directMessagesArr = directMessages.map((dm) => (
    <DirectMessage key={dm.id} dm={dm} />
  ))

  return createPortal(
    directMessages && directMessagesArr,
    document.getElementById('dm') as HTMLElement,
  )
}

export default DirectMessages
