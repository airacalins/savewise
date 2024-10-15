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
import { TCreateExpenseCollectionSchema } from "../../api/expenses/schema";

const TABLE_HEADERS = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "currentMonth",
    label: "Current Month",
  },
  {
    key: "yearToDate",
    label: "Year-to-Date",
  },
];

export const ExpensesCollectionPage = () => {
  const navigate = useNavigate();
  const addExpenseCollectionModal = useVisibilityState();

  // API
  const expensesCollectionData = mockExpensesCollectionData;

  // Functions
  const handleAddExpenseCollection = (data: TCreateExpenseCollectionSchema) => {
    console.log(data);
    addExpenseCollectionModal.hide();
  };

  return (
    <PageContainer
      title="Expenses Collection"
      subtitle="View, create and manage expenses."
      actions={
        <Button onClick={addExpenseCollectionModal.show}>
          Add Expense Collection
        </Button>
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
                    {TABLE_HEADERS.map((header) => (
                      <TableCell key={header.key}>{header.label}</TableCell>
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
        isVisible={addExpenseCollectionModal.isVisible}
        onClose={addExpenseCollectionModal.hide}
        onCancel={addExpenseCollectionModal.hide}
        onSubmit={handleAddExpenseCollection}
      />
    </PageContainer>
  );
};
