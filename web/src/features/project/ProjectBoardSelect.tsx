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
  IProjectBoard,
  useProjectBoardsQuery,
} from "../../graphql";
import { useStatus } from "../../hooks";

interface ProjectBoardSelectProps {
  adapterType: IProjectAdapterType;
  value: number | undefined;
  onChange: (boardId: number) => void;
}

export const ProjectBoardSelect: React.FC<ProjectBoardSelectProps> = ({
  adapterType,
  value,
  onChange,
}) => {
  const status = useStatus();
  const [boards, setBoards] = useState<IProjectBoard[]>();
  useProjectBoardsQuery({
    variables: { adapterType },
    onCompleted: ({ project }) => {
      setBoards(project.boards);
    },
    onError: status.error,
  });

  const handleChange = (event: SelectChangeEvent) => {
    onChange(Number.parseInt(event.target.value));
  };

  if (!boards) {
    return <CircularProgress />;
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="ProjectBoardSelect-label">Board</InputLabel>
      <Select
        value={value?.toString() ?? ""}
        onChange={handleChange}
        labelId="ProjectBoardSelect-label"
      >
        {sortBy(boards, (b) => b.name.toLowerCase()).map((board) => (
          <MenuItem key={board.id} value={board.id}>
            {board.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
