import DownloadIcon from "@mui/icons-material/Download";
import { IconButton, TableCell, TableRow, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useTranscriptionsQuery } from "../../graphql";
import { useStatus } from "../../hooks";
import { Table } from "../utils/Table";

export const TranscriptionTable: React.FC = () => {
  const transcriptionsRes = useTranscriptionsQuery();
  const navigate = useNavigate();
  const status = useStatus();

  useEffect(() => {
    const count = transcriptionsRes.data?.transcriptions.length;
    if (count === 0) {
      status.warn("You haven't started any transcriptions!");
      navigate("/media");
    }
  }, [transcriptionsRes, status, navigate]);

  if (transcriptionsRes.error) {
    return status.error(
      transcriptionsRes.error ?? "Failed to load your transcriptions",
    );
  }

  const transcriptions = transcriptionsRes.data?.transcriptions;
  if (!transcriptions) {
    return null;
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
