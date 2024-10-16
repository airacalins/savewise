import { PageContainer } from "../../components/containers/PageContainer";
import {
  Box,
  Button,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useVisibilityState } from "../../hooks/useVisibilityState";
import { useParams } from "react-router-dom";
import { mockFundsCollection } from "../../api/funds/mockFundsCollection";
import { useMemo } from "react";
import dayjs from "dayjs";
import { EmptyStateCard } from "../../components/cards/EmptyStateCard";
import { mockTransactions } from "../../api/transactions/mockTransactions";
import { Text } from "../../components/texts/Text";
import { AddFundRequest, TransactionType } from "../../api/transactions/type";
import { AddFundModal } from "./components/AddFundModal";
import { mockExpensesCollectionData } from "../../api/expenses/mockExpensesCollection";
import { TCreateFundTransactionSchema } from "../../api/transactions/schema";

const tableHeaders = [
  { key: "date", label: "Date" },
  { key: "description", label: "Description" },
  { key: "amount", label: "Amount" },
];

export const FundsPage = () => {
  const { id } = useParams();
  const addFundModal = useVisibilityState();

  // Data
  const fundCollectionData = mockFundsCollection.find(
    (fundCollection) => fundCollection.id === id
  );
  const expenseCollectionData = mockExpensesCollectionData;
  const fundCollectionTransactionsData = mockTransactions.filter(
    (transaction) => transaction.fundCollectionId === id
  );

  const breadcrumbs = useMemo(() => {
    return [
      {
        key: "fundsCollection",
        name: "Funds Collection",
        link: "/fundsCollection",
      },
      {
        key: fundCollectionData?.name ?? "",
        name: fundCollectionData?.name ?? "",
      },
    ];
  }, [fundCollectionData]);

  // Functions
  const getExpenseName = (id: string) => {
    const expense = expenseCollectionData.find((expense) => expense.id === id);
    return expense ? expense.name : "Unknown Expense";
  };

  const handleFundTransaction = (data: TCreateFundTransactionSchema) => {
    const input: AddFundRequest = {
      transactionType: TransactionType.Debit,
      fundCollectionId: fundCollectionData?.id ?? "",
      ...data,
      date: dayjs(data.date).format("YYYY-MM-DDTHH:mm:ssZ"),
    };

    console.log("AddFundTransactionRequest: ", input);

    addFundModal.hide();
  };

  return (
    <PageContainer
      title={fundCollectionData?.name ?? ""}
      subtitle="View, create and manage fund collection."
      breadcrumbs={breadcrumbs}
      actions={<Button onClick={addFundModal.show}>Add Fund</Button>}
    >
      {fundCollectionTransactionsData.length === 0 ? (
        <EmptyStateCard message="No transaction for this collection yet." />
      ) : (
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
              {fundCollectionTransactionsData.map((fundTransaction, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() => {
                    // editExpenseModal.show();
                    // setSelectedExpenseId(expense.id);
                  }}
                >
                  <TableCell>
                    {dayjs(fundTransaction.date).format("MMM DD, YYYY")}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center">
                      <Text>{fundTransaction.description}</Text>
                      <Box width="8px" />
                      {fundTransaction.transactionType ===
                        TransactionType.Credit && (
                        <Chip
                          label={getExpenseName(fundTransaction.id)}
                          variant="outlined"
                          color="error"
                          size="small"
                        />
                      )}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Text
                      variant="body2"
                      color={
                        fundTransaction.transactionType ===
                        TransactionType.Credit
                          ? "error"
                          : "info"
                      }
                    >
                      {fundTransaction.amount.toFixed(2)}
                    </Text>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <AddFundModal
        isVisible={addFundModal.isVisible}
        fundCollectionName={fundCollectionData?.name ?? ""}
        onClose={addFundModal.hide}
        onCancel={addFundModal.hide}
        onSubmit={handleFundTransaction}
      />
    </PageContainer>
  );
};
