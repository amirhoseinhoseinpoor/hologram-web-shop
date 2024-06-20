import { configureStore } from '@reduxjs/toolkit';
import {authSliceV , adminsliceV} from './slice';
import { useDispatch, useSelector, useStore } from 'react-redux'
export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSliceV,
      admin: adminsliceV,
    }
  })
}

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes()
export const useAppSelector = useSelector.withTypes()
export const useAppStore = useStore.withTypes()