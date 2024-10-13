import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Button, Stack } from "@mui/material";
import { PageContainer } from "../../components/containers/PageContainer";
import { useVisibilityState } from "../../hooks/useVisibilityState";
import { AddFundModal } from "./components/AddFundModal";
import { FundSummary } from "./components/FundSummary";
import { useNavigate } from "react-router-dom";
import { mockFundsCollection } from "../../api/funds/mockFundsCollection";

const tableHeaders = [
  { key: "name", label: "Name" },
  { key: "balance", label: "Balance" },
];

export const FundsCollectionPage = () => {
  const navigate = useNavigate();
  const addAccountModal = useVisibilityState();

  // API
  const fundsCollectionData = mockFundsCollection;

  // Functions
  const handleSaveFund = () => {
    addAccountModal.hide();
  };

  return (
    <PageContainer
      title="Funds Collection"
      subtitle="View, create and manage funds collection."
      actions={<Button onClick={addAccountModal.show}>Create Fund</Button>}
    >
      <Stack direction="row" spacing={4}>
        <Box flex={2}>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {tableHeaders.map((tableHeader) => (
                    <TableCell key={tableHeader.key}>
                      {tableHeader.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {fundsCollectionData.map((fundCollection) => (
                  <TableRow
                    key={fundCollection.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    onClick={() =>
                      navigate(`/fundsCollection/${fundCollection.id}`)
                    }
                  >
                    <TableCell component="th" scope="row">
                      {fundCollection.name}
                    </TableCell>
                    <TableCell>{fundCollection.balance}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box flex={1}>
          <FundSummary />
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
