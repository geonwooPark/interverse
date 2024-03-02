import { createSlice } from '@reduxjs/toolkit'

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
    changeAlertContent: (state, action) => {
      state.content = action.payload
    },
    openAlert: (state) => {
      state.isAlert = true
    },
    closeAlert: (state) => {
      state.isAlert = false
    },
  },
})

export const { changeAlertContent, openAlert, closeAlert } = AlertSlice.actions
