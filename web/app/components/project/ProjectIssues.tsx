import React from "react";
import { Table } from "react-bootstrap";
import { sortBy } from "remeda";
import { useProject } from "./project.atom";

export const ProjectIssues: React.FC = () => {
  const [project] = useProject();
  if (!(project && "issues" in project)) {
    return null;
  }

  return (
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
  );
};
