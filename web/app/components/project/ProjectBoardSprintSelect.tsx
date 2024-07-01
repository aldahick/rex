import { useLoaderData, useNavigate, useParams } from "@remix-run/react";
import React from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { sortBy } from "remeda";
import {
  ProjectLoader,
  ProjectParams,
} from "../../routes/project.$adapterType.($boardId).($sprintId)";
import { getFormInput } from "../../utils/form.util";
import { FormCol } from "../util/FormContainer";

export const ProjectBoardSprintSelect: React.FC = () => {
  const { project } = useLoaderData<ProjectLoader>();
  const navigate = useNavigate();
  const params = useParams<ProjectParams>();

  const {
    config: { adapterType },
  } = project;

  const handleBoardSelect = (evt: React.MouseEvent) => {
    const boardId = getFormInput(
      evt.currentTarget.parentElement,
      "boardId",
    )?.value;
    if (boardId) {
      navigate(`/project/${adapterType}/${boardId}`);
    }
  };

  const handleSprintSelect = (evt: React.MouseEvent) => {
    const sprintId = getFormInput(
      evt.currentTarget.parentElement,
      "sprintId",
    )?.value;
    if (params.boardId && sprintId) {
      navigate(`/project/${adapterType}/${params.boardId}/${sprintId}`);
    }
  };

  return (
    <FormCol>
      <div className="flex justify-between">
        <FloatingLabel label="Board" className="w-full">
          <Form.Select name="boardId" defaultValue={params.boardId}>
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
            <Form.Select name="sprintId" defaultValue={params.sprintId}>
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
