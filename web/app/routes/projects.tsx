import {
  IProjectAdapterType,
  IUpdateProjectConfigParams,
} from "@aldahick/rex-sdk";
import { MetaFunction } from "@remix-run/node";
import { Form as RemixForm, useLoaderData } from "@remix-run/react";
import React, { useState } from "react";
import { FloatingLabel, Form, Stack } from "react-bootstrap";
import { z } from "zod";
import { EditProjectConfig } from "../components/project/EditProjectConfig";
import { FormContainer } from "../components/util/FormContainer";
import { withAuthRexSdk } from "../rex.sdk";
import { formToObject } from "../utils/form.util";
import { toStartCase } from "../utils/string.util";

export const meta: MetaFunction = () => [{ title: "Rex | Projects" }];

export type ProjectsLoader = typeof loader;
export const loader = withAuthRexSdk(async (sdk) => {
  const {
    user: { projectConfigs },
  } = await sdk.getProjectConfigs();
  return { projectConfigs };
});

export default function ProjectsRoute() {
  const { projectConfigs } = useLoaderData<ProjectsLoader>();
  const [selectedAdapterType, setSelectedAdapterType] = useState(
    projectConfigs[0]?.adapterType ?? IProjectAdapterType.Jira,
  );

  const handleAdapterTypeChange = (
    evt: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedAdapterType(evt.target.value as IProjectAdapterType);
  };

  const selectedProjectConfig = projectConfigs.find(
    (c) => c.adapterType === selectedAdapterType,
  ) ?? { adapterType: IProjectAdapterType.Jira };
  return (
    <FormContainer title="Projects">
      <RemixForm method="POST">
        <Stack gap={3}>
          <FloatingLabel label="Adapter Type">
            <Form.Select
              name="adapterType"
              value={selectedAdapterType ?? ""}
              onChange={handleAdapterTypeChange}
            >
              {Object.values(IProjectAdapterType).map((adapterType) => (
                <option key={adapterType} value={adapterType}>
                  {toStartCase(adapterType)}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
          <EditProjectConfig projectConfig={selectedProjectConfig} />
        </Stack>
      </RemixForm>
    </FormContainer>
  );
}

export type ProjectsAction = typeof action;
export const action = withAuthRexSdk(async (sdk, { request }) => {
  const params = formToObject(await request.formData(), updateConfigForm);
  return await sdk.updateProjectConfig({ params });
});

const updateConfigForm = z
  .object({
    adapterType: z.nativeEnum(IProjectAdapterType),
    apiToken: z.string(),
    email: z.string(),
    host: z.string(),
  })
  .transform((params): IUpdateProjectConfigParams => params);
