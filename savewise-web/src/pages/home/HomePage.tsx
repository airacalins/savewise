import { Card, Stack } from "@mui/material";
import { PageContainer } from "../../components/containers/PageContainer";
import { FundsSummary } from "../funds/components/FundsSummaryTab";
import { ExpensesSummary } from "../expenses/components/ExpensesSummary";
import { Text } from "../../components/texts/Text";
import { useGetCollections } from "../../api/collection/hooks";

export const HomePage = () => {
  const { data, error } = useGetCollections();

  console.log(JSON.stringify(data, null, 2));
  if (error) return <div>Error: {error.message}</div>;

  return (
    <PageContainer
      title="Home"
      subtitle="Overview of total funds and expenses, quick assessment of your financial health."
    >
      <Stack spacing={4}>
        <Card className="inset" style={{ padding: "32px" }}>
          <Text variant="body1" fontWeight={500}>
            Account Balance: Php 10,000
          </Text>
        </Card>

        <Stack direction="row" spacing={4}>
          <FundsSummary />
          <ExpensesSummary />
        </Stack>
      </Stack>
    </PageContainer>
  );
};
