import { configureStore } from "@reduxjs/toolkit";
import {
  authSliceV,
  makeOrderSliceV,
  productSliceV,
  honorsSliceV,
  exhibitionSliceV,
  headerSliceV,
  userOrdersSliceV,
} from "./slice";

const store = configureStore({
  reducer: {
    auth: authSliceV,
    product: productSliceV,
    honors: honorsSliceV,
    exhibition: exhibitionSliceV,
    header: headerSliceV,
    makeOrder: makeOrderSliceV,
    userOrders: userOrdersSliceV,
  },
});

export default store;
