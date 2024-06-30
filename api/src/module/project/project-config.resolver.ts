import {
  IAuthPermission,
  IMutation,
  IMutationDeleteProjectConfigArgs,
  IMutationUpdateProjectConfigArgs,
  IUser,
} from "@aldahick/rex-sdk";
import { resolveField, resolveMutation, resolver } from "@athenajs/core";
import { RexContext } from "../auth/auth.context.js";
import { ProjectConfigManager } from "./project-config.manager.js";

@resolver()
export class ProjectConfigResolver {
  constructor(private readonly projectConfigManager: ProjectConfigManager) {}

  @resolveMutation()
  async deleteProjectConfig(
    root: unknown,
    { adapterType }: IMutationDeleteProjectConfigArgs,
    context: RexContext,
  ): Promise<IMutation["deleteProjectConfig"]> {
    const userId = await this.can(context);
    return await this.projectConfigManager.delete(userId, adapterType);
  }

  @resolveMutation()
  async updateProjectConfig(
    root: unknown,
    { params }: IMutationUpdateProjectConfigArgs,
    context: RexContext,
  ): Promise<IMutation["updateProjectConfig"]> {
    const userId = await this.can(context);
    return await this.projectConfigManager.upsert(userId, params);
  }

  @resolveField("User.projectConfigs", true)
  async getProjectConfigs(users: IUser[]): Promise<IUser["projectConfigs"][]> {
    const projectConfigs = await this.projectConfigManager.getMany(
      users.map((u) => u.id),
    );
    return users.map((user) =>
      projectConfigs.filter((config) => config.userId === user.id),
    );
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
