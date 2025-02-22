import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface AvatarType {
  texture: string
  nickname: string
}

const initialState: AvatarType = {
  texture: '',
  nickname: '',
}

export const AvatarSlice = createSlice({
  // store의 이름
  name: 'avatar',
  // 초기값
  initialState,
  // 처리하고자 하는 메서드
  reducers: {
    setAvatar: (state, action: PayloadAction<AvatarType>) => {
      state.texture = action.payload.texture
      state.nickname = action.payload.nickname
    },
  },
})

export const { setAvatar } = AvatarSlice.actions
