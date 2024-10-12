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
import { EditExpenseModal } from "./components/EditExpenseModal";
import { ConfirmActionModal } from "../../components/modals/ConfirmActionModal";
import { AddExpenseModal } from "./components/AddExpenseModal";
import { useMemo, useState } from "react";
import { mockExpensesCollectionData } from "../../api/expense/mockExpenseCollection";
import { mockExpenses } from "../../api/expense/mockExpenses";
import dayjs from "dayjs";

export const Expenses = () => {
  const { id } = useParams();
  const addExpenseModal = useVisibilityState();
  const editExpenseModal = useVisibilityState();
  const deleteConfirmationExpenseModal = useVisibilityState();
  const [selectedExpenseId, setSelectedExpenseId] = useState<null | string>();

  // API
  const expenseCollectionData = mockExpensesCollectionData.find(
    (expenseCollection) => expenseCollection.id === id
  );
  const expenseData = mockExpenses.filter(
    (expenseCollection) => expenseCollection.expenseCollectionId === id
  );

  // Functions
  const handleShowConfirmDeleteModal = () => {
    editExpenseModal.hide();
    deleteConfirmationExpenseModal.show();
  };

  const breadcrumbs = useMemo(() => {
    return [
      {
        key: "expenses",
        name: "Expenses Collection",
        link: "/expensesCollection",
      },
      {
        key: expenseCollectionData?.name ?? "",
        name: expenseCollectionData?.name ?? "",
      },
    ];
  }, [expenseCollectionData]);

  return (
    <PageContainer
      title={expenseCollectionData?.name ?? ""}
      subtitle="View, create and manage expenses."
      breadcrumbs={breadcrumbs}
      actions={<Button onClick={addExpenseModal.show}>Add Expense</Button>}
    >
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenseData.map((expense, index) => (
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
                  {dayjs(expense.date).format("MMM DD, YYYY")}
                </TableCell>
                <TableCell>{expense.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddExpenseModal
        isVisible={addExpenseModal.isVisible}
        onClose={addExpenseModal.hide}
        onCancel={addExpenseModal.hide}
        onSubmit={addExpenseModal.hide}
      />
      <EditExpenseModal
        isVisible={editExpenseModal.isVisible}
        expenseId={selectedExpenseId ?? ""}
        onClose={editExpenseModal.hide}
        onDelete={handleShowConfirmDeleteModal}
        onUpdate={editExpenseModal.hide}
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
            <Button onClick={deleteConfirmationExpenseModal.hide}>Yes</Button>
          </>
        }
      />
    </PageContainer>
  );
};
