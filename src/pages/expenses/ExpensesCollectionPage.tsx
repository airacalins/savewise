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
import { mockExpensesCollectionData } from "../../api/expense/mockExpenseCollection";
import { CreateExpenseCollectionModal } from "./components/CreateExpenseCollectionModal";

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
        <Button onClick={addExpenseModal.show}>
          Create expense collection
        </Button>
      }
    >
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
                      {expenseCollection.currentMonthTotal}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {expenseCollection.yearToDateTotal}
                    </TableCell>
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
      <CreateExpenseCollectionModal
        isVisible={addExpenseModal.isVisible}
        onClose={addExpenseModal.hide}
        onCancel={addExpenseModal.hide}
        onSubmit={handleSaveExpense}
      />
    </PageContainer>
  );
};
