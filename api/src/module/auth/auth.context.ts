import { IAuthPermission } from "@aldahick/rex-sdk";
import {
  ContextGenerator,
  ContextRequest,
  contextGenerator,
} from "@athenajs/core";
import { UserModel } from "../../model/user.model.js";
import { UserManager } from "../user/user.manager.js";
import { AuthManager } from "./auth.manager.js";

export class RexContext {
  private permissions?: Set<IAuthPermission>;
  private user?: UserModel;

  constructor(
    private readonly userManager: UserManager,
    readonly token?: string,
    readonly userId?: string,
  ) {}

  async isAuthorized(...permissions: IAuthPermission[]): Promise<boolean> {
    if (!this.userId) {
      return false;
    }
    await this.getUser().catch(() => undefined);
    return permissions.every((p) => this.permissions?.has(p));
  }

  async getUser() {
    if (this.user) {
      return this.user;
    }
    if (!this.userId) {
      throw new Error();
    }
    // TODO replace with better-performing single query once ORM works better
    [this.user, this.permissions] = await Promise.all([
      await this.userManager.fetch({ id: this.userId }),
      await this.userManager.fetchPermissions(this.userId),
    ]);
    return this.user;
  }
}

@contextGenerator()
export class AuthContextGenerator implements ContextGenerator {
  constructor(
    private readonly authManager: AuthManager,
    private readonly userManager: UserManager,
  ) {}

  httpContext(req: ContextRequest): Promise<RexContext> {
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
