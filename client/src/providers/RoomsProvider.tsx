import React, { PropsWithChildren, useState } from 'react'
import { _createContext } from '../utils/_createContext'
import { getCookie, setCookie } from '../utils/cookie'
import { CookieType } from 'src/types'

type ContextState = CookieType[]

export const [useRoomsState, StateProvider] = _createContext<ContextState>()
export const [useRoomsAction, ActionProvider] =
  _createContext<(newValue: CookieType[]) => void>()

export default function RoomsProvider({ children }: PropsWithChildren) {
  const [rooms, setRooms] = useState(() => getCookie('interverse') || [])

  const updateRooms = (newValue: CookieType[]) => {
    setRooms(newValue)
    setCookie('interverse', JSON.stringify(newValue))
  }

  return (
    <ActionProvider value={updateRooms}>
      <StateProvider value={rooms}>{children}</StateProvider>
    </ActionProvider>
  )
}
