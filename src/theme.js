import { createTheme } from "@mui/material"

export const MUITheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0a0a0a',
    },
  },
  breakpoints: {
    values: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    }
  },
  typography: {
    fontFamily: "Manrope, sans-serif",
    button: {
      textTransform: 'unset',
    }
  },
})
