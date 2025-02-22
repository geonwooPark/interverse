import React, { PropsWithChildren } from 'react'
import { Navigate, useLocation, useSearchParams } from 'react-router-dom'
import { useRoomsState } from './RoomsProvider'
import { _createContext } from '../utils/_createContext'
import { CookieType } from '../../../types/client'
import { paths } from '../routes/paths'

type ContextState = CookieType | undefined

export const [useAuthCookie, Provider] = _createContext<ContextState>()

export default function AuthProvider({ children }: PropsWithChildren) {
  const location = useLocation()

  const rooms = useRoomsState()

  const [serchParams] = useSearchParams()

  const roomNum = serchParams.get('roomNum')

  const authCookie = rooms?.find((room) => room.roomNum === roomNum)

  return authCookie ? (
    <Provider value={authCookie}>{children}</Provider>
  ) : (
    <Navigate to={paths.waiting + location.search} replace />
  )
}
