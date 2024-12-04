import { PageContainer } from "../../components/containers/PageContainer";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useVisibilityState } from "../../hooks/useVisibilityState";
import { useNavigate, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import dayjs from "dayjs";
import { Text } from "../../components/texts/Text";
import { FundTransaction } from "../../api/transactions/type";
import { AddFundTransactionModal } from "./components/AddFundTransactionModal";
import { Edit } from "@mui/icons-material";
import { EditFundCollectionModal } from "./components/EditFundCollectionModal";
import { DeleteWarningActionModal } from "../../components/modals/DeleteWarningActionModal";
import { EditFundTransactionModal } from "./components/EditFundTransactionModal";
import {
  useDeleteCollection,
  useGetCollectionById,
} from "../../api/collection/hooks";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import {
  useDeleteTransaction,
  useGetFundTransactions,
} from "../../api/transactions/hooks";

const tableHeaders = [
  { key: "date", label: "Date" },
  { key: "description", label: "Description" },
  { key: "amount", label: "Amount" },
];

export const FundTransactionsPage = () => {
  const navigate = useNavigate();
  const { collectionId } = useParams();
  const editFundCollectionModal = useVisibilityState();
  const deleteFundCollectionWarningModal = useVisibilityState();
  const addFundTransactionModal = useVisibilityState();
  const editFundTransactionModal = useVisibilityState();
  const deleteFundTransactionWarningModal = useVisibilityState();
  const [selectedTransaction, setSelectedTransaction] =
    useState<null | FundTransaction>();

  // API
  const { data: fundCollectionData, isLoading: isLoadingFundCollectionData } =
    useGetCollectionById(collectionId ?? "");
  const {
    data: fundTransactionsData,
    isLoading: isLoadingFundTransactions,
    refetch: refetchFundTransactions,
  } = useGetFundTransactions(collectionId ?? "");
  const deleteCollection = useDeleteCollection(collectionId ?? "");
  const deleteTransaction = useDeleteTransaction(selectedTransaction?.id ?? "");

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

  // Functions
  // const getExpenseName = (id: string) => {
  //   const expense = expenseCollectionData.find((expense) => expense.id === id);
  //   return expense ? expense.name : "Unknown Expense";
  // };

  const handleDeleteFundCollection = async () => {
    navigate(`/fundsCollections`);
    deleteFundCollectionWarningModal.hide();

    try {
      await deleteCollection.mutateAsync({});

      showSuccessToast("Fund collection deleted.");
    } catch {
      showErrorToast("Failed to delete fund collection.");
    }
  };

  const handleDeleteTransaction = async () => {
    deleteFundTransactionWarningModal.hide();

    try {
      await deleteTransaction.mutateAsync({});
      setSelectedTransaction(null);
      showSuccessToast("Transaction deleted.");
      await refetchFundTransactions();
    } catch (error) {
      console.error("Error during deletion or refetch:", error);
      showErrorToast("Failed to delete transaction.");
    }
  };

  return (
    <PageContainer
      title={fundCollectionData?.name ?? "..."}
      titleAction={
        <IconButton size="small" onClick={editFundCollectionModal.show}>
          <Edit />
        </IconButton>
      }
      subtitle="View, create and manage fund collection."
      breadcrumbs={breadcrumbs}
      actions={<Button onClick={addFundTransactionModal.show}>Add Fund</Button>}
      isLoading={
        fundCollectionData === undefined ||
        isLoadingFundCollectionData ||
        isLoadingFundTransactions
      }
      loadingMessage="Loading fund transactions..."
      isEmptyPage={fundTransactionsData?.length === 0}
      emptyPageMessage="No transactions yet."
      modals={
        <>
          <EditFundCollectionModal
            isVisible={editFundCollectionModal.isVisible}
            fundCollectionId={fundCollectionData?.id ?? ""}
            onClose={editFundCollectionModal.hide}
            onDelete={() => {
              editFundCollectionModal.hide();
              deleteFundCollectionWarningModal.show();
            }}
          />
          <AddFundTransactionModal
            isVisible={addFundTransactionModal.isVisible}
            fundCollection={fundCollectionData}
            onRefetch={refetchFundTransactions}
            onClose={addFundTransactionModal.hide}
            onCancel={addFundTransactionModal.hide}
          />
          <EditFundTransactionModal
            isVisible={editFundTransactionModal.isVisible}
            fundTransactionId={selectedTransaction?.id ?? ""}
            onRefetch={refetchFundTransactions}
            onClose={editFundTransactionModal.hide}
            onDelete={() => {
              editFundTransactionModal.hide();
              deleteFundTransactionWarningModal.show();
            }}
          />
          <DeleteWarningActionModal
            isVisible={deleteFundCollectionWarningModal.isVisible}
            isDeleting={deleteCollection.isLoading}
            itemName={fundCollectionData?.name}
            onClose={() => {
              deleteFundCollectionWarningModal.hide();
              editFundCollectionModal.show();
            }}
            onCancel={() => {
              deleteFundCollectionWarningModal.hide();
              editFundCollectionModal.show();
            }}
            onConfirm={handleDeleteFundCollection}
          />
          <DeleteWarningActionModal
            isVisible={deleteFundTransactionWarningModal.isVisible}
            isDeleting={deleteTransaction.isLoading}
            itemName={selectedTransaction?.description ?? ""}
            onClose={() => {
              deleteFundTransactionWarningModal.hide();
              editFundTransactionModal.show();
            }}
            onCancel={() => {
              deleteFundTransactionWarningModal.hide();
              editFundTransactionModal.show();
            }}
            onConfirm={handleDeleteTransaction}
          />
        </>
      }
    >
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableHeaders.map((tableHeader) => (
                <TableCell key={tableHeader.key}>{tableHeader.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {fundTransactionsData?.map((fundTransaction, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => {
                  editFundTransactionModal.show();
                  setSelectedTransaction(fundTransaction);
                }}
              >
                <TableCell>
                  {dayjs(fundTransaction.date).format("MMM DD, YYYY")}
                </TableCell>
                <TableCell>
                  <Stack direction="row" alignItems="center">
                    <Text>{fundTransaction.description}</Text>
                    <Box width="8px" />

                    {/* <Chip
                      label={getExpenseName(fundTransaction.id)}
                      variant="outlined"
                      color="error"
                      size="small"
                    /> */}
                  </Stack>
                </TableCell>
                <TableCell>
                  <Text
                    variant="body2"
                    // color={
                    //   fundTransaction.transactionType ===
                    //   TransactionType.Credit
                    //     ? "error"
                    //     : "info"
                    // }
                  >
                    {fundTransaction.amount.toFixed(2)}
                  </Text>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PageContainer>
  );
};
