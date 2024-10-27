import { useParams } from "react-router-dom";
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
import { mockExpensesCollectionData } from "../../api/collection/mockExpensesCollection";
import dayjs from "dayjs";
import { mockTransactions } from "../../api/transactions/mockTransactions";
import {
  AddExpenseTransactionRequest as CreateExpenseTransactionRequest,
  Transaction,
  UpdateExpenseTransactionRequest,
} from "../../api/transactions/type";
import { EmptyStateCard } from "../../components/cards/EmptyStateCard";
import { mockFundsCollection } from "../../api/collection/mockFundsCollection";
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
import { TUpdateCollectionSchema } from "../../api/collection/schema";

const tableHeaders = [
  { key: "description", label: "Description" },
  { key: "fundSource", label: "Fund Source" },
  { key: "date", label: "Date" },
  { key: "amount", label: "Amount" },
];

export const ExpensesPage = () => {
  const { id } = useParams();
  const editExpenseCollectionModal = useVisibilityState();
  const addExpenseTransactionModal = useVisibilityState();
  const editExpenseTransactionModal = useVisibilityState();
  const deleteExpenseCollectionWarningModal = useVisibilityState();
  const deleteExpenseTransactionWarningModal = useVisibilityState();
  const [selectedExpenseTransaction, setSelectedExpenseTransaction] =
    useState<null | Transaction>();

  // API
  const expenseCollectionData = mockExpensesCollectionData.find(
    (expenseCollection) => expenseCollection.id === id
  );
  const fundCollectionData = mockFundsCollection;
  const transactionData = mockTransactions.filter(
    (transaction) => transaction.expenseCollectionId === id
  );

  // Functions
  const handleShowConfirmDeleteModal = () => {
    editExpenseTransactionModal.hide();
    deleteExpenseTransactionWarningModal.show();
  };

  const breadcrumbs = useMemo(() => {
    return [
      {
        key: "expensesCollection",
        name: "Expenses Collection",
        link: "/expensesCollection",
      },
      {
        key: expenseCollectionData?.name ?? "",
        name: expenseCollectionData?.name ?? "",
      },
    ];
  }, [expenseCollectionData]);

  // Functions
  const getFundSource = (id: string) => {
    const fundCollection = fundCollectionData.find(
      (fundCollection) => fundCollection.id === id
    );
    return fundCollection?.name ?? "Unknown Fund Source";
  };

  const handleUpdateExpenseCollection = (data: TUpdateCollectionSchema) => {
    console.log(data);
    editExpenseCollectionModal.hide();
  };

  const handleDeleteExpenseCollection = () => {
    deleteExpenseCollectionWarningModal.hide();
  };

  const handleAddExpenseTransaction = (
    data: TCreateExpenseTransactionSchema
  ) => {
    const input: CreateExpenseTransactionRequest = {
      expenseCollectionId: id ?? "",
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
      title={expenseCollectionData?.name ?? ""}
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
    >
      {transactionData.length === 0 ? (
        <EmptyStateCard message="No expenses for this collection yet." />
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
                  <TableCell>
                    {getFundSource(expense.fundCollectionId)}
                  </TableCell>
                  <TableCell>
                    {dayjs(expense.date).format("MMM DD, YYYY")}
                  </TableCell>
                  <TableCell>{expense.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <EditExpenseCollectionModal
        isVisible={editExpenseCollectionModal.isVisible}
        expenseCollectionId={expenseCollectionData?.id ?? ""}
        onClose={editExpenseCollectionModal.hide}
        onDelete={() => {
          editExpenseCollectionModal.hide();
          deleteExpenseCollectionWarningModal.show();
        }}
        onUpdate={handleUpdateExpenseCollection}
      />
      <DeleteWarningActionModal
        isVisible={deleteExpenseCollectionWarningModal.isVisible}
        itemName={expenseCollectionData?.name ?? ""}
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
        expenseCollectionName={expenseCollectionData?.name ?? ""}
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
        isVisible={deleteExpenseCollectionWarningModal.isVisible}
        itemName={selectedExpenseTransaction?.description ?? ""}
        onClose={() => {
          deleteExpenseCollectionWarningModal.hide();
          editExpenseCollectionModal.show();
        }}
        onCancel={() => {
          deleteExpenseCollectionWarningModal.hide();
          editExpenseCollectionModal.show();
        }}
        onConfirm={handleDeleteExpenseTransaction}
      />
    </PageContainer>
  );
};
