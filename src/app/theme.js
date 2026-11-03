"use client";

import { createTheme } from "@mui/material/styles";

// MUI components follow the design tokens defined in Styles/globals.scss.
const theme = createTheme({
  direction: "rtl",
  shape: { borderRadius: 10 },
  palette: {
    primary: { main: "#0b1524" },
    secondary: { main: "#f3802c", contrastText: "#0b1524" },
    error: { main: "#b92a23" },
    success: { main: "#15704f" },
    text: { primary: "#141c28", secondary: "#4f5b6d" },
  },
  typography: {
    fontFamily: "inherit",
    button: { textTransform: "none", fontWeight: 700 },
  },
  components: {
    MuiCard: {
      defaultProps: { elevation: 0 },
    },
    MuiPaper: {
      styleOverrides: { root: { backgroundImage: "none" } },
    },
  },
});

export default theme;
