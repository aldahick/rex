import {
  styled,
  Table as MaterialTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { PropsWithChildren } from "react";

const BoldCell = styled(Typography)({
  fontWeight: "bold",
});

interface TableProps extends PropsWithChildren {
  columns: string[] | false;
}

export const Table: React.FC<TableProps> = ({ columns, children }) => {
  return (
    <MaterialTable>
      {columns ? (
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column}>
                <BoldCell>{column}</BoldCell>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      ) : null}
      <TableBody>{children}</TableBody>
    </MaterialTable>
  );
};
