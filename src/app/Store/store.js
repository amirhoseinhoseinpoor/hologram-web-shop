import { configureStore } from "@reduxjs/toolkit";
import { authSliceV, contentSliceV , makeOrderSliceV , productSliceV , honorsSliceV } from "./slice";
// import { useDispatch, useSelector, useStore } from 'react-redux'

const store = configureStore({
  reducer: {
    auth: authSliceV,
    product : productSliceV,
    honors: honorsSliceV,
    content: contentSliceV,
    makeOrder : makeOrderSliceV,
  },
});

export default store;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// export const useAppDispatch = useDispatch.withTypes()
// export const useAppSelector = useSelector.withTypes()
// export const useAppStore = useStore.withTypes()
