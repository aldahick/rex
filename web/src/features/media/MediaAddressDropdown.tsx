import { TableCell, TableRow, Typography } from "@mui/material";
import React, { useEffect } from "react";

import { useMediaItemsLazyQuery } from "../../graphql";
import { Table } from "../utils/Table";
import { MediaTypeIcon } from "./MediaTypeIcon";

export interface MediaAddressDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export const MediaAddressDropdown: React.FC<MediaAddressDropdownProps> = ({
  value,
}) => {
  const [fetchChildren, childrenResult] = useMediaItemsLazyQuery();

  if (!childrenResult.data) {
    return null;
  }

  useEffect(() => {
    fetchChildren({ variables: { dir: value } });
  }, [value]);

  const children = childrenResult.data.mediaItems;

  return (
    <Table columns={false}>
      {children.length ? null : (
        <div>
          <Typography variant="h6">This directory is empty.</Typography>
          <Typography>{value}</Typography>
        </div>
      )}
      {children.map((item) => (
        <TableRow key={item.key}>
          <TableCell>
            <MediaTypeIcon type={item.type} />
          </TableCell>
        </TableRow>
      ))}
    </Table>
  );
};
