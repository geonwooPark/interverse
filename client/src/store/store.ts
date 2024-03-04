import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { ModalDisplaySlice } from './features/modalDisplaySlice'
import { ModalContentSlice } from './features/modalContentSlice'
import { AlertSlice } from './features/alertSlice'
import { ChatListSlice } from './features/chatListSlice'
import { userListSlice } from './features/userListSlice'

export const store = configureStore({
  reducer: {
    modalDisplay: ModalDisplaySlice.reducer,
    modalContent: ModalContentSlice.reducer,
    alert: AlertSlice.reducer,
    chatList: ChatListSlice.reducer,
    userList: userListSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector
