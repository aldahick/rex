import {
  styled,
  Table as MaterialTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

const BoldCell = styled(Typography)({
  fontWeight: "bold",
});

interface TableProps {
  columns: string[];
  children: React.ReactNode;
}

export const Table: React.FC<TableProps> = ({ columns, children }) => {
  return (
    <MaterialTable>
      <TableHead>
        <TableRow>
          {columns.map((column, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <TableCell key={`${column}${i}`}>
              <BoldCell>{column}</BoldCell>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>{children}</TableBody>
    </MaterialTable>
  );
};
