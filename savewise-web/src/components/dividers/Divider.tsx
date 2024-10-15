import { Divider as MuiDivider, Box } from "@mui/material";
import React from "react";

interface DividerProps {
  padding?: number;
}

export const Divider: React.FC<DividerProps> = ({ padding = 16 }) => {
  return (
    <Box padding={`${padding}px`}>
      <MuiDivider />
    </Box>
  );
};
