import { Button, ButtonProps, CircularProgress } from "@mui/material";
import React from "react";

interface OutlinedButtonProps extends ButtonProps {
  isLoading?: boolean;
}

export const OutlinedButton: React.FC<OutlinedButtonProps> = ({
  isLoading = false,
  ...props
}) => {
  return (
    <Button
      endIcon={isLoading && <CircularProgress size={16} color="inherit" />}
      {...props}
    >
      {props.children}
    </Button>
  );
};
