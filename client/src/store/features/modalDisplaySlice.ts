import { createSlice } from '@reduxjs/toolkit'

interface ModalType {
  isOpen: boolean
}

const initialState: ModalType = { isOpen: false }

export const ModalDisplaySlice = createSlice({
  // store의 이름
  name: 'modal-display',
  // 초기값
  initialState,
  // 처리하고자 하는 메서드
  reducers: {
    openModal: (state) => {
      state.isOpen = true
    },
    closeModal: (state) => {
      state.isOpen = false
    },
  },
})

export const { openModal, closeModal } = ModalDisplaySlice.actions
