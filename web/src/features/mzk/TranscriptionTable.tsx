import DownloadIcon from "@mui/icons-material/Download";
import { IconButton, TableCell, TableRow, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

import { useTranscriptionsQuery } from "../../graphql";
import { useStatus } from "../../hooks";
import { Table } from "../utils/Table";

export const TranscriptionTable: React.FC = () => {
  const transcriptionsRes = useTranscriptionsQuery();
  const status = useStatus();

  if (transcriptionsRes.error) {
    return status.error(
      transcriptionsRes.error ?? "Failed to load your transcriptions",
    );
  }

  const transcriptions = transcriptionsRes.data?.transcriptions;
  if (!transcriptions) {
    return null;
  }

  if (!transcriptions.length) {
    return (
      <Typography textAlign="center">
        You have no transcriptions! <Link to="/media">Upload media</Link> and
        make some.
      </Typography>
    );
  }

  return (
    <Table columns={["Filename", "Status", "Download"]}>
      {transcriptions.map((t) => (
        <TableRow key={t.id}>
          <TableCell>
            <Typography component="pre">{t.filename}</Typography>
          </TableCell>
          <TableCell>
            <Typography>{t.status}</Typography>
          </TableCell>
          <TableCell>
            {t.pdf ? (
              <IconButton>
                <DownloadIcon />
              </IconButton>
            ) : null}
          </TableCell>
        </TableRow>
      ))}
    </Table>
  );
};
