import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  typography: {
    fontFamily: "Kumbh Sans, sans-serif",
  },
  breakpoints: {
    values: {
      xs: 0,
      s: 350,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
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
      default: "#0f0f0f",
      paper: "#2c2c2c",
    },
    text: {
      primary: "#ffffff",
      secondary: "#bbbbbb",
    },
    landingPage: {
      primary: "#0f0f0f",
      secondary: "#45a0f5",
      tertiary: "#26e3c2",
      accent: "#fcfcfc",
      hover: "#D5D5D5",
    },
  },
});

const lightTheme = createTheme({
  typography: {
    fontFamily: "Kumbh Sans, sans-serif",
  },
  breakpoints: {
    values: {
      xs: 0,
      s: 350,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
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
      default: "#f5f5f5",
      paper: "#f5f5f5",
    },
    text: {
      primary: "#0f0f0f",
      secondary: "#4a4a4a",
    },
    landingPage: {
      primary: "#f5f5f5",
      secondary: "#45a0f5",
      tertiary: "#26e3c2",
      accent: "#0f0f0f",
      hover: "#1A1A1A",
    },
  },
});

export { darkTheme, lightTheme };
