import { injectable } from "@athenajs/core";

import { IAuthPermission } from "../../graphql.js";
import { RoleModel } from "../../model/role.model.js";
import { UserModel } from "../../model/user.model.js";
import { DatabaseService } from "../../service/database.service.js";
import { AuthManager } from "../auth/auth.manager.js";

@injectable()
export class UserManager {
  constructor(
    private readonly authManager: AuthManager,
    private readonly db: DatabaseService
  ) {}

  async exists(id: string): Promise<boolean> {
    return (await this.db.users.where({ id }).count()) === 1;
  }

  async fetchId(email: string): Promise<string> {
    return (await this.db.users.findBy({ email }).select("id")).id;
  }

  async fetchEmail(id: string): Promise<string> {
    return (await this.db.users.find(id).select("email")).email;
  }

  async fetchPermissions(userId: string): Promise<Set<IAuthPermission>> {
    const roles = await this.db.userRoles
      .where({ userId })
      .join("role")
      .select("role.permissions");
    const permissions = roles
      .flatMap((r) => r.permissions)
      .map((p) => IAuthPermission[p as keyof typeof IAuthPermission]);
    return new Set(permissions);
  }

  async fetch(id: string): Promise<UserModel> {
    const user = await this.getSafe(id);
    if (!user) {
      throw new Error(`user id=${id} not found`);
    }
    return user;
  }

  async fetchMany(): Promise<UserModel[]> {
    return this.db.users.where().selectAll();
  }

  async getSafe(id: string): Promise<UserModel | undefined> {
    const [user] = await this.db.users.selectAll().where({ id });
    return user;
  }

  async addRole(userId: string, roleId: string): Promise<void> {
    await this.db.userRoles.create({ userId, roleId });
  }

  async fetchRolesByUser(userId: string): Promise<RoleModel[]> {
    const userRoles = await this.db.userRoles
      .join("role")
      .select("role.*")
      .where({ userId });
    return userRoles.map((ur) => ur.role);
  }

  /**
   * @returns key: user ID
   */
  async fetchRolesByUsers(
    userIds: string[]
  ): Promise<Map<string, RoleModel[]>> {
    const userRoles = await this.db.userRoles
      .join("role")
      .select("role.*", "userId")
      .whereIn("userId", userIds);
    const roleMap = new Map<string, RoleModel[]>();
    for (const { userId, role } of userRoles) {
      const mappedRoles = roleMap.get(userId);
      roleMap.set(userId, (mappedRoles ?? []).concat([role]));
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
    const query = this.whereEmailOrUsername(email, username);
    if (await query.count()) {
      throw new Error(`User ${email} already exists`);
    }
    return await this.db.users.create({
      email,
      username,
      ...(password
        ? { passwordHash: await this.authManager.hashPassword(password) }
        : {}),
    });
  }

  async updatePassword(id: string, password: string): Promise<void> {
    await this.db.users.find(id).update({
      passwordHash: await this.authManager.hashPassword(password),
    });
  }

  whereEmailOrUsername(email: string, username?: string) {
    let query = this.db.users.where({ email }).or({ username: email });
    if (username?.length) {
      query = query.or({ username }).or({ email: username });
    }
    return query;
  }
}
