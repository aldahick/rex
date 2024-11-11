import { IAuthPermission } from "@aldahick/rex-sdk";
import { injectable } from "@athenajs/core";
import { filter, isTruthy } from "remeda";
import { RoleModel } from "../../model/role.model.js";
import { UserModel } from "../../model/user.model.js";
import { DatabaseService } from "../../service/database/database.service.js";
import { AuthManager } from "../auth/auth.manager.js";

@injectable()
export class UserManager {
  constructor(
    private readonly authManager: AuthManager,
    private readonly db: DatabaseService,
  ) {}

  async exists(id: string): Promise<boolean> {
    return (await this.db.users.where({ id }).count()) === 1;
  }

  async fetch(filter: { id: string } | { email: string }): Promise<UserModel> {
    return await this.db.users.selectAll().where(filter).take();
  }

  async fetchMany(ids: string[]): Promise<Map<string, UserModel>> {
    const users = await this.db.users.whereIn({ id: ids }).selectAll();
    return new Map(users.map((user) => [user.id, user]));
  }

  async fetchAll(): Promise<UserModel[]> {
    return await this.db.users.where().selectAll();
  }

  async fetchPermissions(id: string) {
    const roles = await this.db.userRoles
      .where({ userId: id })
      .join("role")
      .select("role.permissions");
    return new Set(
      roles.flatMap((role) =>
        role.permissions.map((value) => {
          const permission = Object.values(IAuthPermission).find(
            (p) => p === value,
          );
          if (!permission) {
            throw new Error(`Permission value invalid: "${permission}"`);
          }
          return permission;
        }),
      ),
    );
  }

  async fetchRolesByUser(userId: string): Promise<RoleModel[]> {
    const userRoles = await this.db.userRoles
      .join("role")
      .select({
        role: "role.*",
      })
      .where({ userId });
    return filter(
      userRoles.map((ur) => ur.role),
      isTruthy,
    );
  }

  /**
   * @returns key: user ID
   */
  async fetchRolesByUsers(
    userIds: string[],
  ): Promise<Map<string, RoleModel[]>> {
    const roles = await this.db.roles
      .join("users")
      .select("*", "users.userId")
      .where({
        "users.userId": {
          in: userIds,
        },
      });
    const roleMap = new Map<string, RoleModel[]>();
    for (const { userId, ...role } of roles) {
      const mappedRoles = roleMap.get(userId) ?? [];
      if (role) {
        mappedRoles.push(role);
      }
      roleMap.set(userId, mappedRoles);
    }
    return roleMap;
  }

  async create({
    email,
    username,
    password,
  }: {
    email: string;
    username?: string;
    password?: string;
  }): Promise<UserModel> {
    return await this.db.users
      .create({
        email,
        username,
        ...(password
          ? { passwordHash: await this.authManager.hashPassword(password) }
          : {}),
      })
      .selectAll();
  }

  async update(
    id: string,
    {
      password,
      ...fields
    }: Partial<Pick<UserModel, "email" | "username"> & { password: string }>,
  ): Promise<void> {
    const updateFields = {
      ...fields,
      ...(password
        ? { passwordHash: await this.authManager.hashPassword(password) }
        : {}),
    };
    await this.db.users.find(id).update(updateFields);
  }

  async updateRoles(userId: string, roleIds: string[]): Promise<void> {
    await this.db.transaction(async () => {
      await this.db.userRoles
        .where({ userId, roleId: { notIn: roleIds } })
        .delete();
      await this.db.userRoles
        .createMany(roleIds.map((roleId) => ({ userId, roleId })))
        .onConflictDoNothing();
    });
  }

  whereEmailOrUsername(email: string, username?: string) {
    let query = this.db.users.where({ email }).orWhere({ username: email });
    if (username?.length) {
      query = query.orWhere({ username }).orWhere({ email: username });
    }
    return query;
  }
}
