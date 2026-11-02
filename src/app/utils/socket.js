import { io } from "socket.io-client";
import { token } from "../Store/slice";
import store from "../Store/store";

let socket = null;
let socketToken = null;

// Created on demand: at import time the saved session isn't restored yet.
export const getSocket = () => {
  const currentToken = token(store.getState());

  if (socket && socketToken !== currentToken) {
    socket.disconnect();
    socket = null;
  }

  if (!currentToken) {
    console.error("No authentication token found for chat socket.");
    return null;
  }

  if (!socket) {
    socketToken = currentToken;
    socket = io(`${process.env.NEXT_PUBLIC_BACK_END_SERVER}/chat`, {
      transports: ["websocket"],
      auth: {
        token: currentToken, // Send the token for authentication
      },
    });
  }

  return socket;
};
