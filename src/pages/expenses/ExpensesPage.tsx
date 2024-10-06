import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import { PageContainer } from "../../components/containers/PageContainer";
import { useVisibilityState } from "../../hooks/useVisibilityState";
import { AddExpenseModal } from "./components/AddExpenseModal";
import { useNavigate } from "react-router-dom";

function createData(name: string, amount: number) {
  return { name, amount };
}

const rows = [
  createData("Electricity", 4000),
  createData("Internet", 2000),
  createData("Foods", 1000),
  createData("Transportation", 2500),
];

export const ExpensesPage = () => {
  const navigate = useNavigate();
  const addExpenseModal = useVisibilityState();

  const handleSaveExpense = () => {
    addExpenseModal.hide();
  };

  return (
    <PageContainer
      title="Expenses"
      subtitle="View, create and manage expenses."
      actions={<Button onClick={addExpenseModal.show}>Add Expense</Button>}
    >
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => navigate(`/expenses/${row.name}`)}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddExpenseModal
        isVisible={addExpenseModal.isVisible}
        onClose={addExpenseModal.hide}
        onCancel={addExpenseModal.hide}
        onSubmit={handleSaveExpense}
      />
    </PageContainer>
  );
};
