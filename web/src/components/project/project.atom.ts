import {
  IGetProjectBoardQuery,
  IGetProjectBoardsQuery,
  IGetProjectSprintQuery,
} from "@aldahick/rex-sdk";
import { atom, useAtom } from "jotai";

const projectAtom =
  atom<
    (
      | IGetProjectBoardsQuery
      | IGetProjectBoardQuery
      | IGetProjectSprintQuery
    )["project"]
  >();
export const useProject = () => useAtom(projectAtom);
