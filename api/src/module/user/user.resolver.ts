import {
  resolveField,
  resolveMutation,
  resolveQuery,
  resolver,
} from "@athenajs/core";

import { RexConfig } from "../../config.js";
import {
  IAuthPermission,
  IMutation,
  IMutationAddRoleToUserArgs,
  IMutationCreateUserArgs,
  IMutationSetUserPasswordArgs,
  IQuery,
  IQueryUserArgs,
  IUser,
} from "../../graphql.js";
import { UserModel } from "../../model/index.js";
import { RexContext } from "../auth/index.js";
import { RoleManager, RoleResolver } from "../role/index.js";
import { UserManager } from "./user.manager.js";

@resolver()
export class UserResolver {
  constructor(
    private readonly config: RexConfig,
    private readonly roleManager: RoleManager,
    private readonly roleResolver: RoleResolver,
    private readonly userManager: UserManager
  ) {}

  @resolveQuery()
  async user(
    root: never,
    { id }: IQueryUserArgs,
    context: RexContext
  ): Promise<IQuery["user"]> {
    let userId = context.userId;
    if (!userId) {
      throw new Error("Forbidden");
    }
    if (id && (await context.isAuthorized(IAuthPermission.ManageUsers))) {
      userId = id;
    }
    return this.makeGql(await this.userManager.fetch(userId));
  }

  @resolveQuery()
  async users(
    root: never,
    args: never,
    context: RexContext
  ): Promise<IQuery["users"]> {
    if (!(await context.isAuthorized(IAuthPermission.ManageUsers))) {
      throw new Error("Forbidden");
    }
    const users = await this.userManager.fetchAll();
    return users.map((u) => this.makeGql(u));
  }

  @resolveMutation()
  async addRoleToUser(
    root: never,
    { userId, roleId }: IMutationAddRoleToUserArgs,
    context: RexContext
  ): Promise<IMutation["addRoleToUser"]> {
    if (
      !(await context.isAuthorized(IAuthPermission.ManageUsers)) ||
      !(await context.isAuthorized(IAuthPermission.ManageRoles))
    ) {
      throw new Error("Forbidden");
    }
    await this.userManager.addRole(userId, roleId);
    return true;
  }

  @resolveMutation()
  async createUser(
    root: never,
    { email, username, password }: IMutationCreateUserArgs,
    context: RexContext
  ): Promise<IMutation["createUser"]> {
    if (
      !this.config.userRegistration &&
      !(await context.isAuthorized(IAuthPermission.ManageUsers))
    ) {
      throw new Error("Forbidden");
    }
    const user = await this.userManager.create({ email, username, password });
    return this.makeGql(user);
  }

  @resolveMutation()
  async setUserPassword(
    root: unknown,
    { userId, password }: IMutationSetUserPasswordArgs,
    context: RexContext
  ): Promise<IMutation["setUserPassword"]> {
    let id = context.userId;
    if (userId && (await context.isAuthorized(IAuthPermission.ManageUsers))) {
      id = userId;
    } else if (!id) {
      throw new Error("Forbidden");
    }
    await this.userManager.updatePassword(id, password);
    return true;
  }

  @resolveField("User.roles", true)
  async roles(users: IUser[]): Promise<IUser["roles"][]> {
    const userRoles = await this.userManager.fetchRolesByUsers(
      users.map((u) => u.id)
    );
    return users.map(
      (u) => userRoles.get(u.id)?.map((r) => this.roleResolver.makeGql(r)) ?? []
    );
  }

  @resolveField("User.permissions", true)
  async permissions(users: IUser[]): Promise<IUser["permissions"][]> {
    const userRoles = await this.userManager.fetchRolesByUsers(
      users.map((u) => u.id)
    );
    const permissions = users.map(
      (u) =>
        userRoles
          .get(u.id)
          ?.flatMap((r) => r.permissions as IAuthPermission[]) ?? []
    );
    return permissions;
  }

  makeGql(user: UserModel): IUser {
    return {
      ...user,
      username: user.username ?? undefined,
    };
  }
}
