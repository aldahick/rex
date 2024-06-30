import { IProjectConfig } from "@aldahick/rex-sdk";
import { Link, useActionData } from "@remix-run/react";
import React, { useEffect } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useStatus } from "../../hooks/useStatus.hook";
import { ProjectsAction } from "../../routes/projects";

export const EditProjectConfig: React.FC<{
  projectConfig: Partial<IProjectConfig> & Pick<IProjectConfig, "adapterType">;
}> = ({ projectConfig }) => {
  const status = useStatus();
  const actionData = useActionData<ProjectsAction>();

  useEffect(() => {
    if (actionData?.updated) {
      status.success(
        `Successfully updated project settings for ${projectConfig.adapterType.toLowerCase()}`,
      );
    }
  }, [actionData]);

  return (
    <>
      <FloatingLabel label="API Token">
        <Form.Control
          name="apiToken"
          type="password"
          required
          defaultValue={projectConfig.apiToken ?? ""}
        />
      </FloatingLabel>
      <FloatingLabel label="Email">
        <Form.Control
          name="email"
          type="email"
          required
          defaultValue={projectConfig.email ?? ""}
        />
      </FloatingLabel>
      <FloatingLabel label="Host">
        <Form.Control
          name="host"
          required
          defaultValue={projectConfig.host ?? ""}
        />
      </FloatingLabel>
      <div className="flex justify-around">
        <Link to={`/project/${projectConfig.adapterType}`}>
          <Button>View</Button>
        </Link>
        <Button type="submit">Save</Button>
      </div>
    </>
  );
};
