import { useQuery } from "@apollo/client";
import { CircularProgress, Grid, IconButton, Typography } from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import gql from "graphql-tag";
import * as _ from "lodash";
import React from "react";

import { IQuery, IQueryProgressArgs } from "../../graphql";
import { useStatus } from "../../hooks";

const QUERY_PROGRESS = gql`
query Web_Progress($id: String!) {
  progress(id: $id) {
    _id
    action
    createdAt
    status
    logs {
      createdAt
      text
    }
  }
}
`;

interface LiveProgressProps {
  progressId: string;
}

export const LiveProgress: React.FC<LiveProgressProps> = ({ progressId }) => {
  const {
    loading, data: { progress } = {}, error, refetch
  } = useQuery<{ progress: IQuery["progress"] }, IQueryProgressArgs>(QUERY_PROGRESS, { variables: { id: progressId } });
  const status = useStatus();

  if (loading || !progress) {
    return (
      <CircularProgress />
    );
  }

  if (error) {
    return status.error(error.message);
  }

  return (
    <Grid container direction="column">
      <Grid item>
        <Typography variant="subtitle1">
          Progress:
          {" "}
          {_.startCase(progress.action)}
        </Typography>
        <IconButton onClick={() => refetch({ id: progressId })}>
          <RefreshIcon />
        </IconButton>
      </Grid>
      <Grid item>
        <Typography>
          Status:
          {" "}
          {_.startCase(progress.status)}
        </Typography>
      </Grid>
      {progress.logs.map((log => (
        <Grid item key={new Date(log.createdAt).toISOString()}>
          <Typography>
            {new Date(log.createdAt).toLocaleString()}
            :
            {" "}
            {log.text}
          </Typography>
        </Grid>
      )))}
    </Grid>
  );
};
