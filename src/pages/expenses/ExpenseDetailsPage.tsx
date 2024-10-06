import { useParams } from "react-router-dom";
import { PageContainer } from "../../components/containers/PageContainer";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

function createData(date: string, amount: number) {
  return { date, amount };
}

const rows = [
  createData(new Date().toString(), 4000),
  createData(new Date().toString(), 2000),
  createData(new Date().toString(), 1000),
  createData(new Date().toString(), 2500),
];

export const ExpenseDetailsPage = () => {
  const { id } = useParams();

  return (
    <PageContainer
      title={id ?? ""}
      subtitle="View, create and manage expenses."
    >
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PageContainer>
  );
};
