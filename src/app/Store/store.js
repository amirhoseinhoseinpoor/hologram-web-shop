import { configureStore } from "@reduxjs/toolkit";
import { authSliceV , makeOrderSliceV , productSliceV , honorsSliceV , exhibitionSliceV , headerSliceV } from "./slice";
// import { useDispatch, useSelector, useStore } from 'react-redux'

const store = configureStore({
  reducer: {
    auth: authSliceV,
    product : productSliceV,
    honors: honorsSliceV,
    exhibition: exhibitionSliceV,
    header: headerSliceV,
    makeOrder : makeOrderSliceV,
  },
});

export default store;

