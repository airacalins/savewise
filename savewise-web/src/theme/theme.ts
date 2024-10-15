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
    MuiBreadcrumbs: {
      styleOverrides: {
        root: {
          "> ol": {
            "> li > a": {
              cursor: "pointer",
              textDecoration: "none",
            },
            "> li:last-child > a > h6": {
              padding: "8px",
              borderRadius: styles.borderRadius,
              backgroundColor: colors.borderColor,
              "&:hover": {
                backgroundColor: colors.borderColor,
              },
            },
          },
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          ">.MuiButtonBase-root": {
            marginRight: "-6px",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          border: styles.border,
          borderRadius: styles.borderRadius,
          boxShadow: styles.boxShadowOutset.primary,
          fontSize: "1rem",
          fontWeight: 400,
          textTransform: "none",

          ":hover": {
            boxShadow: styles.boxShadowInset.primary,
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
          "&.MuiButton-contained": {
            "&:hover": {
              boxShadow: `inset 2px 2px 4px ${colors.boxShadow.secondary[0]},inset -3px -3px 4px ${colors.boxShadow.secondary[1]}`,
            },
          },
          "&.Mui-selected": {
            boxShadow: styles.boxShadowInset.primary,
            borderRadius: styles.borderRadius,
            backgroundColor: colors.primary,
          },
          "&:hover": {
            borderRadius: styles.borderRadius,
          },
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          boxShadow: styles.boxShadowOutset.primary,
          "&.inset": {
            border: styles.border,
            borderRadius: styles.borderRadius,
            boxShadow: styles.boxShadowInset.primary,
            padding: "8px 16px",
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
          border: styles.border,
          borderRadius: styles.borderRadius,
          boxShadow: styles.boxShadowOutset.primary,
          ":hover": {
            boxShadow: styles.boxShadowInset.primary,
          },
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
          borderRadius: styles.borderRadius,
          fontWeight: 400,
          marginBottom: "4px",
          "& > .MuiSelected": {
            boxShadow: styles.boxShadowInset.primary,
          },
          ":hover": {
            boxShadow: styles.boxShadowInset.primary,
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
          borderRight: styles.boxShadowOutset.primary,
          borderWidth: "12px",
          "> .MuiPickersLayout-root > .MuiPickersLayout-contentWrapper > .MuiDateCalendar-root":
            {
              "> .MuiPickersCalendarHeader-root": {
                "> .MuiPickersCalendarHeader-labelContainer": {
                  padding: "8px",
                  paddingLeft: 0,
                },
                "> .MuiPickersArrowSwitcher-root": {
                  padding: "8px",
                  gap: "4px",
                },
              },
              "> .MuiPickersFadeTransitionGroup-root > div > .MuiDayCalendar-root > .MuiPickersSlideTransition-root > .MuiDayCalendar-monthContainer > .MuiDayCalendar-weekContainer > .Mui-selected":
                {
                  backgroundColor: colors.primary,
                  color: colors.secondary,
                },
            },
          //
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
    MuiTable: {
      styleOverrides: {
        root: {
          ">tbody>tr.MuiTableRow-root:hover": {
            boxShadow: styles.boxShadowOutset.primary,
            ":hover": {
              boxShadow: styles.boxShadowInset.primary,
              borderRadius: styles.borderRadius,
              cursor: "pointer",
            },
          },
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
          border: styles.border,
          boxShadow: styles.boxShadowOutset.primary,
          borderRadius: styles.borderRadius,
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
