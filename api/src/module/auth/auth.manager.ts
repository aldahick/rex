import { injectable } from "@athenajs/core";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { RexConfig } from "../../config.js";

@injectable()
export class AuthManager {
  constructor(private config: RexConfig) {}

  signToken(userId: string): string {
    return jwt.sign({ sub: userId }, this.config.http.jwtKey);
  }

  comparePassword(input: string, hash: string): Promise<boolean> {
    return bcrypt.compare(input, hash);
  }

  hashPassword(input: string): Promise<string> {
    return bcrypt.hash(input, 12);
  }

  getTokenUserId(token: string): string | undefined {
    const payload = jwt.verify(token, this.config.http.jwtKey);
    if (typeof payload === "string" || !payload.sub) {
      return undefined;
    }
    return payload.sub;
  }
}
