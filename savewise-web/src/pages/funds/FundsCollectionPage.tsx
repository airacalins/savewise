import { Tab, Tabs } from "@mui/material";
import { PageContainer } from "../../components/containers/PageContainer";
import { useVisibility } from "../../hooks/useVisibility";
import { AddFundCollectionModal } from "./components/AddFundCollectionModal";
import {
  useCreateCollection,
  useGetFundsCollection,
} from "../../api/collection/hooks";
import { useState } from "react";
import { FundsSummaryTab } from "./components/FundsSummaryTab";
import { FundsCollectionTableTabs } from "./components/FundsCollectionTableTabs";
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

export const FundsCollectionPage = () => {
  const addFundCollectionModal = useVisibility();
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  // API
  const {
    data: fundsCollectionData,
    isLoading: isLoadingFundsCollectionData,
    refetch: refetchFundsCollection,
  } = useGetFundsCollection();
  const createCollection = useCreateCollection();

  const handleCreateCollection = async (
    formValues: TCreateCollectionSchema
  ) => {
    try {
      const result = await createCollection.mutateAsync({
        name: formValues.name,
        collectionType: CollectionType.Fund,
      });

      showSuccessToast(`${result.name} created.`);
      refetchFundsCollection();
      addFundCollectionModal.hide();
    } catch {
      showErrorToast("Failed to create fund.");
    }
  };

  const renderTabContents = () => {
    switch (selectedTabIndex) {
      case 0:
      default:
        return (
          <FundsCollectionTableTabs fundsCollection={fundsCollectionData} />
        );
      case 1:
        return <FundsSummaryTab />;
    }
  };

  return (
    <PageContainer
      title="Funds"
      subtitle="View, create and manage funds."
      actions={
        <OutlinedButton
          isLoading={createCollection.isLoading}
          onClick={addFundCollectionModal.show}
        >
          Add Fund Collection
        </OutlinedButton>
      }
      isLoading={isLoadingFundsCollectionData}
      loadingMessage="Loading funds..."
      isEmptyPage={fundsCollectionData?.length === 0}
      emptyPageMessage="No funds yet."
      modals={
        <AddFundCollectionModal
          isVisible={addFundCollectionModal.isVisible}
          onCreateCollection={handleCreateCollection}
          onCloseModal={addFundCollectionModal.hide}
          onCancelCreate={addFundCollectionModal.hide}
        />
      }
    >
      <Tabs
        value={selectedTabIndex}
        defaultValue={selectedTabIndex}
        onChange={(_, newValue) => setSelectedTabIndex(newValue)}
        aria-label="basic tabs example"
      >
        {tabs.map((tab) => (
          <Tab key={tab.value} label={tab.label} />
        ))}
      </Tabs>
      {renderTabContents()}
    </PageContainer>
  );
};
