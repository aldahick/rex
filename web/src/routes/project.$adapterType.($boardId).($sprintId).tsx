import {
  useGetProjectBoardLazyQuery,
  useGetProjectBoardsLazyQuery,
  useGetProjectSprintLazyQuery,
} from "@aldahick/rex-sdk/react";
import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { ProjectBoardSprintSelect } from "../components/project/ProjectBoardSprintSelect";
import { ProjectIssues } from "../components/project/ProjectIssues";
import { useProject } from "../components/project/project.atom";
import { useProjectParams } from "../components/project/project.hook";

export const ProjectRoute: React.FC = () => {
  const [getProjectBoards] = useGetProjectBoardsLazyQuery({
    onCompleted: ({ project }) => setProject(project),
  });
  const [getProjectBoard] = useGetProjectBoardLazyQuery({
    onCompleted: ({ project }) => setProject(project),
  });
  const [getProjectSprint] = useGetProjectSprintLazyQuery({
    onCompleted: ({ project }) => setProject(project),
  });
  const { adapterType, boardId, sprintId } = useProjectParams();
  const [, setProject] = useProject();

  useEffect(() => {
    if (boardId && sprintId) {
      getProjectSprint({ variables: { adapterType, boardId, sprintId } });
    } else if (boardId) {
      getProjectBoard({ variables: { adapterType, boardId } });
    } else {
      getProjectBoards({ variables: { adapterType } });
    }
  }, [adapterType, boardId, sprintId]);

  return (
    <Container>
      <Row>
        <ProjectBoardSprintSelect />
      </Row>
      <ProjectIssues />
    </Container>
  );
};
