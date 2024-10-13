import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Stack,
  Box,
} from "@mui/material";
import { PageContainer } from "../../components/containers/PageContainer";
import { useVisibilityState } from "../../hooks/useVisibilityState";
import { useNavigate } from "react-router-dom";
import { mockExpensesCollectionData } from "../../api/expenses/mockExpensesCollection";
import { AddExpenseCollectionModal } from "./components/AddExpenseCollectionModal";
import { EmptyStateCard } from "../../components/cards/EmptyStateCard";
import { ExpensesSummary } from "./components/ExpensesSummary";

export const ExpensesCollectionPage = () => {
  const navigate = useNavigate();
  const addExpenseModal = useVisibilityState();

  const handleSaveExpense = () => {
    addExpenseModal.hide();
  };

  const expensesCollectionData = mockExpensesCollectionData;

  const headers = ["Name", "Current Month", "Year-to-Date"];

  return (
    <PageContainer
      title="Expenses Collection"
      subtitle="View, create and manage expenses."
      actions={
        <Button onClick={addExpenseModal.show}>Add Expense Collection</Button>
      }
    >
      {expensesCollectionData.length === 0 ? (
        <EmptyStateCard message="No expenses collections yet." />
      ) : (
        <Stack direction="row" spacing={4}>
          <Box flex={2}>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {headers.map((header) => (
                      <TableCell key={header}>{header}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {expensesCollectionData.map((expenseCollection) => (
                    <TableRow
                      key={expenseCollection.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      onClick={() =>
                        navigate(`/expensesCollection/${expenseCollection.id}`)
                      }
                    >
                      <TableCell component="th" scope="row">
                        {expenseCollection.name}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {expenseCollection.currentMonthTotal.toFixed(2)}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {expenseCollection.yearToDateTotal.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box flex={1}>
            <ExpensesSummary />
          </Box>
        </Stack>
      )}

      <AddExpenseCollectionModal
        isVisible={addExpenseModal.isVisible}
        onClose={addExpenseModal.hide}
        onCancel={addExpenseModal.hide}
        onSubmit={handleSaveExpense}
      />
    </PageContainer>
  );
};
