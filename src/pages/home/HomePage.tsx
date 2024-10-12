import { Box } from "@mui/material";
import { PageContainer } from "../../components/containers/PageContainer";
import { FundSummary } from "../funds/components/FundSummary";

export const HomePage = () => {
  return (
    <PageContainer
      title="Home"
      subtitle="Overview of total funds and expenses, quick assessment of your financial health."
    >
      <FundSummary />
      <Box height={24} />
      <FundSummary />
    </PageContainer>
  );
};
