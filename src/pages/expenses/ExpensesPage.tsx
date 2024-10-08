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
  Card,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { PageContainer } from "../../components/containers/PageContainer";
import { useVisibilityState } from "../../hooks/useVisibilityState";
import { useNavigate } from "react-router-dom";
import { CalendarMonth } from "@mui/icons-material";
import { CreateExpenseCategoryModal } from "./components/CreateExpenseCategoryModal";

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
      actions={
        <Button onClick={addExpenseModal.show}>Create expense category</Button>
      }
    >
      <Stack direction="row" spacing={4}>
        <Box flex={2}>
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
        </Box>
        <Box flex={1}>
          <Card style={{ padding: "24px" }}>
            <Typography variant="caption">Current month total</Typography>
            <Box height="8px" />
            <Typography variant="body1">Php 10,000</Typography>
            <Box height="16px" />
            <Divider />
            <Box height="16px" />
            <Stack
              alignItems="center"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="caption">
                  Previous month total - Sep 2024
                </Typography>
                <Box height="8px" />
                <Typography variant="body1">Php 10,000</Typography>
              </Box>
              <Box>
                <IconButton>
                  <CalendarMonth />
                </IconButton>
              </Box>
            </Stack>
            <Box height="16px" />
            <Divider />
            <Box height="16px" />
            <Typography variant="caption">Year-to-Date total </Typography>
            <Box height="8px" />
            <Typography variant="body1">Php 10,000</Typography>
            <Box height="16px" />
            <Divider />
            <Box height="16px" />
            <Typography variant="caption">Overall Total</Typography>
            <Box height="8px" />
            <Typography variant="body1">Php 10,000</Typography>
          </Card>
        </Box>
      </Stack>
      <CreateExpenseCategoryModal
        isVisible={addExpenseModal.isVisible}
        onClose={addExpenseModal.hide}
        onCancel={addExpenseModal.hide}
        onSubmit={handleSaveExpense}
      />
    </PageContainer>
  );
};
