import RefreshIcon from "@mui/icons-material/Refresh";
import { Grid, IconButton, Typography } from "@mui/material";
import * as _ from "lodash";
import React from "react";

import { useProgressQuery } from "../../graphql";
import { useStatus } from "../../hooks";

interface LiveProgressProps {
  progressId: string;
}

export const LiveProgress: React.FC<LiveProgressProps> = ({ progressId }) => {
  const progressResult = useProgressQuery({ variables: { id: progressId } });
  const status = useStatus();

  if (progressResult.error || !progressResult.data) {
    return status.error(progressResult.error);
  }

  const progress = progressResult.data.progress;
  return (
    <Grid container direction="column">
      <Grid item>
        <Typography variant="subtitle1">
          Progress: {_.startCase(progress.action)}
        </Typography>
        <IconButton onClick={() => progressResult.refetch({ id: progressId })}>
          <RefreshIcon />
        </IconButton>
      </Grid>
      <Grid item>
        <Typography>Status: {_.startCase(progress.status)}</Typography>
      </Grid>
      {progress.logs.map((log) => (
        <Grid item key={new Date(log.createdAt).toISOString()}>
          <Typography>
            {new Date(log.createdAt).toLocaleString()}: {log.text}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};
