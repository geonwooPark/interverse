import React, { PropsWithChildren, useEffect, useState } from 'react'
import { _createContext } from '../utils/_createContext'
import { getCookie, setCookie } from '../utils/cookie'
import { IRoom } from 'src/types'

type ContextState = IRoom[]

export const [useRoomsState, StateProvider] = _createContext<ContextState>()
export const [useRoomsAction, ActionProvider] =
  _createContext<(newRoom: IRoom) => void>()

export default function RoomsProvider({ children }: PropsWithChildren) {
  const [rooms, setRooms] = useState<IRoom[]>(
    () => getCookie('interverse') || [],
  )

  // 방 유효기간 체크
  const twoWeeksAgo = Date.now() - 1000 * 60 * 60 * 24 * 14

  const vaildRooms = rooms.filter((r) => r.createAt > twoWeeksAgo)

  const addRoom = (room: IRoom) => {
    if (vaildRooms.some((r) => r.roomNum === room.roomNum)) return

    setRooms((prev) => [...prev, room])
  }

  useEffect(() => {
    setCookie('interverse', JSON.stringify(vaildRooms))
  }, [vaildRooms])

  return (
    <ActionProvider value={addRoom}>
      <StateProvider value={vaildRooms}>{children}</StateProvider>
    </ActionProvider>
  )
}
