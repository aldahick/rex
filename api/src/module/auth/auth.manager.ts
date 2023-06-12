import { injectable } from "@athenajs/core";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

import { Config } from "../../config.js";
import { UserModel } from "../../model/index.js";

@injectable()
export class AuthManager {
  constructor(private config: Config) {}

  signToken(userId: string): string {
    return jwt.sign({ sub: userId }, this.config.http.jwtKey);
  }

  comparePassword(input: string, hash: string): Promise<boolean> {
    return bcrypt.compare(input, hash);
  }

  hashPassword(input: string): Promise<string> {
    return bcrypt.hash(input, 16);
  }

  makeToken(user: Pick<UserModel, "id">): string {
    return jwt.sign({ sub: user.id }, this.config.http.jwtKey);
  }

  getTokenUserId(token: string): string | undefined {
    const payload = jwt.verify(token, this.config.http.jwtKey);
    if (typeof payload === "string" || !payload.sub) {
      return undefined;
    }
    return payload.sub;
  }
}
