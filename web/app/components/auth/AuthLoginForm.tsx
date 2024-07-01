import {
  Link,
  Form as RemixForm,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react";
import React from "react";
import { Button, FloatingLabel, Form, Stack } from "react-bootstrap";
import { LoginLoader } from "../../routes/login";

export const AuthLoginForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { config } = useLoaderData<LoginLoader>();
  const canRegister = config.createAnonymousUsers;

  return (
    <RemixForm method="POST">
      <Stack gap={3}>
        <FloatingLabel label="Username">
          <Form.Control
            name="username"
            autoFocus
            required
            defaultValue={searchParams.get("username") ?? ""}
          />
        </FloatingLabel>
        <FloatingLabel label="Password">
          <Form.Control name="password" type="password" required />
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
    </RemixForm>
  );
};
