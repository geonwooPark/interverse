import { useEffect } from 'react'
import { useAppDispatch } from '../store/store'
import { changeModalContent, handleModal } from '../store/features/modalSlice'
import { ModalContentType } from '../../../types/client'

export const useGoBack = (content: ModalContentType) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    history.pushState(null, '', location.href)
    const browserPreventEvent = () => {
      history.pushState(null, '', location.href)
      dispatch(changeModalContent(content))
      dispatch(handleModal())
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
