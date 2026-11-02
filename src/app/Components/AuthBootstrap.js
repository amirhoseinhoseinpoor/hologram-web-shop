"use client";

import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useStore } from "react-redux";
import { hydrateAuth, resetToken } from "../Store/slice";
import { refreshSession } from "../Store/thunks";
import { AUTH_STORAGE_KEY, loadSession } from "../utils/authStorage";

const UNAUTHORIZED_MESSAGE = /^unauthorized user\.?$/i;

// Restores the saved session on first load, validates it against the backend,
// logs out automatically when the token is rejected, and keeps tabs in sync.
export default function AuthBootstrap() {
  const dispatch = useDispatch();
  const store = useStore();

  useEffect(() => {
    // Backend answers 400 "Unauthorized user." for an invalid/expired JWT.
    const interceptorId = axios.interceptors.response.use(
      (res) => res,
      (error) => {
        const status = error.response?.status;
        const message = error.response?.data?.message;
        const url = error.config?.url || "";
        const hadToken = Boolean(store.getState().auth.token);
        const tokenRejected =
          status === 401 ||
          (status === 400 &&
            typeof message === "string" &&
            UNAUTHORIZED_MESSAGE.test(message));

        if (hadToken && tokenRejected && !url.includes("/auth/")) {
          dispatch(resetToken());
        }
        return Promise.reject(error);
      },
    );

    // After the interceptor: axios only applies interceptors registered before
    // a request starts, and this validation must be able to log out.
    dispatch(hydrateAuth(loadSession()));
    if (store.getState().auth.token) dispatch(refreshSession());

    // login / logout in another tab
    const onStorage = (e) => {
      if (e.key === AUTH_STORAGE_KEY || e.key === null) {
        dispatch(hydrateAuth(loadSession()));
      }
    };
    window.addEventListener("storage", onStorage);

    return () => {
      axios.interceptors.response.eject(interceptorId);
      window.removeEventListener("storage", onStorage);
    };
  }, [dispatch, store]);

  return null;
}
