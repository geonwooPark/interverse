import { createSlice } from '@reduxjs/toolkit'

interface ModalType {
  isOpen: boolean
}

const initialState: ModalType = { isOpen: false }

export const VideoModalSlice = createSlice({
  // store의 이름
  name: 'video-modal-display',
  // 초기값
  initialState,
  // 처리하고자 하는 메서드
  reducers: {
    showVideoModal: (state, action) => {
      state.isOpen = action.payload
    },
  },
})

export const { showVideoModal } = VideoModalSlice.actions
