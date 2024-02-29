import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface AlertType {
  status: 'error' | 'success' | 'pending'
  message: string
}

const initialState: AlertType = { status: 'pending', message: '' }

const AlertSlice = createSlice({
  // store의 이름
  name: 'alert',
  // 초기값
  initialState,
  // 처리하고자 하는 메서드
  reducers: {
    setAlert: (state, action: PayloadAction<AlertType>) => {
      return (state = {
        status: action.payload.status,
        message: action.payload.message,
      })
    },
  },
})

export default AlertSlice.reducer
export const { setAlert } = AlertSlice.actions
