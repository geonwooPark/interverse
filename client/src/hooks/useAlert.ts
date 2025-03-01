import React, { useState } from 'react'

export default function useAlert() {
  const [isOpen, setIsOpen] = useState(false)

  const [content, setContent] = useState('')

  const changeContent = (value: string) => {
    setContent(value)
  }

  const openAlert = () => {
    setIsOpen(true)
  }

  const closeAlert = () => {
    setIsOpen(false)
  }

  return {
    isOpen,
    content,
    changeContent,
    openAlert,
    closeAlert,
  }
}
