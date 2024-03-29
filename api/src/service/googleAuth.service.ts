import { injectable } from "@athenajs/core";
import * as google from "googleapis";

import { RexConfig } from "../config.js";

export interface GoogleTokenPayload {
  domain: string;
  email: string;
  userId: string;
}

@injectable()
export class GoogleAuthService {
  constructor(private readonly config: RexConfig) {}

  // TODO check
  async getIdTokenPayload(
    idToken: string,
    clientId: string | undefined,
  ): Promise<GoogleTokenPayload | undefined> {
    if (clientId === undefined) {
      throw new Error("Missing Google client ID");
    }
    const api = new google.GoogleApis();
    const ticket = await new api.auth.OAuth2().verifyIdToken({
      idToken,
      audience: clientId,
    });
    const payload = ticket.getPayload();
    const userId = ticket.getUserId();
    if (userId === null || payload?.email === undefined) {
      return undefined;
    }
    return {
      domain: payload.hd ?? "gmail.com",
      email: payload.email,
      userId,
    };
  }
}
