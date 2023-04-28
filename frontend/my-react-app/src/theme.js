import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9", // Light blue
    },
    secondary: {
      main: "#f48fb1", // Light pink
    },
    error: {
      main: "#f44336", // Red
    },
    warning: {
      main: "#ff9800", // Orange
    },
    info: {
      main: "#2196f3", // Blue
    },
    success: {
      main: "#4caf50", // Green
    },
    background: {
      default: "#1e1e1e",
      paper: "#2c2c2c",
    },
    text: {
      primary: "#ffffff",
      secondary: "#bbbbbb",
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2", // Blue
    },
    secondary: {
      main: "#e91e63", // Pink
    },
    error: {
      main: "#f44336", // Red
    },
    warning: {
      main: "#ff9800", // Orange
    },
    info: {
      main: "#2196f3", // Blue
    },
    success: {
      main: "#4caf50", // Green
    },
    background: {
      default: "#ffffff",
      paper: "#f5f5f5",
    },
    text: {
      primary: "#000000",
      secondary: "#4a4a4a",
    },
  },
});

export { darkTheme, lightTheme };
