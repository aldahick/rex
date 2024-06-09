import {
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useState } from "react";
import { EditProjectConfig } from "../features/project/EditProjectConfig";
import {
  IProjectAdapterType,
  IProjectConfig,
  useProjectConfigsQuery,
} from "../graphql";
import { useStatus } from "../hooks";

export const ProjectConfigsRoute: React.FC = () => {
  const [projectConfigs, setProjectConfigs] = useState<IProjectConfig[]>();
  const [selectedAdapterType, setSelectedAdapterType] =
    useState<IProjectAdapterType>();
  const status = useStatus();

  useProjectConfigsQuery({
    onCompleted: ({ user }) => {
      setProjectConfigs(user.projectConfigs);
    },
    onError: status.error,
  });

  if (!projectConfigs) {
    return <CircularProgress />;
  }

  const handleAdapterTypeChange = (event: SelectChangeEvent) => {
    setSelectedAdapterType(event.target.value as IProjectAdapterType);
  };

  return (
    <Grid container direction="column" p="1em">
      <Grid container>
        <Grid item xs={12} sm={8} md={4}>
          <FormControl fullWidth>
            <InputLabel id="ProjectConfigs-adapterType-label">
              Adapter Type
            </InputLabel>
            <Select
              value={selectedAdapterType ?? ""}
              onChange={handleAdapterTypeChange}
              labelId="ProjectConfigs-adapterType-label"
            >
              {Object.values(IProjectAdapterType).map((adapterType) => (
                <MenuItem key={adapterType} value={adapterType}>
                  {adapterType.toLowerCase()}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={7} md={3}>
          {selectedAdapterType ? (
            <EditProjectConfig
              projectConfig={
                projectConfigs.find(
                  (c) => c.adapterType === selectedAdapterType,
                ) ?? {
                  adapterType: selectedAdapterType,
                }
              }
            />
          ) : null}
        </Grid>
      </Grid>
    </Grid>
  );
};
