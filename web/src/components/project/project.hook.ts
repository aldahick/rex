import { IProjectAdapterType } from "@aldahick/rex-sdk";
import { useParams } from "react-router";

type ProjectParams = ReturnType<typeof useProjectParams>;
export type ProjectParamKey = keyof ProjectParams;

export const useProjectParams = () => {
  const params = useParams();
  const adapterType = Object.values(IProjectAdapterType).find(
    (value) => value === params.adapterType,
  );
  if (!adapterType) {
    throw new Error(`Invalid adapter "${adapterType}"`);
  }
  const boardId = params.boardId ? Number.parseInt(params.boardId) : undefined;
  const sprintId = params.sprintId
    ? Number.parseInt(params.sprintId)
    : undefined;
  return { adapterType, boardId, sprintId };
};
