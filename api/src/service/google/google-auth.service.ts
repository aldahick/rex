import { injectable } from "@athenajs/core";
import { OAuth2Client } from "google-auth-library";
import { RexConfig } from "../../config.js";

export interface GoogleTokenPayload {
  domain: string;
  email: string;
  userId: string;
}

@injectable()
export class GoogleAuthService {
  constructor(private readonly config: RexConfig) {}

  async getIdTokenPayload(
    idToken: string,
  ): Promise<GoogleTokenPayload | undefined> {
    const { clientId, clientSecret } = this.config.google.oauth;
    if (!(clientId && clientSecret)) {
      throw new Error("Missing Google credentials");
    }
    const ticket = await new OAuth2Client({
      clientId,
      clientSecret,
    }).verifyIdToken({
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
