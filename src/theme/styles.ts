import { colors } from "./colors";

export const styles = {
  boxShadowInset: `inset 2px 2px 5px ${colors.boxShadow[0]},inset -3px -3px 7px ${colors.boxShadow[1]}`,
  boxShadowOutset: `3px 3px 6px ${colors.boxShadow[0]}, -3px -3px 6px ${colors.boxShadow[1]}`,
  boxInset: {
    borderColor: colors.borderColor,
    borderRadius: ".55rem",
    boxShadow: `inset 2px 2px 5px ${colors.boxShadow[0]},inset -3px -3px 7px ${colors.boxShadow[1]}`,
  },
  boxOutset: {
    borderColor: colors.borderColor,
    borderRadius: ".55rem",
    boxShadow: `3px 3px 6px ${colors.boxShadow[0]}, -3px -3px 6px ${colors.boxShadow[1]}`,
  },
};
