import { createSlice } from '@reduxjs/toolkit'

interface ScreenStreamerType {
  isScreenStreaming: boolean
}

const initialState: ScreenStreamerType = {
  isScreenStreaming: false,
}

export const ScreenStreamerSlice = createSlice({
  // store의 이름
  name: 'screen-streamer',
  // 초기값
  initialState,
  // 처리하고자 하는 메서드
  reducers: {
    handleStreaming: (state, action) => {
      state.isScreenStreaming = action.payload
    },
  },
})

export const { handleStreaming } = ScreenStreamerSlice.actions
