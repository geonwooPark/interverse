import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface UserType {
  texture: string
  nickname: string
  isVideoEnabled: boolean
  isAudioEnabled: boolean
}

const initialState: UserType = {
  texture: '',
  nickname: '',
  isVideoEnabled: false,
  isAudioEnabled: false,
}

export const UserSlice = createSlice({
  name: 'user',
  // 초기값
  initialState,
  // 처리하고자 하는 메서드
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ texture: string; nickname: string }>,
    ) => {
      state.texture = action.payload.texture
      state.nickname = action.payload.nickname
    },
    toggleVideo: (state) => {
      state.isVideoEnabled = !state.isVideoEnabled
    },
    toggleAudio: (state) => {
      state.isAudioEnabled = !state.isAudioEnabled
    },
  },
})

export const { setUser, toggleVideo, toggleAudio } = UserSlice.actions
