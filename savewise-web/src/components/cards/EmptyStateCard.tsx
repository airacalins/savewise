import { Box, Card, Typography } from "@mui/material";
import React from "react";

interface EmptyStateCardProps {
  message: string;
}

export const EmptyStateCard: React.FC<EmptyStateCardProps> = ({ message }) => {
  return (
    <Card className="inset">
      <Box p="16px">
        <Typography>{message}</Typography>
      </Box>
    </Card>
  );
};
