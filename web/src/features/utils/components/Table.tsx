import {
  makeStyles, Table as MaterialTable, TableBody,
  TableCell, TableHead, TableRow, Typography,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  headCell: {
    fontWeight: "bold",
  },
});

interface TableProps {
  columns: string[];
  children: React.ReactNode;
}

export const Table: React.FC<TableProps> = ({ columns, children }) => {
  const classes = useStyles();

  return (
    <MaterialTable>
      <TableHead>
        <TableRow>
          {columns.map((column, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <TableCell key={`${column}${i}`}>
              <Typography className={classes.headCell}>
                {column}
              </Typography>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {children}
      </TableBody>
    </MaterialTable>
  );
};
