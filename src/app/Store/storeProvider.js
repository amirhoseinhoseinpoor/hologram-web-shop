"use client";

import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import store from "./store";
import theme from "../theme";

const StoreProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  );
};

export default StoreProvider;
