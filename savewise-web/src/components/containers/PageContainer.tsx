import { NavigateNext } from "@mui/icons-material";
import { Stack, Box, Typography, Link, Breadcrumbs } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface Breadcrumb {
  key: string;
  name: string;
  link?: string;
}

interface PageContainerProps extends React.PropsWithChildren {
  title: string;
  subtitle: string;
  breadcrumbs?: Breadcrumb[];
  actions?: React.ReactNode;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  title,
  subtitle,
  breadcrumbs,
  actions,
  children,
}) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        flexDirection: "column",
        p: 2,
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
      <Box height="16px" />
      <Breadcrumbs
        separator={<NavigateNext fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs &&
          breadcrumbs.map((breadcrumb, index) =>
            !breadcrumb.link ? (
              <Link key={index}>
                <Typography variant="subtitle2">{breadcrumb.name}</Typography>
              </Link>
            ) : (
              <Link
                key={index}
                onClick={() => navigate(breadcrumb.link ?? "/")}
              >
                <Typography variant="subtitle2">{breadcrumb.name}</Typography>
              </Link>
            )
          )}
      </Breadcrumbs>
      <Box height="16px" />
      {children}
      <Box height="32px" />
    </Box>
  );
};
