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
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            boxShadow: styles.boxShadowInset,
          },
        },
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
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgorundColor: "red",
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
          "& >.MuiSelected": {
            boxShadow: styles.boxShadowInset,
          },
          ":hover": {
            boxShadow: styles.boxShadowInset,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation: 0,
        root: {
          backgroundColor: colors.primary,
          borderColor: `${colors.borderColor} !important`,
          borderRight: styles.boxShadowOutset,
          borderWidth: "12px",
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
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: colors.dark,
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderColor: colors.borderColor,
          boxShadow: styles.boxShadowOutset,
          borderRadius: ".55rem",
          padding: "16px",
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
  },
});
