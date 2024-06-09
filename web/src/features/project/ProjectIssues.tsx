import { CircularProgress, TableCell, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { sortBy } from "remeda";
import {
  IProjectAdapterType,
  IProjectIssue,
  useProjectIssuesQuery,
} from "../../graphql";
import { useStatus } from "../../hooks";
import { Table } from "../utils/Table";
import { ProjectSprintSummary } from "./ProjectSprintSummary";

interface ProjectIssuesProps {
  adapterType: IProjectAdapterType;
  sprintId: number;
}

export const ProjectIssues: React.FC<ProjectIssuesProps> = ({
  adapterType,
  sprintId,
}) => {
  const status = useStatus();
  const [issues, setIssues] = useState<IProjectIssue[]>();
  useProjectIssuesQuery({
    variables: { adapterType, sprintId },
    onCompleted: ({ project }) => {
      setIssues(sortBy(project.issues, (i) => i.key.toLowerCase()));
    },
    onError: status.error,
  });

  useEffect(() => {
    setIssues(undefined);
  }, [sprintId]);

  if (!issues) {
    return <CircularProgress />;
  }

  return (
    <>
      <ProjectSprintSummary issues={issues} />
      <Table columns={["Key", "Title", "State", "Story Points", "Implementer"]}>
        {issues.map((issue) => (
          <TableRow key={issue.id}>
            <TableCell>{issue.key}</TableCell>
            <TableCell>{issue.title}</TableCell>
            <TableCell>{issue.state}</TableCell>
            <TableCell>{issue.storyPoints ?? ""}</TableCell>
            <TableCell>{issue.implementer?.name}</TableCell>
          </TableRow>
        ))}
      </Table>
    </>
  );
};
