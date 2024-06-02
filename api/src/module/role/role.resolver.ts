import { resolveMutation, resolveQuery, resolver } from "@athenajs/core";
import {
  IAuthPermission,
  IMutation,
  IMutationCreateRoleArgs,
  IMutationDeleteRoleArgs,
  IMutationUpdateRoleArgs,
  IMutationUpdateRolePermissionsArgs,
  IQuery,
  IRole,
} from "../../graphql.js";
import { RoleModel } from "../../model/index.js";
import { RexContext } from "../auth/auth.context.js";
import { RoleManager } from "./role.manager.js";

@resolver()
export class RoleResolver {
  constructor(private readonly roleManager: RoleManager) {}

  @resolveQuery()
  async roles(
    root: never,
    args: never,
    context: RexContext,
  ): Promise<IQuery["roles"]> {
    if (!context.userId) {
      throw new Error("Forbidden");
    }
    const roles = await this.roleManager.fetchMany();
    return roles.map((r) => this.makeGql(r));
  }

  @resolveMutation()
  async createRole(
    root: unknown,
    { name }: IMutationCreateRoleArgs,
    context: RexContext,
  ): Promise<IMutation["createRole"]> {
    if (!(await context.isAuthorized(IAuthPermission.AdminRoles))) {
      throw new Error("Forbidden");
    }
    const role = await this.roleManager.create(name);
    return this.makeGql(role);
  }

  @resolveMutation()
  async deleteRole(
    root: unknown,
    { id }: IMutationDeleteRoleArgs,
    context: RexContext,
  ): Promise<IMutation["deleteRole"]> {
    if (!(await context.isAuthorized(IAuthPermission.AdminRoles))) {
      throw new Error("Forbidden");
    }
    await this.roleManager.delete(id);
    return true;
  }

  @resolveMutation()
  async updateRole(
    root: unknown,
    { id, name }: IMutationUpdateRoleArgs,
    context: RexContext,
  ): Promise<IMutation["updateRole"]> {
    if (!(await context.isAuthorized(IAuthPermission.AdminRoles))) {
      throw new Error("Forbidden");
    }
    await this.roleManager.update(id, { name });
    return true;
  }

  @resolveMutation()
  async updateRolePermissions(
    root: unknown,
    { id, permissions }: IMutationUpdateRolePermissionsArgs,
    context: RexContext,
  ): Promise<IMutation["updateRolePermissions"]> {
    if (!(await context.isAuthorized(IAuthPermission.AdminRoles))) {
      throw new Error("Forbidden");
    }
    await this.roleManager.updatePermissions(id, permissions);
    return true;
  }

  makeGql(role: RoleModel): IRole {
    return {
      ...role,
      permissions: role.permissions as IAuthPermission[],
    };
  }
}
