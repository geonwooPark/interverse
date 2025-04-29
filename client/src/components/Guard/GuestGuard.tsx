import { isLoggedInStore } from '@store/index'
import React, { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { useStore } from 'ventileco-store'

export default function GuestGuard({ children }: PropsWithChildren) {
  const [isLoggedIn] = useStore(isLoggedInStore, (state) => state)

  return isLoggedIn ? <Navigate to="/rooms/list" /> : children
}
