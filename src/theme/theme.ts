import { createTheme } from "@mui/material";
import { colors } from "./colors";
import { styles } from "./styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.dark,
    },
    secondary: {
      main: colors.secondary,
    },
    info: {
      main: colors.info,
    },
    warning: {
      main: colors.warning,
    },
    success: {
      main: colors.success,
    },
    error: {
      main: colors.error,
    },
  },
  typography: {
    fontFamily: [
      "Poppins",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderColor: colors.borderColor,
          borderRadius: ".55rem",
          boxShadow: styles.boxShadowOutset,
          fontSize: "1rem",
          fontWeight: 400,
          textTransform: "none",
          ":hover": {
            boxShadow: styles.boxShadowInset,
          },
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: colors.borderColor,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderColor: colors.borderColor,
          borderRadius: ".55rem",
          boxShadow: styles.boxShadowOutset,
          ":hover": {
            boxShadow: styles.boxShadowInset,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: colors.primary,
          borderColor: `${colors.borderColor} !important`,
          borderRight: styles.boxShadowOutset,
          borderWidth: "12px",
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: "16px",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          textTransform: "none",
          borderColor: colors.borderColor,
          borderRadius: ".55rem",
          fontWeight: 400,
          ":hover": {
            boxShadow: styles.boxShadowInset,
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: colors.dark,
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: colors.dark,
        },
      },
    },
  },
});
