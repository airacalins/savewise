import { Tabs, Tab } from "@mui/material";
import { PageContainer } from "../../components/containers/PageContainer";
import { useVisibility } from "../../hooks/useVisibility";
import { AddExpenseCollectionModal } from "./components/AddExpenseCollectionModal";
import {
  useCreateCollection,
  useGetExpensesCollection,
} from "../../api/collection/hooks";
import { ExpensesCollectionTableTab } from "./components/ExpensesCollectionTableTabs";
import { ExpensesSummaryTab } from "./components/ExpensesSummaryTab";
import { useState } from "react";
import { TCreateCollectionSchema } from "../../api/collection/schema";
import { CollectionType } from "../../api/collection/type";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import { OutlinedButton } from "../../components/buttons/OutlinedButton";

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
  const addExpenseCollectionModal = useVisibility();
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  // API
  const {
    data: expensesCollectionData,
    isLoading: isLoadingExpensesCollection,
    refetch: refetchExpensesCollection,
  } = useGetExpensesCollection();
  const createCollection = useCreateCollection();

  // Functions
  const handleCreateCollection = async (formData: TCreateCollectionSchema) => {
    try {
      const result = await createCollection.mutateAsync({
        name: formData.name,
        collectionType: CollectionType.Expense,
      });

      showSuccessToast(`${result.name} created.`);
      refetchExpensesCollection();
      addExpenseCollectionModal.hide();
    } catch {
      showErrorToast("Failed to create expense.");
    }
  };

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
        <OutlinedButton
          isLoading={createCollection.isLoading}
          onClick={addExpenseCollectionModal.show}
        >
          Add Expense Collection
        </OutlinedButton>
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
        isSubmitting={createCollection.isLoading}
        onCreateCollection={handleCreateCollection}
        onCloseModal={addExpenseCollectionModal.hide}
        onCancelCreate={addExpenseCollectionModal.hide}
      />
    </PageContainer>
  );
};
