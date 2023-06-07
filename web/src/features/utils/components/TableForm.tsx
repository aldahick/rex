import {
  Button, Grid, IconButton, TableCell, TableRow, TextField,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import * as _ from "lodash";
import React, { useState } from "react";

import { useStatus } from "../../../hooks";
import { Table } from "./Table";

interface TableFormColumn {
  isOptional?: boolean;
  label?: string;
}

interface TableFormProps<Key extends string> {
  columns: {
    [key in Key]: TableFormColumn;
  };
  rows: {[key in Key]: string}[];
  onSubmit: (newRows: {[key in Key]: string}[]) => Promise<unknown>;
}

export const TableForm = <Key extends string>({ columns, rows: originalRows, onSubmit }: TableFormProps<Key>): React.ReactElement => {
  const keys = Object.keys(columns) as Key[];

  const status = useStatus();
  const [rows, setRows] = useState<{[key in Key]: string}[]>(originalRows);
  const [newRow, setNewRow] = useState<{[key in Key]?: string}>({});

  const onValueChange = (index: number, key: Key) => (evt: React.ChangeEvent<HTMLInputElement>) => {
    const clonedRows = _.cloneDeep(rows);
    clonedRows[index][key] = evt.target.value;
    setRows(clonedRows);
  };

  const onNewValueChange = (key: Key) => (evt: React.ChangeEvent<HTMLInputElement>) => {
    setNewRow({
      ...newRow,
      [key]: evt.target.value,
    });
  };

  const onRemove = (index: number) => () => {
    setRows(rows.filter((r, i) => i !== index));
  };

  const onAdd = () => {
    setRows(() => {
      const missingColumns = Object.entries<TableFormColumn>(columns)
        .filter(([key, { isOptional = false }]) => !isOptional && newRow[key as Key] !== undefined);
      if (missingColumns.length > 0) {
        status.error(`Missing required fields: ${
          missingColumns.map(([key]) => key).join(", ")
        }`);
        return rows;
      }
      setNewRow({});
      return rows.concat(newRow as {[key in Key]: string});
    });
  };

  const submit = async () => {
    try {
      const successMessage = await onSubmit(rows);
      if (typeof (successMessage) === "string" && !!successMessage) {
        status.success(successMessage);
      }
    } catch (err) {
      status.error(err instanceof Error ? err.message : err);
    }
  };

  const checkEnterKey = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key.toLowerCase() === "enter") {
      submit().catch(console.error);
    }
  };

  return (
    <Grid container direction="column">
      <Grid item>
        <Table columns={(keys as string[]).concat([""]).map(_.startCase)}>
          {rows.map((row, index) => (
            <TableRow key={JSON.stringify(row)}>
              {keys.map(key => (
                <TableCell key={key}>
                  <TextField
                    value={row[key]}
                    placeholder={_.startCase(key)}
                    onChange={onValueChange(index, key)}
                    onKeyDown={checkEnterKey}
                  />
                </TableCell>
              ))}
              <TableCell>
                <IconButton onClick={onRemove(index)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            {keys.map(key => (
              <TableCell key={key}>
                <TextField
                  value={newRow[key] ?? ""}
                  placeholder={_.startCase(key)}
                  onChange={onNewValueChange(key)}
                  onKeyDown={checkEnterKey}
                />
              </TableCell>
            ))}
            <TableCell>
              <Button variant="outlined" onClick={onAdd}>
                Add
              </Button>
            </TableCell>
          </TableRow>
        </Table>
      </Grid>
      <Grid item>
        <Button variant="outlined" onClick={submit}>
          Save
        </Button>
      </Grid>
    </Grid>
  );
};
