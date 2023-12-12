import { TextField } from "@mui/material";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";

export interface FileAddressBarProps {
  dir: string;
  onChange: (value: string) => void;
}

export const FileAddressBar: React.FC<FileAddressBarProps> = ({
  dir,
  onChange,
}) => {
  const [value, setValue] = useState(dir);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value.slice(1));
  };

  const handleKeyDown = (evt: KeyboardEvent) => {
    if (evt.key === "Enter") {
      onChange(value);
    }
  };

  return (
    <TextField
      fullWidth
      label="Directory"
      value={`/${value}`}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
};
