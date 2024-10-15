import { Typography, TypographyProps, useTheme } from "@mui/material";
import { colors } from "../../theme/colors";

interface TextProps extends TypographyProps {
  color?:
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "warning"
    | "success"
    | "dark";
}

export const Text: React.FC<TextProps> = ({
  color = "dark",
  children,
  ...props
}) => {
  const theme = useTheme();

  const textColor = (() => {
    switch (color) {
      case "primary":
        return theme.palette.primary.main;
      case "secondary":
        return theme.palette.secondary.main;
      case "error":
        return theme.palette.error.main;
      case "info":
        return theme.palette.info.main;
      case "warning":
        return theme.palette.warning.main;
      case "success":
        return theme.palette.success.main;
      case "dark":
      default:
        return colors.dark;
    }
  })();

  return (
    <Typography color={textColor} {...props}>
      {children}
    </Typography>
  );
};
