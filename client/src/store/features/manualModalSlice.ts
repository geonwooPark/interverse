import { createSlice } from '@reduxjs/toolkit'

interface ModalType {
  isOpen: boolean
}

const initialState: ModalType = { isOpen: false }

export const ManualModalSlice = createSlice({
  // store의 이름
  name: 'manual-modal',
  // 초기값
  initialState,
  // 처리하고자 하는 메서드
  reducers: {
    handleManualModal: (state) => {
      state.isOpen = state.isOpen ? false : true
    },
  },
})

export const { handleManualModal } = ManualModalSlice.actions
