import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

interface LoadingProps {
  title?: string;
}

const Loading: React.FC<LoadingProps> = ({ title = "Loading..." }) => {
  return (
    <Box
      alignItems="center"
      display="flex"
      flex={1}
      justifyContent="center"
      height="calc(100vh - 116px)"
      flexDirection="column"
    >
      <CircularProgress />
      <Box height={16} />
      <Typography variant="subtitle1">{title}</Typography>
    </Box>
  );
};

export default Loading;
