import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  OutlinedInputProps as MuiOutlinedInputProps,
} from "@mui/material";
import React from "react";

interface TextInputProps extends MuiOutlinedInputProps {
  label: string;
  EndIconComponent?: React.ReactNode;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  EndIconComponent,
  ...props
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
      <OutlinedInput
        {...props}
        endAdornment={
          <InputAdornment position="end">{EndIconComponent}</InputAdornment>
        }
        label="Password"
      />
    </FormControl>
  );
};
