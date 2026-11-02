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
import { saveSession, clearSession } from "../utils/authStorage";

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

// Persist the auth slice (client only). Nothing is written before the saved
// session has been restored, so a refresh can never wipe it.
if (typeof window !== "undefined") {
  let lastAuth;
  store.subscribe(() => {
    const auth = store.getState().auth;
    if (auth === lastAuth || !auth.authReady) return;
    lastAuth = auth;
    if (auth.token) saveSession(auth);
    else clearSession();
  });
}

export default store;
