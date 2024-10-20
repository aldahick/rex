import { IAuthTokenFragment, IConfig } from "@aldahick/rex-sdk";
import { useGetAuthTokenLazyQuery } from "@aldahick/rex-sdk/react";
import React, { useState } from "react";
import { Button, FloatingLabel, Form, Stack } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";

export const AuthLoginForm: React.FC<{
  config?: IConfig;
  onLogin: (token: IAuthTokenFragment) => void;
}> = ({ config, onLogin }) => {
  const [getAuthToken] = useGetAuthTokenLazyQuery();
  const [searchParams] = useSearchParams();
  const [username, setUsername] = useState(searchParams.get("username") ?? "");
  const [password, setPassword] = useState("");

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    getAuthToken({
      variables: { params: { local: { username, password } } },
      onCompleted: ({ authToken }) => onLogin(authToken),
    });
  };

  const canRegister = config?.createAnonymousUsers;

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap={3}>
        <FloatingLabel label="Username">
          <Form.Control
            name="username"
            autoFocus
            required
            value={username}
            onChange={(evt) => setUsername(evt.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel label="Password">
          <Form.Control
            name="password"
            type="password"
            required
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
          />
        </FloatingLabel>
        <div className="flex justify-around">
          {canRegister !== false && (
            <Link to="/register">
              <Button disabled={!canRegister}>Sign Up</Button>
            </Link>
          )}
          <Button name="provider" value="local" type="submit">
            Log In
          </Button>
        </div>
      </Stack>
    </form>
  );
};
