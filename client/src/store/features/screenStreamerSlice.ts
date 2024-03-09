import { createSlice } from '@reduxjs/toolkit'

interface ScreenStreamerType {
  peerId: string
  isStreaming: boolean
}

const initialState: ScreenStreamerType = { peerId: '', isStreaming: false }

export const ScreenStreamerSlice = createSlice({
  // store의 이름
  name: 'screen-streamer',
  // 초기값
  initialState,
  // 처리하고자 하는 메서드
  reducers: {
    changeStreamerId: (state, action) => {
      state.peerId = action.payload
    },
    handleStreaming: (state, action) => {
      state.isStreaming = action.payload
    },
  },
})

export const { changeStreamerId, handleStreaming } = ScreenStreamerSlice.actions
