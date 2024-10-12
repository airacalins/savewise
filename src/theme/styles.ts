import { colors } from "./colors";

export const styles = {
  boxShadowInset: {
    primary: `inset 2px 2px 5px ${colors.boxShadow.primary[0]},inset -3px -3px 7px ${colors.boxShadow.primary[1]}`,
    secondary: `inset 2px 2px 5px ${colors.boxShadow.secondary[0]},inset -3px -3px 7px ${colors.boxShadow.secondary[1]}`,
  },
  boxShadowOutset: {
    primary: `3px 3px 6px ${colors.boxShadow.primary[0]}, -3px -3px 6px ${colors.boxShadow.primary[1]}`,
    secondary: `3px 3px 8px ${colors.boxShadow.secondary[0]}, -3px -3px 8px ${colors.boxShadow.secondary[1]}`,
  },
  boxInset: {
    borderColor: colors.borderColor,
    borderRadius: ".55rem",
    boxShadow: `inset 2px 2px 5px ${colors.boxShadow.primary[0]},inset -3px -3px 7px ${colors.boxShadow.primary[1]}`,
  },
  boxOutset: {
    borderColor: colors.borderColor,
    borderRadius: ".55rem",
    boxShadow: `3px 3px 6px ${colors.boxShadow.primary[0]}, -3px -3px 6px ${colors.boxShadow.primary[1]}`,
  },
};
