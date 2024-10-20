import { IProjectAdapterType } from "@aldahick/rex-sdk";
import { useGetProjectConfigsQuery } from "@aldahick/rex-sdk/react";
import React, { useState } from "react";
import { FloatingLabel, Form, Stack } from "react-bootstrap";
import { EditProjectConfig } from "../components/project/EditProjectConfig";
import { FormContainer } from "../components/util/FormContainer";
import { toStartCase } from "../utils/string.util";

export default function ProjectsRoute() {
  const { data } = useGetProjectConfigsQuery();
  const projectConfigs = data?.user.projectConfigs;
  const [adapterType, setAdapterType] = useState(
    projectConfigs?.[0]?.adapterType ?? IProjectAdapterType.Jira,
  );

  const handleAdapterTypeChange = (
    evt: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setAdapterType(evt.target.value as IProjectAdapterType);
  };

  const selectedProjectConfig = projectConfigs?.find(
    (c) => c.adapterType === adapterType,
  ) ?? { adapterType: IProjectAdapterType.Jira };

  return (
    <FormContainer title="Projects">
      <Stack gap={3}>
        <FloatingLabel label="Adapter Type">
          <Form.Select
            name="adapterType"
            value={adapterType ?? ""}
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
    </FormContainer>
  );
}
