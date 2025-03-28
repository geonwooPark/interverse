import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { MyStreamSlice } from './features/myStreamSlice'
import { AvatarSlice } from './features/avatarSlice'

export const store = configureStore({
  reducer: {
    avartar: AvatarSlice.reducer,
    myStream: MyStreamSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector
