import { Button, Tab, Tabs } from "@mui/material";
import { PageContainer } from "../../components/containers/PageContainer";
import { useVisibilityState } from "../../hooks/useVisibilityState";
import { AddFundCollectionModal } from "./components/AddFundCollectionModal";
import { useGetFundsCollection } from "../../api/collection/hooks";
import { useState } from "react";
import { FundsSummaryTab } from "./components/FundsSummaryTab";
import { FundsCollectionTableTabs } from "./components/FundsCollectionTableTabs";

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
  const addFundCollectionModal = useVisibilityState();
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  // API
  const { data: fundsCollectionData, isLoading: isLoadingFundsCollectionData } =
    useGetFundsCollection();

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
      title="Funds Collection"
      subtitle="View, create and manage funds collection."
      actions={
        <Button onClick={addFundCollectionModal.show}>
          Add Fund Collection
        </Button>
      }
      isLoading={isLoadingFundsCollectionData}
      loadingMessage="Loading funds collection..."
      isEmptyPage={fundsCollectionData?.length === 0}
      emptyPageMessage="No funds collection yet."
      modals={
        <AddFundCollectionModal
          isVisible={addFundCollectionModal.isVisible}
          onClose={addFundCollectionModal.hide}
          onCancel={addFundCollectionModal.hide}
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
