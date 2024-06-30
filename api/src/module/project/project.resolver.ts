import {
  IAuthPermission,
  IProject,
  IProjectIssuesArgs,
  IProjectSprintsArgs,
  IQuery,
  IQueryProjectArgs,
} from "@aldahick/rex-sdk";
import { resolveField, resolveQuery, resolver } from "@athenajs/core";
import { RexContext } from "../auth/auth.context.js";
import { ProjectConfigManager } from "./project-config.manager.js";
import { ProjectManager } from "./project.manager.js";

@resolver()
export class ProjectResolver {
  constructor(
    private readonly projectManager: ProjectManager,
    private readonly projectConfigManager: ProjectConfigManager,
  ) {}

  @resolveQuery("project")
  async get(
    root: unknown,
    { adapterType }: IQueryProjectArgs,
    context: RexContext,
  ): Promise<IQuery["project"]> {
    const userId = await this.can(context);
    const projectConfig = await this.projectConfigManager.get(
      userId,
      adapterType,
    );
    return {
      config: projectConfig,
      boards: [],
      sprints: [],
      issues: [],
    };
  }

  @resolveField("Project.boards")
  async boards(project: IProject): Promise<IProject["boards"]> {
    const adapter = this.projectManager.getAdapter(project.config.adapterType);
    return await adapter.getBoards(project.config);
  }

  @resolveField("Project.sprints")
  async sprints(
    project: IProject,
    args: IProjectSprintsArgs,
  ): Promise<IProject["sprints"]> {
    const adapter = this.projectManager.getAdapter(project.config.adapterType);
    return await adapter.getSprints(project.config, args);
  }

  @resolveField("Project.issues")
  async issues(
    project: IProject,
    args: IProjectIssuesArgs,
  ): Promise<IProject["issues"]> {
    const adapter = this.projectManager.getAdapter(project.config.adapterType);
    return await adapter.getIssues(project.config, args);
  }

  private async can(context: RexContext): Promise<string> {
    if (
      !(
        context.userId && (await context.isAuthorized(IAuthPermission.Projects))
      )
    ) {
      throw new Error("Forbidden");
    }
    return context.userId;
  }
}
