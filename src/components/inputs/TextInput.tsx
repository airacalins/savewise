import {
  FormControl,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps as MuiOutlinedInputProps,
} from "@mui/material";
import React from "react";

interface TextInputProps extends MuiOutlinedInputProps {
  label: string;
}

export const TextInput: React.FC<TextInputProps> = ({ label, ...props }) => {
  return (
    <FormControl fullWidth>
      <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
      <OutlinedInput label="Password" {...props} />
    </FormControl>
  );
};
