import React, { useEffect, useState } from "react";
import { Container, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { FileList } from "./FileList";
import { useRoot } from "./file.atom";

export const FileBrowser: React.FC = () => {
  const navigate = useNavigate();
  const [root] = useRoot();
  const [directory, setDirectory] = useState(root?.key ?? "");

  useEffect(() => {
    if (root) {
      setDirectory(root.key);
    }
  }, [root?.key]);

  return (
    <Container className="mt-4">
      <FloatingLabel label="Directory">
        <Form.Control
          name="directory"
          value={`/${directory}`}
          onChange={(evt) => {
            setDirectory(evt.target.value.slice(1));
          }}
          onKeyUp={(evt) => {
            if (evt.key === "Enter") {
              navigate(`/media/${directory}`);
            }
          }}
        />
      </FloatingLabel>
      <FileList />
    </Container>
  );
};
