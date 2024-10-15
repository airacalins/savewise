import { Button, ButtonProps, CircularProgress } from "@mui/material";
import React from "react";

interface ContainedButtonProps extends ButtonProps {
  isLoading?: boolean;
}

export const ContainedButton: React.FC<ContainedButtonProps> = ({
  isLoading = false,
  ...props
}) => {
  return (
    <Button
      variant="contained"
      endIcon={isLoading && <CircularProgress size={16} color="inherit" />}
      {...props}
    >
      Submit
    </Button>
  );
};
