import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import { ProjectBoardSelect } from "../features/project/ProjectBoardSelect";
import { ProjectIssues } from "../features/project/ProjectIssues";
import { ProjectSprintSelect } from "../features/project/ProjectSprintSelect";
import { IProjectAdapterType } from "../graphql";
import { useStatus } from "../hooks";

const getSearchParamNumber = (searchParams: URLSearchParams, name: string) => {
  const value = searchParams.get(name);
  if (value) {
    return Number.parseInt(value);
  }
};

export const ProjectRoute: React.FC = () => {
  const status = useStatus();
  const [searchParams, setSearchParams] = useSearchParams();
  const { adapterType: rawAdapterType } = useParams();
  const adapterType = Object.values(IProjectAdapterType).find(
    (type) => type.toLowerCase() === rawAdapterType?.toLowerCase(),
  );
  const [boardId, setBoardId] = useState(
    getSearchParamNumber(searchParams, "boardId"),
  );
  const [sprintId, setSprintId] = useState(
    getSearchParamNumber(searchParams, "sprintId"),
  );

  useEffect(() => {
    setSearchParams((prev) => {
      if (typeof boardId === "number") {
        prev.set("boardId", boardId.toString());
      }
      if (typeof sprintId === "number") {
        prev.set("sprintId", sprintId.toString());
      }
      return prev;
    });
  }, [boardId, sprintId]);

  if (!adapterType) {
    status.error(
      `No adapter type found matching route param: ${rawAdapterType}`,
    );
    return null;
  }

  return (
    <Grid container direction="column" p="1em">
      <Grid container>
        <Grid item xs={12} sm={8} md={4}>
          <ProjectBoardSelect
            adapterType={adapterType}
            onChange={setBoardId}
            value={boardId}
          />
        </Grid>
      </Grid>
      <Grid container mt="1em">
        <Grid item xs={12} sm={8} md={4}>
          {typeof boardId === "number" ? (
            <ProjectSprintSelect
              adapterType={adapterType}
              boardId={boardId}
              onChange={setSprintId}
              value={sprintId}
            />
          ) : null}
        </Grid>
      </Grid>
      <Grid container mt="1em">
        <Grid item xs={12}>
          {typeof sprintId === "number" ? (
            <ProjectIssues adapterType={adapterType} sprintId={sprintId} />
          ) : null}
        </Grid>
      </Grid>
    </Grid>
  );
};
