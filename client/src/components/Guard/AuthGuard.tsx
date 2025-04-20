import React, { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'

export default function AuthGuard({ children }: PropsWithChildren) {
  // 로그인 여부 파악
  const isLoggedIn = true

  return isLoggedIn ? children : <Navigate to="/login" />
}
