import { Form as RemixForm } from "@remix-run/react";
import React from "react";
import { Button, FloatingLabel, Form, Stack } from "react-bootstrap";
import { useStatus } from "../../hooks/useStatus.hook";
import { getFormInput } from "../../utils/form.util";

export const AuthRegisterForm: React.FC = () => {
  const status = useStatus();

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    const password1 = getFormInput(evt.currentTarget, "password")?.value;
    const password2 = getFormInput(evt.currentTarget, "password2")?.value;
    if (password1 !== password2) {
      status.error("Passwords must match");
      return evt.preventDefault();
    }
  };

  return (
    <RemixForm method="POST" onSubmit={handleSubmit}>
      <Stack gap={3}>
        <FloatingLabel label="Username">
          <Form.Control name="username" autoFocus required />
        </FloatingLabel>
        <FloatingLabel label="Email">
          <Form.Control name="email" type="email" required />
        </FloatingLabel>
        <FloatingLabel label="Password">
          <Form.Control name="password" type="password" required />
        </FloatingLabel>
        <FloatingLabel label="Password (again)">
          <Form.Control name="password2" type="password" required />
        </FloatingLabel>
        <div className="flex justify-center">
          <Button type="submit">Register</Button>
        </div>
      </Stack>
    </RemixForm>
  );
};
