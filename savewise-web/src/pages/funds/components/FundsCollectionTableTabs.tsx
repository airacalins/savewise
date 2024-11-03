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

interface FundsCollectionTableTabsProps {
  fundsCollection?: Collection[];
}

export const FundsCollectionTableTabs: React.FC<
  FundsCollectionTableTabsProps
> = ({ fundsCollection }) => {
  const navigate = useNavigate();

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableHeaders.map((tableHeader, index) => (
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
          {fundsCollection?.map((fundCollection) => (
            <TableRow
              key={fundCollection.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              onClick={() => navigate(`/fundsCollection/${fundCollection.id}`)}
            >
              <TableCell component="th" scope="row">
                {fundCollection.name}
              </TableCell>
              <TableCell align="right">
                {formatNumberWithCommas(fundCollection.currentMonthTotal)}
              </TableCell>
              <TableCell align="right">
                {formatNumberWithCommas(fundCollection.yearToDateTotal)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
