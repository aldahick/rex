import {
  ContextGenerator,
  ContextRequest,
  contextGenerator,
} from "@athenajs/core";

import { IAuthPermission } from "../../graphql.js";
import { UserManager } from "../user/user.manager.js";
import { AuthManager } from "./auth.manager.js";

export class RexContext {
  private permissions?: Set<IAuthPermission>;

  constructor(
    private readonly userManager: UserManager,
    readonly token?: string,
    readonly userId?: string,
  ) {}

  async isAuthorized(permission: IAuthPermission): Promise<boolean> {
    if (!this.userId) {
      return false;
    }
    if (this.permissions) {
      return this.permissions.has(permission);
    }
    this.permissions = await this.userManager.fetchPermissions(this.userId);
    return this.permissions.has(permission);
  }
}

@contextGenerator()
export class AuthContextGenerator implements ContextGenerator {
  constructor(
    private readonly authManager: AuthManager,
    private readonly userManager: UserManager,
  ) {}

  async generateContext(req: ContextRequest): Promise<RexContext> {
    const token = this.getToken(req);
    if (!token) {
      return new RexContext(this.userManager);
    }
    const userId = this.authManager.getTokenUserId(token);
    return new RexContext(this.userManager, token, userId);
  }

  private getToken({ headers, query }: ContextRequest): string | undefined {
    if (query.token) {
      return query.token;
    }
    const auth = headers.authorization;
    if (!auth) {
      return undefined;
    }
    const [type, token] = auth.split(" ");
    return type?.toLocaleLowerCase() === "bearer" ? token : undefined;
  }
}
