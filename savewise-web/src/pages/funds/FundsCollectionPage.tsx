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
import { useGetFundsCollection } from "../../api/collection/hooks";
import { formatNumberWithCommas } from "../../utils/number";
import Loading from "../../components/spinners/Loading";

const TABLE_HEADERS = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "balance",
    label: "Balance",
  },
  {
    key: "yearToDate",
    label: "Year-to-Date",
  },
];

export const FundsCollectionPage = () => {
  const navigate = useNavigate();
  const addFundCollectionModal = useVisibilityState();

  // API
  const { data: fundsCollectionData, isLoading: isLoadingFundsCollectionData } =
    useGetFundsCollection();

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
      {isLoadingFundsCollectionData ? (
        <Loading title="Loading funds collection..." />
      ) : (
        <Stack direction="row" spacing={4}>
          <Box flex={2}>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {TABLE_HEADERS.map((tableHeader, index) => (
                      <TableCell
                        key={tableHeader.key}
                        align={index === 0 ? "left" : "right"}
                      >
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
                      <TableCell align="right">
                        {formatNumberWithCommas(
                          fundCollection.currentMonthTotal
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {formatNumberWithCommas(fundCollection.yearToDateTotal)}
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
      )}
      <AddFundCollectionModal
        isVisible={addFundCollectionModal.isVisible}
        onClose={addFundCollectionModal.hide}
        onCancel={addFundCollectionModal.hide}
        onSubmit={handleAddFundCollection}
      />
    </PageContainer>
  );
};
