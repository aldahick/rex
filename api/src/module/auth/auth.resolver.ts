import {
  IAuthPermission,
  IAuthToken,
  IAuthTokenParams,
  IQuery,
  IQueryAuthTokenArgs,
} from "@aldahick/rex-sdk";
import { resolveField, resolveQuery, resolver } from "@athenajs/core";
import { GoogleAuthService } from "../../service/google/google-auth.service.js";
import { UserManager } from "../user/user.manager.js";
import { UserResolver } from "../user/user.resolver.js";
import { RexContext } from "./auth.context.js";
import { AuthManager } from "./auth.manager.js";

@resolver()
export class AuthResolver {
  constructor(
    private readonly authManager: AuthManager,
    private readonly googleAuthService: GoogleAuthService,
    private readonly userManager: UserManager,
    private readonly userResolver: UserResolver,
  ) {}

  @resolveQuery()
  async authToken(
    root: never,
    { params }: IQueryAuthTokenArgs,
    context: RexContext,
  ): Promise<IQuery["authToken"]> {
    const userId = await this.getUserId(params, context);
    return this.getAuthToken(userId);
  }

  @resolveField("AuthToken.user", true)
  async user(tokens: IAuthToken[]): Promise<IAuthToken["user"][]> {
    const userIds = tokens.map((t) => t.userId);
    const users = await this.userManager.fetchMany(userIds);
    return userIds.map((id) => {
      const user = users.get(id);
      if (!user) {
        throw new Error(`User ID "${id}" not found in database`);
      }
      return this.userResolver.makeGql(user);
    });
  }

  private async getUserId(
    { userId: actingUserId, google, local }: IAuthTokenParams,
    context: RexContext,
  ) {
    if (actingUserId) {
      if (!(await context.isAuthorized(IAuthPermission.AdminUsers))) {
        throw new Error("Forbidden");
      }
      if (!(await this.userManager.exists(actingUserId))) {
        throw new Error(`User not found: ${actingUserId}`);
      }
      return actingUserId;
    }

    if (google) {
      const googlePayload = await this.googleAuthService.getIdTokenPayload(
        google.idToken,
      );
      if (!googlePayload) {
        throw new Error("Invalid Google token");
      }
      const userId = await this.userManager.fetchId(googlePayload.email);
      if (!userId) {
        throw Error(`User not found: ${googlePayload.email}`);
      }
      return userId;
    }

    if (local) {
      const [user] = await this.userManager
        .whereEmailOrUsername(local.username)
        .select("id", "passwordHash");
      if (!user?.passwordHash) {
        throw new Error("Invalid username/email or password");
      }
      const isValid = await this.authManager.comparePassword(
        local.password,
        user.passwordHash,
      );
      if (!isValid) {
        throw new Error("Invalid username/email or password");
      }
      return user.id;
    }

    throw new Error("One field must be provided in AuthTokenParams");
  }

  private getAuthToken(userId: string): IAuthToken {
    return {
      token: this.authManager.signToken(userId),
      userId,
      user: {} as never,
    };
  }
}
