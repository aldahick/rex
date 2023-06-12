import { resolveMutation, resolver } from "@athenajs/core";

import { Config } from "../../config.js";
import {
  IAuthClientType,
  IAuthPermission,
  IAuthToken,
  IMutation,
  IMutationCreateAuthTokenArgs,
  IMutationCreateAuthTokenGoogleArgs,
  IMutationCreateAuthTokenLocalArgs,
} from "../../graphql.js";
import { DatabaseService } from "../../service/database.service.js";
import { GoogleAuthService } from "../../service/googleAuth.service.js";
import { UserManager } from "../user/index.js";
import { AuthContext } from "./auth.context.js";
import { AuthManager } from "./auth.manager.js";

const clientIdsByType: Record<
  IAuthClientType,
  keyof Config["googleAuth"]["clientIds"]
> = {
  [IAuthClientType.Mobile]: "mobile",
  [IAuthClientType.Web]: "web",
};

@resolver()
export class AuthResolver {
  constructor(
    private readonly authManager: AuthManager,
    private readonly config: Config,
    private readonly db: DatabaseService,
    private readonly googleAuthService: GoogleAuthService,
    private readonly userManager: UserManager
  ) {}

  @resolveMutation()
  async createAuthTokenGoogle(
    root: never,
    { googleIdToken, clientType }: IMutationCreateAuthTokenGoogleArgs
  ): Promise<IMutation["createAuthTokenGoogle"]> {
    const googlePayload = await this.googleAuthService.getIdTokenPayload(
      googleIdToken,
      this.config.googleAuth.clientIds[clientIdsByType[clientType]]
    );
    if (!googlePayload) {
      throw new Error("Invalid Google token");
    }
    const userId = await this.userManager.fetchId(googlePayload.email);
    if (!userId) {
      throw Error(`User not found: ${googlePayload.email}`);
    }
    return this.getAuthToken(userId);
  }

  @resolveMutation()
  async createAuthTokenLocal(
    root: never,
    { username, password }: IMutationCreateAuthTokenLocalArgs
  ): Promise<IMutation["createAuthTokenLocal"]> {
    const [user] = await this.userManager
      .whereEmailOrUsername(username)
      .select("id", "passwordHash");
    if (!user?.passwordHash) {
      throw new Error("Invalid username/email or password");
    }
    const isValid = await this.authManager.comparePassword(
      password,
      user.passwordHash
    );
    if (!isValid) {
      throw new Error("Invalid username/email or password");
    }
    return this.getAuthToken(user.id);
  }

  @resolveMutation()
  async createAuthToken(
    root: never,
    { userId }: IMutationCreateAuthTokenArgs,
    context: AuthContext
  ): Promise<IMutation["createAuthToken"]> {
    if (!(await context.isAuthorized(IAuthPermission.ManageUsers))) {
      throw new Error("Forbidden");
    }
    if (await this.userManager.exists(userId)) {
      return this.getAuthToken(userId);
    } else {
      throw new Error(`User ${userId} not found`);
    }
  }

  private getAuthToken(userId: string): IAuthToken {
    return {
      token: this.authManager.signToken(userId),
      userId,
      user: {} as never,
    };
  }
}
