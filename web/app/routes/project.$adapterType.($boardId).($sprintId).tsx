import {
  IGetProjectBoardQuery,
  IGetProjectBoardsQuery,
  IGetProjectSprintQuery,
  IProjectAdapterType,
} from "@aldahick/rex-sdk";
import { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Container, Row, Table } from "react-bootstrap";
import { sortBy } from "remeda";
import { ProjectBoardSprintSelect } from "../components/project/ProjectBoardSprintSelect";
import { withAuthRexSdk } from "../rex.sdk";
import { toStartCase } from "../utils/string.util";

export const meta: MetaFunction = ({ params }) => [
  { title: `Rex | Project ${toStartCase(params.adapterType ?? "")}` },
];

export type ProjectParams = "adapterType" | "boardId" | "sprintId";

export type ProjectLoader = typeof loader;
export const loader = withAuthRexSdk<
  IGetProjectBoardsQuery | IGetProjectBoardQuery | IGetProjectSprintQuery
>(async (sdk, { params }) => {
  const adapterType = params.adapterType as IProjectAdapterType;
  const boardId = params.boardId ? Number.parseInt(params.boardId) : undefined;
  const sprintId = params.sprintId
    ? Number.parseInt(params.sprintId)
    : undefined;
  if (sprintId && boardId) {
    return await sdk.getProjectSprint({ adapterType, boardId, sprintId });
  }
  if (boardId) {
    return await sdk.getProjectBoard({ adapterType, boardId });
  }
  return await sdk.getProjectBoards({ adapterType });
});

export default function ProjectRoute() {
  const { project } = useLoaderData<ProjectLoader>();

  return (
    <Container>
      <Row>
        <ProjectBoardSprintSelect />
      </Row>
      {"issues" in project && (
        <Table>
          <thead>
            <tr>
              <th>Key</th>
              <th>Title</th>
              <th>State</th>
              <th>Story Points</th>
              <th>Implementer</th>
            </tr>
          </thead>
          <tbody>
            {sortBy(project.issues, (i) => i.key.toLowerCase()).map((issue) => (
              <tr key={issue.id}>
                <td>
                  <a href={`${project.config.host}/browse/${issue.key}`}>
                    {issue.key}
                  </a>
                </td>
                <td>{issue.title}</td>
                <td>{issue.state}</td>
                <td>{issue.storyPoints ?? ""}</td>
                <td>{issue.implementer?.name ?? ""}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
