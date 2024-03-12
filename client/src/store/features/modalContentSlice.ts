import { createSlice } from '@reduxjs/toolkit'

export interface ModalContentType {
  title: string
  description: string
  action: any
  actionLabel: string
}

const initialState: ModalContentType = {
  title: '',
  description: '',
  action: null,
  actionLabel: '',
}

export const ModalContentSlice = createSlice({
  // store의 이름
  name: 'modal-content',
  // 초기값
  initialState,
  // 처리하고자 하는 메서드
  reducers: {
    changeModalContent: (state, action) => {
      return (state = { ...action.payload })
    },
  },
})

export const { changeModalContent } = ModalContentSlice.actions
