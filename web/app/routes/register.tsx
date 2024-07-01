import { ICreateUserParams } from "@aldahick/rex-sdk";
import { ActionFunctionArgs, MetaFunction, redirect } from "@remix-run/node";
import { z } from "zod";
import { AuthRegisterForm } from "../components/auth/AuthRegisterForm";
import { FormContainer } from "../components/util/FormContainer";
import { getRexSdk } from "../rex.sdk";
import { formToObject } from "../utils/form.util";

export const meta: MetaFunction = () => [{ title: "Rex | Register" }];

export default function RegisterRoute() {
  return (
    <FormContainer title="Sign Up">
      <AuthRegisterForm />
    </FormContainer>
  );
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const sdk = getRexSdk();
  const params = formToObject(await request.formData(), registerForm);
  await sdk.createUser({ params });
  const searchParams = new URLSearchParams({ username: params.username ?? "" });
  return redirect(`/login${params.username ? `?${searchParams}` : ""}`);
};

const registerForm = z
  .object({
    username: z.string(),
    email: z.string(),
    password: z.string(),
  })
  .transform((params): ICreateUserParams => params);
