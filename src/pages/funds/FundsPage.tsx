import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { PageContainer } from "../../components/containers/PageContainer";
import { useVisibilityState } from "../../hooks/useVisibilityState";
import { AddFundModal } from "./components/AddFundModal";
import { CalendarMonth } from "@mui/icons-material";

function createData(name: string, amount: number) {
  return { name, amount };
}

const rows = [
  createData("Unionbank", 12000),
  createData("GCash", 3000),
  createData("Cash on Hand", 3000),
];

export const FundsPage = () => {
  const addAccountModal = useVisibilityState();

  const handleSaveFund = () => {
    addAccountModal.hide();
  };

  return (
    <PageContainer
      title="Funds"
      subtitle="View, create and manage savings."
      actions={<Button onClick={addAccountModal.show}>Create Fund</Button>}
    >
      <Stack direction="row" spacing={4}>
        <Box flex={2}>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Current Month Savings</TableCell>
                  <TableCell>Year-to-Date Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.amount}</TableCell>
                    <TableCell>{row.amount}</TableCell>
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
            <Typography variant="caption">Overall total</Typography>
            <Box height="8px" />
            <Typography variant="body1">Php 10,000</Typography>
          </Card>
        </Box>
      </Stack>
      <AddFundModal
        isVisible={addAccountModal.isVisible}
        onClose={addAccountModal.hide}
        onCancel={addAccountModal.hide}
        onSubmit={handleSaveFund}
      />
    </PageContainer>
  );
};
