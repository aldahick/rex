import {
  IAuthPermission,
  IMutation,
  IMutationCreateUserArgs,
  IMutationUpdateUserArgs,
  IQuery,
  IQueryUserArgs,
  IUser,
} from "@aldahick/rex-sdk";
import {
  resolveField,
  resolveMutation,
  resolveQuery,
  resolver,
} from "@athenajs/core";
import { RexConfig } from "../../config.js";
import { UserModel } from "../../model/index.js";
import { RexContext } from "../auth/auth.context.js";
import { RoleResolver } from "../role/role.resolver.js";
import { UserManager } from "./user.manager.js";

@resolver()
export class UserResolver {
  constructor(
    private readonly config: RexConfig,
    private readonly roleResolver: RoleResolver,
    private readonly userManager: UserManager,
  ) {}

  @resolveQuery()
  async user(
    root: never,
    { id }: IQueryUserArgs,
    context: RexContext,
  ): Promise<IQuery["user"]> {
    let userId = context.userId;
    if (!userId) {
      throw new Error("Forbidden");
    }
    if (id && (await context.isAuthorized(IAuthPermission.AdminUsers))) {
      userId = id;
    }
    return this.makeGql(await this.userManager.fetch(userId));
  }

  @resolveQuery()
  async users(
    root: never,
    args: never,
    context: RexContext,
  ): Promise<IQuery["users"]> {
    if (!(await context.isAuthorized(IAuthPermission.AdminUsers))) {
      throw new Error("Forbidden");
    }
    const users = await this.userManager.fetchAll();
    return users.map((u) => this.makeGql(u));
  }

  @resolveMutation()
  async createUser(
    root: never,
    { params: { email, username, password } }: IMutationCreateUserArgs,
    context: RexContext,
  ): Promise<IMutation["createUser"]> {
    if (
      !(
        this.config.userRegistration ||
        (await context.isAuthorized(IAuthPermission.AdminUsers))
      )
    ) {
      throw new Error("Forbidden");
    }
    const user = await this.userManager.create({ email, username, password });
    return this.makeGql(user);
  }

  @resolveMutation()
  async updateUser(
    root: unknown,
    { params: { id, roleIds, ...fields } }: IMutationUpdateUserArgs,
    context: RexContext,
  ): Promise<IMutation["updateUser"]> {
    let userId = context.userId;
    if (id && (await context.isAuthorized(IAuthPermission.AdminUsers))) {
      userId = id;
    } else if (!id) {
      throw new Error("Forbidden");
    }
    if (roleIds) {
      if (!(await context.isAuthorized(IAuthPermission.AdminRoles))) {
        throw new Error("Forbidden");
      }
      await this.userManager.updateRoles(id, roleIds);
    }
    if (Object.keys(fields).length) {
      await this.userManager.update(id, fields);
    }
    return true;
  }

  @resolveField("User.roles", true)
  async roles(users: IUser[]): Promise<IUser["roles"][]> {
    const userRoles = await this.userManager.fetchRolesByUsers(
      users.map((u) => u.id),
    );
    return users.map(
      (u) =>
        userRoles.get(u.id)?.map((r) => this.roleResolver.makeGql(r)) ?? [],
    );
  }

  @resolveField("User.permissions", true)
  async permissions(users: IUser[]): Promise<IUser["permissions"][]> {
    const userRoles = await this.userManager.fetchRolesByUsers(
      users.map((u) => u.id),
    );
    const permissions = users.map(
      (u) =>
        userRoles
          .get(u.id)
          ?.flatMap((r) => r.permissions as IAuthPermission[]) ?? [],
    );
    return permissions;
  }

  makeGql(user: UserModel): IUser {
    return {
      ...user,
      username: user.username ?? undefined,
      projectConfigs: [],
    };
  }
}
