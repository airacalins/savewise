import { PageContainer } from "../../components/containers/PageContainer";
import { Button } from "@mui/material";
import { useVisibilityState } from "../../hooks/useVisibilityState";
import { useParams } from "react-router-dom";
import { mockFundsCollection } from "../../api/funds/mockFundsCollection";
import { useMemo } from "react";

export const FundsPage = () => {
  const { id } = useParams();
  const addFundModal = useVisibilityState();

  // Data
  const fundCollectionData = mockFundsCollection.find(
    (fundCollection) => fundCollection.id === id
  );

  const breadcrumbs = useMemo(() => {
    return [
      {
        key: "fundsCollection",
        name: "Funds Collection",
        link: "/fundsCollection",
      },
      {
        key: fundCollectionData?.name ?? "",
        name: fundCollectionData?.name ?? "",
      },
    ];
  }, [fundCollectionData]);

  return (
    <PageContainer
      title={fundCollectionData?.name ?? ""}
      subtitle="View, create and manage fund collection."
      breadcrumbs={breadcrumbs}
      actions={<Button onClick={addFundModal.show}>Add Fund</Button>}
    ></PageContainer>
  );
};
