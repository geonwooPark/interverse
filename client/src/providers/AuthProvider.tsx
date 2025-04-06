import React, { PropsWithChildren } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useRoomsState } from './RoomsProvider'
import { _createContext } from '../utils/_createContext'
import { IRoom } from 'src/types'

type ContextState = IRoom | undefined

export const [useAuthCookie, Provider] = _createContext<ContextState>()

export default function AuthProvider({ children }: PropsWithChildren) {
  const rooms = useRoomsState()

  const [serchParams] = useSearchParams()

  const roomNum = serchParams.get('roomNum')

  const authCookie = rooms?.find((room) => room.roomNum === roomNum)

  return <Provider value={authCookie}>{children}</Provider>
}
