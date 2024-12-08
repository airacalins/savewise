import { Button, Tabs, Tab } from "@mui/material";
import { PageContainer } from "../../components/containers/PageContainer";
import { useVisibilityState } from "../../hooks/useVisibilityState";
import { AddExpenseCollectionModal } from "./components/AddExpenseCollectionModal";
import { useGetExpensesCollection } from "../../api/collection/hooks";
import { ExpensesCollectionTableTab } from "./components/ExpensesCollectionTableTabs";
import { ExpensesSummaryTab } from "./components/ExpensesSummaryTab";
import { useState } from "react";

const tabs = [
  {
    value: "overview",
    label: "Overview",
  },
  {
    value: "summary",
    label: "Summary",
  },
];

export const ExpensesCollectionPage = () => {
  const addExpenseCollectionModal = useVisibilityState();
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  // API
  const {
    data: expensesCollectionData,
    isLoading: isLoadingExpensesCollection,
  } = useGetExpensesCollection();

  const renderTabContents = () => {
    switch (selectedTabIndex) {
      case 0:
      default:
        return (
          <ExpensesCollectionTableTab
            expensesCollection={expensesCollectionData}
          />
        );
      case 1:
        return <ExpensesSummaryTab />;
    }
  };

  return (
    <PageContainer
      title="Expenses"
      subtitle="View, create and manage expenses."
      actions={
        <Button onClick={addExpenseCollectionModal.show}>
          Add Expense Collection
        </Button>
      }
      isLoading={isLoadingExpensesCollection}
      loadingMessage="Loading expenses..."
      isEmptyPage={expensesCollectionData?.length === 0}
      emptyPageMessage="No expenses yet."
    >
      <Tabs
        value={selectedTabIndex}
        defaultValue={selectedTabIndex}
        onChange={(_, newValue) => setSelectedTabIndex(newValue)}
        aria-label="basic tabs example"
      >
        {tabs.map((tab) => (
          <Tab label={tab.label} />
        ))}
      </Tabs>
      {renderTabContents()}
      <AddExpenseCollectionModal
        isVisible={addExpenseCollectionModal.isVisible}
        onClose={addExpenseCollectionModal.hide}
        onCancel={addExpenseCollectionModal.hide}
      />
    </PageContainer>
  );
};
