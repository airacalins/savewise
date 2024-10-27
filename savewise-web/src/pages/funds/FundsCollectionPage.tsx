import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Button, Stack } from "@mui/material";
import { PageContainer } from "../../components/containers/PageContainer";
import { useVisibilityState } from "../../hooks/useVisibilityState";
import { AddFundCollectionModal } from "./components/AddFundCollectionModal";
import { FundsSummary } from "./components/FundsSummary";
import { useNavigate } from "react-router-dom";
import { TCreateCollectionSchema } from "../../api/collection/schema";
import { useGetFundCollections } from "../../api/collection/hooks";
import { formatNumberWithCommas } from "../../utils/number";

const TABLE_HEADERS = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "balance",
    label: "Balance",
  },
];

export const FundsCollectionPage = () => {
  const navigate = useNavigate();
  const addFundCollectionModal = useVisibilityState();

  // API
  // const fundsCollectionData = mockFundsCollection;
  const { data: fundsCollectionData } = useGetFundCollections();

  // Functions
  const handleAddFundCollection = (data: TCreateCollectionSchema) => {
    console.log(data);
    addFundCollectionModal.hide();
  };

  return (
    <PageContainer
      title="Funds Collection"
      subtitle="View, create and manage funds collection."
      actions={
        <Button onClick={addFundCollectionModal.show}>
          Add Fund Collection
        </Button>
      }
    >
      <Stack direction="row" spacing={4}>
        <Box flex={2}>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {TABLE_HEADERS.map((tableHeader) => (
                    <TableCell key={tableHeader.key}>
                      {tableHeader.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {fundsCollectionData?.map((fundCollection) => (
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
                    <TableCell>
                      {formatNumberWithCommas(fundCollection.currentMonthTotal)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box flex={1}>
          <FundsSummary />
        </Box>
      </Stack>
      <AddFundCollectionModal
        isVisible={addFundCollectionModal.isVisible}
        onClose={addFundCollectionModal.hide}
        onCancel={addFundCollectionModal.hide}
        onSubmit={handleAddFundCollection}
      />
    </PageContainer>
  );
};
