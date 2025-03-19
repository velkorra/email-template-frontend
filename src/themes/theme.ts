import { createTheme, PaletteMode } from "@mui/material";

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    background: {
      default: mode === "light" ? "#f5f5f5" : "#303030",
      paper: mode === "light" ? "#ffffff" : "#424242",
    },
    text: {
      primary: mode === "light" ? "#212121" : "#ffffff",
    },
    primary: {
      main: "#1976d2",
    },
  },
});

export const lightTheme = createTheme(getDesignTokens("light"));
export const darkTheme = createTheme(getDesignTokens("dark"));
