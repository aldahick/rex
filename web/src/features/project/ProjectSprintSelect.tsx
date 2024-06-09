import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useState } from "react";
import { sortBy } from "remeda";
import {
  IProjectAdapterType,
  IProjectSprint,
  useProjectSprintsQuery,
} from "../../graphql";
import { useStatus } from "../../hooks";

interface ProjectSprintSelectProps {
  adapterType: IProjectAdapterType;
  boardId: number;
  value: number | undefined;
  onChange: (sprintId: number) => void;
}

export const ProjectSprintSelect: React.FC<ProjectSprintSelectProps> = ({
  adapterType,
  boardId,
  value,
  onChange,
}) => {
  const status = useStatus();
  const [sprints, setSprints] = useState<IProjectSprint[]>();
  useProjectSprintsQuery({
    variables: { adapterType, boardId },
    onCompleted: ({ project }) => {
      setSprints(
        sortBy(project.sprints, (s) =>
          s.start ? new Date(s.start).getTime() : 0,
        ).reverse(),
      );
    },
    onError: status.error,
  });

  const handleChange = (event: SelectChangeEvent) => {
    onChange(Number.parseInt(event.target.value));
  };

  if (!sprints) {
    return <CircularProgress />;
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="ProjectSprintSelect-label">Sprint</InputLabel>
      <Select
        value={value?.toString() ?? ""}
        onChange={handleChange}
        labelId="ProjectSprintSelect-label"
      >
        {sprints.map((sprint) => (
          <MenuItem key={sprint.id} value={sprint.id}>
            {sprint.name} ({sprint.state})
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
