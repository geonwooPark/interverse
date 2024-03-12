import { createSlice } from '@reduxjs/toolkit'

interface ModalType {
  isOpen: boolean
}

const initialState: ModalType = { isOpen: false }

export const SurveyModalSlice = createSlice({
  // store의 이름
  name: 'survey-modal',
  // 초기값
  initialState,
  // 처리하고자 하는 메서드
  reducers: {
    openSurveyModal: (state) => {
      state.isOpen = true
    },
    closeSurveyModal: (state) => {
      state.isOpen = false
    },
  },
})

export const { openSurveyModal, closeSurveyModal } = SurveyModalSlice.actions
