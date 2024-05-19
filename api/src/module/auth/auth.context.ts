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

  async isAuthorized(...permissions: IAuthPermission[]): Promise<boolean> {
    if (!this.userId) {
      return false;
    }
    if (!this.permissions) {
      this.permissions = await this.userManager.fetchPermissions(this.userId);
    }
    return permissions.every((p) => this.permissions?.has(p));
  }
}

@contextGenerator()
export class AuthContextGenerator implements ContextGenerator {
  constructor(
    private readonly authManager: AuthManager,
    private readonly userManager: UserManager,
  ) {}

  generateContext(req: ContextRequest): Promise<RexContext> {
    const token = this.getToken(req);
    if (!token) {
      return Promise.resolve(new RexContext(this.userManager));
    }
    const userId = this.authManager.getTokenUserId(token);
    return Promise.resolve(new RexContext(this.userManager, token, userId));
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
