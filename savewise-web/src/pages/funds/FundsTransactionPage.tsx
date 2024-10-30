import { PageContainer } from "../../components/containers/PageContainer";
import {
  Box,
  Button,
  Chip,
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
import { useParams } from "react-router-dom";
// import { mockFundsCollection } from "../../api/collection/mockFundsCollection";
import { useMemo, useState } from "react";
import dayjs from "dayjs";
import { EmptyStateCard } from "../../components/cards/EmptyStateCard";
import { mockTransactions } from "../../api/transactions/mockTransactions";
import { Text } from "../../components/texts/Text";
import { AddFundRequest, Transaction } from "../../api/transactions/type";
import { mockExpensesCollectionData } from "../../api/collection/mockExpensesCollection";
import {
  TCreateFundTransactionSchema,
  TUpdateFundTransactionSchema,
} from "../../api/transactions/schema";
import { newDateFormat } from "../../utils/date";
import { AddFundTransactionModal } from "./components/AddFundTransactionModal";
import { Edit } from "@mui/icons-material";
import { EditFundCollectionModal } from "./components/EditFundCollectionModal";
import { DeleteWarningActionModal } from "../../components/modals/DeleteWarningActionModal";
import { EditFundTransactionModal } from "./components/EditFundTransactionModal";
import { TUpdateCollectionSchema } from "../../api/collection/schema";
import { useGetCollectionById } from "../../api/collection/hooks";

const tableHeaders = [
  { key: "date", label: "Date" },
  { key: "description", label: "Description" },
  { key: "amount", label: "Amount" },
];

export const FundsPage = () => {
  const { collectionId } = useParams();
  const editFundCollectionModal = useVisibilityState();
  const deleteFundCollectionWarningModal = useVisibilityState();
  const addFundTransactionModal = useVisibilityState();
  const editFundTransactionModal = useVisibilityState();
  const deleteFundTransactionWarningModal = useVisibilityState();
  const [selectedFundTransaction, setSelectedFundTransaction] =
    useState<null | Transaction>();

  // Data
  const { data: fundCollectionData, isLoading: isLoadingFundCollectionData } =
    useGetCollectionById(collectionId ?? "");
  const expenseCollectionData = mockExpensesCollectionData;
  const fundCollectionTransactionsData = mockTransactions.filter(
    (transaction) => transaction.fundCollectionId === collectionId
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

  // Functions
  const getExpenseName = (id: string) => {
    const expense = expenseCollectionData.find((expense) => expense.id === id);
    return expense ? expense.name : "Unknown Expense";
  };

  const handleUpdateFundCollection = (data: TUpdateCollectionSchema) => {
    console.log(data);
  };

  const handleDeleteFundCollection = () => {
    deleteFundCollectionWarningModal.hide();
  };

  const handleCreateFundTransaction = (data: TCreateFundTransactionSchema) => {
    const input: AddFundRequest = {
      fundCollectionId: collectionId ?? "",
      ...data,
      date: newDateFormat(data.date),
    };

    console.log("AddFundTransactionRequest: ", input);

    addFundTransactionModal.hide();
  };

  const handleUpdateFundTransaction = (data: TUpdateFundTransactionSchema) => {
    console.log(data);
  };

  return (
    <PageContainer
      title={fundCollectionData?.name ?? ""}
      titleAction={
        <IconButton size="small" onClick={() => editFundCollectionModal.show()}>
          <Edit />
        </IconButton>
      }
      subtitle="View, create and manage fund collection."
      breadcrumbs={breadcrumbs}
      actions={<Button onClick={addFundTransactionModal.show}>Add Fund</Button>}
      isLoading={isLoadingFundCollectionData}
      loadingMessage="Loading fund collection..."
      isEmptyPage={fundCollectionTransactionsData.length === 0}
      emptyPageMessage="No transactions yet."
    >
      {fundCollectionTransactionsData.length === 0 ? (
        <EmptyStateCard message="No transaction for this collection yet." />
      ) : (
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {tableHeaders.map((tableHeader) => (
                  <TableCell key={tableHeader.key}>
                    {tableHeader.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {fundCollectionTransactionsData.map((fundTransaction, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() => {
                    editFundTransactionModal.show();
                    setSelectedFundTransaction(fundTransaction);
                  }}
                >
                  <TableCell>
                    {dayjs(fundTransaction.date).format("MMM DD, YYYY")}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center">
                      <Text>{fundTransaction.description}</Text>
                      <Box width="8px" />

                      <Chip
                        label={getExpenseName(fundTransaction.id)}
                        variant="outlined"
                        color="error"
                        size="small"
                      />
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
      )}
      <EditFundCollectionModal
        isVisible={editFundCollectionModal.isVisible}
        fundCollectionId={fundCollectionData?.id ?? ""}
        onClose={editFundCollectionModal.hide}
        onDelete={() => {
          editFundCollectionModal.hide();
          deleteFundCollectionWarningModal.show();
        }}
        onUpdate={handleUpdateFundCollection}
      />
      <DeleteWarningActionModal
        isVisible={deleteFundCollectionWarningModal.isVisible}
        itemName={fundCollectionData?.name ?? ""}
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
      <AddFundTransactionModal
        isVisible={addFundTransactionModal.isVisible}
        fundCollectionName={fundCollectionData?.name ?? ""}
        onClose={addFundTransactionModal.hide}
        onCancel={addFundTransactionModal.hide}
        onSubmit={handleCreateFundTransaction}
      />
      <EditFundTransactionModal
        isVisible={editFundTransactionModal.isVisible}
        fundTransactionId={selectedFundTransaction?.id ?? ""}
        onClose={editFundTransactionModal.hide}
        onDelete={() => {
          editFundTransactionModal.hide();
          deleteFundTransactionWarningModal.show();
        }}
        onUpdate={handleUpdateFundTransaction}
      />
      <DeleteWarningActionModal
        isVisible={deleteFundTransactionWarningModal.isVisible}
        itemName={selectedFundTransaction?.description ?? ""}
        onClose={() => {
          deleteFundTransactionWarningModal.hide();
          editFundTransactionModal.show();
        }}
        onCancel={() => {
          deleteFundTransactionWarningModal.hide();
          editFundTransactionModal.show();
        }}
        onConfirm={handleDeleteFundCollection}
      />
    </PageContainer>
  );
};
