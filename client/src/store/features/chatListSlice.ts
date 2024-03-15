import { createSlice } from '@reduxjs/toolkit'
import { ServerMessage } from '../../types/socket'

type ChatListType = ServerMessage[]

const initialState: ChatListType = []

export const ChatListSlice = createSlice({
  // store의 이름
  name: 'chatList',
  // 초기값
  initialState,
  // 처리하고자 하는 메서드
  reducers: {
    addMessage: (state, action) => {
      return (state = [...state, action.payload])
    },
  },
})

export const { addMessage } = ChatListSlice.actions
