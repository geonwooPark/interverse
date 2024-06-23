import { createPortal } from 'react-dom'
import { useAppSelector } from '../../store/store'
import DirectMessage from './DirectMessage'

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
