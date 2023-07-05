import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";

import { useCreateUserMutation } from "../../graphql";
import { useStatus } from "../../hooks";

// very basic email regex to dissuade obvious garbage
const emailRegex = /^[^@]+@[^\.]+\..*$/;

export interface CreateUserFormProps {
  initialUsername?: string;
  onCreate: (username: string) => void;
}

export const CreateUserForm: React.FC<CreateUserFormProps> = ({
  initialUsername,
  onCreate,
}) => {
  const [createUser] = useCreateUserMutation();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(initialUsername ?? "");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const status = useStatus();

  const handleSubmit = async () => {
    if (!email || !emailRegex.test(email)) {
      return status.warn("Please enter a valid email address.");
    }
    if (!username) {
      return status.warn("You can't register without a username!");
    }
    if (!password1 || !password2 || password1 !== password2) {
      return status.warn(
        "Enter the same, non-empty password in both fields, please."
      );
    }
    try {
      await createUser({
        variables: {
          email,
          username,
          password: password1,
        },
      });
    } catch (err) {
      return status.error(err);
    }
    status.success(
      "Successfully signed up! Please check your email to verify your account and log in."
    );
    onCreate(username);
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={10}>
        <TextField
          label="Username"
          value={username}
          onChange={(evt) => setUsername(evt.target.value)}
          autoFocus
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={10}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={10}>
        <TextField
          label="Password"
          type="password"
          value={password1}
          onChange={(evt) => setPassword1(evt.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={10}>
        <TextField
          label="Password (again)"
          type="password"
          value={password2}
          onChange={(evt) => setPassword2(evt.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={10} marginTop="2em">
        <Grid container justifyContent="center">
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            size="large"
          >
            Register
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
