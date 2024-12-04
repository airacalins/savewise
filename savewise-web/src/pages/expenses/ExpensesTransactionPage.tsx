import { useNavigate, useParams } from "react-router-dom";
import { PageContainer } from "../../components/containers/PageContainer";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  IconButton,
} from "@mui/material";
import { useVisibilityState } from "../../hooks/useVisibilityState";
import { useMemo, useState } from "react";
import dayjs from "dayjs";
import { mockTransactions } from "../../api/transactions/mockTransactions";
import {
  AddExpenseTransactionRequest as CreateExpenseTransactionRequest,
  Transaction,
  UpdateExpenseTransactionRequest,
} from "../../api/transactions/type";
import {
  TCreateExpenseTransactionSchema,
  TUpdateExpenseTransactionSchema,
} from "../../api/transactions/schema";
import { newDateFormat } from "../../utils/date";
import { EditExpenseTransactionModal } from "./components/EditExpenseTransactionModal";
import { AddExpenseTransactionModal } from "./components/AddExpenseTransactionModal";
import { DeleteWarningActionModal } from "../../components/modals/DeleteWarningActionModal";
import { Edit } from "@mui/icons-material";
import { EditExpenseCollectionModal } from "./components/EditExpenseCollectionModal";
import {
  useDeleteCollection,
  useGetCollectionById,
  useGetFundsCollection,
} from "../../api/collection/hooks";
import { showErrorToast, showSuccessToast } from "../../utils/toast";

const tableHeaders = [
  { key: "description", label: "Description" },
  { key: "fundSource", label: "Fund Source" },
  { key: "date", label: "Date" },
  { key: "amount", label: "Amount" },
];

export const ExpensesPage = () => {
  const { collectionId } = useParams();
  const navigate = useNavigate();
  const editExpenseCollectionModal = useVisibilityState();
  const addExpenseTransactionModal = useVisibilityState();
  const editExpenseTransactionModal = useVisibilityState();
  const deleteExpenseCollectionWarningModal = useVisibilityState();
  const deleteExpenseTransactionWarningModal = useVisibilityState();
  const [selectedExpenseTransaction, setSelectedExpenseTransaction] =
    useState<null | Transaction>();

  // API
  const {
    data: expensesCollectionData,
    isLoading: isLoadingExpensesCollection,
  } = useGetCollectionById(collectionId ?? "");
  const { data: fundsCollectionData } = useGetFundsCollection();
  const deleteCollection = useDeleteCollection(collectionId ?? "");

  // Mock Data
  const transactionData = mockTransactions.filter(
    (transaction) => transaction.expenseCollectionId === collectionId
  );

  const breadcrumbs = useMemo(() => {
    return [
      {
        key: "expensesCollection",
        name: "Expenses Collection",
        link: "/expensesCollection",
      },
      {
        key: expensesCollectionData?.name ?? "",
        name: expensesCollectionData?.name ?? "",
      },
    ];
  }, [expensesCollectionData]);

  // Functions
  const getFundSource = (id: string) => {
    const fundCollection = fundsCollectionData?.find(
      (fundCollection) => fundCollection.id === id
    );
    return fundCollection?.name ?? "Unknown Fund Source";
  };

  const handleShowConfirmDeleteModal = () => {
    editExpenseTransactionModal.hide();
    deleteExpenseTransactionWarningModal.show();
  };

  const handleDeleteExpenseCollection = async () => {
    navigate(`/expensesCollection`);
    deleteExpenseCollectionWarningModal.hide();

    try {
      await deleteCollection.mutateAsync({});

      showSuccessToast("Expense collection deleted.");
    } catch {
      showErrorToast("Failed to delete fund collection.");
    }
  };

  const handleAddExpenseTransaction = (
    data: TCreateExpenseTransactionSchema
  ) => {
    const input: CreateExpenseTransactionRequest = {
      expenseCollectionId: collectionId ?? "",
      ...data,
      date: newDateFormat(data.date),
    };

    console.log("AddExpenseTransactionRequest: ", input);

    addExpenseTransactionModal.hide();
  };

  const handleUpdateExpenseTransaction = (
    data: TUpdateExpenseTransactionSchema
  ) => {
    const input: UpdateExpenseTransactionRequest = {
      ...data,
      date: newDateFormat(data.date),
    };

    console.log("UpdateExpenseTransactionRequest: ", input);

    editExpenseTransactionModal.hide();
  };

  const handleDeleteExpenseTransaction = () => {
    deleteExpenseTransactionWarningModal.hide();
  };

  return (
    <PageContainer
      title={expensesCollectionData?.name ?? "..."}
      titleAction={
        <IconButton size="small" onClick={editExpenseCollectionModal.show}>
          <Edit />
        </IconButton>
      }
      subtitle="View, create and manage expenses."
      breadcrumbs={breadcrumbs}
      actions={
        <Button onClick={addExpenseTransactionModal.show}>Add Expense</Button>
      }
      isLoading={isLoadingExpensesCollection}
      loadingMessage="Loading transactions..."
      isEmptyPage={transactionData.length === 0}
      emptyPageMessage="No transaction for this expense yet."
      modals={
        <>
          <EditExpenseCollectionModal
            isVisible={editExpenseCollectionModal.isVisible}
            expenseCollectionId={expensesCollectionData?.id ?? ""}
            onClose={editExpenseCollectionModal.hide}
            onDelete={() => {
              editExpenseCollectionModal.hide();
              deleteExpenseCollectionWarningModal.show();
            }}
          />
          <DeleteWarningActionModal
            isVisible={deleteExpenseCollectionWarningModal.isVisible}
            isDeleting={deleteCollection.isLoading}
            itemName={expensesCollectionData?.name}
            onClose={() => {
              deleteExpenseCollectionWarningModal.hide();
              editExpenseCollectionModal.show();
            }}
            onCancel={() => {
              deleteExpenseCollectionWarningModal.hide();
              editExpenseCollectionModal.show();
            }}
            onConfirm={handleDeleteExpenseCollection}
          />
          <AddExpenseTransactionModal
            isVisible={addExpenseTransactionModal.isVisible}
            expenseCollectionName={expensesCollectionData?.name ?? ""}
            onClose={addExpenseTransactionModal.hide}
            onCancel={addExpenseTransactionModal.hide}
            onSubmit={handleAddExpenseTransaction}
          />
          <EditExpenseTransactionModal
            isVisible={editExpenseTransactionModal.isVisible}
            expenseTransactionId={selectedExpenseTransaction?.id ?? ""}
            onClose={editExpenseTransactionModal.hide}
            onDelete={handleShowConfirmDeleteModal}
            onUpdate={handleUpdateExpenseTransaction}
          />
          <DeleteWarningActionModal
            isVisible={deleteExpenseTransactionWarningModal.isVisible}
            isDeleting={false}
            itemName={selectedExpenseTransaction?.description ?? ""}
            onClose={() => {
              deleteExpenseTransactionWarningModal.hide();
              editExpenseTransactionModal.show();
            }}
            onCancel={() => {
              deleteExpenseTransactionWarningModal.hide();
              editExpenseTransactionModal.show();
            }}
            onConfirm={handleDeleteExpenseTransaction}
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
            {transactionData.map((expense, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => {
                  editExpenseTransactionModal.show();
                  setSelectedExpenseTransaction(expense);
                }}
              >
                <TableCell>{expense.description}</TableCell>
                <TableCell>{getFundSource(expense.fundCollectionId)}</TableCell>
                <TableCell>
                  {dayjs(expense.date).format("MMM DD, YYYY")}
                </TableCell>
                <TableCell>{expense.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PageContainer>
  );
};
