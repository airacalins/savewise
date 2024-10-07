import { Box, Card, Typography } from "@mui/material";
import { PageContainer } from "../../components/containers/PageContainer";

export const SummariesPage = () => {
  return (
    <PageContainer title="Summary" subtitle="View your summary.">
      <Card style={{ padding: "16px" }}>
        <Typography variant="caption">Total Funds</Typography>
        <Box height="16px" />
        <Typography variant="body1">Php 10,000</Typography>
      </Card>
    </PageContainer>
  );
};
