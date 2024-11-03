import { NavigateNext } from "@mui/icons-material";
import { Stack, Box, Typography, Link, Breadcrumbs } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../spinners/Loading";
import { EmptyStateCard } from "../cards/EmptyStateCard";

interface Breadcrumb {
  key: string;
  name: string;
  link?: string;
}

interface PageContainerProps extends React.PropsWithChildren {
  title: string;
  titleAction?: React.ReactNode;
  subtitle: string;
  breadcrumbs?: Breadcrumb[];
  actions?: React.ReactNode;
  isLoading?: boolean;
  loadingMessage?: string;
  isEmptyPage?: boolean;
  emptyPageMessage?: string;
  modals?: React.ReactNode;
  snackbars?: React.ReactNode;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  title,
  titleAction,
  subtitle,
  breadcrumbs,
  actions,
  isLoading,
  loadingMessage,
  isEmptyPage,
  emptyPageMessage,
  children,
  modals,
  snackbars,
}) => {
  const navigate = useNavigate();

  const renderContents = () => {
    if (isLoading) {
      return <Loading title={loadingMessage} />;
    }

    if (isEmptyPage) {
      return <EmptyStateCard message={emptyPageMessage} />;
    }

    return children;
  };

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
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="h5" fontWeight={500}>
              {title}
            </Typography>
            {titleAction}
          </Stack>
          <Typography variant="subtitle1">{subtitle}</Typography>
        </Box>
        <Box>{actions}</Box>
      </Stack>
      <Box height="16px" />
      {breadcrumbs && (
        <Breadcrumbs
          separator={<NavigateNext fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs.map((breadcrumb, index) =>
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
      )}
      <Box height="16px" />
      {renderContents()}
      {modals}
      {snackbars}
      <Box height="32px" />
    </Box>
  );
};
