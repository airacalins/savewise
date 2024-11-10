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
import { useNavigate, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import dayjs from "dayjs";
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
import {
  useDeleteCollectionById,
  useGetCollectionById,
} from "../../api/collection/hooks";
import { showErrorToast, showSuccessToast } from "../../utils/toast";

const tableHeaders = [
  { key: "date", label: "Date" },
  { key: "description", label: "Description" },
  { key: "amount", label: "Amount" },
];

export const FundsPage = () => {
  const navigate = useNavigate();
  const { collectionId } = useParams();
  const editFundCollectionModal = useVisibilityState();
  const deleteFundCollectionWarningModal = useVisibilityState();
  const addFundTransactionModal = useVisibilityState();
  const editFundTransactionModal = useVisibilityState();
  const deleteFundTransactionWarningModal = useVisibilityState();
  const [selectedFundTransaction, setSelectedFundTransaction] =
    useState<null | Transaction>();

  // API
  const { data: fundCollectionData, isLoading: isLoadingFundCollectionData } =
    useGetCollectionById(collectionId ?? "");
  const expenseCollectionData = mockExpensesCollectionData;
  const fundCollectionTransactionsData = mockTransactions.filter(
    (transaction) => transaction.fundCollectionId === collectionId
  );

  const deleteCollection = useDeleteCollectionById(collectionId ?? "");

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

  const handleDeleteFundCollection = async () => {
    navigate(`/fundsCollection`);
    deleteFundCollectionWarningModal.hide();

    try {
      await deleteCollection.mutateAsync({});

      showSuccessToast("Fund collection deleted.");
    } catch {
      showErrorToast("Failed to delete fund collection.");
    }
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
        fundCollectionData === undefined || isLoadingFundCollectionData
      }
      loadingMessage="Loading fund collection..."
      isEmptyPage={fundCollectionTransactionsData.length === 0}
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
            isDeleting={false}
            itemName={selectedFundTransaction?.description ?? ""}
            onClose={() => {
              deleteFundTransactionWarningModal.hide();
              editFundTransactionModal.show();
            }}
            onCancel={() => {
              deleteFundTransactionWarningModal.hide();
              editFundTransactionModal.show();
            }}
            onConfirm={() => {}}
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
    </PageContainer>
  );
};
