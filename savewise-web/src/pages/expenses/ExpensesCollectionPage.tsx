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
import { AddExpenseCollectionModal } from "./components/AddExpenseCollectionModal";
import { EmptyStateCard } from "../../components/cards/EmptyStateCard";
import { ExpensesSummary } from "./components/ExpensesSummary";
import { TCreateCollectionSchema } from "../../api/collection/schema";
import { useGetExpensesCollection } from "../../api/collection/hooks";
import { formatNumberWithCommas } from "../../utils/number";

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
  const { data: expensesCollectionData } = useGetExpensesCollection();
  // const expensesCollectionData = mockExpensesCollectionData;

  // Functions
  const handleAddExpenseCollection = (data: TCreateCollectionSchema) => {
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
      {expensesCollectionData?.length === 0 ? (
        <EmptyStateCard message="No expenses collections yet." />
      ) : (
        <Stack direction="row" spacing={4}>
          <Box flex={2}>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {TABLE_HEADERS.map((header, index) => (
                      <TableCell
                        key={header.key}
                        align={index === 0 ? "left" : "right"}
                      >
                        {header.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {expensesCollectionData?.map((expenseCollection) => (
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
                      <TableCell component="th" scope="row" align="right">
                        {formatNumberWithCommas(
                          expenseCollection.currentMonthTotal
                        )}
                      </TableCell>
                      <TableCell component="th" scope="row" align="right">
                        {formatNumberWithCommas(
                          expenseCollection.yearToDateTotal
                        )}
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
