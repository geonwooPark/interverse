import { createPortal } from 'react-dom'
import { useAppSelector } from '../../../store/store'
import AlertContent from './AlertContent'

function Alert() {
  const { content, isAlert } = useAppSelector((state) => state.alert)

  if (!isAlert) return null

  return createPortal(
    <AlertContent content={content} />,
    document.getElementById('alert') as HTMLElement,
  )
}

export default Alert
