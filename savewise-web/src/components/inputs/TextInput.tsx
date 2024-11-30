import {
  FormControl,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps as MuiOutlinedInputProps,
  FormHelperText,
} from "@mui/material";
import React from "react";

interface TextInputProps extends MuiOutlinedInputProps {
  label: string;
  errorMessage?: string; // Optional prop for helper text
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  errorMessage,
  ...props
}) => {
  return (
    <FormControl fullWidth variant="outlined" error={props.error}>
      <InputLabel htmlFor={props.name}>{label}</InputLabel>
      <OutlinedInput id={props.name} label={label} {...props} />
      {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  );
};
