import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import { PageContainer } from "../../components/containers/PageContainer";
import { useVisibilityState } from "../../hooks/useVisibilityState";
import { AddFundModal } from "./components/AddFundModal";

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
      <AddFundModal
        isVisible={addAccountModal.isVisible}
        onClose={addAccountModal.hide}
        onCancel={addAccountModal.hide}
        onSubmit={handleSaveFund}
      />
    </PageContainer>
  );
};
