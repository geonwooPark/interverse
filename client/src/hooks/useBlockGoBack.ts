import { useEffect } from 'react'

export const useBlockGoBack = (callback: any) => {
  useEffect(() => {
    history.pushState(null, '', location.href)

    const browserPreventEvent = () => {
      history.pushState(null, '', location.href)
      callback()
    }

    window.addEventListener('popstate', browserPreventEvent)
    return () => {
      window.removeEventListener('popstate', browserPreventEvent)
    }
  }, [])
}
