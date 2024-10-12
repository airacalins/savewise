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
import { format } from "date-fns";
import { useVisibilityState } from "../../hooks/useVisibilityState";
import { EditExpenseModal } from "./components/EditExpenseModal";
import { ConfirmActionModal } from "../../components/modals/ConfirmActionModal";
import { AddExpenseModal } from "./components/AddExpenseModal";
import { useMemo } from "react";

function createData(date: string, description: string, amount: number) {
  return { date, description, amount };
}

const rows = [
  createData(
    format(new Date(), "MMM dd, yyyy HH:mm"),
    "Estimated Usage Charge",
    4000
  ),
  createData(format(new Date(), "MMM dd, yyyy HH:mm"), "Service Fees", 2000),
  createData(
    format(new Date(), "MMM dd, yyyy HH:mm"),
    "Late Payment Fee",
    1000
  ),
  createData(
    format(new Date(), "MMM dd, yyyy HH:mm"),
    "Previous Balance",
    2500
  ),
];

export const ExpenseDetailsPage = () => {
  const { id } = useParams();
  const addExpenseModal = useVisibilityState();
  const editExpenseModal = useVisibilityState();
  const deleteConfirmationExpenseModal = useVisibilityState();

  // Functions
  const handleShowConfirmDeleteModal = () => {
    editExpenseModal.hide();
    deleteConfirmationExpenseModal.show();
  };

  const breadcrumbs = useMemo(() => {
    return [
      {
        key: "expenses",
        name: "Expenses",
        link: "/expenses",
      },
      {
        key: id ?? "",
        name: id ?? "",
        link: `/expenses/${id ?? ""}`,
      },
    ];
  }, [id]);

  return (
    <PageContainer
      title={id ?? ""}
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
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={editExpenseModal.show}
              >
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.amount}</TableCell>
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
