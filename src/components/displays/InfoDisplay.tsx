import { Stack, Box, Typography, IconButton } from "@mui/material";
import React from "react";

interface InfoDisplayProps {
  label: string;
  details: string;
  EndIconComponent?: React.ReactNode;
}

export const InfoDisplay: React.FC<InfoDisplayProps> = ({
  label,
  details,
  EndIconComponent,
}) => {
  return (
    <Stack
      alignItems="center"
      flexDirection="row"
      justifyContent="space-between"
    >
      <Box>
        <Typography variant="caption">{label}</Typography>
        <Box height="8px" />
        <Typography variant="body1">{details}</Typography>
      </Box>
      {EndIconComponent && (
        <Box>
          <IconButton>{EndIconComponent}</IconButton>
        </Box>
      )}
    </Stack>
  );
};
