import React, { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { sortBy } from "remeda";
import { FormCol } from "../util/FormContainer";
import { useProject } from "./project.atom";
import { ProjectParamKey, useProjectParams } from "./project.hook";

export const ProjectBoardSprintSelect: React.FC = () => {
  const navigate = useNavigate();
  const [params, setParams] = useState(useProjectParams());
  const [project] = useProject();

  if (!project) {
    return null;
  }

  const handleChange =
    (key: ProjectParamKey) => (evt: React.ChangeEvent<HTMLSelectElement>) => {
      setParams((prev) => ({
        ...prev,
        [key]: evt.target.value,
      }));
    };

  const handleBoardSelect = () => {
    if (params.boardId) {
      navigate(`/project/${params.adapterType}/${params.boardId}`);
    }
  };

  const handleSprintSelect = () => {
    if (params.boardId && params.sprintId) {
      navigate(
        `/project/${params.adapterType}/${params.boardId}/${params.sprintId}`,
      );
    }
  };

  return (
    <FormCol>
      <div className="flex justify-between">
        <FloatingLabel label="Board" className="w-full">
          <Form.Select
            name="boardId"
            value={params.boardId}
            onChange={handleChange("boardId")}
          >
            {sortBy(project.boards, (b) => b.name.toLocaleLowerCase()).map(
              ({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ),
            )}
          </Form.Select>
        </FloatingLabel>
        <Button onClick={handleBoardSelect}>Select</Button>
      </div>
      {"sprints" in project && (
        <div className="flex justify-between">
          <FloatingLabel label="Sprint" className="w-full">
            <Form.Select
              name="sprintId"
              value={params.sprintId}
              onChange={handleChange("sprintId")}
            >
              {sortBy(project.sprints, (s) =>
                s.start ? new Date(s.start).getTime() : 0,
              )
                .reverse()
                .map((sprint) => (
                  <option key={sprint.id} value={sprint.id}>
                    {sprint.name} ({sprint.state})
                  </option>
                ))}
            </Form.Select>
          </FloatingLabel>
          <Button onClick={handleSprintSelect}>Select</Button>
        </div>
      )}
    </FormCol>
  );
};
