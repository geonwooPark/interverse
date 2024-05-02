import { useAppSelector } from '../../../store/store'
import DirectMessage from './DirectMessage'

function DirectMessageModal() {
  const { directMessages } = useAppSelector((state) => state.directMessageModal)

  const directMessagesArr = directMessages.map((dm) => (
    <DirectMessage key={dm.id} dm={dm} />
  ))

  return directMessages && directMessagesArr
}

export default DirectMessageModal
