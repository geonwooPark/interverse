import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ModalContentType } from '../../types/client'

export interface ModalType {
  content: {
    title: string
    description: string
    action: any
    actionLabel: string
  }
  isOpen: boolean
}

const initialState: ModalType = {
  content: {
    title: '',
    description: '',
    action: null,
    actionLabel: '',
  },
  isOpen: false,
}

export const ModalSlice = createSlice({
  // store의 이름
  name: 'modal',
  // 초기값
  initialState,
  // 처리하고자 하는 메서드
  reducers: {
    changeModalContent: (state, action: PayloadAction<ModalContentType>) => {
      state.content = action.payload
    },
    handleModal: (state) => {
      state.isOpen = state.isOpen ? false : true
    },
  },
})

export const { changeModalContent, handleModal } = ModalSlice.actions
