import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { ModalDisplaySlice } from './features/modalDisplaySlice'
import { ModalContentSlice } from './features/modalContentSlice'

export const store = configureStore({
  reducer: {
    modalDisplay: ModalDisplaySlice.reducer,
    modalContent: ModalContentSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector
