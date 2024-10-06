import { Stack, Box, Typography } from "@mui/material";
import React from "react";

interface PageContainerProps extends React.PropsWithChildren {
  title: string;
  subtitle: string;
  actions?: React.ReactNode;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  title,
  subtitle,
  actions,
  children,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 2,
        overflowY: "scroll",
        width: "100%",
      }}
    >
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Box>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="subtitle1">{subtitle}</Typography>
        </Box>
        <Box>{actions}</Box>
      </Stack>
      <Box height="32px" />
      {children}
    </Box>
  );
};
