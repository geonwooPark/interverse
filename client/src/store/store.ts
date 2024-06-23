import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { ConfirmModalSlice } from './features/confirmModalSlice'
import { AlertSlice } from './features/alertSlice'
import { ChatListSlice } from './features/chatListSlice'
import { MyStreamSlice } from './features/myStreamSlice'
import { UsersSlice } from './features/usersSlice'
import { DirectMessageSlice } from './features/directMessageSlice'
import { ModalsSlice } from './features/modalsSlice'

export const store = configureStore({
  reducer: {
    confirmModal: ConfirmModalSlice.reducer,
    modals: ModalsSlice.reducer,
    directMessage: DirectMessageSlice.reducer,
    alert: AlertSlice.reducer,
    chatList: ChatListSlice.reducer,
    myStream: MyStreamSlice.reducer,
    users: UsersSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector
