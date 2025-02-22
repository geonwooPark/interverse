import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface AlertType {
  content: string
  isAlert: boolean
}

const initialState: AlertType = {
  content: '',
  isAlert: false,
}

export const AlertSlice = createSlice({
  // store의 이름
  name: 'alert',
  // 초기값
  initialState,
  // 처리하고자 하는 메서드
  reducers: {
    changeAlertContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload
    },
    openAlert: (state) => {
      state.isAlert = true

      setTimeout(() => {
        state.isAlert = false
      }, 5000)
    },
  },
})

export const { changeAlertContent, openAlert } = AlertSlice.actions
