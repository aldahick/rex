import { Button, Grid, TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router";
import {
  IProjectAdapterType,
  IProjectConfig,
  useUpdateProjectConfigMutation,
} from "../../graphql";
import { useStatus } from "../../hooks";

interface EditProjectConfigProps {
  projectConfig: {
    adapterType: IProjectAdapterType;
  } & Partial<IProjectConfig>;
}

export const EditProjectConfig: React.FC<EditProjectConfigProps> = ({
  projectConfig,
}) => {
  const status = useStatus();
  const navigate = useNavigate();
  const [updateProjectConfig] = useUpdateProjectConfigMutation();
  const [fields, setFields] = useState<IProjectConfig>({
    adapterType: projectConfig.adapterType,
    apiToken: projectConfig.apiToken ?? "",
    email: projectConfig.email ?? "",
    host: projectConfig.host ?? "",
  });

  const handleFieldChange =
    (field: "apiToken" | "email" | "host") =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setFields((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleSave = () => {
    updateProjectConfig({
      variables: {
        params: fields,
      },
    })
      .then(() => {
        status.success(
          `Saved project config for adapter ${fields.adapterType}`,
        );
      })
      .catch((err) => {
        status.error(err);
      });
  };

  const handleView = () => {
    navigate(`/project/${projectConfig.adapterType.toLowerCase()}`);
  };

  return (
    <Grid container mt="1em" direction="column" rowSpacing="1em">
      <Grid item>
        <TextField
          label="API Token"
          type="password"
          value={fields.apiToken}
          onChange={handleFieldChange("apiToken")}
          fullWidth
        />
      </Grid>
      <Grid item>
        <TextField
          label="Email"
          value={fields.email}
          onChange={handleFieldChange("email")}
          fullWidth
        />
      </Grid>
      <Grid item>
        <TextField
          label="Host"
          value={fields.host}
          onChange={handleFieldChange("host")}
          fullWidth
        />
      </Grid>
      <Grid item>
        <Grid container justifyContent="space-around">
          <Grid item>
            <Button variant="outlined" onClick={handleView}>
              View
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
