import { IProjectConfig, IUpdateProjectConfigParams } from "@aldahick/rex-sdk";
import { useUpdateProjectConfigMutation } from "@aldahick/rex-sdk/react";
import React, { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useStatus } from "../../hooks/useStatus.hook";

export const EditProjectConfig: React.FC<{
  projectConfig: Partial<IProjectConfig> & Pick<IProjectConfig, "adapterType">;
}> = ({ projectConfig }) => {
  const status = useStatus();
  const [updateProjectConfig] = useUpdateProjectConfigMutation();
  const [fields, setFields] = useState<IUpdateProjectConfigParams>({
    apiToken: projectConfig.apiToken ?? "",
    adapterType: projectConfig.adapterType,
    email: projectConfig.email ?? "",
    host: projectConfig.host ?? "",
  });

  const handleChange =
    (key: keyof IProjectConfig) => (evt: React.ChangeEvent<HTMLInputElement>) =>
      setFields((prev) => ({ ...prev, [key]: evt.target.value }));

  const handleSave = () => {
    updateProjectConfig({ variables: { params: fields } }).then(() => {
      status.success(
        `Successfully updated project settings for ${projectConfig.adapterType.toLowerCase()}`,
      );
    });
  };

  return (
    <>
      <FloatingLabel label="API Token">
        <Form.Control
          name="apiToken"
          type="password"
          required
          value={fields.apiToken}
          onChange={handleChange("apiToken")}
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
      <FloatingLabel label="Host">
        <Form.Control
          name="host"
          required
          value={fields.host}
          onChange={handleChange("host")}
        />
      </FloatingLabel>
      <div className="flex justify-around">
        <Link to={`/project/${projectConfig.adapterType}`}>
          <Button>View</Button>
        </Link>
        <Button type="submit" onClick={handleSave}>
          Save
        </Button>
      </div>
    </>
  );
};
