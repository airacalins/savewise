import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { formatNumberWithCommas } from "../../../utils/number";
import { Collection } from "../../../api/collection/type";
import React from "react";
import { useNavigate } from "react-router-dom";

const tableHeaders = [
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

interface ExpensesCollectionTableTabProps {
  expensesCollection?: Collection[];
}

export const ExpensesCollectionTableTab: React.FC<
  ExpensesCollectionTableTabProps
> = ({ expensesCollection }) => {
  const navigate = useNavigate();

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableHeaders.map((header, index) => (
              <TableCell
                key={header.key}
                align={index === 0 ? "left" : "right"}
              >
                {header.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {expensesCollection?.map((expenseCollection) => (
            <TableRow
              key={expenseCollection.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              onClick={() =>
                navigate(`/expenses/${expenseCollection.id}/transactions`)
              }
            >
              <TableCell component="th" scope="row">
                {expenseCollection.name}
              </TableCell>
              <TableCell component="th" scope="row" align="right">
                {formatNumberWithCommas(expenseCollection.currentMonthTotal)}
              </TableCell>
              <TableCell component="th" scope="row" align="right">
                {formatNumberWithCommas(expenseCollection.yearToDateTotal)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
