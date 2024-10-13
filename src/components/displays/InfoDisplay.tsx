import { Stack, Box, IconButton } from "@mui/material";
import React from "react";
import { Text } from "../texts/Text";

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
        <Text variant="caption">{label}</Text>
        <Box height="8px" />
        <Text variant="body1">{details}</Text>
      </Box>
      {EndIconComponent && (
        <Box>
          <IconButton>{EndIconComponent}</IconButton>
        </Box>
      )}
    </Stack>
  );
};
