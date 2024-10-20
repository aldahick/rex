import React from "react";
import { AuthRegisterForm } from "../components/auth/AuthRegisterForm";
import { FormContainer } from "../components/util/FormContainer";

export const RegisterRoute: React.FC = () => (
  <FormContainer title="Sign Up">
    <AuthRegisterForm />
  </FormContainer>
);
