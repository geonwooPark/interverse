import { createSlice } from '@reduxjs/toolkit'

interface ScreenStreamerType {
  isStreaming: boolean
}

const initialState: ScreenStreamerType = {
  isStreaming: false,
}

export const ScreenStreamerSlice = createSlice({
  // store의 이름
  name: 'screen-streamer',
  // 초기값
  initialState,
  // 처리하고자 하는 메서드
  reducers: {
    handleStreaming: (state, action) => {
      state.isStreaming = action.payload
    },
  },
})

export const { handleStreaming } = ScreenStreamerSlice.actions
