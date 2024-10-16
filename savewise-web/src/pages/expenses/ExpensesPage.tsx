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
} from "@mui/material";
import { useVisibilityState } from "../../hooks/useVisibilityState";
import { ConfirmActionModal } from "../../components/modals/ConfirmActionModal";
import { useMemo, useState } from "react";
import { mockExpensesCollectionData } from "../../api/expenses/mockExpensesCollection";
import dayjs from "dayjs";
import { mockTransactions } from "../../api/transactions/mockTransactions";
import {
  AddExpenseTransactionRequest as CreateExpenseTransactionRequest,
  TransactionType,
  UpdateExpenseTransactionRequest,
} from "../../api/transactions/type";
import { EmptyStateCard } from "../../components/cards/EmptyStateCard";
import { mockFundsCollection } from "../../api/funds/mockFundsCollection";
import {
  TCreateExpenseTransactionSchema,
  TUpdateExpenseTransactionSchema,
} from "../../api/transactions/schema";
import { newDateFormat } from "../../ultils/date";
import { EditExpenseTransactionModal } from "./components/EditExpenseTransactionModal";
import { AddExpenseTransactionModal } from "./components/AddExpenseTransactionModal";

const tableHeaders = [
  { key: "description", label: "Description" },
  { key: "fundSource", label: "Fund Source" },
  { key: "date", label: "Date" },
  { key: "amount", label: "Amount" },
];

export const ExpensesPage = () => {
  const { id } = useParams();
  const addExpenseModal = useVisibilityState();
  const editExpenseModal = useVisibilityState();
  const deleteConfirmationExpenseModal = useVisibilityState();
  const [selectedExpenseId, setSelectedExpenseId] = useState<null | string>();

  // API
  const expenseCollectionData = mockExpensesCollectionData.find(
    (expenseCollection) => expenseCollection.id === id
  );
  const fundCollectionData = mockFundsCollection;
  const transactionData = mockTransactions.filter(
    (transaction) =>
      transaction.expenseCollectionId === id &&
      transaction.transactionType === TransactionType.Credit
  );

  // Functions
  const handleShowConfirmDeleteModal = () => {
    editExpenseModal.hide();
    deleteConfirmationExpenseModal.show();
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

  const handleAddExpenseTransaction = (
    data: TCreateExpenseTransactionSchema
  ) => {
    const input: CreateExpenseTransactionRequest = {
      transactionType: TransactionType.Credit,
      expenseCollectionId: id ?? "",
      ...data,
      date: newDateFormat(data.date),
    };

    console.log("AddExpenseTransactionRequest: ", input);

    addExpenseModal.hide();
  };

  const handleUpdateExpenseTransaction = (
    data: TUpdateExpenseTransactionSchema
  ) => {
    const input: UpdateExpenseTransactionRequest = {
      ...data,
      date: newDateFormat(data.date),
    };

    console.log("UpdateExpenseTransactionRequest: ", input);

    editExpenseModal.hide();
  };

  return (
    <PageContainer
      title={expenseCollectionData?.name ?? ""}
      subtitle="View, create and manage expenses."
      breadcrumbs={breadcrumbs}
      actions={<Button onClick={addExpenseModal.show}>Add Expense</Button>}
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
                    editExpenseModal.show();
                    setSelectedExpenseId(expense.id);
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
      <AddExpenseTransactionModal
        isVisible={addExpenseModal.isVisible}
        expenseCollectionName={expenseCollectionData?.name ?? ""}
        onClose={addExpenseModal.hide}
        onCancel={addExpenseModal.hide}
        onSubmit={handleAddExpenseTransaction}
      />
      <EditExpenseTransactionModal
        isVisible={editExpenseModal.isVisible}
        expenseId={selectedExpenseId ?? ""}
        onClose={editExpenseModal.hide}
        onDelete={handleShowConfirmDeleteModal}
        onUpdate={handleUpdateExpenseTransaction}
      />
      <ConfirmActionModal
        isVisible={deleteConfirmationExpenseModal.isVisible}
        title="Delete Expense"
        description="Are you sure you want to delete the selected expenses"
        onClose={() => {
          editExpenseModal.show();
          deleteConfirmationExpenseModal.hide();
        }}
        actions={
          <>
            <Button
              variant="contained"
              onClick={() => {
                editExpenseModal.show();
                deleteConfirmationExpenseModal.hide();
              }}
            >
              Cancel
            </Button>
            {/* <Button onClick={handleExpenseTransaction}>Yes</Button> */}
          </>
        }
      />
    </PageContainer>
  );
};
