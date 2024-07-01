import {
  IProjectAdapterType,
  IProjectBoard,
  IProjectConfig,
  IProjectIssue,
  IProjectIssuesArgs,
  IProjectSprint,
  IProjectSprintsArgs,
} from "@aldahick/rex-sdk";
import { injectAll, makeRegistryDecorator } from "@athenajs/core";

const projectAdapterSymbol = Symbol("ProjectAdapter");
export const projectAdapter = makeRegistryDecorator(projectAdapterSymbol);
export const injectProjectAdapters = () => injectAll(projectAdapterSymbol);

export interface BaseProjectAdapter {
  type: IProjectAdapterType;
  getBoards(config: IProjectConfig): Promise<IProjectBoard[]>;
  getSprints(
    config: IProjectConfig,
    filter: IProjectSprintsArgs,
  ): Promise<IProjectSprint[]>;
  getIssues(
    config: IProjectConfig,
    filter: IProjectIssuesArgs,
  ): Promise<IProjectIssue[]>;
}
