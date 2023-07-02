import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";

import {
  IStorableAuthTokenFragment,
  useCreateAuthTokenLocalMutation,
} from "../../graphql";
import { useStatus } from "../../hooks";

interface LocalAuthFormProps {
  onSuccess: (authToken: IStorableAuthTokenFragment) => void;
}

export const LocalAuthForm: React.FC<LocalAuthFormProps> = ({ onSuccess }) => {
  const [createAuthToken] = useCreateAuthTokenLocalMutation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const status = useStatus();

  const onSubmit = async () => {
    if (!username || !password) {
      return;
    }
    try {
      const res = await createAuthToken({
        variables: { username, password },
      });
      if (res.data) {
        onSuccess(res.data.authToken);
      } else if (res.errors) {
        throw res.errors[0];
      }
    } catch (err) {
      status.error(err);
    }
  };

  const checkEnterKey = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key.toLowerCase() === "enter") {
      // should never catch
      onSubmit().catch(console.log);
    }
  };

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <TextField
          label="Username"
          value={username}
          onChange={(evt) => setUsername(evt.target.value)}
          onKeyDown={checkEnterKey}
          autoFocus
        />
      </Grid>
      <Grid item>
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
          onKeyDown={checkEnterKey}
        />
      </Grid>
      <Grid item style={{ marginTop: "1em" }}>
        <Button onClick={onSubmit} color="primary" variant="contained">
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};
