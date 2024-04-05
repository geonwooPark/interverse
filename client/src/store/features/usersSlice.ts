import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RoomUser } from '../../../../types/socket'

const initialState: RoomUser[] = []

export const UsersSlice = createSlice({
  // store의 이름
  name: 'users',
  // 초기값
  initialState,
  // 처리하고자 하는 메서드
  reducers: {
    setUsers: (state, action: PayloadAction<RoomUser[]>) =>
      (state = action.payload),
    addUser: (state, action: PayloadAction<RoomUser>) =>
      (state = [...state, action.payload]),
    deleteUser: (state, action: PayloadAction<string>) =>
      (state = state.filter((r) => r.socketId !== action.payload)),
  },
})

export const { setUsers, addUser, deleteUser } = UsersSlice.actions
