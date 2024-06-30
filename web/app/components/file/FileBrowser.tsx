import { useLoaderData } from "@remix-run/react";
import React from "react";
import { Container, FloatingLabel, Form } from "react-bootstrap";
import { MediaLoader } from "../../routes/media.$";
import { FileList } from "./FileList";

export const FileBrowser: React.FC = () => {
  const { root } = useLoaderData<MediaLoader>();

  return (
    <Container className="mt-4">
      <FloatingLabel label="Directory">
        <Form.Control name="directory" defaultValue={`/${root?.key ?? ""}`} />
      </FloatingLabel>
      <FileList />
    </Container>
  );
};
