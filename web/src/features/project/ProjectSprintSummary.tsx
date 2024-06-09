import { Grid } from "@mui/material";
import React from "react";
import { IProjectIssue } from "../../graphql";

interface ProjectSprintSummaryProps {
  issues: IProjectIssue[];
}

export const ProjectSprintSummary: React.FC<ProjectSprintSummaryProps> = ({
  issues,
}) => {
  return (
    <Grid container>
      <Grid item>
        Total Story Points:{" "}
        {issues.reduce((p, v) => p + (v.storyPoints ?? 0), 0)}
      </Grid>
    </Grid>
  );
};
