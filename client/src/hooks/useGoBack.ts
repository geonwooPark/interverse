import { useEffect } from 'react'
import { useAppDispatch } from '../store/store'
import {
  ModalContentType,
  changeModalContent,
} from '../store/features/modalContentSlice'
import { openModal } from '../store/features/modalDisplaySlice'

export const useGoBack = (content: ModalContentType) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    history.pushState(null, '', location.href)
    const browserPreventEvent = () => {
      history.pushState(null, '', location.href)
      dispatch(changeModalContent(content))
      dispatch(openModal())
    }
    window.addEventListener('popstate', () => {
      browserPreventEvent()
    })
    return () => {
      window.removeEventListener('popstate', () => {
        browserPreventEvent()
      })
    }
  }, [])
}
