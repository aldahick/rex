import { Button, Grid, styled, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router";

import {
  IStorableAuthTokenFragment,
  useConfigQuery,
  useCreateAuthTokenLocalMutation,
} from "../../graphql";
import { useStatus } from "../../hooks";

const LongButton = styled(Button)({
  paddingLeft: "32px",
  paddingRight: "32px",
});

interface LocalAuthFormProps {
  onSuccess: (authToken: IStorableAuthTokenFragment) => void;
}

export const LocalAuthForm: React.FC<LocalAuthFormProps> = ({ onSuccess }) => {
  const navigate = useNavigate();
  const config = useConfigQuery();
  const [createAuthToken] = useCreateAuthTokenLocalMutation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const status = useStatus();

  const handleSubmit = async () => {
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

  const handleRegister = () => {
    let url = "/register";
    if (username) {
      url += `?username=${username}`;
    }
    navigate(url);
  };

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key.toLowerCase() === "enter") {
      // should never catch
      handleSubmit().catch(console.log);
    }
  };

  const canRegister = config.data?.config.createAnonymousUsers;

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={10}>
        <TextField
          label="Username"
          value={username}
          onChange={(evt) => setUsername(evt.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={10}>
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
          onKeyDown={handleKeyDown}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={10} style={{ marginTop: "1em" }}>
        <Grid container justifyContent="space-between">
          {canRegister !== false ? (
            <LongButton
              onClick={handleRegister}
              color="secondary"
              variant="contained"
              size="large"
              disabled={!canRegister}
            >
              Sign Up
            </LongButton>
          ) : null}
          <LongButton
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            size="large"
          >
            Log In
          </LongButton>
        </Grid>
      </Grid>
    </Grid>
  );
};
