import { createSlice } from '@reduxjs/toolkit'

interface UserType {
  x: number
  y: number
  nickName: string
  texture: string
  roomNum: string
  socketId: string
}

const initialState: UserType[] = []

export const userListSlice = createSlice({
  // store의 이름
  name: 'userList',
  // 초기값
  initialState,
  // 처리하고자 하는 메서드
  reducers: {
    addUser: (state, action) => {
      return (state = [...state, action.payload])
    },
  },
})

export const { addUser } = userListSlice.actions
