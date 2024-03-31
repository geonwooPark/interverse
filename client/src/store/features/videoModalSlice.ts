import { createSlice } from '@reduxjs/toolkit'

interface ModalType {
  isOpen: boolean
}

const initialState: ModalType = { isOpen: false }

export const VideoModalSlice = createSlice({
  // store의 이름
  name: 'video-modal',
  // 초기값
  initialState,
  // 처리하고자 하는 메서드
  reducers: {
    handleVideoModal: (state) => {
      state.isOpen = state.isOpen ? false : true
    },
  },
})

export const { handleVideoModal } = VideoModalSlice.actions
