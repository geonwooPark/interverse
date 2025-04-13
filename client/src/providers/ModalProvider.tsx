import { _createContext } from '@utils/_createContext'
import React, { PropsWithChildren, useCallback, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'

type ModalContextState = {
  addModal: (modal: JSX.Element) => void
  removeModal: () => void
  clearModal: () => void
}

export const [useModal, ModalContextProvider] =
  _createContext<ModalContextState>()

function ModalProvider({ children }: PropsWithChildren) {
  const [modals, setModals] = useState<JSX.Element[]>([])

  const addModal = useCallback((modal: JSX.Element) => {
    setModals((prev) => [...prev, modal])
  }, [])

  const removeModal = useCallback(() => {
    setModals((prev) => {
      const newModals = prev.slice(0, prev.length - 1)
      return newModals
    })
  }, [])

  const clearModal = useCallback(() => {
    setModals([])
  }, [])

  const providerValue = useMemo(
    () => ({ addModal, removeModal, clearModal }),
    [],
  )

  return (
    <ModalContextProvider value={providerValue}>
      {children}

      {createPortal(
        modals.map((modal, index) => (
          <React.Fragment key={index}>{modal}</React.Fragment>
        )),
        document.getElementById('modals') as HTMLElement,
      )}
    </ModalContextProvider>
  )
}

export default ModalProvider
