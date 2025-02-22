import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type DirectMessageType = {
  id: number
  message: string
  sender: string
  senderId: string
}

export interface DirectMessageModalType {
  isOpen: boolean
  directMessages: DirectMessageType[]
  receiver: {
    nickname: string
    id: string
  }
}

const initialState: DirectMessageModalType = {
  isOpen: false,
  directMessages: [],
  receiver: {
    nickname: '',
    id: '',
  },
}

export const DirectMessageSlice = createSlice({
  // store의 이름
  name: 'directMessage',
  // 초기값
  initialState,
  // 처리하고자 하는 메서드
  reducers: {
    addDM: (state, action: PayloadAction<DirectMessageType>) => {
      state.directMessages.push(action.payload)
    },
    removeDM: (state, action: PayloadAction<number>) => {
      state.directMessages = state.directMessages.filter(
        (r) => r.id !== action.payload,
      )
    },
    handleDirectMessageComposer: (state) => {
      state.isOpen = state.isOpen ? false : true
    },
    changeReceiver: (
      state,
      action: PayloadAction<{ nickname: string; id: string }>,
    ) => {
      state.receiver = action.payload
    },
  },
})

export const { addDM, removeDM, handleDirectMessageComposer, changeReceiver } =
  DirectMessageSlice.actions
