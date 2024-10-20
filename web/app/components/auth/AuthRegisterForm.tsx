import { useCreateUserMutation } from "@aldahick/rex-sdk/react";
import React, { useState } from "react";
import { Button, FloatingLabel, Form, Stack } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useStatus } from "../../hooks/useStatus.hook";

export const AuthRegisterForm: React.FC = () => {
  const [createUser] = useCreateUserMutation();
  const status = useStatus();
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });

  const handleChange =
    (key: keyof typeof fields) =>
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      setFields((prev) => ({
        ...prev,
        [key]: evt.target.value,
      }));
    };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    if (fields.password1 !== fields.password2) {
      status.warning("Passwords must match");
      return evt.preventDefault();
    }
    createUser({ variables: { params: fields } }).then(() => {
      navigate("/login");
    });
  };

  return (
    <form method="POST" onSubmit={handleSubmit}>
      <Stack gap={3}>
        <FloatingLabel label="Username">
          <Form.Control
            name="username"
            autoFocus
            required
            value={fields.username}
            onChange={handleChange("username")}
          />
        </FloatingLabel>
        <FloatingLabel label="Email">
          <Form.Control
            name="email"
            type="email"
            required
            value={fields.email}
            onChange={handleChange("email")}
          />
        </FloatingLabel>
        <FloatingLabel label="Password">
          <Form.Control
            name="password"
            type="password"
            required
            value={fields.password1}
            onChange={handleChange("password1")}
          />
        </FloatingLabel>
        <FloatingLabel label="Password (again)">
          <Form.Control
            name="password2"
            type="password"
            required
            value={fields.password2}
            onChange={handleChange("password2")}
          />
        </FloatingLabel>
        <div className="flex justify-center">
          <Button type="submit">Register</Button>
        </div>
      </Stack>
    </form>
  );
};
