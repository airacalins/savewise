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
  helperText?: string; // Optional prop for helper text
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  helperText,
  ...props
}) => {
  return (
    <FormControl fullWidth variant="outlined" error={props.error}>
      <InputLabel htmlFor={props.name}>{label}</InputLabel>
      <OutlinedInput id={props.name} label={label} {...props} />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
