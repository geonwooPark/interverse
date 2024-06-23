import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type ModalType = 'creator' | 'manual' | 'survey' | 'video' | undefined

interface ModalsType {
  isOpen: boolean
  type: ModalType
}

const initialState: ModalsType = { isOpen: false, type: undefined }

export const ModalsSlice = createSlice({
  // store의 이름
  name: 'modals',
  // 초기값
  initialState,
  // 처리하고자 하는 메서드
  reducers: {
    handleModals: (state, action: PayloadAction<ModalType>) => {
      state.isOpen = state.isOpen ? false : true
      state.type = action.payload
    },
  },
})

export const { handleModals } = ModalsSlice.actions
