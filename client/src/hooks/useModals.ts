import React, { useState } from 'react'

export default function useModals() {
  const [modals, setModals] = useState<JSX.Element[]>([])

  const addModal = (modal: JSX.Element) => {
    const modalWithKey = React.cloneElement(modal, { key: Date.now() })
    setModals((prev) => [...prev, modalWithKey])
  }

  const removeModal = () => {
    setModals((prev) => {
      const newModals = prev.slice(0, prev.length - 1)
      return newModals
    })
  }

  const clearModal = () => {
    setModals([])
  }

  return {
    modals,
    addModal,
    removeModal,
    clearModal,
  }
}
