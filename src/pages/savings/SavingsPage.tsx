import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Button, Stack, TextField } from "@mui/material";
import { PageContainer } from "../../components/containers/PageContainer";
import { Modal } from "../../components/modals/Modal";
import { useVisibilityState } from "../../hooks/useVisibilityState";

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

  return (
    <PageContainer
      title="Funds"
      subtitle="View, create and manage savings."
      actions={<Button onClick={addAccountModal.show}>Create Fund</Button>}
    >
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
      <Modal
        isVisible={addAccountModal.isVisible}
        title="Create Fund"
        onClose={addAccountModal.hide}
      >
        <TextField fullWidth label="Account Name" />
        <Box height="16px" />
        <TextField fullWidth label="Initial Balance" />
        <Box height="24px" />
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="contained" onClick={addAccountModal.hide}>
            Cancel
          </Button>
          <Button onClick={addAccountModal.hide}>Submit</Button>
        </Stack>
      </Modal>
    </PageContainer>
  );
};
